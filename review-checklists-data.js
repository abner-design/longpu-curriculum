/**
 * 龍埔國小 115 學年度下學期課程計畫審查檢核表（表 4）各領域 100% 原文照錄資料模組
 * 資料來源：`4-課程計畫審查檢核表(空白)-初審教師共作填寫` 資料夾內 10 份原始 `.docx`（解壓讀取 `word/document.xml`）
 */
(function () {
  const DOC_TITLE = '115學年度下學期學校課程計畫審查檢核表';
  const COMMON_NOTE = '※備註：1.資源班之課程計畫審查依撰寫領域納入各領域進行審查，實際審查情形可依各校自訂並修改表格。';
  const SIGN_INITIAL_LINE = '115/12/25領域小組初審結果： □須修正  □通過  簽名： ';
  const SIGN_FINAL_LINE = '115/12/30課發會委員複審結果：□須修正 □通過  簽名：';

  function item(id, no, text, opts) {
    const o = opts || {};
    return {
      id: id,
      no: String(no),
      text: text,
      isSub: Boolean(o.isSub),
      sectionHeader: o.sectionHeader || ''
    };
  }

  /**
   * 建立標準 12 項（含 2-1 子項，共 13 條）備查檢核項目
   * @param {string} domainCheckExample 例如 '如☑部定課程：☑國語文'
   * @param {object} [overrides] 針對個別領域（如 08 健康與體育、09 本土語）之條文覆寫
   */
  function buildStandardItems(domainCheckExample, overrides) {
    const ov = overrides || {};
    const list = [
      item('i1', '1', '每週學習節數符合課綱規範。'),
      item(
        'i2',
        '2',
        ov.i2Text ||
          `課程計畫各項目內容須填列正確，格式應包含標題(校名、學年度、年級、學期及設計者)、領域名稱(須勾選，${domainCheckExample})、學習節數、課程內涵、素養導向教學規劃，並視各校需求呈現課程架構。`
      )
    ];

    if (!ov.omitSub2_1) {
      list.push(
        item(
          'i2_1',
          '2-1',
          '計畫末項 「本課程是否有校外人士協助教學」表格不得刪除',
          { isSub: true }
        )
      );
    }

    list.push(
      item(
        'i3',
        '3',
        '總綱核心素養及學習領域核心素養分別依照總綱及領綱「國民小學教育階段」撰寫，並能確實對應「單元/主題名稱與活動內容」。'
      ),
      item(
        'i4',
        '4',
        '預期學習表現及主要學習內容皆依領綱撰寫，學習階段與年級吻合，並能確實對應「單元/主題名稱與活動內容」。'
      ),
      item('i5', '5', '教學期程、單元/主題名稱與活動內容及節數填寫清楚與恰當。'),
      item(
        'i6',
        '6',
        ov.i6Text || '註明教學資源/學習策略，自編教材內容無智慧財產侵權之虞。'
      ),
      item('i7', '7', '評量方式多元、明確，能適時與「單元/主題名稱與活動內容」相呼應。'),
      item('i8', '8', '評量週與總複習週，編列教學進度、教學活動與評量方式。'),
      item('i9', '9', '「融入議題」符合總綱所列19項議題，並依領綱附錄二適時融入。'),
      item(
        'i10',
        '10',
        '實施跨領域或跨科目協同教學，且需另申請授課鐘點費者，請於備註欄勾選，並註明協同科目與節數。'
      ),
      item('i11', '11', '依據本領域有融入校本課程部分，在該學年領域計畫表中都有呈現。'),
      item(
        'i12',
        '12',
        ov.i12Text || '依規定標示出版社(黑)、改編教材(紅)、議題融入(藍)、校本特色(深綠)'
      )
    );

    return list;
  }

  // 本土語文共通項目與優良條件（源自 `09-閩語審查檢核表.docx` 原文）
  const NATIVE_LANG_ITEMS = buildStandardItems('', {
    i2Text:
      '課程計畫各項目內容須填列正確，格式應包含標題(校名、學年度、年級、學期及設計者)、領域名稱(須勾選及填寫，如☑部定課程：☑本土語文：閩南語或客家語或原住民族語)、學習節數、課程內涵、素養導向教學規劃，並視各校需求呈現課程架構。',
    i6Text:
      '註明教學資源/學習策略，自編教材內容無智慧財產侵權之虞。註明使用教材版本、出處。例如:原住民語文政大教材，並註明族別、語系。'
  });

  const NATIVE_LANG_EXCELLENT = [
    '1.自編教材豐富且能配合地方特色。',
    '2.教學活動豐富多元具創意能配合課程教學目標來設計。',
    '3.具有良好的教學架構。',
    '4.能配合校本課程進行課程規劃。',
    '5.評量方式多元。',
    '6.能融入其他領域或宣導議題的教學。',
    '7.教材來源無智慧財產侵權之虞。',
    '8.能編寫符合核心素養精神的課程內容。',
    '9.能融入議題並設計學生探究活動。',
    '10.能兼顧學生的先備經驗，作符合學習年段的教學設計。'
  ];

  // 通用優良課程計畫具備條件（供無單獨附檔之校訂／特教 fallback 使用）
  const GENERAL_EXCELLENT = [
    '1.自編教材以學生為核心，顧及學生發展、需求、興趣，並兼顧實際教學現場的可行性，符合學生發展，生動有趣。',
    '2.自編或改編課程設計融合校本課程與學校特色。',
    '3.課程計畫能與其生活結合，不脫節。例如：季節、節日、學校活動…等。',
    '4.課程計畫有創意，深度廣度並重。',
    '5.課程設計顧及人文思維或潛在課程，或能繼續延伸發展。',
    '6.課程計畫緊扣學校願景、能力指標、教學目標等。'
  ];

  const SPECS = {
    // 01-國語文審查檢核表.docx
    d01: {
      domainId: 'd01',
      sourceFile: '01-國語文審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '國語文1',
      table1CommentPrompt:
        '檢核:\n1.寫作納入計劃請依據《龍埔國小寫作教學規劃參照表》及教育局115年3月9日函示\n2.是否納入115年度國語文能力檢測改善建議之教學規劃',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【語文-國語文】課程計畫通過備查標準檢核請逐項勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: buildStandardItems('如☑部定課程：☑國語文'),
      excellentCriteria: [
        '1.配合學校行事、落實校本課程。',
        '2.能依生活環境轉化教材內容。',
        '3.教學活動設計能提升聽、說、讀、寫等語文能力。',
        '4.用心設計課程，融入各項資源，拓展語文學習空間。',
        '5.教學活動清楚明確，增進學生語文運用能力、技巧。',
        '6.教學目標明確，設計課程認真，統整單元教學設計。'
      ],
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 02-英語審查檢核表(含校訂).docx
    d02: {
      domainId: 'd02',
      sourceFile: '02-英語審查檢核表(含校訂).docx',
      floatingBadge: '附件3',
      docTitle: DOC_TITLE,
      subjectLine: '語文-英語文2/校訂英轉',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【語文-英語文】課程計畫通過備查標準檢核請逐項勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: [
        item('i1', '1', '每週學習節數符合課綱規範。'),
        item(
          'i2',
          '2',
          '請確認所使用之表格為正確版本。第一學習階段請使用「校訂課程」 計畫表格，第二、三學習階段請使用「三年級以上英語科專用」表格。'
        ),
        item(
          'i3',
          '3',
          '課程計畫各項目內容須填列正確，格式應包含標題(校名、學年度、年級、學期及設計者)、課程類別、學習節數、課程內涵、素養導向教學規劃，並視各校需求呈現課程架構。'
        ),
        item(
          'i3_1',
          '3-1',
          '計畫末項 「本課程是否有校外人士協助教學」表格不得刪除',
          { isSub: true }
        ),
        item(
          'i4',
          '4',
          '總綱核心素養及學習領域核心素養分別依照總綱及領綱「國民小學教育階段」撰寫，並能確實對應「單元/主題名稱與活動內容」。'
        ),
        item(
          'i5',
          '5',
          '預期學習表現及主要學習內容皆依領綱撰寫，學習階段與年級吻合，並能確實對應「單元/主題名稱與活動內容」。'
        ),
        item('i6', '6', '教學期程、單元/主題名稱與活動內容及節數填寫清楚與恰當。'),
        item('i7', '7', '註明教學資源/學習策略，自編教材內容無智慧財產侵權之虞。'),
        item('i8', '8', '評量方式多元、明確，能適時與「單元/主題名稱與活動內容」相呼應。'),
        item('i9', '9', '評量週與總複習週，編列教學進度、教學活動與評量方式。'),
        item('i10', '10', '「融入議題」符合總綱所列19項議題，並依領綱附錄二適時融入。'),
        item(
          'i11',
          '11',
          '實施跨領域或跨科目協同教學，且需另申請授課鐘點費者，請於備註欄勾選，並註明協同科目與節數。'
        ),
        item('i12', '12', '依據本領域有融入校本課程部分，在該學年領域計畫表中都有呈現。'),
        item(
          'i13',
          '13',
          '依規定標示\n部定:出版社(黑)、改編教材(紅)、議題融入(藍)、校本特色(深綠)\n校訂:自編教材(黑)、議題融入(藍)、校本特色(深綠)'
        )
      ],
      excellentCriteria: [
        '以學生有效學習為目標，考量面向如下：',
        '1.公平性：顧及全部學生的需求，符合學生學習發展。',
        '2.可行性：兼顧實際教學現場的執行。',
        '3.多元性：課程內容以學生為核心，融入多元題材。',
        '4.特色性：課程融合校本課程、學校願景及學校特色。',
        '5.結構性：課程計畫與生活結合，並符應教學專業與學習階段。',
        '6.原創性：自編教材有創意，深度廣度並重。',
        '7.完整性：課程計畫具備應有的要素，並能符應教學目標與能力指標。'
      ],
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 03-數學審查檢核表.docx
    d03: {
      domainId: 'd03',
      sourceFile: '03-數學審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '數學3',
      table1CommentPrompt: '1.是否納入115年度數學能力檢測改善建議之教學規劃',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【數學】課程計畫通過備查標準檢核請逐項勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: buildStandardItems('如☑部定課程：☑數學'),
      excellentCriteria: [
        '1.配合學校行事、落實校本課程，按照學校特色或活動、教師專長、課程計畫編寫理念發展改編或自編教材。',
        '2.能夠清楚呈現數學領域架構與課程脈絡。',
        '3.能評估學生學習能力的程度，規劃適合學生的教學活動，切合學生的認知及發展，活動內容能結合生活情境，教給學生什麼能力。',
        '4.教學活動設計能充實計算、邏輯推理、溝通、分析思考等數學能力。',
        '5.針對學生情形規劃適當補充教材，能有效的評量及補救教學計畫，評量方式多元。',
        '6.教學研究會所研發之教材或遊戲能融入各學年課程中能應用學校的資源。'
      ],
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 04-社會審查檢核表.docx
    d04: {
      domainId: 'd04',
      sourceFile: '04-社會審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '社會4',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【社會】課程計畫通過備查標準檢核 請逐項勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: buildStandardItems('如☑部定課程：☑社會'),
      excellentCriteria: [
        '1.自編教材以學生為核心，顧及學生發展、需求、興趣，並兼顧實際教學現場的可行性，符合學生發展，生動有趣。',
        '2.能結合校本課程，有效運用地方（社區）資源設計鄉土教學活動，發展地方（社區）特色教學課程。',
        '3.能有效運用鄉土教學地圖於教學活動，培養學生「擁抱鄉土、放眼國際」情懷。',
        '4.課程設計有深度，顧及人文思維或潛在課程，或能繼續延伸發展。',
        '5.能有效融入新住民、原住民之族群文化。',
        '6.將野外踏查、社區調查運用於校外教學中，並能引導學生蒐集相關資訊，開發學生社會實查及資訊運用知能。'
      ],
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 05-自然科學審查檢核表.docx
    d05: {
      domainId: 'd05',
      sourceFile: '05-自然科學審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '自然',
      table1CommentPrompt: '',
      noteBetweenTables: '',
      table2Heading: '【自然科學】課程計畫通過備查標準檢核 請逐項勾選☑',
      categoryLabel: '十二年國教課綱',
      items: [
        item('i1', '1', '學期總節數符合規定。'),
        item(
          'i2',
          '2',
          '計畫格式包含：校名、領域名稱、適用年級、設計者姓名、學期目標、教學期程、領域及議題學習重點(學習內容與學習表現)、主題或單元活動內容（含單元主題名稱）、節數、使用教材、評量方式等。並視各校需求，列出學期總節數說明、課程架構與協同教學規劃等。'
        ),
        item(
          'i2_1',
          '2-1',
          '計畫末項 「本課程是否有校外人士協助教學」表格不得刪除',
          { isSub: true }
        ),
        item(
          'i3',
          '3',
          '各學習階段學習內容與學習表現使用─可依課程計畫需求酌予使用跨階段之指標，但請加註文字說明。'
        ),
        item('i4', '4', '課程設計內容盡量符合領域該階段學習目標與教學重點。'),
        item('i5', '5', '註明使用教材版本、出處。'),
        item('i6', '6', '自編教材內容無智慧財產侵權之虞。'),
        item('i7', '7', '評量週與總複習週，編列教學進度、教學活動與評量方式。'),
        item(
          'i8',
          '8',
          '實施跨領域或跨科目協同教學，且需另申請授課鐘點費者，請於備註欄勾選，並註明協同科目與節數。'
        ),
        item(
          'i9',
          '9',
          '課程設計能達成該階段學習重點。清楚列出主要學習概念、關鍵問題、教學重點與學習策略。',
          { sectionHeader: '以下為本領域特殊需求之具備條件：' }
        ),
        item('i10', '10', '評量方式多元，可多考慮實作評量。'),
        item('i11', '11', '多元補充教學資源與閱讀文本(網站、簡報、器材準備…)。'),
        item('i12', '12', '依據本領域有融入校本課程部分，在該學年領域計畫表中都有呈現。'),
        item(
          'i13',
          '13',
          '依規定標示出版社(黑)、改編教材(紅)、議題融入(藍)、校本特色(深綠)'
        )
      ],
      excellentCriteria: [
        '1.課程計畫撰寫架構清晰，主題明確。2.課程設計能達成該階段學習重點。',
        '3.能適度改編教材使其更切合實際教學需要。',
        '4.能參考並運用版本間的差異，設計適當的補充教學活動。',
        '5.教學素材貼近學生生活情境、教材選擇多樣化。',
        '6.能達到學生自我實現與自主學習的操作性學習。7.能適切融入校訂課程內容。',
        '8.結合學校、社區資源、社會議題進行科學性的探究，並提出解決之道並付諸行動。'
      ],
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 06-綜合活動審查檢核表.docx
    d06: {
      domainId: 'd06',
      sourceFile: '06-綜合活動審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '綜合活動',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【綜合活動】課程計畫通過備查標準檢核 請逐項勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: buildStandardItems('如☑部定課程：☑綜合'),
      excellentCriteria: [
        '1.自編教學活動，且服膺綜合活動領域之基本理念、課程目標、能力指標。',
        '2.教學活動雖參考教科書但有依學校特色進行修正、轉化或與社區資源結合。',
        '3.教學設計中除教學重點外尚有體驗、省思〈提問〉、實踐等內涵之規劃設計。'
      ],
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 07-藝術審查檢核表.docx
    d07: {
      domainId: 'd07',
      sourceFile: '07-藝術審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '藝術7',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【藝術】課程計畫通過備查標準檢核勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: buildStandardItems('如☑部定課程：☑藝術'),
      excellentCriteria: [
        '1.自編教材以學生為核心，顧及學生發展、需求、興趣，兼顧實際教學現場的可行性，符合學生發展，生動有趣。',
        '2.自編或改編課程設計融合校本課程，具地區特色。',
        '3.課程計畫與生活結合，不脫節。例如：季節、節日、學校活動…等。',
        '4課程計畫有創意，深度廣度並重。',
        '5.課程設計有深度，顧及人文思維或潛在課程，或能繼續延伸發展。',
        '6.課程計畫緊扣學校願景、能力指標、教學目標等。',
        '7.課程計畫安排巧妙的運用多元素材。',
        '8.提供學生展演舞台及成功經驗。',
        '9.提供學生豐富的美感經驗。',
        '10.運用多元的教學資源及數位化教材，例如：社區資源，或博物館、美術館等機關資源，教學資源萬花筒、教育部人文藝術網或其他網路資源。',
        '11.融入新興議題。例如，新住民、品德教育、閱讀、十八條學習路線等。',
        '12.適度修改坊間教材。按照學校特色或活動、教師專長、課程計畫編寫理念發展改編或自編教材。',
        '13.具課程統整精神，或跨領域教學團隊協同特色。'
      ],
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 08-健康與體育審查檢核表 .docx
    d08: {
      domainId: 'd08',
      sourceFile: '08-健康與體育審查檢核表 .docx',
      floatingBadge: '附件3',
      docTitle: DOC_TITLE,
      subjectLine: '健康與體育8',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【健康與體育】課程計畫通過備查標準檢核勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: buildStandardItems('', {
        i2Text:
          '課程計畫各項目內容須填列正確，格式應包含標題(校名、學年度、年級、學期及設計者)、領域名稱(須勾選，如☑部定課程：☑健康與體育)、學習節數、課程內涵、素養導向教學規劃，並視各校需求呈現課程架構。109-2增列混齡教學及校外人士入校協助表格。',
        omitSub2_1: true
      }),
      excellentCriteria: GENERAL_EXCELLENT,
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 09-閩語審查檢核表.docx
    d09: {
      domainId: 'd09',
      sourceFile: '09-閩語審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '語文-本土語文-閩語9',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【語文-本土語文-閩語】課程計畫通過備查標準檢核勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: NATIVE_LANG_ITEMS.map(function (x) { return Object.assign({}, x); }),
      excellentCriteria: NATIVE_LANG_EXCELLENT.slice(),
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 10-客語（套用 09-閩語審查檢核表.docx 本土語共通原文）
    d10: {
      domainId: 'd10',
      sourceFile: '09-閩語審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '語文-本土語文-客語10',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【語文-本土語文-客語】課程計畫通過備查標準檢核勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: NATIVE_LANG_ITEMS.map(function (x) { return Object.assign({}, x); }),
      excellentCriteria: NATIVE_LANG_EXCELLENT.slice(),
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 11-原住民族語（套用 09-閩語審查檢核表.docx 本土語共通原文）
    d11: {
      domainId: 'd11',
      sourceFile: '09-閩語審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '語文-本土語文-原住民族語11',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【語文-本土語文-原住民族語】課程計畫通過備查標準檢核勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: NATIVE_LANG_ITEMS.map(function (x) { return Object.assign({}, x); }),
      excellentCriteria: NATIVE_LANG_EXCELLENT.slice(),
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 12-新住民語（套用 09-閩語審查檢核表.docx 語文共通原文）
    d12: {
      domainId: 'd12',
      sourceFile: '09-閩語審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '語文-新住民語文12',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【語文-新住民語文】課程計畫通過備查標準檢核勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: NATIVE_LANG_ITEMS.map(function (x) { return Object.assign({}, x); }),
      excellentCriteria: NATIVE_LANG_EXCELLENT.slice(),
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 13-資訊教育(資轉)（採用共通標準 12 項含 2-1 共 13 條原文）
    d13: {
      domainId: 'd13',
      sourceFile: '',
      docTitle: DOC_TITLE,
      subjectLine: '校訂-資訊教育13',
      table1CommentPrompt: '',
      noteBetweenTables: COMMON_NOTE,
      table2Heading: '【資訊教育】課程計畫通過備查標準檢核請逐項勾選 ☑',
      categoryLabel: '十二年國教課綱',
      items: buildStandardItems('如☑校訂課程：☑資訊教育'),
      excellentCriteria: GENERAL_EXCELLENT.slice(),
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    },

    // 13-生活領域審查檢核表.docx（對應平台 d15 生活領域，原檔標示「生活課程 15」）
    d15: {
      domainId: 'd15',
      sourceFile: '13-生活領域審查檢核表.docx',
      docTitle: DOC_TITLE,
      subjectLine: '生活課程 15',
      table1CommentPrompt: '',
      noteBetweenTables: '',
      table2Heading: '【生活課程】課程計畫通過備查標準檢核勾選☑',
      categoryLabel: '審查通過具備條件／十二年國教課綱',
      items: [
        item('i1', '1', '每週學習節數符合課綱規範(一週6節)。'),
        item(
          'i2',
          '2',
          '課程計畫各項目內容須填列正確。計畫格式應包含校名、學年度、年級、學期及設計者、領域名稱(須勾選，如☑部定課程：☑生活課程)、學習節數、課程內涵、素養導向教學規劃，並視各校需求呈現課程架構。'
        ),
        item(
          'i2_1',
          '2-1',
          '計畫末項 「本課程是否有校外人士協助教學」表格不得刪除',
          { isSub: true }
        ),
        item(
          'i3',
          '3',
          '總綱核心素養、學習領域核心素養以及預期學習表現及主要學習內容，分別依照總綱及生活課程領綱規定撰寫，並能確實對應「主題/單元名稱與活動內容」，並標明節數、註明學習策略/教學資源（自編教材內容無智慧財產侵權之虞），以及評量方式。'
        ),
        item(
          'i4',
          '4',
          '實施跨領域或跨科目協同教學，且需另申請授課鐘點費者，請於備註欄勾選，並註明協同科目與節數。'
        ),
        item('i5', '5', '檢附主題軸檢核表。'),
        item('i6', '6', '依據本領域有融入校本課程部分，在該學年領域計畫表中都有呈現。'),
        item(
          'i7',
          '7',
          '依規定標示出版社(黑)、改編教材(紅)、議題融入(藍)、校本特色(深綠)'
        )
      ],
      excellentCriteria: [
        '1.課程設計以學生需求與興趣為出發。',
        '2.課程設計能落實生活課程領綱內容',
        '3.課程設計能融入在地特色或資源。',
        '4.多元學習策略與評量方式。'
      ],
      hasThemeAxisAppendix: true,
      signInitialLine: SIGN_INITIAL_LINE,
      signFinalLine: SIGN_FINAL_LINE
    }
  };

  // 一般校訂／特教／動態領域 fallback（採用共通標準 12 項含 2-1 共 13 條原文）
  const DEFAULT_SPEC = {
    domainId: 'default',
    sourceFile: '',
    docTitle: DOC_TITLE,
    subjectLine: '校訂/特殊需求課程',
    table1CommentPrompt: '',
    noteBetweenTables: COMMON_NOTE,
    table2Heading: '【課程計畫】課程計畫通過備查標準檢核請逐項勾選 ☑',
    categoryLabel: '十二年國教課綱',
    items: buildStandardItems('如☑部定課程／☑校訂課程'),
    excellentCriteria: GENERAL_EXCELLENT.slice(),
    signInitialLine: SIGN_INITIAL_LINE,
    signFinalLine: SIGN_FINAL_LINE
  };

  function getSpecForDomain(domainId, domainLabel) {
    const id = String(domainId || '').trim();
    if (id && SPECS[id]) {
      return SPECS[id];
    }

    // 支援依名稱關鍵字回退對應
    const lbl = String(domainLabel || '').trim();
    if (lbl) {
      if (lbl.includes('國語')) return SPECS.d01;
      if (lbl.includes('英語') || lbl.includes('英閱繪') || lbl.includes('英轉')) return SPECS.d02;
      if (lbl.includes('數學') && !id.startsWith('gen-')) return SPECS.d03;
      if (lbl.includes('社會')) return SPECS.d04;
      if (lbl.includes('自然')) return SPECS.d05;
      if (lbl.includes('綜合')) return SPECS.d06;
      if (lbl.includes('藝術')) return SPECS.d07;
      if (lbl.includes('健康') || lbl.includes('健體')) return SPECS.d08;
      if (lbl.includes('閩') || lbl.includes('台語')) return SPECS.d09;
      if (lbl.includes('客語')) return SPECS.d10;
      if (lbl.includes('原住民')) return SPECS.d11;
      if (lbl.includes('新住民')) return SPECS.d12;
      if (lbl.includes('資訊') || lbl.includes('資轉')) return SPECS.d13;
      if (lbl.includes('生活')) return SPECS.d15;

      // 動態一般校訂課程或特殊需求領域：套用 DEFAULT_SPEC 並動態代入領域標題
      return Object.assign({}, DEFAULT_SPEC, {
        domainId: id || 'default',
        subjectLine: lbl,
        table2Heading: `【${lbl}】課程計畫通過備查標準檢核請逐項勾選 ☑`,
        items: buildStandardItems(`如☑校訂課程：${lbl}`)
      });
    }

    return DEFAULT_SPEC;
  }

  const api = {
    getSpecForDomain: getSpecForDomain,
    SPECS: SPECS,
    DEFAULT_SPEC: DEFAULT_SPEC
  };

  if (typeof window !== 'undefined') {
    window.ReviewChecklistsVerbatim = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})();
