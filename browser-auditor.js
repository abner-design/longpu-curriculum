/**
 * 瀏覽器端純前端 AI 檢核引擎（架接 curriculum-plan-audit SKILL）
 * 使用瀏覽器原生 DecompressionStream('deflate-raw')，
 * 即使老師直接雙擊開啟 workspace-app.html（file://）或嵌入 Google Sites，
 * 也能離線直接深度解析 .docx XML（字體顏色、黃底表格、週次、考後週次、設計者人數）與分析 .pdf 基本規格！
 */

window.BrowserAuditor = (function () {
  async function inflateRawBrowser(u8) {
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('此瀏覽器版本不支援原生解壓縮，請改用新版 Chrome／Edge 或透過本機伺服器開啟');
    }
    const ds = new DecompressionStream('deflate-raw');
    const writer = ds.writable.getWriter();
    writer.write(u8);
    writer.close();
    const res = new Response(ds.readable);
    return new Uint8Array(await res.arrayBuffer());
  }

  async function extractDocxXml(arrayBuffer) {
    const view = new DataView(arrayBuffer);
    const bytes = new Uint8Array(arrayBuffer);
    const maxSearch = Math.min(bytes.length, 65557);
    let eocdOffset = -1;
    for (let i = bytes.length - 22; i >= bytes.length - maxSearch; i--) {
      if (i >= 0 && view.getUint32(i, true) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }
    if (eocdOffset === -1) throw new Error('此檔案不是有效的 .docx（ZIP）格式');

    const cdSize = view.getUint32(eocdOffset + 12, true);
    const cdOffset = view.getUint32(eocdOffset + 16, true);
    let pos = cdOffset;
    const cdEnd = cdOffset + cdSize;
    const dec = new TextDecoder('utf-8');

    while (pos < cdEnd && pos + 46 <= bytes.length) {
      if (view.getUint32(pos, true) !== 0x02014b50) break;
      const method = view.getUint16(pos + 10, true);
      const compSize = view.getUint32(pos + 20, true);
      const nameLen = view.getUint16(pos + 28, true);
      const extraLen = view.getUint16(pos + 30, true);
      const commentLen = view.getUint16(pos + 32, true);
      const localOffset = view.getUint32(pos + 42, true);
      const name = dec.decode(bytes.subarray(pos + 46, pos + 46 + nameLen));

      if (name === 'word/document.xml') {
        if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error('損毀的 .docx 內部標頭');
        const lNameLen = view.getUint16(localOffset + 26, true);
        const lExtraLen = view.getUint16(localOffset + 28, true);
        const dataStart = localOffset + 30 + lNameLen + lExtraLen;
        const compSlice = bytes.subarray(dataStart, dataStart + compSize);
        if (method === 0) return dec.decode(compSlice);
        if (method === 8) return dec.decode(await inflateRawBrowser(compSlice));
        throw new Error(`不支援的壓縮方式：${method}`);
      }
      pos += 46 + nameLen + extraLen + commentLen;
    }
    throw new Error('找不到 word/document.xml');
  }

  function decodeXmlEntities(s) {
    return String(s || '')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  }

  function classifyHexColor(hex) {
    if (!hex || hex.toLowerCase() === 'auto') return 'black';
    const clean = hex.replace('#', '').trim();
    if (clean.length !== 6) return 'other';
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    if ([r, g, b].some(Number.isNaN)) return 'other';
    if (r < 55 && g < 55 && b < 55) return 'black';
    if (Math.abs(r - g) <= 24 && Math.abs(g - b) <= 24 && r >= 85 && r <= 220) return 'gray';
    if (r >= 145 && r > g + 55 && r > b + 55) return 'red';
    if (b >= 120 && b > r + 40 && b >= g + 15) return 'blue';
    if (g >= 75 && g > r + 25 && g > b + 20) return 'green';
    return 'other';
  }

  function parseSingleWeekToken(tok) {
    if (!tok) return null;
    const t = tok.trim();
    if (/^\d{1,2}$/.test(t)) {
      const n = Number(t);
      return n >= 1 && n <= 22 ? n : null;
    }
    const cnMap = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 };
    if (t === '廿二' || t === '二十二' || t === '二二') return 22;
    if (t === '廿一' || t === '二十一' || t === '二一') return 21;
    if (t === '廿' || t === '二十') return 20;
    if (t.startsWith('十')) {
      if (t.length === 1) return 10;
      return cnMap[t[1]] ? 10 + cnMap[t[1]] : null;
    }
    return cnMap[t] || null;
  }

  function parseWeekNumbers(str) {
    if (!str) return [];
    const s = str.trim();
    if (/^\d{1,2}\s*月/.test(s) || /^\d{1,2}\/\d{1,2}/.test(s)) return [];

    const rangeRe = /第?\s*(廿[一二]?|二十[一二]?|二[一二]|十[一二三四五六七八九]?|[一二三四五六七八九]|\d{1,2})\s*[週周]?\s*[-~～至到—–]\s*第?\s*(廿[一二]?|二十[一二]?|二[一二]|十[一二三四五六七八九]?|[一二三四五六七八九]|\d{1,2})\s*[週周]/;
    const rm = s.match(rangeRe);
    if (rm) {
      const a = parseSingleWeekToken(rm[1]);
      const b = parseSingleWeekToken(rm[2]);
      if (a !== null && b !== null && b >= a && b - a <= 21) {
        const out = [];
        for (let i = a; i <= b; i++) out.push(i);
        return out;
      }
    }

    const explicitRe = /^第?\s*(廿[一二]?|二十[一二]?|二[一二]|十[一二三四五六七八九]?|[一二三四五六七八九]|\d{1,2})\s*[週周]/;
    const em = s.match(explicitRe);
    if (em) {
      const n = parseSingleWeekToken(em[1]);
      return n !== null ? [n] : [];
    }

    const bareCnRe = /^(廿[一二]?|二十[一二]?|二[一二]|十[一二三四五六七八九]?|[一二三四五六七八九])(?=[\s\d/｜|~～\-]|$)/;
    const cm = s.match(bareCnRe);
    if (cm) {
      const n = parseSingleWeekToken(cm[1]);
      return n !== null ? [n] : [];
    }

    if (/^\d{1,2}$/.test(s)) {
      const n = Number(s);
      return n >= 1 && n <= 22 ? [n] : [];
    }
    return [];
  }

  function parseDocxXml(xml) {
    const paragraphs = [];
    for (const pm of xml.matchAll(/<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g)) {
      const text = [...pm[1].matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => decodeXmlEntities(m[1])).join('').trim();
      if (text) paragraphs.push(text);
    }

    const tableRows = [];
    for (const trm of xml.matchAll(/<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/g)) {
      const cells = [];
      for (const tcm of trm[1].matchAll(/<w:tc\b[^>]*>([\s\S]*?)<\/w:tc>/g)) {
        const txt = [...tcm[1].matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => decodeXmlEntities(m[1])).join('').replace(/\s+/g, ' ').trim();
        cells.push(txt);
      }
      if (cells.length) tableRows.push(cells);
    }

    const colorCounts = { black: 0, red: 0, blue: 0, green: 0, gray: 0, other: 0 };
    const colorSamples = { red: [], blue: [], green: [], gray: [] };
    for (const rm of xml.matchAll(/<w:r\b[^>]*>([\s\S]*?)<\/w:r>/g)) {
      const rXml = rm[1];
      const txt = [...rXml.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => decodeXmlEntities(m[1])).join('').trim();
      if (!txt) continue;
      const cm = rXml.match(/<w:color\b[^>]*w:val="([0-9A-Fa-f]{6}|auto)"/);
      const bucket = classifyHexColor(cm ? cm[1] : 'auto');
      colorCounts[bucket] += txt.length;
      if (colorSamples[bucket] && colorSamples[bucket].length < 3 && txt.length >= 2) {
        colorSamples[bucket].push(txt.slice(0, 24));
      }
    }
    return { fullText: paragraphs.join('\n'), paragraphs, tableRows, colorCounts, colorSamples };
  }

  function inspectPdfBasic(arrayBuffer, filename, courseType, gradeBand) {
    const mustFix = [];
    const warnings = [];
    const passed = [];
    const isExtCourse = courseType !== 'ministry';
    const rawLatin = new TextDecoder('latin1').decode(new Uint8Array(arrayBuffer));
    const isPdfHeader = rawLatin.startsWith('%PDF-');
    const pageMatches = rawLatin.match(/\/Type\s*\/Page\b/g) || [];
    const pageCount = pageMatches.length;

    if (!isPdfHeader) {
      mustFix.push({
        rule: 'PDF 檔案標頭無效',
        detail: '此檔案開頭非標準 %PDF 格式，可能已損毀或副檔名錯誤。',
        suggestion: '請由 Word 重新「另存新檔 → PDF」後再檢核。'
      });
    } else {
      passed.push({
        rule: 'PDF 檔案完整性通過',
        detail: `標準 PDF 檔案（${pageCount > 0 ? `偵測約 ${pageCount} 頁，` : ''}${(arrayBuffer.byteLength / 1024).toFixed(1)} KB），可供繳交雙檔使用。`
      });
    }

    // 檔名檢核
    const hasSemester = /下學期|115[-_]?2|下/.test(filename);
    const hasGrade = /[1-6一二三四五六]\s*年級|[1-6一二三四五六][上下]/.test(filename);
    const hasPublisher = /翰林|康軒|南一|何嘉仁|真平|宏全|自編/.test(filename);
    const hasExtTag = /彈性學習|英轉|資轉|英語|資訊/.test(filename);

    if (!hasSemester) {
      mustFix.push({
        rule: '檔名缺少「下學期」標示',
        detail: `目前檔名「${filename}」未標註「下學期」（容易與上學期檔案混淆）。`,
        suggestion: isExtCourse
          ? '英轉／資轉建議檔名：5年級_下學期_彈性學習_[課程名稱].pdf'
          : '部定建議檔名：康軒版-5年級_下學期_數學領域.pdf（例：版本-年級_下學期_領域名稱）'
      });
    } else {
      passed.push({ rule: '檔名學期標示正確', detail: `檔名「${filename}」已包含下學期標示。` });
    }

    if (hasGrade && (isExtCourse ? hasExtTag : hasPublisher)) {
      passed.push({ rule: '檔名年級與版本／類型標示', detail: `檔名已包含年級與${isExtCourse ? '課程名稱' : '教材版本'}資訊。` });
    } else {
      warnings.push({
        rule: '建議依學校標準格式調整檔名',
        detail: `目前檔名「${filename}」建議補齊完整格式。`,
        suggestion: isExtCourse
          ? '格式：年級_下學期_彈性學習_[課程名稱].pdf'
          : '格式：版本-年級_下學期_領域名稱.pdf（例如：康軒版-5年級_下學期_數學領域.pdf）'
      });
    }

    warnings.push({
      rule: '提醒：PDF 無法讀取 Word 原始色碼，建議同步上傳 .docx 進行全文深度檢核',
      detail: 'PDF 檔案內的文字與顏色經壓縮編碼，瀏覽器端無法精準掃描「黑／紅／藍／深綠字體顏色」、「表末黃底混齡／校外人士表格勾選」與「各週次空白狀態」。',
      suggestion: '請同時上傳同份課程計畫的 Word 原始檔（.docx）按下檢核鍵，即可立即執行全部 8 大紅線深度掃描！'
    });

    if (pageCount > 0 && pageCount < 3) {
      warnings.push({
        rule: `PDF 頁數偏少（偵測約 ${pageCount} 頁）`,
        detail: `完整 ${gradeBand === '6' ? '19' : '21'} 週課程計畫通常至少 4 頁以上，請確認匯出 PDF 時未漏頁或截斷表末黃底表格。`,
        suggestion: '請開啟 PDF 逐頁確認第 1 週至期末考後週次及表末黃底表格皆完整顯示。'
      });
    }

    const total = mustFix.length + warnings.length + passed.length;
    const score = Math.max(40, Math.round(((passed.length + warnings.length * 0.5) / Math.max(1, total)) * 100 - mustFix.length * 10));
    return {
      ok: true,
      skillName: 'curriculum-plan-audit (瀏覽器離線模式)',
      filename,
      courseType,
      gradeBand,
      deepParsed: false,
      summary: {
        mustFixCount: mustFix.length,
        warningCount: warnings.length,
        passedCount: passed.length,
        score,
        verdict: mustFix.length > 0
          ? `🚨 發現 ${mustFix.length} 項待修正（建議再上傳 .docx 做全文深度掃描）`
          : '✅ PDF 基礎檢核完成（建議再上傳 .docx 做字色與黃底表格深度掃描）'
      },
      mustFix,
      warnings,
      passed,
      metrics: null
    };
  }

  async function auditFile(file, { courseType = 'ministry', gradeBand = '1-5' } = {}) {
    const filename = file.name || '未命名檔案';
    const ext = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')).toLowerCase() : '';
    const arrayBuffer = await file.arrayBuffer();

    if (ext === '.pdf') {
      return inspectPdfBasic(arrayBuffer, filename, courseType, gradeBand);
    }

    if (ext !== '.docx') {
      return {
        ok: true,
        skillName: 'curriculum-plan-audit (瀏覽器離線模式)',
        filename,
        courseType,
        gradeBand,
        deepParsed: false,
        summary: { mustFixCount: 1, warningCount: 0, passedCount: 0, score: 30, verdict: '🚨 請另存為 .docx 再進行深度檢核' },
        mustFix: [{
          rule: `不支援的舊版或非 Word 格式（${ext || '未知'}）`,
          detail: '舊版 .doc 或其他格式無法進行 XML 字色與表格深度解析。',
          suggestion: '請於 Word 開啟後按「另存新檔 → Word 文件 (.docx)」，再上傳即可完整檢核！'
        }],
        warnings: [],
        passed: [],
        metrics: null
      };
    }

    const expectedWeeks = gradeBand === '6' ? 19 : 21;
    const postExamStart = gradeBand === '6' ? 17 : 20;
    const isExtCourse = courseType !== 'ministry';
    const mustFix = [];
    const warnings = [];
    const passed = [];

    // 1. 檔名檢查
    const hasSemester = /下學期|115[-_]?2|下/.test(filename);
    const hasGrade = /[1-6一二三四五六]\s*年級|[1-6一二三四五六][上下]/.test(filename);
    if (hasGrade && hasSemester) {
      passed.push({ rule: '檔案命名格式', detail: `檔名「${filename}」已包含年級與下學期資訊。` });
    } else {
      warnings.push({
        rule: '建議調整標準檔名',
        detail: `目前檔名「${filename}」缺少年級或「下學期」標示。`,
        suggestion: isExtCourse ? '建議：5年級_下學期_彈性學習_[課程名稱].docx' : '建議：翰林版-5年級_下學期_數學領域.docx'
      });
    }

    const xml = await extractDocxXml(arrayBuffer);
    const parsed = parseDocxXml(xml);
    const text = parsed.fullText;

    // 2. 基本資料
    const hasSchool = /龍埔/.test(text);
    const has115 = /115/.test(text);
    const hasSecondTerm = /下學期|第二學期|第\s*2\s*學期/.test(text);
    if (hasSchool && has115 && hasSecondTerm) {
      passed.push({ rule: '基本資料（校名／115／下學期）', detail: '已偵測到「龍埔」、115 學年度與下學期（第二學期）標示。' });
    } else {
      const missing = [];
      if (!hasSchool) missing.push('校名（龍埔國小）');
      if (!has115) missing.push('115 學年度');
      if (!hasSecondTerm) missing.push('下學期／第二學期標示');
      mustFix.push({
        rule: '基本資料缺漏或仍為舊學期',
        detail: `文件中未偵測到：${missing.join('、')}。`,
        suggestion: '請確認標題與基本資料欄已更新為「龍埔國小 115 學年度下學期（第二學期）」。'
      });
    }

    // 設計者人數 ≤ 6
    let detectedAuthors = [];
    for (const row of parsed.tableRows) {
      for (let i = 0; i < row.length; i++) {
        if (/設計者|撰寫教師|編寫教師/.test(row[i]) && row[i + 1]) {
          const raw = row[i + 1].replace(/老師|教師|等人/g, '').trim();
          if (raw) detectedAuthors = raw.split(/[、,，/／\s]+/).map((s) => s.trim()).filter((s) => s.length >= 2 && s.length <= 5);
          break;
        }
      }
      if (detectedAuthors.length > 0) break;
    }
    if (detectedAuthors.length > 6) {
      mustFix.push({
        rule: '撰寫教師人數超過敘獎上限（最多 6 名）',
        detail: `偵測到 ${detectedAuthors.length} 位教師（${detectedAuthors.join('、')}），超過每案最多 6 名規定。`,
        suggestion: '請將設計者名單精簡至 6 名以內。'
      });
    } else if (detectedAuthors.length > 0) {
      passed.push({ rule: '撰寫教師人數符合規定', detail: `偵測到 ${detectedAuthors.length} 位設計者（${detectedAuthors.join('、')}）。` });
    } else {
      warnings.push({ rule: '請人工確認設計者名單（上限 6 名）', detail: '未自動定位到設計者表格欄，請確認已填寫姓名且不超過 6 名。' });
    }

    // 3. 表末黃底必留表格
    const hasMixedAge = /混齡教學/.test(text);
    const hasExternalHelp = /校外人士.*協助|協助教學/.test(text);
    const hasCheckSymbol = /[☑■▓✓✔VＶ]/.test(text);
    if (!hasMixedAge || !hasExternalHelp) {
      mustFix.push({
        rule: '紅線違規：缺少 115 表末黃底必留表格',
        detail: '文件中未偵測到「混齡教學」或「校外人士協助教學」黃底表格！',
        suggestion: '請務必下載 1-1 最新 115 空白格式補回表末黃底表格並確實勾選。'
      });
    } else if (!hasCheckSymbol) {
      mustFix.push({
        rule: '紅線違規：表末黃底表格疑似尚未勾選',
        detail: '已保留表格但全文未偵測到勾選符號（☑／■／▓／✓）。',
        suggestion: '無論有無實施皆須於對應方框打勾（☑）。'
      });
    } else {
      passed.push({ rule: '表末黃底必留表格（混齡／校外人士協助）', detail: '已完整保留並偵測到勾選符號。' });
    }

    // 4. 字體顏色檢查
    const cc = parsed.colorCounts;
    const totalColored = cc.black + cc.red + cc.blue + cc.green + cc.gray + cc.other;
    if (courseType === 'ministry' || courseType === 'eng36') {
      if (cc.red === 0) {
        mustFix.push({
          rule: '字體顏色檢核：未偵測到「紅色」改編／自編文字',
          detail: '部定與 3–6 年級英轉規定「改編／自編」須以【紅色】標示，且部定課程須有學校本位轉化。',
          suggestion: '請將轉化後的教學活動文字標示為紅色，校本特色標示為深綠色。'
        });
      } else {
        passed.push({ rule: '字體顏色：已標示紅色改編內容', detail: `偵測到 ${cc.red} 字紅色文字。` });
      }
    } else if (courseType === 'eng12') {
      if (cc.red > 20) {
        mustFix.push({
          rule: '低年級英轉字體顏色錯誤（偵測到紅色字體）',
          detail: `低年級英轉自編內容須使用【黑色】（非紅色），目前偵測到 ${cc.red} 字紅色文字。`,
          suggestion: '請將紅色文字調整為黑色（議題維持藍色、校本維持深綠）。'
        });
      } else {
        passed.push({ rule: '低年級英轉字體顏色（黑／藍／深綠）', detail: '自編內容以黑色呈現，符合低年級英轉規定。' });
      }
    } else if (courseType === 'info36') {
      if (cc.gray === 0) {
        warnings.push({ rule: '資轉字體顏色提醒（淺灰＋黑）', detail: '3–6 資轉廠商文字須為淺灰、改編自編為黑色；若為全自編則以黑色為主即可。' });
      } else {
        passed.push({ rule: '資轉字體顏色（淺灰＋黑）', detail: `偵測到 ${cc.gray} 字淺灰與 ${cc.black} 字黑色文字。` });
      }
    }

    if (cc.blue === 0) {
      warnings.push({ rule: '字體顏色提醒：未偵測到「藍色」議題融入', detail: '依規定融入議題須以藍色標示，並同步填寫「表 5 法定教育議題」。' });
    } else {
      passed.push({ rule: '字體顏色：已標示藍色議題融入', detail: `偵測到 ${cc.blue} 字藍色文字。` });
    }
    if (cc.green === 0) {
      warnings.push({ rule: '字體顏色提醒：未偵測到「深綠色」校本特色', detail: '校本特色內容建議以深綠色標示，並同步填寫「表 6 校本課程架構」。' });
    } else {
      passed.push({ rule: '字體顏色：已標示深綠色校本特色', detail: `偵測到 ${cc.green} 字深綠文字。` });
    }

    // 5. 週次與考後週次
    const foundWeeks = new Map();
    let dateInWeekCount = 0;
    for (const row of parsed.tableRows) {
      const firstCell = row[0] || '';
      const wns = parseWeekNumbers(firstCell);
      if (wns.length > 0) {
        if (/\d{1,2}\/\d{1,2}/.test(firstCell)) dateInWeekCount++;
        const rest = row.slice(1).join(' ').trim();
        for (const wn of wns) {
          foundWeeks.set(wn, ((foundWeeks.get(wn) || '') + ' ' + rest).trim());
        }
      }
    }
    const maxWeekFound = foundWeeks.size ? Math.max(...foundWeeks.keys()) : 0;
    if (foundWeeks.size === 0) {
      warnings.push({ rule: '教學期程請以「週次」呈現', detail: '未在表格第一欄偵測到標準週次格式，請確認期程以週次呈現。' });
    } else {
      if (dateInWeekCount > 0) {
        warnings.push({
          rule: '教學期程建議改為純「週次」呈現（偵測到日期）',
          detail: `偵測到 ${dateInWeekCount} 列夾帶月/日，依簡報提醒建議僅寫週次。`,
          suggestion: '移除月/日，改以「第 1 週」～「第 21 週」呈現。'
        });
      }
      if (maxWeekFound < expectedWeeks) {
        mustFix.push({
          rule: `總週次不足（應為 ${expectedWeeks} 週）`,
          detail: `目前僅偵測到第 ${maxWeekFound} 週（共 ${foundWeeks.size} 週）。`,
          suggestion: `請補足至第 ${expectedWeeks} 週。`
        });
      } else {
        passed.push({ rule: `總週次完整（符合 ${expectedWeeks} 週規範）`, detail: `已偵測到第 1 週至第 ${maxWeekFound} 週。` });
      }

      const postProblems = [];
      for (let w = postExamStart; w <= expectedWeeks; w++) {
        const c = foundWeeks.get(w) || '';
        if (c.length < 10 || /^(結業式|休業式|修業式|大掃除|總複習|\s|\d)+$/.test(c)) postProblems.push(w);
      }
      if (postProblems.length) {
        mustFix.push({
          rule: '紅線違規：期末考／畢業考後週次空白或內容過少',
          detail: `第 ${postProblems.join('、')} 週內容空白或僅有結業式字樣。`,
          suggestion: '考後週次務必規劃實質延伸教學活動與評量，絕對不可留白！'
        });
      } else if (maxWeekFound >= expectedWeeks) {
        passed.push({ rule: '考後週次實質課程安排', detail: `考後第 ${postExamStart}–${expectedWeeks} 週皆有實質教學內容。` });
      }
    }

    // 6. 領綱與多元評量
    if (/[a-zA-Z0-9\u4e00-\u9fff]{1,3}-[IⅤVⅠⅡⅢ]{1,3}-[0-9a-zA-Z]{1,3}|[A-C][1-3]/.test(text)) {
      passed.push({ rule: '課綱素養與學習重點編碼', detail: '已偵測到 12 年國教素養／領綱編碼格式。' });
    } else {
      warnings.push({ rule: '未偵測到明確課綱／領綱編碼', detail: '請確認已對應年級學習階段填列核心素養與學習表現／內容編碼。' });
    }

    const assessKw = ['口頭', '實作', '學習單', '發表', '紙筆', '觀察', '作品', '互評', '自評', '檔案評量', '測驗'];
    const matchedAssess = assessKw.filter((k) => text.includes(k));
    if (matchedAssess.length >= 2) {
      passed.push({ rule: '多元評量方式', detail: `偵測到多元評量（${matchedAssess.slice(0, 5).join('、')}等）。` });
    } else {
      warnings.push({ rule: '評量方式多元性提醒', detail: '建議評量方式多元明確，並呼應各週活動內容。' });
    }

    const totalChecks = mustFix.length + warnings.length + passed.length;
    const score = Math.min(100, Math.max(0, Math.round(((passed.length + warnings.length * 0.5) / Math.max(1, totalChecks)) * 100 - mustFix.length * 6)));
    return {
      ok: true,
      skillName: 'curriculum-plan-audit (瀏覽器原生即時引擎)',
      filename,
      courseType,
      gradeBand,
      deepParsed: true,
      summary: {
        mustFixCount: mustFix.length,
        warningCount: warnings.length,
        passedCount: passed.length,
        score,
        verdict: mustFix.length === 0
          ? (warnings.length === 0 ? '🎉 全部檢核通過，可直接匯出 PDF 準備繳交！' : '✅ 無紅線違規（建議確認黃燈提醒後即可繳交）')
          : `🚨 發現 ${mustFix.length} 項紅線待修正，建議修正後再上傳！`
      },
      mustFix,
      warnings,
      passed,
      metrics: {
        totalChars: totalColored,
        weeksDetected: foundWeeks.size,
        maxWeekFound,
        expectedWeeks,
        authorsCount: detectedAuthors.length,
        colorCounts: cc
      }
    };
  }

  return { auditFile };
})();
