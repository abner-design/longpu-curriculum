/**
 * 龍埔國小課程計畫工作站｜Design System v2.0 (Editorial Calm & Craft)
 * 完整功能模組：
 * 1. 單一靜謐主入口（姓名記憶連動 ＋ 5 種身分專屬路由）
 * 2. 撰寫步驟精靈（範本下載 → 配色與紅線 → 12 項自檢 → 檔名產生與領域上傳）
 * 3. AI 檢核助理員（.docx 記憶體解析／後端雙引擎檢核）
 * 4. 法定議題與校本週次（115下校本架構表 6 層多人防覆蓋存檔 ＋ 法定議題填報 ＋ 115上實績對照與 Word 匯出）
 * 5. 歷年與廠商資料庫（0ms 預載目錄瞬開 ＋ 即時雲端掃描）
 * 6. 領域初審 ＆ 課發會審查檢核表（依領域對應表 4 表件 ＋ Word 匯出）
 * 7. 全校進度看板 ＆ 學年度永續設定（課研組長專屬）
 */

(function () {
  const MASCOT_SRC = 'assets/喜閱龍第二代-研究ing(手繪風).png';

  const ICONS = {
    doc: '<svg class="ico" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    docSm: '<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    scan: '<svg class="ico" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
    folder: '<svg class="ico" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    folderSm: '<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    calendar: '<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    clipboard: '<svg class="ico" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
    upload: '<svg class="ico ico-lg" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    download: '<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    ext: '<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    arrowRight: '<svg class="ico ico-sm" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    arrowLeft: '<svg class="ico ico-sm" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    check: '<svg class="ico ico-sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    checkLg: '<svg class="ico ico-lg" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    refresh: '<svg class="ico ico-sm" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    history: '<svg class="ico ico-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    lock: '<svg class="ico ico-sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    copy: '<svg class="ico ico-sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    plus: '<svg class="ico ico-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
  };

  const DRIVE = {
    root: 'https://drive.google.com/drive/folders/1Qd4d-J7zJPTllVovENH5iSWzkWy84OMR?usp=sharing',
    notes10: 'https://drive.google.com/drive/folders/1jKUS1p9CXZOuFNNB11HIRQ0i2a7r_kiK?usp=sharing',
    tplMinistry: 'https://drive.google.com/drive/folders/1P7EIiWZB7cZ19v27CvzkLNvl2aeMY4eX?usp=sharing',
    submitDomains: 'https://drive.google.com/drive/folders/1UMOgyi2ztn635eHFjgy0UFzKl4idvfwg?usp=sharing',
    publishersFolder: 'https://drive.google.com/drive/folders/1DAL9u6TeIzHApIjpD2vIadXd0KuK4HFQ?usp=sharing',
    histMinistry: 'https://drive.google.com/drive/folders/1KNwgfwOTnsihPpCCePbDZDhDxYB42Noe?usp=sharing',
    curriculum12: 'https://drive.google.com/drive/folders/1tCjXMhxSPOMI-Sq83XZyhnUayOqCfv33?usp=sharing',
    checklists: 'https://drive.google.com/drive/folders/1gTDdMfwCCqmx1ZYk9GHOnwxeQW3H68D2?usp=sharing',
    legalIssues: 'https://drive.google.com/drive/folders/1WGXdyzLmI2XsXjF-GNBkLwi05AiO4QQ2?usp=sharing',
    schoolFramework: 'https://drive.google.com/drive/folders/1n_GHt3vU288zc-2scV7RE4dSqC7-d2u1?usp=sharing',
    returned7: 'https://drive.google.com/drive/folders/1c3UGJ9IVpbRCVdbs9D7DCOfWFNHxfYeU?usp=sharing',
    fixed8: 'https://drive.google.com/drive/folders/1NB7IOXi_cjS60VfcpukJ9m8sLi8dDrIm?usp=sharing',
    tplSchool: 'https://drive.google.com/drive/folders/19qSC7JoTiOTNSltRAB_RnufPXfcRbQD7?usp=sharing',
    histSchool: 'https://drive.google.com/drive/folders/178ZE_ZUhz6faMirI6JfOK0z828XGj1DW?usp=sharing',
    guideSchool: 'https://drive.google.com/drive/folders/1f01JXrfVpJDjloJryumOE-j75FCrJMdB?usp=sharing',
    submitSchool: 'https://drive.google.com/drive/folders/1TmhjKBVtT6OoSgFdttcrRsz_bfNp1zyd?usp=sharing',
    schoolGrades: {
      '1': 'https://drive.google.com/drive/folders/1nCJhYbX1S3n22FV2W1KRO6Ki8mv5OvFL?usp=sharing',
      '2': 'https://drive.google.com/drive/folders/1hXg4EwKec5a_zXi2485S0YdnXz9viFzV?usp=sharing',
      '3': 'https://drive.google.com/drive/folders/1REEBAiZvcMvDIxP9xEa2LphkzI9Qm8ml?usp=sharing',
      '4': 'https://drive.google.com/drive/folders/1KzGEVu_Sz4exye2DWO9-iQiQVoeVPJn-?usp=sharing',
      '5': 'https://drive.google.com/drive/folders/1KAytkxOrQUaLrLrEiLfpCm59yppP3aOu?usp=sharing',
      '6': 'https://drive.google.com/drive/folders/10DPV4CgSptdwlf49jkqbJwCl6hUi0tTi?usp=sharing'
    },
    tplSped: 'https://drive.google.com/drive/folders/1jkoEVy9JYhZIiCOvHxIZ9t6S-7xuqf-T?usp=sharing',
    histSped: 'https://drive.google.com/drive/folders/1GnotZiFbRbJBi_pdsr_i9-cdZA6fGEos?usp=sharing',
    submitSped: 'https://drive.google.com/drive/folders/1uOKcm_dPrlEdeer8eryZ42UtIIcCTzjb?usp=sharing',
    publishers: [
      { name: '翰林版（官方雲端）', url: 'https://drive.google.com/drive/folders/1F4boRM23To8rZgXLtFwBS2AEw4S6gGXg' },
      { name: '康軒版（含鄉土語）', url: 'https://drive.google.com/drive/folders/1WUlmuLDc65AIs7E2YPHNev9heJ399XpT' },
      { name: '南一版（官方雲端）', url: 'https://drive.google.com/drive/folders/1kerjtwh-zZwZxYNX5uwXFqCuUhUvWl5O' }
    ],
    domains: [
      { id: 'd01', name: '01-國語文課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1fIiUBWQ3DGKapnymaofaYqo_xuCZ139U?usp=sharing' },
      { id: 'd02', name: '02-英語課程計畫(合併校訂)', type: '部定＋英轉', ext: true, url: 'https://drive.google.com/drive/folders/1Uy7VtZzGEecU-vVj8d1giQGdP8HRzXv2?usp=sharing' },
      { id: 'd03', name: '03-數學課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1Pd3TvSEM0Tr7btA4pyaCnuj9jv2qphTW?usp=sharing' },
      { id: 'd04', name: '04-社會課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1hU2fjkE9NGFth4r1d7r0B8IBWQao0zDt?usp=sharing' },
      { id: 'd05', name: '05-自然科學課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1bA_gQqKSRAQ_xNWQC9PUxBK9ttcsaCU6?usp=sharing' },
      { id: 'd06', name: '06-綜合活動課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1MILw7RISpbyNCaJM2OuyabedpaYMrtso?usp=sharing' },
      { id: 'd07', name: '07-藝術課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1sn1apszXdhYuniWAEGMy2yEno1dIpFNg?usp=sharing' },
      { id: 'd08', name: '08-健康與體育課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/17KQi_Wo6usmLKHa0VWXUvDgHlr0UXZt4?usp=sharing' },
      { id: 'd09', name: '09-台灣台語課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1FNlmjfdqSQ_7bg1m7GT2X4Z5hXHXQnrl?usp=sharing' },
      { id: 'd10', name: '10-客語課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1e1TxGSJTEYqN3QlL9O1N3zpfaHggBt6S?usp=sharing' },
      { id: 'd11', name: '11-原住民族語課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/103eH7DywFko72-zW3Oi63b_twetpqlSf?usp=sharing' },
      { id: 'd12', name: '12-新住民語課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1i-JAXqXb4qAm2cz2zVbypVEcEj_P75iw?usp=sharing' },
      { id: 'd13', name: '13-資訊教育課程計畫(合併校訂)', type: '校訂資轉', ext: true, url: 'https://drive.google.com/drive/folders/1rrOFp5EVF1L2HcF-M6oMrAl4tPI6hDxS?usp=sharing' },
      { id: 'd15', name: '15-生活課程計畫', type: '部定', url: 'https://drive.google.com/drive/folders/1_l7Qu36lVJQsJyv4YTx7nIZI8th0y-Su?usp=sharing' }
    ]
  };

  const ROLES = {
    teacher: {
      label: '課程撰寫教師',
      defaultView: 'wizard',
      defaultWeeklyMode: 'framework',
      allowedViews: ['wizard', 'ai-audit', 'weekly', 'library'],
      showChairTab: false
    },
    grade: {
      label: '學年主任',
      defaultView: 'weekly',
      defaultWeeklyMode: 'chair',
      allowedViews: ['weekly'],
      showChairTab: true
    },
    domain: {
      label: '領域初審教師',
      defaultView: 'review-checklist',
      defaultWeeklyMode: 'chair',
      allowedViews: ['review-checklist', 'ai-audit', 'library'],
      showChairTab: false
    },
    reviewer: {
      label: '課程計畫審查委員',
      defaultView: 'review-checklist',
      defaultWeeklyMode: 'chair',
      allowedViews: ['review-checklist', 'ai-audit'],
      showChairTab: false
    },
    admin: {
      label: '課研組長／行政',
      defaultView: 'kanban',
      defaultWeeklyMode: 'chair',
      allowedViews: ['kanban', 'admin-settings', 'review-checklist', 'weekly', 'ai-audit', 'library', 'wizard'],
      showChairTab: true
    }
  };

  const VIEWS_META = {
    wizard:             { title: '撰寫步驟精靈' },
    'ai-audit':         { title: 'AI 檢核助理員' },
    weekly:             { title: '法定議題與校本週次' },
    library:            { title: '歷年與廠商資料庫' },
    'review-checklist': { title: '領域初審 ＆ 課發會審查檢核表' },
    kanban:             { title: '全校進度看板' },
    'admin-settings':   { title: '學年度與課程設定' }
  };

  const REVIEW_DOMAINS = [
    { id: 'd01', code: '01', label: '國語文', grades: ['1', '2', '3', '4', '5', '6'], file: '01-國語文審查檢核表.docx', planUrl: DRIVE.domains[0].url },
    { id: 'd02', code: '02', label: '英語(含校訂)', grades: ['1', '2', '3', '4', '5', '6'], file: '02-英語審查檢核表(含校訂).docx', planUrl: DRIVE.domains[1].url },
    { id: 'd03', code: '03', label: '數學', grades: ['1', '2', '3', '4', '5', '6'], file: '03-數學審查檢核表.docx', planUrl: DRIVE.domains[2].url },
    { id: 'd04', code: '04', label: '社會', grades: ['3', '4', '5', '6'], file: '04-社會審查檢核表.docx', planUrl: DRIVE.domains[3].url },
    { id: 'd05', code: '05', label: '自然科學', grades: ['3', '4', '5', '6'], file: '05-自然科學審查檢核表.docx', planUrl: DRIVE.domains[4].url },
    { id: 'd06', code: '06', label: '綜合活動', grades: ['3', '4', '5', '6'], file: '06-綜合活動審查檢核表.docx', planUrl: DRIVE.domains[5].url },
    { id: 'd07', code: '07', label: '藝術', grades: ['3', '4', '5', '6'], file: '07-藝術審查檢核表.docx', planUrl: DRIVE.domains[6].url },
    { id: 'd08', code: '08', label: '健康與體育', grades: ['1', '2', '3', '4', '5', '6'], file: '08-健康與體育審查檢核表 .docx', planUrl: DRIVE.domains[7].url },
    { id: 'd09', code: '09', label: '台灣台語(閩語)', grades: ['1', '2', '3', '4', '5', '6'], file: '09-閩語審查檢核表.docx', planUrl: DRIVE.domains[8].url },
    { id: 'd10', code: '10', label: '客語', grades: ['1', '2', '3', '4', '5', '6'], file: '', planUrl: DRIVE.domains[9].url },
    { id: 'd11', code: '11', label: '原住民族語', grades: ['1', '2', '3', '4', '5', '6'], file: '', planUrl: DRIVE.domains[10].url },
    { id: 'd12', code: '12', label: '新住民語', grades: ['1', '2', '3', '4', '5', '6'], file: '', planUrl: DRIVE.domains[11].url },
    { id: 'd13', code: '13', label: '資訊教育(資轉)', grades: ['3', '4', '5', '6'], file: '', planUrl: DRIVE.domains[12].url },
    { id: 'd15', code: '15', label: '生活領域', grades: ['1', '2'], file: '13-生活領域審查檢核表.docx', planUrl: DRIVE.domains[13].url }
  ];

  const REVIEW_ITEMS_12 = [
    { id: 'r1',  no: 1,  text: '每週學習節數符合課綱規範' },
    { id: 'r2',  no: 2,  text: '標題、領域勾選、學習節數及表末混齡／校外人士表格完整' },
    { id: 'r3',  no: 3,  text: '總綱與領域核心素養符合國小階段並對應單元活動' },
    { id: 'r4',  no: 4,  text: '學習表現與學習內容依領綱填寫，階段與年級吻合' },
    { id: 'r5',  no: 5,  text: '教學期程、單元名稱、活動內容與節數清楚恰當' },
    { id: 'r6',  no: 6,  text: '註明教學資源／學習策略，無智慧財產權侵權之虞' },
    { id: 'r7',  no: 7,  text: '評量方式多元明確，與教學活動相呼應' },
    { id: 'r8',  no: 8,  text: '評量週與總複習週皆編列進度、活動與評量' },
    { id: 'r9',  no: 9,  text: '融入總綱 19 項議題並依領綱附錄二適時融入' },
    { id: 'r10', no: 10, text: '跨領域協同教學如需鐘點費已於備註勾選並註明節數' },
    { id: 'r11', no: 11, text: '融入校本課程部分於該學年計畫表中皆有呈現' },
    { id: 'r12', no: 12, text: '字體顏色標示符合規定（黑／紅／藍／深綠）' }
  ];

  const DEFAULT_SETTINGS = {
    academicYear: '115',
    semester: '下',
    weeksG15: 21,
    weeksG6: 19,
    openMinistry: true,
    openSpedTerm1: true,
    openSpedTerm2: false,
    gradeCourses: {
      '1': [
        { name: '走讀龍埔', category: 'general', term1: true, term2: false },
        { name: '低年級英閱繪（英轉）', category: 'ext', term1: true, term2: true }
      ],
      '2': [
        { name: '走讀龍埔', category: 'general', term1: true, term2: false },
        { name: '低年級英閱繪（英轉）', category: 'ext', term1: true, term2: true }
      ],
      '3': [
        { name: '人文閱讀', category: 'general', term1: true, term2: false },
        { name: '英閱繪', category: 'ext', term1: true, term2: true },
        { name: '開啟電腦新世界', category: 'ext', term1: true, term2: true }
      ],
      '4': [
        { name: '人文閱讀', category: 'general', term1: true, term2: false },
        { name: '英閱繪', category: 'ext', term1: true, term2: true },
        { name: 'Google新視野與AI大冒險', category: 'ext', term1: true, term2: true }
      ],
      '5': [
        { name: '數位閱讀與寫作', category: 'general', term1: true, term2: false },
        { name: '差異化數學', category: 'general', term1: true, term2: false },
        { name: '國際教育', category: 'general', term1: true, term2: false },
        { name: '英閱繪', category: 'ext', term1: true, term2: true },
        { name: '跨域設計龍總來', category: 'ext', term1: true, term2: true }
      ],
      '6': [
        { name: '數位閱讀與寫作', category: 'general', term1: true, term2: false },
        { name: '差異化數學', category: 'general', term1: true, term2: false },
        { name: '國際教育', category: 'general', term1: true, term2: false },
        { name: '英閱繪', category: 'ext', term1: true, term2: true },
        { name: '我的龍埔影音時代', category: 'ext', term1: true, term2: true }
      ]
    },
    updatedBy: '',
    updatedAt: ''
  };

  const CHECKLIST_12 = [
    { id: 'c1', critical: true,  text: '1. 每週學習節數符合課綱規範（1–5 年級 21 週、6 年級 19 週）。' },
    { id: 'c2', critical: true,  text: '2. 已使用 115 最新空白表件，標題、領域勾選與設計者名單（≤ 6 名）完整正確。' },
    { id: 'c3', critical: true,  text: '2-1. 表末兩處黃底表格（混齡教學、校外人士協助教學）已勾選且未刪除。' },
    { id: 'c4', critical: false, text: '3. 總綱與領域核心素養符合國小階段，並對應單元活動內容。' },
    { id: 'c5', critical: false, text: '4. 預期學習表現與學習內容編碼依領綱填寫，與年級階段吻合。' },
    { id: 'c6', critical: true,  text: '5. 教學期程以「週次」呈現；期末考／畢業考後週次有實質課程，無留白或僅寫結業式。' },
    { id: 'c7', critical: false, text: '6. 註明教學資源／學習策略，自編教材無智慧財產權侵權之虞。' },
    { id: 'c8', critical: false, text: '7. 評量方式多元明確，與教學活動呼應。' },
    { id: 'c9', critical: true,  text: '8. 期中評量週（第10週）、畢業考（第16週）／期末評量週（第19週）皆有進度與評量。' },
    { id: 'c10', critical: true, text: '9. 融入總綱 19 項議題，並已同步填寫「表 5 法律規定教育議題」週次與時數。' },
    { id: 'c11', critical: true, text: '11. 融入校本課程部分皆已呈現，並已同步填寫「表 6 校本課程架構」實施週次。' },
    { id: 'c12', critical: true, text: '12. 字體顏色標示完全符合規定，並備齊標準命名之 Word 與 PDF 雙檔。' }
  ];

  const STATUTORY_ISSUES = [
    { no: 1, short: '性別平等', name: '性別平等教育課程或活動', required: true, basis: 'semester', metric: 'hours', minTerm: 4, minYear: 8, rule: '每學期至少 4 小時（6 節，含兒少性剝削防治）' },
    { no: 2, short: '性侵害防治', name: '性侵害防治教育課程', required: true, basis: 'semester', metric: 'hours', minTerm: 2, minYear: 4, rule: '每學期至少 2 小時（3 節）' },
    { no: 3, short: '環境教育', name: '環境教育課程（含海洋教育）', required: true, basis: 'year', metric: 'hours', minYear: 4, rule: '每學年至少 4 小時（6 節，含海洋 1 小時）' },
    { no: 4, short: '家庭教育', name: '家庭教育課程及活動', required: true, basis: 'year', metric: 'hours', minYear: 4, rule: '每學年至少 4 小時（6 節）' },
    { no: 5, short: '家暴防治', name: '家庭暴力防治課程', required: true, basis: 'year', metric: 'hours', minYear: 4, rule: '每學年至少 4 小時（6 節）' },
    { no: 6, short: '全民國防', name: '全民國防教育', required: true, basis: 'year', metric: 'periods', minYear: 1, anyPositive: true, rule: '全民國防教育法第 7 條（每學年融入實施）' },
    { no: 7, short: '國際教育', name: '國際教育（4 堂課）', required: true, basis: 'year', metric: 'periods', minYear: 4, rule: '每學年 4 節課（原則每學期 2 節）', termPrinciple: '原則每學期 2 節' },
    { no: 8, short: '交通安全', name: '交通安全教育', required: true, basis: 'year', metric: 'hours', minYear: 4, rule: '每學年 4 小時／6 節（原則每學期 2 時）', termPrinciple: '原則每學期 2 時' },
    { no: 9, short: '其他安全', name: '其他安全教育議題（防災/水域/食安）', required: false, basis: 'optional', metric: 'hours', minYear: 0, rule: '依實際需要辦理融入' },
    { no: 10, short: '生命教育', name: '生命教育', required: false, basis: 'optional', metric: 'hours', minYear: 0, rule: '依實際需要辦理融入' },
    { no: 11, short: '戶外教育', name: '戶外教育', required: false, basis: 'optional', metric: 'hours', minYear: 0, rule: '依實際需要辦理融入（補助款考核項目）' }
  ];

  const LIBRARY_ITEMS = [
    {
      id: 'lib-pub-local', cat: 'publisher',
      title: '1-3 廠商提供課程計畫（115下 9 領域已更新）', tag: '115下最新・48檔',
      summary: '收錄 115 下學期最新廠商原始檔：國語文、數學、英語文、自然、社會、健體、藝術、閩南語、客語。',
      driveUrl: DRIVE.publishersFolder, apiCategory: 'publishers'
    },
    {
      id: 'lib-hist-ministry', cat: 'history',
      title: '本校歷年課程計畫（113–114 部定／英轉／資轉）', tag: '歷年供參',
      summary: '收錄 113 與 114 學年度各領域及英轉、資轉歷年定稿，供教材脈絡參考。',
      driveUrl: DRIVE.histMinistry, apiCategory: 'history_ministry'
    },
    {
      id: 'lib-pub-hanlin', cat: 'publisher',
      title: '翰林版 115 學年度廠商課程計畫（官方雲端）', tag: '外部雲端',
      summary: '開啟翰林出版提供之 115 學年度各科課程計畫雲端資料夾。',
      driveUrl: DRIVE.publishers[0].url
    },
    {
      id: 'lib-pub-knsh', cat: 'publisher',
      title: '康軒版（含鄉土語）115 學年度廠商計畫（官方雲端）', tag: '外部雲端',
      summary: '開啟康軒文教（含台灣台語）115 學年度課程計畫雲端資料夾。',
      driveUrl: DRIVE.publishers[1].url
    },
    {
      id: 'lib-pub-nani', cat: 'publisher',
      title: '南一版 115 學年度廠商課程計畫（官方雲端）', tag: '外部雲端',
      summary: '開啟南一書局 115 學年度各科課程計畫雲端資料夾。',
      driveUrl: DRIVE.publishers[2].url
    },
    {
      id: 'lib-notes-10', cat: 'guide',
      title: '1-0 撰寫課程計畫前注意事項與名單', tag: '必讀規範',
      summary: '收錄資轉、英轉注意事項、國際教育 4 堂課說明與哲學教育內涵參考。',
      driveUrl: DRIVE.notes10, apiCategory: 'guidelines_ministry'
    },
    {
      id: 'lib-tpl-11', cat: 'guide',
      title: '1-1 空白課程計畫格式（部定／英轉／資轉專用）', tag: '最新空白表',
      summary: '包含 115 部定表格、國小 3–6 年級英語校訂表格與低年級英轉／資轉適用表格。',
      driveUrl: DRIVE.tplMinistry, apiCategory: 'templates_ministry'
    },
    {
      id: 'lib-curriculum-12', cat: 'guide',
      title: '02-12 年國教課綱相關訊息與表 6 校本課程架構', tag: '課綱參考',
      summary: '提供十二年國教總綱、領綱參考資料，便於核對核心素養與學習表現編碼。',
      driveUrl: DRIVE.curriculum12
    },
    {
      id: 'lib-locked-school', cat: 'locked', locked: true,
      title: '一般校訂彈性學習歷年與空白（走讀龍埔、人文閱讀等）', tag: '115 下鎖定',
      summary: '本學期免撰寫一般校訂彈性學習課程，此資料庫入口暫予鎖定。'
    },
    {
      id: 'lib-locked-sped', cat: 'locked', locked: true,
      title: '特殊教育課程計畫歷年與空白（3-特教全區）', tag: '115 下鎖定',
      summary: '特殊教育課程計畫採整學年度規劃，下學期無須重複撰寫。'
    }
  ];

  const LS = {
    load(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    save(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
    }
  };

  const defaultKanbanStatus = () => {
    const map = {};
    DRIVE.domains.forEach((d, i) => {
      map[d.id] = i < 3 ? 'writing' : i < 6 ? 'review' : i === 6 ? 'submitted' : 'todo';
    });
    return map;
  };

  function cloneDefaultSettings() {
    return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
  }

  function mergeSettings(raw) {
    const base = cloneDefaultSettings();
    if (!raw || typeof raw !== 'object') return base;
    return {
      ...base,
      ...raw,
      gradeCourses: {
        ...base.gradeCourses,
        ...(raw.gradeCourses || {})
      }
    };
  }

  const initialTeacherName = LS.load('lp115_ws_teacher_name', '') || LS.load('lp115_ws_editor_name', '');

  const state = {
    teacherName: initialTeacherName,
    settings: mergeSettings(LS.load('lp115_ws_settings', null)),
    settingsDraft: null,
    role: LS.load('lp115_ws_role', 'teacher'),
    view: LS.load('lp115_ws_view', 'wizard'),
    wizardStep: 1,
    checklist: LS.load('lp115_ws_checklist', {}),
    naming: { type: 'ministry', grade: '5', publisher: '翰林版', subject: '國語文領域', extName: '英閱繪' },
    aiAudit: {
      courseType: 'ministry',
      gradeBand: '1-5',
      file: null,
      loading: false,
      report: null,
      error: ''
    },
    weekly: {
      mode: 'framework',
      fwGradeFilter: 'all',
      fwCells: LS.load('lp115_ws_fw_cells', {}),
      fwEditorName: initialTeacherName,
      fwConflict: null,
      fwShowHistory: false,
      fwHistory: [],
      fwLastSyncAt: '',
      grade: '5',
      domain: '國語文領域',
      teacherName: initialTeacherName,
      topicName: `${STATUTORY_ISSUES[0].no}. ${STATUTORY_ISSUES[0].name}【必辦】`,
      selectedWeeks: [4, 5],
      periods: 6,
      hours: 4,
      note: '',
      chairGradeFilter: '5',
      items: LS.load('lp115_ws_weekly_local', []),
      stat115_1: (window.Framework115_2 && window.Framework115_2.STATUTORY_115_1_SNAPSHOT) || {},
      stat115_1Source: '115上定稿實績',
      serverConnected: false
    },
    libFilter: 'all',
    libQuery: '',
    libSelectedId: 'lib-pub-local',
    libSubpath: '',
    libLiveFiles: { ...(window.LibraryCatalogSnapshot || {}) },
    libFetchedKeys: {},
    libFetchingKeys: {},
    review: {
      selectedDomainId: LS.load('lp115_ws_review_domain', 'd01'),
      records: LS.load('lp115_ws_review_records', {}),
      cloudFiles: (window.LibraryCatalogSnapshot && window.LibraryCatalogSnapshot['checklists::']?.files) || [],
      conflict: null,
      editingNamesStage: '',
      lastSyncAt: ''
    },
    kanbanStatus: LS.load('lp115_ws_kanban', defaultKanbanStatus()),
    kanbanFilter: 'all',
    liveDomainStats: {}
  };

  if (!VIEWS_META[state.view]) state.view = 'wizard';
  if (!ROLES[state.role]) state.role = 'teacher';

  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 3000);
  }

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function getTermContext(settingsObj = state.settings) {
    const cfg = settingsObj || DEFAULT_SETTINGS;
    const y = String(cfg.academicYear || '115').trim();
    const s = cfg.semester === '上' ? '上' : '下';
    const termKey = s === '上' ? 'term1' : 'term2';
    const weeksG15 = Number(cfg.weeksG15 || 21);
    const weeksG6 = Number(cfg.weeksG6 || (s === '上' ? 21 : 19));
    const activeGeneralByGrade = {};
    const activeExtByGrade = {};
    const activeAllSchoolByGrade = {};
    const uniqueExtSet = new Set();
    let totalGeneralActive = 0;
    let totalExtActive = 0;

    for (const g of ['1', '2', '3', '4', '5', '6']) {
      const list = (cfg.gradeCourses && cfg.gradeCourses[g]) || [];
      const gen = list.filter((c) => c.category === 'general' && c[termKey]).map((c) => c.name);
      const ext = list.filter((c) => c.category === 'ext' && c[termKey]).map((c) => c.name);
      activeGeneralByGrade[g] = gen;
      activeExtByGrade[g] = ext;
      activeAllSchoolByGrade[g] = [...gen, ...ext];
      ext.forEach((nm) => { if (nm) uniqueExtSet.add(nm); });
      totalGeneralActive += gen.length;
      totalExtActive += ext.length;
    }
    const uniqueActiveExtNames = Array.from(uniqueExtSet);

    const openMinistry = cfg.openMinistry !== false;
    const hasGeneralOpen = totalGeneralActive > 0;
    const hasExtOpen = totalExtActive > 0;
    const hasSpedOpen = s === '上' ? Boolean(cfg.openSpedTerm1) : Boolean(cfg.openSpedTerm2);

    const openParts = [];
    if (openMinistry) openParts.push('部定');
    if (hasExtOpen) openParts.push('英轉／資轉');
    if (hasGeneralOpen) openParts.push('一般校訂');
    if (hasSpedOpen) openParts.push('特教');

    const lockedParts = [];
    if (!hasGeneralOpen) lockedParts.push('一般校訂');
    if (!hasSpedOpen) lockedParts.push('特殊教育');

    return {
      y,
      s,
      termKey,
      termTag: `${y} ${s}`,
      termShort: `${y}${s}`,
      termFull: `${y} 學年度${s}學期`,
      weeksG15,
      weeksG6,
      openMinistry,
      hasGeneralOpen,
      hasExtOpen,
      hasSpedOpen,
      activeGeneralByGrade,
      activeExtByGrade,
      activeAllSchoolByGrade,
      uniqueActiveExtNames,
      scopeChipText: `開放：${openParts.join('・') || '尚未開放'}`,
      entryScopeText: `本學期開放：${openParts.join('、') || '尚未開放'}`,
      lockedNoteText: lockedParts.length
        ? `本學期鎖定：${lockedParts.join('、')}`
        : `${y} ${s}全類別開放`
    };
  }

  async function tryFetchPlatformSettings() {
    if (window.location.protocol === 'file:') return;
    try {
      const res = await fetch('/api/platform-settings');
      if (!res.ok) return;
      const d = await res.json();
      if (d.ok && d.settings) {
        state.settings = mergeSettings(d.settings);
        if (state.view !== 'admin-settings') state.settingsDraft = null;
        LS.save('lp115_ws_settings', state.settings);
        syncEntryPortalUI();
        renderWorkspace();
      }
    } catch {}
  }

  async function savePlatformSettings(nextSettings, opts = {}) {
    const silent = Boolean(opts.silent);
    const skipRender = Boolean(opts.skipRender);
    const payload = {
      ...nextSettings,
      updatedBy: (state.teacherName || '').trim() || '課研組長'
    };
    state.settings = mergeSettings({ ...payload, updatedAt: new Date().toISOString() });
    LS.save('lp115_ws_settings', state.settings);
    if (window.location.protocol !== 'file:') {
      try {
        const res = await fetch('/api/platform-settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const d = await res.json();
        if (res.ok && d.settings) {
          state.settings = mergeSettings(d.settings);
          LS.save('lp115_ws_settings', state.settings);
        }
      } catch {}
    }
    if (!skipRender) {
      state.settingsDraft = null;
    }
    syncEntryPortalUI();
    syncChrome();
    if (!silent) {
      toast(`已儲存並套用「${state.settings.academicYear} 學年度${state.settings.semester}學期」課程設定`);
    }
    if (!skipRender) {
      renderWorkspace();
    }
  }

  let _admSaveTimer = null;
  function queueAutoSaveSettings(draftObj, rerender = false) {
    // 立即同步至前端 state.settings，確保切換至其他頁面（如正式繳交上傳）100% 即時連動
    state.settings = mergeSettings(JSON.parse(JSON.stringify(draftObj)));
    LS.save('lp115_ws_settings', state.settings);
    syncEntryPortalUI();
    syncChrome();
    if (rerender) {
      renderWorkspace();
    }
    clearTimeout(_admSaveTimer);
    _admSaveTimer = setTimeout(() => {
      savePlatformSettings(draftObj, { silent: true, skipRender: true });
    }, 320);
  }

  function getReviewDomainList() {
    const tc = getTermContext();
    const list = [...REVIEW_DOMAINS];
    if (tc.hasGeneralOpen) {
      const seen = new Set();
      ['1', '2', '3', '4', '5', '6'].forEach((g) => {
        (tc.activeGeneralByGrade[g] || []).forEach((courseName) => {
          if (seen.has(courseName)) return;
          seen.add(courseName);
          const grades = ['1', '2', '3', '4', '5', '6'].filter((gg) => (tc.activeGeneralByGrade[gg] || []).includes(courseName));
          list.push({
            id: `gen-${courseName}`,
            code: '校訂',
            label: courseName,
            grades,
            file: '',
            planUrl: DRIVE.submitSchool,
            isSchool: true
          });
        });
      });
    }
    if (tc.hasSpedOpen) {
      list.push({
        id: 'sped-all',
        code: '特教',
        label: '特殊需求領域',
        grades: ['1', '2', '3', '4', '5', '6'],
        file: '',
        planUrl: DRIVE.submitSped,
        isSped: true
      });
    }
    return list;
  }

  function normalizeClientReviewRec(raw) {
    const r = raw && typeof raw === 'object' ? raw : {};
    const generic = new Set(['審查人員', '領域初審教師', '課程計畫審查委員', '課研組長／行政', '課研組長', '課程撰寫教師', '學年主任', '未具名教師']);
    const initList = [];
    const pushInit = (v) => {
      const s = String(v || '').trim();
      if (s && !generic.has(s) && !initList.includes(s)) initList.push(s);
    };
    if (Array.isArray(r.initialReviewers)) r.initialReviewers.forEach(pushInit);
    if (typeof r.initialReviewer === 'string' && r.initialReviewer.trim()) {
      r.initialReviewer.split(/[、,，/]+/).forEach(pushInit);
    }

    const finalList = [];
    const pushFinal = (v) => {
      const s = String(v || '').trim();
      if (s && !generic.has(s) && !finalList.includes(s)) finalList.push(s);
    };
    if (Array.isArray(r.finalReviewers)) r.finalReviewers.forEach(pushFinal);
    if (typeof r.finalReviewer === 'string' && r.finalReviewer.trim()) {
      r.finalReviewer.split(/[、,，/]+/).forEach(pushFinal);
    }

    return {
      initialChecks: r.initialChecks && typeof r.initialChecks === 'object' ? { ...r.initialChecks } : {},
      finalChecks: r.finalChecks && typeof r.finalChecks === 'object' ? { ...r.finalChecks } : {},
      initialCheckMeta: r.initialCheckMeta && typeof r.initialCheckMeta === 'object' ? { ...r.initialCheckMeta } : {},
      finalCheckMeta: r.finalCheckMeta && typeof r.finalCheckMeta === 'object' ? { ...r.finalCheckMeta } : {},
      grades: r.grades && typeof r.grades === 'object' ? { ...r.grades } : {},
      initialResult: String(r.initialResult || ''),
      finalResult: String(r.finalResult || ''),
      initialReviewers: initList,
      finalReviewers: finalList,
      initialReviewer: initList.join('、'),
      finalReviewer: finalList.join('、'),
      updatedBy: String(r.updatedBy || ''),
      updatedAt: String(r.updatedAt || '')
    };
  }

  function getDomainReviewSpec(domainObj) {
    if (window.ReviewChecklistsVerbatim && typeof window.ReviewChecklistsVerbatim.getSpecForDomain === 'function') {
      return window.ReviewChecklistsVerbatim.getSpecForDomain(domainObj.id, domainObj.label);
    }
    return {
      domainId: domainObj.id,
      subjectLine: domainObj.label,
      table1CommentPrompt: '',
      noteBetweenTables: '',
      table2Heading: `【${domainObj.label}】課程計畫通過備查標準檢核請逐項勾選 ☑`,
      categoryLabel: '十二年國教課綱',
      items: REVIEW_ITEMS_12.map((x) => ({ id: x.id, no: String(x.no), text: x.text, isSub: false })),
      excellentCriteria: []
    };
  }

  async function syncReviewFromServer(silent = true) {
    if (window.location.protocol === 'file:') return;
    try {
      const res = await fetch('/api/review-checklists');
      if (!res.ok) return;
      const d = await res.json();
      if (d.records) {
        const activeCommentGrade = document.activeElement?.dataset?.revGcomment || '';
        const activeNamesEdit = document.activeElement?.id === 'rev-names-input';
        const selectedDid = state.review.selectedDomainId;
        const mergedAll = {};

        Object.keys(d.records).forEach((did) => {
          const incoming = normalizeClientReviewRec(d.records[did]);
          if (did === selectedDid && activeCommentGrade) {
            incoming.grades[activeCommentGrade] = {
              ...(incoming.grades[activeCommentGrade] || { status: '', version: 0 }),
              comment: document.activeElement.value
            };
          }
          mergedAll[did] = incoming;
        });

        state.review.records = mergedAll;
        state.review.lastSyncAt = d.serverTime || new Date().toISOString();
        state.weekly.serverConnected = true;
        LS.save('lp115_ws_review_records', state.review.records);
        if (state.view === 'review-checklist' && !activeCommentGrade && !activeNamesEdit && !state.review.conflict && !state.review.editingNamesStage) {
          renderWorkspace();
        }
      }
      if (!silent) toast('已同步最新初審／複審填報紀錄');
    } catch {}
  }

  async function tryFetchReviewChecklists() {
    if (window.location.protocol === 'file:') return;
    try {
      const [recRes, filesRes] = await Promise.all([
        fetch('/api/review-checklists'),
        fetch('/api/files?category=checklists')
      ]);
      if (recRes.ok) {
        const d = await recRes.json();
        if (d.records) {
          const norm = {};
          Object.keys(d.records).forEach((k) => { norm[k] = normalizeClientReviewRec(d.records[k]); });
          state.review.records = norm;
          state.review.lastSyncAt = d.serverTime || new Date().toISOString();
          state.weekly.serverConnected = true;
          LS.save('lp115_ws_review_records', state.review.records);
        }
      }
      if (filesRes.ok) {
        const fd = await filesRes.json();
        state.review.cloudFiles = (fd.files || []).filter((f) => !f.name.startsWith('~$') && f.name.toLowerCase() !== 'desktop.ini');
      }
      if (state.view === 'review-checklist') renderWorkspace();
    } catch {}
  }

  async function patchReviewDomain(domainId, opPayload) {
    const who = (state.teacherName || '').trim();
    const cur = normalizeClientReviewRec(state.review.records[domainId]);
    const nowIso = new Date().toISOString();
    const payload = {
      domainId,
      ...opPayload,
      reviewerName: who,
      role: state.role
    };

    if (window.location.protocol !== 'file:') {
      try {
        const res = await fetch('/api/review-checklists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const d = await res.json();

        if (res.status === 409 && d.conflict) {
          if (d.records) {
            const norm = {};
            Object.keys(d.records).forEach((k) => { norm[k] = normalizeClientReviewRec(d.records[k]); });
            state.review.records = norm;
          }
          state.review.conflict = {
            domainId,
            grade: d.grade,
            myComment: opPayload.comment || '',
            latestGrade: d.latestGrade
          };
          toast('偵測到多人同時填寫同年級意見，已啟動防覆蓋保護');
          renderWorkspace();
          return { conflict: true };
        }

        if (res.ok && d.records) {
          const norm = {};
          Object.keys(d.records).forEach((k) => { norm[k] = normalizeClientReviewRec(d.records[k]); });
          state.review.records = norm;
          state.review.conflict = null;
          state.review.lastSyncAt = d.serverTime || nowIso;
          state.weekly.serverConnected = true;
          LS.save('lp115_ws_review_records', state.review.records);
          return { ok: true };
        }
      } catch {}
    }

    // 本機離線模式逐欄位安全合併（支援可修正、取消與清空模式）
    if (opPayload.op === 'resetDomain') {
      delete state.review.records[domainId];
      LS.save('lp115_ws_review_records', state.review.records);
      return { ok: true, offline: true };
    }
    const next = normalizeClientReviewRec(cur);
    const maybeAddWho = (stageHint) => {
      if (!who) return;
      if (stageHint === 'final' || state.role === 'reviewer') {
        if (!next.finalReviewers.includes(who)) next.finalReviewers.push(who);
      } else {
        if (!next.initialReviewers.includes(who)) next.initialReviewers.push(who);
      }
      next.initialReviewer = next.initialReviewers.join('、');
      next.finalReviewer = next.finalReviewers.join('、');
    };
    if (opPayload.op === 'removeReviewer') {
      const target = String(opPayload.targetName || '').trim();
      if (opPayload.stage === 'final') next.finalReviewers = next.finalReviewers.filter((n) => n !== target);
      else next.initialReviewers = next.initialReviewers.filter((n) => n !== target);
      next.initialReviewer = next.initialReviewers.join('、');
      next.finalReviewer = next.finalReviewers.join('、');
    } else if (opPayload.op === 'setReviewers') {
      const cleaned = String(opPayload.names || '')
        .split(/[、,，/\s]+/)
        .map((s) => s.trim())
        .filter(Boolean);
      const uniq = [...new Set(cleaned)];
      if (opPayload.stage === 'final') next.finalReviewers = uniq;
      else next.initialReviewers = uniq;
      next.initialReviewer = next.initialReviewers.join('、');
      next.finalReviewer = next.finalReviewers.join('、');
    } else if (opPayload.op === 'clearGrade') {
      const g = opPayload.grade;
      const cg = next.grades[g] || { version: 0 };
      next.grades[g] = { status: '', comment: '', version: (cg.version || 0) + 1, updatedBy: '', updatedAt: '' };
    } else if (opPayload.op === 'gradeStatus') {
      const g = opPayload.grade;
      const cg = next.grades[g] || { status: '', comment: '', version: 0 };
      const cleared = !opPayload.status && !cg.comment;
      next.grades[g] = { ...cg, status: opPayload.status, version: (cg.version || 0) + 1, updatedBy: cleared ? '' : (who || cg.updatedBy || ''), updatedAt: cleared ? '' : nowIso };
      if (opPayload.status) maybeAddWho(state.role === 'reviewer' ? 'final' : 'init');
    } else if (opPayload.op === 'gradeComment') {
      const g = opPayload.grade;
      const cg = next.grades[g] || { status: '', comment: '', version: 0 };
      const cleared = !opPayload.comment && !cg.status;
      next.grades[g] = { ...cg, comment: opPayload.comment, version: (cg.version || 0) + 1, updatedBy: cleared ? '' : (who || cg.updatedBy || ''), updatedAt: cleared ? '' : nowIso };
      if (opPayload.comment) maybeAddWho(state.role === 'reviewer' ? 'final' : 'init');
      state.review.conflict = null;
    } else if (opPayload.op === 'checkItem') {
      if (opPayload.stage === 'final') next.finalChecks[opPayload.itemId] = opPayload.checked;
      else next.initialChecks[opPayload.itemId] = opPayload.checked;
      if (opPayload.checked) maybeAddWho(opPayload.stage);
    } else if (opPayload.op === 'checkAll') {
      (opPayload.itemIds || []).forEach((id) => {
        if (opPayload.stage === 'final') next.finalChecks[id] = true;
        else next.initialChecks[id] = true;
      });
      maybeAddWho(opPayload.stage);
    } else if (opPayload.op === 'uncheckAll') {
      if (opPayload.stage === 'final') next.finalChecks = {};
      else next.initialChecks = {};
    } else if (opPayload.op === 'overallResult') {
      if (opPayload.stage === 'final') next.finalResult = opPayload.result;
      else next.initialResult = opPayload.result;
      if (opPayload.result) maybeAddWho(opPayload.stage);
    }
    next.updatedBy = who || next.updatedBy;
    next.updatedAt = nowIso;
    state.review.records[domainId] = next;
    LS.save('lp115_ws_review_records', state.review.records);
    return { ok: true, offline: true };
  }

  async function tryFetchLiveOverview() {
    if (window.location.protocol === 'file:') return;
    try {
      const res = await fetch('/api/overview');
      if (!res.ok) return;
      const data = await res.json();
      const map = {};
      (data.ministryDomains || []).forEach((d) => { map[d.name.slice(0, 2)] = d; });
      state.liveDomainStats = map;
      if (state.view === 'kanban') renderWorkspace();
    } catch {}
  }

  function formatShortTime(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const hh = String(d.getHours()).padStart(2, '0');
      const mi = String(d.getMinutes()).padStart(2, '0');
      return `${mm}/${dd} ${hh}:${mi}`;
    } catch { return ''; }
  }

  function getFwCellLabel(cellKey) {
    const [g, cKey] = String(cellKey || '').split('_');
    const comp = (window.Framework115_2?.COMPETENCIES || []).find((c) => c.key === cKey);
    return `${g || '?'}年級・${comp ? comp.ability : cKey}`;
  }

  async function syncFrameworkFromServer(silent = true) {
    if (window.location.protocol === 'file:') return;
    try {
      const res = await fetch('/api/school-framework');
      if (!res.ok) return;
      const fw = await res.json();
      const serverCells = fw.cells || {};
      state.weekly.serverConnected = true;
      state.weekly.fwLastSyncAt = fw.serverTime || new Date().toISOString();

      const activeKey = document.activeElement?.dataset?.fwCell || '';
      let changed = false;
      Object.keys(serverCells).forEach((k) => {
        if (k === activeKey) return;
        const prev = state.weekly.fwCells[k];
        const next = serverCells[k];
        if (!prev || prev.value !== next.value || prev.version !== next.version) {
          state.weekly.fwCells[k] = next;
          changed = true;
        }
      });
      if (changed) {
        LS.save('lp115_ws_fw_cells', state.weekly.fwCells);
        if (state.view === 'weekly' && state.weekly.mode === 'framework' && !activeKey) {
          renderWorkspace();
        }
      }
      if (!silent) toast('已同步全校最新填報內容');
    } catch {}
  }

  async function fetchFwHistory() {
    if (window.location.protocol === 'file:') return;
    try {
      const res = await fetch('/api/school-framework/history?limit=40');
      if (!res.ok) return;
      const d = await res.json();
      state.weekly.fwHistory = d.items || [];
      if (state.view === 'weekly' && state.weekly.mode === 'framework') renderWorkspace();
    } catch {}
  }

  async function saveFwCell(cellKey, val, opts = {}) {
    const wk = state.weekly;
    const fw = window.Framework115_2;
    const [gNum, cKey] = cellKey.split('_');
    const rowDef = fw.ROWS.find((r) => r.gradeNum === gNum);
    const defaultVal = rowDef?.cols?.[cKey]?.defaultTime ?? '';
    const existing = wk.fwCells[cellKey];
    const prevVal = existing?.value ?? defaultVal;
    const expectedVersion = typeof existing?.version === 'number' ? existing.version : 0;

    if (!opts.skipBlankConfirm && fw.isCellFilled(prevVal) && !val) {
      if (!window.confirm(`「${getFwCellLabel(cellKey)}」原本已有填報內容：\n「${prevVal}」\n\n確定要清空此格嗎？（點取消可保留原內容）`)) {
        renderWorkspace();
        return;
      }
    }

    const updatedBy = (wk.fwEditorName || '').trim() || ROLES[state.role]?.label || '編寫教師';

    if (window.location.protocol !== 'file:') {
      try {
        const res = await fetch('/api/school-framework', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cellKey,
            value: val,
            expectedVersion,
            updatedBy,
            force: Boolean(opts.force),
            merged: Boolean(opts.merged)
          })
        });
        const data = await res.json();

        if (res.status === 409 && data.conflict) {
          wk.fwConflict = {
            cellKey,
            cellLabel: getFwCellLabel(cellKey),
            myValue: val,
            latestCell: data.latestCell
          };
          toast('偵測到同時編輯衝突，已啟動保護並暫停覆寫');
          renderWorkspace();
          return;
        }

        if (res.ok && data.cells) {
          wk.fwCells = { ...wk.fwCells, ...data.cells };
          wk.fwConflict = null;
          wk.fwLastSyncAt = new Date().toISOString();
          wk.serverConnected = true;
          LS.save('lp115_ws_fw_cells', wk.fwCells);
          toast(opts.merged ? '已合併雙方內容並安全存檔' : '已自動存檔並建立版本備份');
          if (wk.fwShowHistory) fetchFwHistory();
          renderWorkspace();
          return;
        }
      } catch {}
    }

    wk.fwCells[cellKey] = {
      value: val,
      version: expectedVersion + 1,
      updatedBy,
      updatedAt: new Date().toISOString()
    };
    LS.save('lp115_ws_fw_cells', wk.fwCells);
    toast('已暫存於本機瀏覽器');
    renderWorkspace();
  }

  async function tryFetchWeeklyPlans() {
    if (window.location.protocol === 'file:') return;
    try {
      const [wpRes, fwRes, st115Res] = await Promise.all([
        fetch('/api/weekly-plan'),
        fetch('/api/school-framework'),
        fetch('/api/statutory-115-1')
      ]);
      if (wpRes.ok) {
        const d = await wpRes.json();
        state.weekly.items = d.items || [];
        state.weekly.serverConnected = true;
      }
      if (fwRes.ok) {
        const fw = await fwRes.json();
        state.weekly.fwCells = { ...state.weekly.fwCells, ...(fw.cells || {}) };
        state.weekly.fwLastSyncAt = fw.serverTime || new Date().toISOString();
        LS.save('lp115_ws_fw_cells', state.weekly.fwCells);
      }
      if (st115Res.ok) {
        const st115 = await st115Res.json();
        if (st115.ok && st115.grades && Object.keys(st115.grades).length > 0) {
          state.weekly.stat115_1 = st115.grades;
          state.weekly.stat115_1Source = st115.note || '115上定稿實績';
        }
      }
      if (state.view === 'weekly') renderWorkspace();
    } catch {}
  }

  async function tryFetchLiveLibraryFiles(apiCategory, subpath = '', force = false) {
    if (!apiCategory || window.location.protocol === 'file:') return;
    if (!force && !state.weekly.serverConnected && state.libLiveFiles[`${apiCategory}::${subpath}`]) return;
    const cacheKey = `${apiCategory}::${subpath}`;
    if (!force && (state.libFetchedKeys[cacheKey] || state.libFetchingKeys[cacheKey])) return;
    state.libFetchingKeys[cacheKey] = true;
    try {
      const qs = new URLSearchParams({ category: apiCategory });
      if (subpath) qs.set('subpath', subpath);
      if (force) qs.set('refresh', '1');
      const res = await fetch(`/api/files?${qs.toString()}`);
      if (!res.ok) return;
      state.libLiveFiles[cacheKey] = await res.json();
      state.libFetchedKeys[cacheKey] = true;
      state.weekly.serverConnected = true;
      if (force) toast('已重新掃描最新目錄');
      if (state.view === 'library') renderWorkspace();
    } catch {} finally {
      delete state.libFetchingKeys[cacheKey];
    }
  }

  // ==========================================================================
  // View 1: 撰寫步驟精靈
  // ==========================================================================
  function renderWizard() {
    const tc = getTermContext();
    const steps = [
      { n: 1, title: `下載 ${tc.y} 範本` },
      { n: 2, title: '撰寫與週次填報' },
      { n: 3, title: 'AI 檢核與自檢' },
      { n: 4, title: '正式繳交上傳' }
    ];

    const doneCount = CHECKLIST_12.filter((c) => state.checklist[c.id]).length;
    const step = state.wizardStep;
    let bodyHtml = '';

    if (step === 1) {
      const activeGenSummary = ['1', '2', '3', '4', '5', '6']
        .filter((g) => tc.activeGeneralByGrade[g].length > 0)
        .map((g) => `${g}年級：${tc.activeGeneralByGrade[g].join('、')}`)
        .join(' ｜ ');

      bodyHtml = `
        <div class="panel">
          <div class="panel-head">
            <h2 class="panel-title">步驟一｜下載最新空白表件與參考資料</h2>
            <span class="tag tag-neutral">${tc.termFull}</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
            <a class="link-card is-featured" href="${DRIVE.tplMinistry}" target="_blank" rel="noopener">
              <div class="link-card-left">
                <div class="link-card-ico">${ICONS.doc}</div>
                <div>
                  <div class="link-card-title">1-1 空白課程計畫格式（部定・英轉・資轉）</div>
                  <div class="link-card-sub">請一律使用 ${tc.y} 最新空白表格撰寫，保留表末黃底檢核欄</div>
                </div>
              </div>
              <span class="btn btn-secondary btn-sm">開啟下載 ${ICONS.ext}</span>
            </a>

            <div class="grid-2">
              <a class="link-card" href="${DRIVE.histMinistry}" target="_blank" rel="noopener">
                <div class="link-card-left">
                  <div class="link-card-ico">${ICONS.folder}</div>
                  <div>
                    <div class="link-card-title">1-4 歷年部定／英轉／資轉計畫</div>
                    <div class="link-card-sub">113–114 學年度定稿供參</div>
                  </div>
                </div>
                <span class="btn btn-secondary btn-sm">前往 ${ICONS.ext}</span>
              </a>

              <a class="link-card" href="${DRIVE.publishersFolder}" target="_blank" rel="noopener">
                <div class="link-card-left">
                  <div class="link-card-ico">${ICONS.folder}</div>
                  <div>
                    <div class="link-card-title">1-3 廠商提供課程計畫</div>
                    <div class="link-card-sub">9 大領域 48 份最新原始檔</div>
                  </div>
                </div>
                <span class="btn btn-secondary btn-sm">前往 ${ICONS.ext}</span>
              </a>
            </div>
          </div>

          <div class="grid-2">
            ${tc.hasGeneralOpen ? `
              <a class="link-card" href="${DRIVE.tplSchool}" target="_blank" rel="noopener">
                <div class="link-card-left">
                  <div class="link-card-ico">${ICONS.doc}</div>
                  <div>
                    <div class="link-card-title">01-一般校訂空白表件（${tc.termTag}開放）</div>
                    <div class="link-card-sub">${esc(activeGenSummary)}</div>
                  </div>
                </div>
                <span class="btn btn-secondary btn-sm">下載 ${ICONS.ext}</span>
              </a>
            ` : `
              <div class="locked-panel">
                ${ICONS.lock}
                <span><strong>一般校訂空白表件</strong>（${tc.termTag}免撰寫，已鎖定）</span>
              </div>
            `}
            ${tc.hasSpedOpen ? `
              <a class="link-card" href="${DRIVE.tplSped}" target="_blank" rel="noopener">
                <div class="link-card-left">
                  <div class="link-card-ico">${ICONS.doc}</div>
                  <div>
                    <div class="link-card-title">3-特殊教育空白檔案（${tc.termTag}開放）</div>
                    <div class="link-card-sub">特教班與資源班課程計畫表件</div>
                  </div>
                </div>
                <span class="btn btn-secondary btn-sm">下載 ${ICONS.ext}</span>
              </a>
            ` : `
              <div class="locked-panel">
                ${ICONS.lock}
                <span><strong>特殊教育空白檔案</strong>（${tc.termTag}免撰寫，已鎖定）</span>
              </div>
            `}
          </div>
        </div>
      `;
    } else if (step === 2) {
      bodyHtml = `
        <div class="grid-2" style="margin-bottom:16px;">
          <a class="link-card" href="${DRIVE.notes10}" target="_blank" rel="noopener">
            <div class="link-card-left">
              <div class="link-card-ico">${ICONS.doc}</div>
              <div>
                <div class="link-card-title">1-0 撰寫前注意事項</div>
                <div class="link-card-sub">含英轉、資轉與國際教育說明</div>
              </div>
            </div>
            <span class="btn btn-secondary btn-sm">開啟閱讀 ${ICONS.ext}</span>
          </a>

          <button type="button" class="link-card is-featured" data-goto-view="weekly">
            <div class="link-card-left">
              <div class="link-card-ico">${ICONS.calendar}</div>
              <div>
                <div class="link-card-title">法定議題與校本週次填報</div>
                <div class="link-card-sub">線上共作填寫表 5 與表 6 實施週次</div>
              </div>
            </div>
            <span class="btn btn-secondary btn-sm">前往填報 ${ICONS.arrowRight}</span>
          </button>
        </div>

        <div class="grid-2">
          <div class="panel">
            <div class="panel-head">
              <h2 class="panel-title">字體顏色標示規範</h2>
            </div>
            <div class="table-wrap">
              <table class="clean-table" style="min-width:360px;">
                <thead>
                  <tr>
                    <th>課程類型</th>
                    <th>廠商原稿</th>
                    <th>改編／自編</th>
                    <th>議題融入</th>
                    <th>校本特色</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>部定／3–6英轉</strong></td>
                    <td>黑色</td>
                    <td style="color:#9E2A2B; font-weight:700;">紅色</td>
                    <td style="color:#1D4E89; font-weight:700;">藍色</td>
                    <td style="color:#236647; font-weight:700;">深綠</td>
                  </tr>
                  <tr>
                    <td><strong>低年級英轉</strong></td>
                    <td style="color:var(--text-muted);">無</td>
                    <td style="font-weight:700;">黑色</td>
                    <td style="color:#1D4E89; font-weight:700;">藍色</td>
                    <td style="color:#236647; font-weight:700;">深綠</td>
                  </tr>
                  <tr>
                    <td><strong>3–6 資轉</strong></td>
                    <td style="color:var(--text-muted);">淺灰</td>
                    <td style="font-weight:700;">黑色</td>
                    <td style="color:#1D4E89; font-weight:700;">藍色</td>
                    <td style="color:#236647; font-weight:700;">深綠</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="panel">
            <div class="panel-head">
              <h2 class="panel-title">${tc.termTag} 必守檢核重點</h2>
            </div>
            <ul style="margin:0; padding-left:18px; font-size:var(--text-sm); color:var(--text-secondary); display:flex; flex-direction:column; gap:10px;">
              <li><strong style="color:var(--text-primary);">學期總週次：</strong>一至五年級 <strong>${tc.weeksG15} 週</strong>、六年級 <strong>${tc.weeksG6} 週</strong>。</li>
              <li><strong style="color:var(--text-primary);">考後週次完整：</strong>期末考／畢業考後週次須規劃實質教學活動，不可留白或僅填結業式。</li>
              <li><strong style="color:var(--text-primary);">表末檢核欄保留：</strong>混齡教學與校外人士協助教學兩處表格不得刪除，並請確實勾選。</li>
              <li><strong style="color:var(--text-primary);">設計者人數上限：</strong>每份課程計畫設計者名單以 <strong>6 名</strong>為上限。</li>
            </ul>
          </div>
        </div>
      `;
    } else if (step === 3) {
      bodyHtml = `
        <button type="button" class="link-card is-featured" style="margin-bottom:16px;" data-goto-view="ai-audit">
          <div class="link-card-left">
            <div class="link-card-ico">${ICONS.scan}</div>
            <div>
              <div class="link-card-title">開啟 AI 檢核助理員</div>
              <div class="link-card-sub">上傳 .docx 自動檢查週次、表末檢核欄與字體顏色標示</div>
            </div>
          </div>
          <span class="btn btn-secondary btn-sm">前往檢核 ${ICONS.arrowRight}</span>
        </button>

        <div class="panel">
          <div class="panel-head">
            <h2 class="panel-title">12 項備查標準自我檢核</h2>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="tag ${doneCount === CHECKLIST_12.length ? 'tag-ok' : 'tag-warn'}">已完成 ${doneCount} / ${CHECKLIST_12.length}</span>
              <button type="button" class="btn btn-secondary btn-sm" id="wiz-reset-check">${ICONS.refresh} 重設</button>
            </div>
          </div>
          <div class="check-list">
            ${CHECKLIST_12.map((c) => {
              const checked = !!state.checklist[c.id];
              return `
                <label class="check-row ${checked ? 'is-done' : 'is-todo'}">
                  <input type="checkbox" data-wiz-check="${c.id}" ${checked ? 'checked' : ''} />
                  <div>
                    ${c.critical ? '<span class="tag tag-danger" style="margin-right:6px;">必檢紅線</span>' : ''}
                    <span>${esc(c.text)}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else {
      const n = state.naming;
      if (n.type !== 'ministry') n.type = 'ext';
      const gradeActiveCourses = tc.activeAllSchoolByGrade[n.grade] || [];
      const hasValidSchoolCourse = gradeActiveCourses.length > 0;
      const extChoices = hasValidSchoolCourse
        ? gradeActiveCourses
        : [`（${n.grade}年級本學期未開放校訂課程）`];
      const chosenExt = extChoices.includes(n.extName) ? n.extName : extChoices[0];
      state.naming.extName = chosenExt;
      const previewName = n.type === 'ministry'
        ? `${n.publisher}-${n.grade}年級_${tc.s}學期_${n.subject}`
        : `${n.grade}年級_${tc.s}學期_彈性學習_[${chosenExt}]`;

      const openGeneralGrades = ['1', '2', '3', '4', '5', '6'].filter((g) => tc.activeGeneralByGrade[g].length > 0);

      bodyHtml = `
        <div class="panel" style="margin-bottom:20px;">
          <div class="panel-head">
            <h2 class="panel-title">${tc.termTag} 標準檔名產生器</h2>
            <span class="tag tag-neutral">請同時備妥 Word 與 PDF</span>
          </div>
          <div class="zone-select" style="margin-bottom:14px;">
            <div class="zone-header"><span>選擇課程條件</span></div>
            <div class="nm-grid">
              <div class="field" style="margin:0;">
                <label for="nm-type">課程性質</label>
                <select id="nm-type">
                  <option value="ministry" ${n.type === 'ministry' ? 'selected' : ''}>部定各領域課程</option>
                  <option value="ext" ${n.type !== 'ministry' ? 'selected' : ''}>校訂課程（英轉／資轉／彈性）</option>
                </select>
              </div>
              <div class="field" style="margin:0;">
                <label for="nm-grade">年級</label>
                <select id="nm-grade">
                  ${['1', '2', '3', '4', '5', '6'].map((g) => `<option value="${g}" ${n.grade === g ? 'selected' : ''}>${g} 年級</option>`).join('')}
                </select>
              </div>
              ${n.type === 'ministry' ? `
                <div class="field nm-span-full" style="margin:0;">
                  <label>版本與領域</label>
                  <div style="display:flex; gap:8px;">
                    <select id="nm-pub" aria-label="出版版本" style="width:44%;">
                      ${['翰林版', '康軒版', '南一版', '何嘉仁版', '真平版', '自編版'].map((p) => `<option value="${p}" ${n.publisher === p ? 'selected' : ''}>${p}</option>`).join('')}
                    </select>
                    <select id="nm-subj" aria-label="領域名稱" style="width:56%;">
                      ${['國語文領域', '英語文領域', '數學領域', '社會領域', '自然科學領域', '綜合活動領域', '藝術領域', '健體領域', '生活課程', '台灣台語', '客語'].map((s) => `<option value="${s}" ${n.subject === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                  </div>
                </div>
              ` : `
                <div class="field nm-span-full" style="margin:0;">
                  <label for="nm-ext">校訂課程名稱</label>
                  <select id="nm-ext">
                    ${extChoices.map((x) => `<option value="${esc(x)}" ${chosenExt === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}
                  </select>
                </div>
              `}
            </div>
          </div>

          <div class="callout" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span style="font-size:var(--text-xs); font-weight:600; color:var(--text-secondary);">標準檔名</span>
              <code>${esc(previewName)}</code>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-copy-name" data-copy-name="${esc(previewName)}" ${(!hasValidSchoolCourse && n.type !== 'ministry') ? 'disabled' : ''}>
              ${ICONS.copy} 複製檔名
            </button>
          </div>
        </div>

        <div class="panel" style="margin-bottom:20px;">
          <div class="panel-head">
            <h2 class="panel-title">1-2 領域初審上傳資料夾</h2>
            <a class="btn btn-secondary btn-sm" href="${DRIVE.fixed8}" target="_blank" rel="noopener">
              8-修正完課程計畫 ${ICONS.ext}
            </a>
          </div>
          <div class="domain-portal-grid">
            ${DRIVE.domains.map((d) => `
              <a class="domain-portal-btn ${d.ext ? 'is-ext' : ''}" href="${d.url}" target="_blank" rel="noopener">
                <span>${esc(d.name)}</span>
                <span style="color:var(--text-muted); display:inline-flex; align-items:center; gap:4px; font-size:12px;">上傳 ${ICONS.ext}</span>
              </a>
            `).join('')}
          </div>
        </div>

        ${tc.hasGeneralOpen ? `
          <div class="panel" style="margin-bottom:20px;">
            <div class="panel-head">
              <h2 class="panel-title">2-一般校訂課程各年級上傳區（${tc.termTag}開放）</h2>
              <a class="btn btn-secondary btn-sm" href="${DRIVE.submitSchool}" target="_blank" rel="noopener">校訂總夾 ${ICONS.ext}</a>
            </div>
            <div class="domain-portal-grid">
              ${openGeneralGrades.map((g) => `
                <a class="domain-portal-btn is-ext" href="${DRIVE.schoolGrades[g]}" target="_blank" rel="noopener">
                  <span>${g} 年級（${esc(tc.activeGeneralByGrade[g].join('、'))}）</span>
                  <span style="color:var(--text-muted); display:inline-flex; align-items:center; gap:4px; font-size:12px;">上傳 ${ICONS.ext}</span>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${tc.hasSpedOpen ? `
          <a class="link-card" style="margin-bottom:20px;" href="${DRIVE.submitSped}" target="_blank" rel="noopener">
            <div class="link-card-left">
              <div class="link-card-ico">${ICONS.folder}</div>
              <div class="link-card-title">3-特殊教育課程計畫上傳區（${tc.termTag}開放）</div>
            </div>
            <span class="btn btn-secondary btn-sm">前往上傳 ${ICONS.ext}</span>
          </a>
        ` : ''}

        ${(!tc.hasGeneralOpen || !tc.hasSpedOpen) ? `
          <div class="locked-panel">
            ${ICONS.lock}
            <span>${tc.termTag}已鎖定：${[!tc.hasGeneralOpen ? '一般校訂各年級上傳區' : '', !tc.hasSpedOpen ? '特殊教育上傳區' : ''].filter(Boolean).join('、')}</span>
          </div>
        ` : ''}
      `;
    }

    return `
      <div class="wizard-progress">
        ${steps.map((s) => {
          const cls = s.n === step ? 'active' : s.n < step ? 'done' : '';
          return `
            <button type="button" class="wiz-step ${cls}" data-wiz-step="${s.n}">
              <span class="wiz-num">${s.n < step ? '✓' : s.n}</span>
              <span class="wiz-label"><strong>${esc(s.title)}</strong></span>
            </button>
          `;
        }).join('')}
      </div>

      ${bodyHtml}

      <div class="wizard-footer">
        <button type="button" class="btn btn-secondary" id="wiz-prev" ${step === 1 ? 'disabled' : ''}>
          ${ICONS.arrowLeft} 上一步
        </button>
        <span style="font-size:var(--text-xs); color:var(--text-muted);">步驟 ${step} / 4</span>
        ${step < 4
          ? `<button type="button" class="btn btn-primary" id="wiz-next">下一步：${esc(steps[step].title)} ${ICONS.arrowRight}</button>`
          : `<button type="button" class="btn btn-primary" data-goto-view="weekly">前往法定議題與校本週次 ${ICONS.arrowRight}</button>`}
      </div>
    `;
  }

  // ==========================================================================
  // View 2: AI 檢核助理員
  // ==========================================================================
  function renderAiAudit() {
    const tc = getTermContext();
    const ai = state.aiAudit;
    const rep = ai.report;

    return `
      <div class="split-5-7">
        <section class="panel">
          <div class="panel-head">
            <h2 class="panel-title">檔案檢核設定</h2>
            <span class="tag tag-neutral">自動解析 .docx</span>
          </div>

          <div class="zone-select" style="margin-bottom:16px;">
            <div class="zone-header"><span>1. 選擇檢核條件</span></div>
            <div class="field">
              <label for="ai-course-type">課程類型</label>
              <select id="ai-course-type">
                <option value="ministry" ${ai.courseType === 'ministry' ? 'selected' : ''}>部定各領域課程</option>
                <option value="eng36" ${ai.courseType === 'eng36' ? 'selected' : ''}>3–6 年級英語轉化</option>
                <option value="eng12" ${ai.courseType === 'eng12' ? 'selected' : ''}>低年級英閱繪（英轉）</option>
                <option value="info36" ${ai.courseType === 'info36' ? 'selected' : ''}>3–6 年級資訊轉化</option>
                ${tc.hasGeneralOpen ? `<option value="school" ${ai.courseType === 'school' ? 'selected' : ''}>一般校訂課程</option>` : ''}
              </select>
            </div>

            <div class="field">
              <label for="ai-grade-band">適用年段</label>
              <select id="ai-grade-band">
                <option value="1-5" ${ai.gradeBand === '1-5' ? 'selected' : ''}>一至五年級（${tc.weeksG15} 週）</option>
                <option value="6" ${ai.gradeBand === '6' ? 'selected' : ''}>六年級（${tc.weeksG6} 週）</option>
              </select>
            </div>
          </div>

          <div class="field" style="margin-bottom:6px;">
            <label>
              <span>2. 上傳課程計畫 Word 檔</span>
              <span style="color:${ai.file ? 'var(--status-ok)' : 'var(--color-accent)'};">${ai.file ? '已選取檔案' : '待選擇檔案'}</span>
            </label>
          </div>
          <div class="ai-dropzone ${ai.file ? 'is-ready' : ''}" id="ai-dropzone">
            <input type="file" id="ai-file-input" accept=".docx,.doc,.pdf" hidden />
            <div style="color:${ai.file ? 'var(--status-ok)' : 'var(--color-accent)'}; margin-bottom:6px; display:flex; justify-content:center;">
              ${ai.file ? ICONS.checkLg : ICONS.upload}
            </div>
            ${ai.file ? `
              <div style="font-weight:700; font-size:14px; color:var(--status-ok); word-break:break-all;">${esc(ai.file.name)}</div>
              <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${(ai.file.size / 1024).toFixed(1)} KB（點擊可重新選取）</div>
            ` : `
              <div style="font-weight:600; font-size:14px; color:var(--text-primary);">點擊選取或拖曳 .docx 至此</div>
              <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">僅於記憶體解析，不修改雲端原檔</div>
            `}
          </div>

          ${ai.error ? `<div class="callout callout-err" style="margin-bottom:14px;">${esc(ai.error)}</div>` : ''}

          <button
            type="button"
            class="btn btn-primary btn-lg"
            style="width:100%;"
            id="btn-run-ai-audit"
            ${ai.loading ? 'disabled' : ''}
          >
            ${ai.loading ? '正在解析檢核中...' : '開始自我檢核'}
          </button>
        </section>

        <section class="panel">
          ${!rep ? `
            <div style="text-align:center; padding:56px 20px;">
              <img src="${MASCOT_SRC}" width="76" height="76" decoding="sync" alt="喜閱龍" style="width:76px; height:76px; object-fit:contain; opacity:0.92;" />
              <h2 class="panel-title" style="margin-top:12px;">等待上傳課程計畫檔案</h2>
              <p style="margin:6px auto 0; max-width:340px; font-size:var(--text-sm); color:var(--text-muted);">
                選取左側條件並放入 .docx 檔案後，系統將自動核對週次、表末檢核欄與黑／紅／藍／深綠字色配置。
              </p>
            </div>
          ` : `
            <div class="panel-head">
              <div>
                <div style="font-size:12px; color:var(--text-muted); word-break:break-all;">檔案：${esc(rep.filename)}｜評分 ${rep.summary.score}</div>
                <h2 class="panel-title" style="margin-top:2px;">${esc(rep.summary.verdict)}</h2>
              </div>
              <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                <span class="tag tag-danger">待修正 ${rep.summary.mustFixCount}</span>
                <span class="tag tag-warn">建議確認 ${rep.summary.warningCount}</span>
                <span class="tag tag-ok">已通過 ${rep.summary.passedCount}</span>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap; margin-bottom:14px;">
              <button type="button" class="btn btn-secondary btn-sm" id="btn-copy-audit">${ICONS.copy} 複製檢核摘要</button>
              ${ROLES[state.role]?.allowedViews?.includes('wizard') ? `
                <button type="button" class="btn btn-secondary btn-sm" data-goto-wizard-step="4">前往正式繳交 ${ICONS.arrowRight}</button>
              ` : ''}
            </div>

            ${rep.metrics ? `
              <div class="metrics-strip">
                <div class="metric-item"><span>偵測週次</span><strong>${rep.metrics.weeksDetected} / ${rep.metrics.expectedWeeks} 週</strong></div>
                <div class="metric-item"><span>改編標示（紅）</span><strong style="color:#9E2A2B;">${rep.metrics.colorCounts.red} 字</strong></div>
                <div class="metric-item"><span>議題融入（藍）</span><strong style="color:#1D4E89;">${rep.metrics.colorCounts.blue} 字</strong></div>
                <div class="metric-item"><span>校本特色（深綠）</span><strong style="color:#236647;">${rep.metrics.colorCounts.green} 字</strong></div>
              </div>
            ` : ''}

            <h3 style="margin:0 0 8px; font-size:var(--text-sm); color:var(--status-danger);">待修正項目（${rep.mustFix.length}）</h3>
            ${rep.mustFix.length === 0
              ? `<div class="callout callout-ok" style="margin-bottom:16px;">未偵測到必改紅線問題。</div>`
              : `<div class="finding-list" style="margin-bottom:16px;">
                  ${rep.mustFix.map((m, i) => `
                    <div class="finding-row">
                      <div class="finding-title">
                        <span>${i + 1}. ${esc(m.rule)}</span>
                        <span class="tag tag-danger">必改紅線</span>
                      </div>
                      <div class="finding-desc">${esc(m.detail)}</div>
                      ${m.suggestion ? `<div class="finding-suggest">修正建議：${esc(m.suggestion)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>`}

            ${rep.warnings.length > 0 ? `
              <h3 style="margin:0 0 8px; font-size:var(--text-sm); color:var(--status-warn);">建議確認項目（${rep.warnings.length}）</h3>
              <div class="finding-list" style="margin-bottom:16px;">
                ${rep.warnings.map((w, i) => `
                  <div class="finding-row is-warn">
                    <div class="finding-title">
                      <span>${i + 1}. ${esc(w.rule)}</span>
                      <span class="tag tag-warn">建議確認</span>
                    </div>
                    <div class="finding-desc">${esc(w.detail)}</div>
                    ${w.suggestion ? `<div class="finding-suggest">確認重點：${esc(w.suggestion)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <h3 style="margin:0 0 8px; font-size:var(--text-sm); color:var(--status-ok);">已通過項目（${rep.passed.length}）</h3>
            <div class="grid-2" style="gap:8px;">
              ${rep.passed.map((p) => `
                <div class="finding-row is-pass" style="padding:10px 12px;">
                  <div class="finding-title" style="margin-bottom:2px;">
                    <span>${esc(p.rule)}</span>
                  </div>
                  <div class="finding-desc" style="font-size:12.5px;">${esc(p.detail)}</div>
                </div>
              `).join('')}
            </div>
          `}
        </section>
      </div>
    `;
  }

  // ==========================================================================
  // View 3: 法定議題與校本週次
  // ==========================================================================
  function round2(n) {
    return Math.round((Number(n) || 0) * 100) / 100;
  }

  function evaluateStatutoryForGrade(grade) {
    const wk = state.weekly;
    const g = String(grade);
    const gradeItems = wk.items.filter((x) => String(x.grade) === g && x.entryType === 'statutory');
    const prevGrade = (wk.stat115_1 && wk.stat115_1[g]) || {};

    return STATUTORY_ISSUES.map((iss) => {
      const matched = gradeItems.filter((it) => it.topicName && it.topicName.includes(iss.name));
      const t2NewHours = round2(matched.reduce((s, x) => s + Number(x.hours || 0), 0));
      const t2NewPeriods = round2(matched.reduce((s, x) => s + Number(x.periods || 0), 0));
      const allWeeks = [...new Set(matched.flatMap((x) => x.weeks || []))].sort((a, b) => a - b);
      const domains = [...new Set(matched.map((x) => x.domain))];

      const prev = prevGrade[String(iss.no)] || {
        moePeriods: 0, moeHours: 0, flex1Hours: 0, flex2Hours: 0, flex2Periods: 0,
        term1Hours: 0, term1Periods: 0, entries: []
      };

      const t2TotalHours = round2(t2NewHours + (prev.flex2Hours || 0));
      const t2TotalPeriods = round2(t2NewPeriods + (prev.flex2Periods || 0));
      const yearHours = round2((prev.term1Hours || 0) + t2TotalHours);
      const yearPeriods = round2((prev.term1Periods || 0) + t2TotalPeriods);

      let met = false;
      let metIn115_1 = false;
      let tagClass = 'tag-neutral';
      let badgeText = '選辦項目';
      let subHint = '';

      if (iss.basis === 'optional') {
        met = true;
      } else if (iss.basis === 'semester') {
        met = t2TotalHours >= iss.minTerm;
        if (met) {
          tagClass = 'tag-ok';
          badgeText = t2NewHours === 0 && prev.flex2Hours >= iss.minTerm ? '115下已達標（校訂已足）' : '115下已達標';
        } else {
          const gap = round2(iss.minTerm - t2TotalHours);
          const gapP = Math.ceil(gap * 1.5);
          tagClass = 'tag-warn';
          badgeText = `本學期尚缺 ${gap} 時`;
          subHint = `每學期必辦（約 ${gapP} 節）`;
        }
      } else {
        const t1Metric = iss.metric === 'periods' ? (prev.term1Periods || 0) : (prev.term1Hours || 0);
        const yearMetric = iss.metric === 'periods' ? yearPeriods : yearHours;
        metIn115_1 = iss.anyPositive ? (t1Metric > 0 || (prev.term1Hours || 0) > 0) : t1Metric >= iss.minYear;
        met = metIn115_1 || (iss.anyPositive ? (yearMetric > 0 || yearHours > 0) : yearMetric >= iss.minYear);

        if (metIn115_1) {
          tagClass = 'tag-ok';
          badgeText = '115上已達全學年標準';
          if (iss.termPrinciple) subHint = iss.termPrinciple;
        } else if (met) {
          tagClass = 'tag-ok';
          badgeText = '全學年合計達標';
          if (t2NewHours === 0 && (prev.flex2Hours > 0 || prev.flex2Periods > 0)) {
            subHint = '含115下校訂預排';
          }
        } else {
          tagClass = 'tag-warn';
          if (iss.anyPositive) {
            badgeText = '115下尚待規劃融入';
          } else if (iss.metric === 'periods') {
            const gap = round2(iss.minYear - yearPeriods);
            badgeText = `全學年尚缺 ${gap} 節`;
          } else {
            const gap = round2(iss.minYear - yearHours);
            const gapP = Math.ceil(gap * 1.5);
            badgeText = `全學年尚缺 ${gap} 時`;
            subHint = `約需補 ${gapP} 節`;
          }
        }
      }

      return {
        ...iss,
        prev,
        t2NewHours,
        t2NewPeriods,
        t2TotalHours,
        t2TotalPeriods,
        yearHours,
        yearPeriods,
        allWeeks,
        domains,
        met,
        metIn115_1,
        tagClass,
        badgeText,
        subHint
      };
    });
  }

  function renderWeeklyPanel() {
    const tc = getTermContext();
    const wk = state.weekly;
    const fw = window.Framework115_2;
    const roleCfg = ROLES[state.role] || ROLES.teacher;
    const showChairTab = Boolean(roleCfg.showChairTab);
    let mode = wk.mode || 'framework';
    if (!showChairTab && mode === 'chair') {
      mode = 'framework';
      wk.mode = 'framework';
    }

    let fwTotal = 0;
    let fwFilled = 0;
    fw.ROWS.forEach((r) => {
      fw.COMPETENCIES.forEach((c) => {
        const cellDef = r.cols[c.key];
        if (cellDef.readonly) return;
        fwTotal++;
        const key = `${r.gradeNum}_${c.key}`;
        const val = wk.fwCells[key]?.value ?? cellDef.defaultTime;
        if (fw.isCellFilled(val)) fwFilled++;
      });
    });

    const filteredFwRows = wk.fwGradeFilter === 'all'
      ? fw.ROWS
      : fw.ROWS.filter((r) => r.gradeNum === wk.fwGradeFilter);

    const maxWeeks = wk.grade === '6' ? tc.weeksG6 : tc.weeksG15;

    const fillGradeSummary = evaluateStatutoryForGrade(wk.grade);
    const topicOptions = fillGradeSummary.map((s) => {
      const value = `${s.no}. ${s.name}${s.required ? '【必辦】' : '【選辦】'}`;
      let labelTag = s.required ? (s.basis === 'semester' ? '（每學期必辦）' : '（全學年計）') : '（選辦）';
      if (s.metIn115_1) labelTag = '（115上已達全學年標準）';
      else if (s.required && s.met) labelTag = '（已達標）';
      return { value, label: `${s.no}. ${s.name} ${labelTag}` };
    });

    const gradeItems = wk.items.filter((x) => String(x.grade) === String(wk.chairGradeFilter) && x.entryType === 'statutory');
    const statutorySummary = evaluateStatutoryForGrade(wk.chairGradeFilter);
    const chairMetCount = statutorySummary.filter((s) => s.required && s.met).length;
    const chairMetFrom115_1 = statutorySummary.filter((s) => s.metIn115_1).length;

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
        <div class="seg-group-scroll">
          <div class="seg-group">
            <button type="button" class="seg-btn ${mode === 'framework' ? 'active' : ''}" data-wk-mode="framework">
              115下校本架構表（${fwFilled}/${fwTotal}）
            </button>
            <button type="button" class="seg-btn ${mode === 'statutory' ? 'active' : ''}" data-wk-mode="statutory">
              法定議題週次填報
            </button>
            ${showChairTab ? `
              <button type="button" class="seg-btn ${mode === 'chair' ? 'active' : ''}" data-wk-mode="chair">
                學年主任檢核 ＆ 匯出
              </button>
            ` : ''}
          </div>
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          ${mode === 'framework' ? `
            <button type="button" class="btn btn-primary btn-sm" id="btn-export-fw">
              ${ICONS.download} 匯出 115下校本架構表 (.doc)
            </button>
          ` : mode === 'chair' ? `
            <button type="button" class="btn btn-primary btn-sm" id="btn-export-stat-all">
              ${ICONS.download} 匯出全校表 5 (.doc)
            </button>
          ` : `
            <button type="button" class="btn btn-secondary btn-sm" id="btn-export-stat-all">
              ${ICONS.download} 匯出全校表 5 (.doc)
            </button>
          `}
        </div>
      </div>

      ${mode === 'framework' ? `
        <section class="panel">
          <!-- 多人防覆蓋存檔安全狀態列 -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:10px 14px; margin-bottom:16px; border-radius:var(--radius-md); background:var(--bg-subtle); border:1px solid var(--border-default);">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:var(--text-xs);">
              <span class="tag ${wk.serverConnected ? 'tag-ok' : 'tag-neutral'}">${wk.serverConnected ? '多人防覆蓋同步中' : '本機離線暫存'}</span>
              <span class="tag tag-warn">暖米底：待填寫</span>
              <span class="tag tag-ok">白底綠線：已存檔</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <input
                id="fw-editor-name"
                class="input-ctrl ${state.teacherName.trim() ? 'is-filled-ok' : 'is-empty-warn'}"
                type="text"
                value="${esc(state.teacherName)}"
                placeholder="填寫人姓名"
                style="width:136px; height:32px; font-size:12.5px;"
              />
              <button type="button" class="btn btn-secondary btn-sm" id="btn-fw-sync">${ICONS.refresh} 同步最新</button>
              <button type="button" class="btn btn-secondary btn-sm" id="btn-fw-history">${ICONS.history} ${wk.fwShowHistory ? '收合歷史' : '歷史與還原'}</button>
            </div>
          </div>

          ${wk.fwConflict ? `
            <div class="callout callout-err" style="margin-bottom:16px; border-left:4px solid var(--status-danger);">
              <div style="font-weight:700; margin-bottom:8px;">衝突攔截保護：【${esc(wk.fwConflict.cellLabel)}】剛由其他教師更新，系統已暫停覆寫</div>
              <div class="grid-2" style="margin-bottom:12px;">
                <div style="background:#FFFFFF; border:1px solid var(--border-default); border-radius:var(--radius-sm); padding:10px 12px; color:var(--text-primary);">
                  <div style="font-size:11.5px; font-weight:700; color:var(--status-ok); margin-bottom:4px;">伺服器已存版本（${esc(wk.fwConflict.latestCell.updatedBy || '教師')}・${formatShortTime(wk.fwConflict.latestCell.updatedAt)}）</div>
                  <div style="white-space:pre-wrap; font-size:13px;">${esc(wk.fwConflict.latestCell.value || '（空白）')}</div>
                </div>
                <div style="background:#FFFFFF; border:1px solid var(--border-default); border-radius:var(--radius-sm); padding:10px 12px; color:var(--text-primary);">
                  <div style="font-size:11.5px; font-weight:700; color:var(--color-primary); margin-bottom:4px;">您剛輸入的內容</div>
                  <div style="white-space:pre-wrap; font-size:13px;">${esc(wk.fwConflict.myValue || '（空白）')}</div>
                </div>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" class="btn btn-primary btn-sm" id="btn-fw-conflict-merge">合併保留雙方內容</button>
                <button type="button" class="btn btn-secondary btn-sm" id="btn-fw-conflict-keep-theirs">採用伺服器版本</button>
                <button type="button" class="btn btn-danger-outline btn-sm" id="btn-fw-conflict-force">強制覆寫</button>
              </div>
            </div>
          ` : ''}

          ${wk.fwShowHistory ? `
            <div style="border:1px solid var(--border-default); border-radius:var(--radius-md); padding:14px; margin-bottom:16px; background:var(--bg-canvas);">
              <div style="font-weight:700; font-size:var(--text-sm); margin-bottom:8px;">異動歷史紀錄（最近 ${wk.fwHistory.length} 筆）</div>
              ${wk.fwHistory.length === 0 ? `
                <div style="font-size:var(--text-xs); color:var(--text-muted); padding:6px 0;">目前尚無異動紀錄。</div>
              ` : `
                <div style="max-height:220px; overflow-y:auto; display:flex; flex-direction:column; gap:6px;">
                  ${wk.fwHistory.map((h, idx) => `
                    <div style="background:#FFFFFF; border:1px solid var(--border-default); border-radius:var(--radius-sm); padding:8px 12px; display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; font-size:12px;">
                      <div>
                        <span class="tag ${h.action === 'restore' ? 'tag-warn' : h.action === 'merge' ? 'tag-ok' : 'tag-primary'}">${h.action === 'restore' ? '還原' : h.action === 'merge' ? '合併' : '編輯'}</span>
                        <strong style="margin-left:4px;">${esc(getFwCellLabel(h.cellKey))}</strong>
                        <span style="color:var(--text-muted);">｜${esc(h.updatedBy || '教師')}｜${formatShortTime(h.timestamp)}</span>
                        <div style="margin-top:3px; color:var(--text-secondary);">
                          <span style="text-decoration:line-through; color:var(--text-muted);">${esc(h.oldValue || '（空）')}</span>
                          <span style="margin:0 4px;">→</span>
                          <strong style="color:var(--text-primary);">${esc(h.newValue || '（空）')}</strong>
                        </div>
                      </div>
                      <div style="display:flex; gap:6px;">
                        ${h.oldValue ? `<button type="button" class="btn btn-secondary btn-sm" data-fw-restore-idx="${idx}" data-fw-restore-mode="old">還原前版</button>` : ''}
                        <button type="button" class="btn btn-secondary btn-sm" data-fw-restore-idx="${idx}" data-fw-restore-mode="new">套用此版</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          ` : ''}

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
            <div class="chip-row">
              <button type="button" class="chip-select ${wk.fwGradeFilter === 'all' ? 'active' : ''}" data-fw-grade="all">全校總覽</button>
              ${['1', '2', '3', '4', '5', '6'].map((g) => `
                <button type="button" class="chip-select ${wk.fwGradeFilter === g ? 'active' : ''}" data-fw-grade="${g}">${g} 年級</button>
              `).join('')}
            </div>
            <a class="btn btn-secondary btn-sm" href="${DRIVE.schoolFramework}" target="_blank" rel="noopener">雲端原檔 ${ICONS.ext}</a>
          </div>

          <div class="fw-wrap">
            <table class="fw-table">
              <thead>
                <tr>
                  <th rowspan="3" style="width:52px;">年級</th>
                  <th colspan="4">全球素養｜大眼看世界（龍埔 Link）</th>
                  <th colspan="4">低碳環境｜龍埔好環境</th>
                  <th colspan="4">多元展能｜小龍與小埔</th>
                </tr>
                <tr>
                  <th colspan="2" class="fw-sub">英語力</th>
                  <th colspan="2" class="fw-sub">閱讀寫作力</th>
                  <th colspan="2" class="fw-sub">探索力</th>
                  <th colspan="2" class="fw-sub">實踐力</th>
                  <th colspan="2" class="fw-sub">美感素養</th>
                  <th colspan="2" class="fw-sub">健康樂活</th>
                </tr>
                <tr>
                  <th class="fw-sub">主題課程</th><th class="fw-sub" style="width:90px;">實施週次</th>
                  <th class="fw-sub">主題課程</th><th class="fw-sub" style="width:90px;">實施週次</th>
                  <th class="fw-sub">主題課程</th><th class="fw-sub" style="width:90px;">實施週次</th>
                  <th class="fw-sub">主題課程</th><th class="fw-sub" style="width:90px;">實施週次</th>
                  <th class="fw-sub">主題課程</th><th class="fw-sub" style="width:90px;">實施週次</th>
                  <th class="fw-sub">主題課程</th><th class="fw-sub" style="width:90px;">實施週次</th>
                </tr>
              </thead>
              <tbody>
                ${filteredFwRows.map((r) => `
                  <tr>
                    <td class="fw-grade-cell">${r.grade}</td>
                    ${fw.COMPETENCIES.map((c) => {
                      const key = `${r.gradeNum}_${c.key}`;
                      const cellDef = r.cols[c.key];
                      const saved = wk.fwCells[key];
                      const val = saved?.value ?? cellDef.defaultTime;
                      const filled = fw.isCellFilled(val);
                      const stamp = saved?.updatedAt ? `${saved.updatedBy || '已存'}・${formatShortTime(saved.updatedAt)}` : '';
                      return `
                        <td class="fw-topic">${esc(cellDef.topic)}</td>
                        <td>
                          ${cellDef.readonly
                            ? `<div style="text-align:center; color:var(--text-muted);">—</div>`
                            : `<textarea class="fw-input ${filled ? 'is-filled' : 'is-pending'}" data-fw-cell="${key}" placeholder="例：第4-5週">${esc(val)}</textarea>${stamp ? `<div style="font-size:10.5px; color:var(--text-muted); margin-top:3px; line-height:1.25;">${esc(stamp)}</div>` : ''}`}
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `).join('')}
                ${wk.fwGradeFilter === 'all' ? `
                  <tr style="background:var(--bg-canvas);">
                    <td class="fw-grade-cell" style="font-size:12px;">學校<br />行事</td>
                    ${fw.COMPETENCIES.map((c) => {
                      const ev = fw.SCHOOL_EVENTS_ROW[c.key];
                      return `<td class="fw-topic">${esc(ev.topic)}</td><td style="text-align:center; font-size:12px; color:var(--text-muted);">${esc(ev.time)}</td>`;
                    }).join('')}
                  </tr>
                ` : ''}
              </tbody>
            </table>
          </div>
        </section>
      ` : mode === 'statutory' ? `
        <section class="panel" style="padding:16px 20px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
            <strong style="font-size:var(--text-sm); color:var(--text-primary);">${wk.grade} 年級必辦法定議題達標快覽（點選可直接帶入下方表單）</strong>
            <span style="font-size:var(--text-xs); color:var(--text-muted);">暖米色代表本學期或全學年尚待補足</span>
          </div>
          <div class="chip-row">
            ${fillGradeSummary.filter((s) => s.required).map((s) => {
              const optVal = `${s.no}. ${s.name}【必辦】`;
              const isSelected = wk.topicName === optVal;
              return `
                <button
                  type="button"
                  class="chip-select ${s.met ? '' : 'is-attention'} ${isSelected ? 'active' : ''}"
                  data-quick-topic="${esc(optVal)}"
                  title="${esc(s.rule)}"
                >
                  <span>0${s.no} ${esc(s.short)}：${s.metIn115_1 ? '115上已達標' : s.met ? '已達標' : esc(s.badgeText)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>

        <div class="split-5-7">
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">新增法定議題融入週次</h2>
            </div>

            <div class="zone-select" style="margin-bottom:14px;">
              <div class="zone-header"><span>1. 年級、領域與議題</span></div>
              <div class="grid-2" style="margin-bottom:12px;">
                <div class="field" style="margin:0;">
                  <label for="wk-grade">實施年級</label>
                  <select id="wk-grade">
                    ${['1', '2', '3', '4', '5', '6'].map((g) => `<option value="${g}" ${wk.grade === g ? 'selected' : ''}>${g} 年級</option>`).join('')}
                  </select>
                </div>
                <div class="field" style="margin:0;">
                  <label for="wk-domain">實施領域</label>
                  <select id="wk-domain">
                    ${['國語文領域', '英語文(含英轉)', '數學領域', '社會領域', '自然科學領域', '綜合活動領域', '藝術領域', '健康與體育', '生活課程', '本土語文', '資訊教育(資轉)'].map((d) => `<option value="${d}" ${wk.domain === d ? 'selected' : ''}>${d}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="field">
                <label for="wk-topic">法定教育議題</label>
                <select id="wk-topic">
                  ${topicOptions.map((o) => `<option value="${esc(o.value)}" ${wk.topicName === o.value ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}
                </select>
              </div>

              <div class="field" style="margin:0;">
                <label for="wk-teacher">
                  <span>填報教師</span>
                  <span style="color:${state.teacherName.trim() ? 'var(--status-ok)' : 'var(--color-accent)'};">${state.teacherName.trim() ? '已連動帶入' : '待填寫'}</span>
                </label>
                <input id="wk-teacher" class="${state.teacherName.trim() ? 'is-filled-ok' : 'is-empty-warn'}" type="text" value="${esc(state.teacherName)}" placeholder="請輸入教師姓名" />
              </div>
            </div>

            <div class="zone-pending ${wk.selectedWeeks.length ? 'is-resolved' : ''}" style="margin-bottom:14px;">
              <div class="zone-header">
                <span>2. 勾選實施週次</span>
                <span>${wk.selectedWeeks.length ? `已選 ${wk.selectedWeeks.map((n) => `W${n}`).join('、')}` : '請點選週次'}</span>
              </div>
              <div class="week-picker">
                ${Array.from({ length: maxWeeks }, (_, i) => i + 1).map((n) => `
                  <button type="button" class="wk-chip ${wk.selectedWeeks.includes(n) ? 'selected' : ''}" data-wk-toggle="${n}">W${n}</button>
                `).join('')}
              </div>
            </div>

            <div class="zone-select" style="margin-bottom:16px;">
              <div class="zone-header"><span>3. 節數、時數與單元備註</span></div>
              <div class="grid-2" style="margin-bottom:12px;">
                <div class="field" style="margin:0;">
                  <label for="wk-periods">融入節數</label>
                  <input id="wk-periods" type="number" min="0" step="1" value="${wk.periods}" />
                </div>
                <div class="field" style="margin:0;">
                  <label for="wk-hours">換算時數（40分/節）</label>
                  <input id="wk-hours" type="number" min="0" step="0.5" value="${wk.hours}" />
                </div>
              </div>
              <div class="field" style="margin:0;">
                <label for="wk-note">單元或活動名稱（選填）</label>
                <input id="wk-note" type="text" value="${esc(wk.note)}" placeholder="例：第三單元 友善校園" />
              </div>
            </div>

            <button type="button" class="btn btn-primary btn-lg" style="width:100%;" id="btn-save-weekly">儲存週次填報</button>
          </section>

          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">已填報紀錄（${wk.items.filter((x) => x.entryType === 'statutory').length} 筆）</h2>
            </div>
            ${wk.items.filter((x) => x.entryType === 'statutory').length === 0 ? `
              <div class="callout">目前尚無本學期新增填報紀錄。</div>
            ` : `
              <div style="display:flex; flex-direction:column; gap:8px; max-height:520px; overflow-y:auto;">
                ${wk.items.filter((x) => x.entryType === 'statutory').map((it) => `
                  <div style="border:1px solid var(--border-default); border-left:3px solid var(--color-primary); border-radius:var(--radius-md); padding:10px 14px; background:var(--bg-surface);">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                      <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                        <span class="tag tag-primary">${it.grade}年級・${esc(it.domain)}</span>
                        <span class="tag ${it.reviewedByChair ? 'tag-ok' : 'tag-neutral'}">${it.reviewedByChair ? '主任已檢核' : '待檢核'}</span>
                      </div>
                      <button type="button" class="btn btn-ghost btn-sm" style="height:26px; padding:0 8px;" data-wk-del="${it.id}">刪除</button>
                    </div>
                    <div style="font-weight:700; font-size:var(--text-sm); margin-top:6px;">${esc(it.topicName)}</div>
                    <div style="font-size:var(--text-xs); color:var(--text-muted); margin-top:2px;">
                      第 ${(it.weeks || []).join('、')} 週 ｜ ${it.periods} 節（${it.hours} 時）｜ 填報：${esc(it.teacherName)}
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </section>
        </div>
      ` : `
        <section class="panel">
          <div class="panel-head">
            <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap; min-width:0; max-width:100%;">
              <h2 class="panel-title">${wk.chairGradeFilter} 年級法定教育議題（表 5）達標對照</h2>
              <div class="seg-group-scroll">
                <div class="seg-group">
                  ${['1', '2', '3', '4', '5', '6'].map((g) => `
                    <button type="button" class="seg-btn ${wk.chairGradeFilter === g ? 'active' : ''}" data-chair-grade="${g}">${g} 年級</button>
                  `).join('')}
                </div>
              </div>
            </div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <span class="tag tag-ok">必辦達標 ${chairMetCount}/8（115上已達 ${chairMetFrom115_1}）</span>
              <button type="button" class="btn btn-secondary btn-sm" id="btn-export-stat-grade">
                ${ICONS.download} 匯出 ${wk.chairGradeFilter} 年級 Word
              </button>
              <a class="btn btn-secondary btn-sm" href="${DRIVE.legalIssues}" target="_blank" rel="noopener">雲端表 5 ${ICONS.ext}</a>
            </div>
          </div>

          <div class="table-wrap" style="margin-bottom:20px;">
            <table class="clean-table" style="min-width:780px;">
              <thead>
                <tr>
                  <th style="width:52px;">序號</th>
                  <th>法定教育議題</th>
                  <th style="width:108px;">計算基準</th>
                  <th class="num-col" style="width:140px;">115上已實施</th>
                  <th style="width:160px;">115下填報／預排</th>
                  <th class="num-col" style="width:130px;">全學年累計</th>
                  <th style="width:200px;">檢核狀態</th>
                </tr>
              </thead>
              <tbody>
                ${statutorySummary.map((s) => {
                  const needAttention = s.required && !s.met;
                  const scopeLabel = s.basis === 'semester'
                    ? `每學期 ${s.minTerm} 時`
                    : s.basis === 'year'
                      ? (s.anyPositive ? '全學年融入' : `全學年 ${s.minYear} ${s.metric === 'periods' ? '節' : '時'}`)
                      : '選辦融入';
                  return `
                    <tr class="${needAttention ? 'row-attention' : ''}">
                      <td class="num-col" style="text-align:left; font-weight:700;">${String(s.no).padStart(2, '0')}</td>
                      <td style="font-weight:600;">${esc(s.name)}</td>
                      <td><span class="tag tag-neutral">${scopeLabel}</span></td>
                      <td class="num-col">
                        ${(s.prev.term1Hours > 0 || s.prev.term1Periods > 0)
                          ? `${s.prev.term1Periods} 節 / ${s.prev.term1Hours} 時`
                          : '<span style="color:var(--text-muted);">0 節 / 0 時</span>'}
                      </td>
                      <td style="font-size:13px;">
                        ${s.allWeeks.length ? `
                          <strong>第 ${s.allWeeks.join('、')} 週</strong>（${s.t2NewPeriods} 節 / ${s.t2NewHours} 時）
                          <div style="font-size:11.5px; color:var(--text-muted);">${esc(s.domains.join('、'))}</div>
                        ` : s.prev.flex2Hours > 0 ? `
                          <span style="color:var(--text-secondary);">+校訂預排 ${s.prev.flex2Hours} 時</span>
                        ` : s.metIn115_1 ? `
                          <span style="color:var(--text-muted);">—</span>
                        ` : `
                          <span style="color:${needAttention ? 'var(--color-accent)' : 'var(--text-muted)'}; font-weight:${needAttention ? '600' : '400'};">${needAttention ? '尚無填報' : '—'}</span>
                        `}
                      </td>
                      <td class="num-col" style="font-weight:700;">${s.yearPeriods} 節 / ${s.yearHours} 時</td>
                      <td>
                        <span class="tag ${s.tagClass}">${esc(s.badgeText)}</span>
                        ${s.subHint ? `<div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${esc(s.subHint)}</div>` : ''}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          ${gradeItems.length > 0 ? `
            <div style="font-weight:700; font-size:var(--text-sm); margin-bottom:8px;">${wk.chairGradeFilter} 年級本學期新增填報明細</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${gradeItems.map((it) => `
                <div class="${it.reviewedByChair ? '' : 'zone-pending'}" style="${it.reviewedByChair ? 'border:1px solid var(--border-default); border-left:3px solid var(--status-ok); background:var(--bg-surface); border-radius:var(--radius-md); padding:10px 14px;' : 'padding:10px 14px;'} display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
                  <div style="font-size:var(--text-sm);">
                    <strong>${esc(it.domain)}</strong>｜${esc(it.topicName)}｜<strong>第 ${(it.weeks || []).join('、')} 週</strong>（${it.periods} 節／${it.hours} 時）— ${esc(it.teacherName)}
                  </div>
                  <button type="button" class="btn btn-secondary btn-sm" data-chair-toggle-review="${it.id}" data-cur="${it.reviewedByChair ? '1' : '0'}">
                    ${it.reviewedByChair ? '已檢核（點擊取消）' : '標記已檢核'}
                  </button>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </section>
      `}
    `;
  }

  // ==========================================================================
  // View 4: 歷年與廠商資料庫
  // ==========================================================================
  function getDynamicLibraryItems() {
    const tc = getTermContext();
    return LIBRARY_ITEMS.map((item) => {
      if (item.id === 'lib-locked-school') {
        if (tc.hasGeneralOpen) {
          const summaryList = ['1', '2', '3', '4', '5', '6']
            .filter((g) => tc.activeGeneralByGrade[g].length > 0)
            .map((g) => `${g}年級(${tc.activeGeneralByGrade[g].join('、')})`)
            .join('、');
          return {
            ...item,
            cat: 'history',
            locked: false,
            title: `一般校訂彈性學習歷年與範本（${tc.termTag}已開放）`,
            tag: `${tc.termTag}開放`,
            summary: `本學期開放撰寫一般校訂課程：${summaryList}。`,
            driveUrl: DRIVE.histSchool,
            apiCategory: 'history_school'
          };
        }
        return { ...item, tag: `${tc.termTag}鎖定`, summary: `${tc.termFull}免撰寫一般校訂彈性學習課程，此資料庫入口已鎖定。` };
      }
      if (item.id === 'lib-locked-sped') {
        if (tc.hasSpedOpen) {
          return {
            ...item,
            cat: 'history',
            locked: false,
            title: `特殊教育課程計畫歷年與空白（${tc.termTag}已開放）`,
            tag: `${tc.termTag}開放`,
            summary: `${tc.termFull}已開放撰寫特殊教育課程計畫，可查閱歷年特教計畫與空白格式。`,
            driveUrl: DRIVE.histSped,
            apiCategory: 'history_sped'
          };
        }
        return { ...item, tag: `${tc.termTag}鎖定`, summary: `特殊教育課程計畫採整學年度規劃，${tc.termFull}無須重複撰寫。` };
      }
      return item;
    });
  }

  function renderLibrary() {
    const dynamicItems = getDynamicLibraryItems();
    const q = state.libQuery.trim().toLowerCase();
    const filtered = dynamicItems.filter((item) => {
      if (state.libFilter !== 'all' && item.cat !== state.libFilter) return false;
      if (q && !`${item.title} ${item.summary} ${item.tag}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const selected = filtered.find((x) => x.id === state.libSelectedId) || filtered[0] || dynamicItems[0];
    const curSubpath = selected?.apiCategory ? (state.libSubpath || '') : '';
    const cacheKey = selected?.apiCategory ? `${selected.apiCategory}::${curSubpath}` : '';
    if (selected && selected.apiCategory && !selected.locked) {
      tryFetchLiveLibraryFiles(selected.apiCategory, curSubpath);
    }
    const liveListing = cacheKey ? state.libLiveFiles[cacheKey] : null;
    const parentSubpath = curSubpath ? curSubpath.split('/').slice(0, -1).join('/') : '';

    return `
      <div class="mail-layout">
        <section class="mail-list-pane">
          <div class="mail-search">
            <input id="lib-search" class="input-ctrl" type="text" value="${esc(state.libQuery)}" placeholder="搜尋領域、廠商、翰林、康軒、英轉..." />
            <div class="chip-row">
              ${[['all', '全部'], ['publisher', '廠商計畫'], ['history', '歷年計畫'], ['guide', '範本規範'], ['locked', '已鎖定']]
                .map(([k, lbl]) => `<button type="button" class="chip-select ${state.libFilter === k ? 'active' : ''}" data-lib-filter="${k}">${lbl}</button>`).join('')}
            </div>
          </div>
          <div class="mail-items">
            ${filtered.length === 0 ? `<div style="padding:24px; text-align:center; color:var(--text-muted); font-size:var(--text-sm);">無符合條件之項目</div>` : filtered.map((item) => `
              <button type="button" class="mail-row ${item.id === selected?.id ? 'active' : ''} ${item.locked ? 'is-locked' : ''}" data-lib-select="${item.id}">
                <strong>${esc(item.title)}</strong>
                <div style="margin-top:4px;">
                  <span class="tag ${item.locked ? 'tag-neutral' : item.cat === 'publisher' ? 'tag-ok' : 'tag-primary'}">${esc(item.tag)}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </section>

        <section class="panel">
          ${selected ? `
            <div class="panel-head">
              <div style="min-width:0;">
                <span class="tag ${selected.locked ? 'tag-neutral' : 'tag-primary'}" style="margin-bottom:6px;">${esc(selected.tag)}</span>
                <h2 class="panel-title">${esc(selected.title)}</h2>
                <p style="margin:4px 0 0; font-size:var(--text-sm); color:var(--text-secondary);">${esc(selected.summary)}</p>
              </div>
              <div style="flex-shrink:0;">
                ${selected.locked
                  ? `<button type="button" class="btn btn-secondary" disabled>${ICONS.lock} 本學期已鎖定</button>`
                  : `<a class="btn btn-primary" href="${selected.driveUrl}" target="_blank" rel="noopener">開啟雲端資料夾 ${ICONS.ext}</a>`}
              </div>
            </div>

            ${!selected.locked && selected.apiCategory ? `
              <div style="border:1px solid var(--border-default); border-radius:var(--radius-md); overflow:hidden;">
                <div style="background:var(--bg-subtle); border-bottom:1px solid var(--border-default); padding:10px 14px; font-size:var(--text-xs); font-weight:700; color:var(--text-secondary); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                    ${curSubpath ? `<button type="button" class="btn btn-secondary btn-sm" style="height:28px;" data-lib-open-sub="${esc(parentSubpath)}">${ICONS.arrowLeft} 上層目錄</button>` : ''}
                    <span>${ICONS.folderSm} ${curSubpath ? esc(curSubpath.replace(/\//g, ' / ')) : '根目錄檔案清單'}（${liveListing ? ((liveListing.folders?.length || 0) + (liveListing.files?.length || 0)) : '...'} 項）</span>
                  </div>
                  <button type="button" class="btn btn-secondary btn-sm" style="height:28px;" id="btn-lib-refresh" data-lib-cat="${esc(selected.apiCategory)}">${ICONS.refresh} 重新掃描</button>
                </div>

                <div style="max-height:440px; overflow-y:auto; padding:10px 12px; display:flex; flex-direction:column; gap:6px; background:var(--bg-surface);">
                  ${!liveListing ? `<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:var(--text-sm);">正在載入目錄...</div>` : `
                    ${(liveListing.folders || []).map((fo) => `
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:9px 12px; background:var(--bg-canvas); border:1px solid var(--border-default); border-radius:var(--radius-md); gap:8px;">
                        <button type="button" data-lib-open-sub="${esc(fo.relPath)}" style="appearance:none; border:none; background:transparent; cursor:pointer; font-size:var(--text-sm); font-weight:600; color:var(--text-primary); text-align:left; flex:1; display:flex; align-items:center; gap:8px;">
                          ${ICONS.folderSm}
                          <span>${esc(fo.name)}</span>
                          <span class="tag tag-neutral">${fo.childCount}</span>
                        </button>
                        <button type="button" class="btn btn-secondary btn-sm" data-lib-open-sub="${esc(fo.relPath)}">開啟 ${ICONS.arrowRight}</button>
                      </div>
                    `).join('')}

                    ${(liveListing.files || []).filter((fi) => !fi.name.startsWith('~$') && fi.name.toLowerCase() !== 'desktop.ini').map((fi) => `
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:9px 12px; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); gap:10px;">
                        <div style="min-width:0; display:flex; align-items:center; gap:8px;">
                          ${ICONS.docSm}
                          <div style="min-width:0;">
                            <div style="font-weight:600; font-size:var(--text-sm); color:var(--text-primary); word-break:break-all;">${esc(fi.name)}</div>
                            <div style="font-size:11.5px; color:var(--text-muted);">${fi.size ? `${Math.max(1, Math.round(fi.size / 1024))} KB` : ''}${fi.mtime ? ` ｜ ${formatShortTime(fi.mtime)}` : ''}</div>
                          </div>
                        </div>
                        ${state.weekly.serverConnected
                          ? `<a class="btn btn-secondary btn-sm" style="flex-shrink:0;" href="/api/download?category=${encodeURIComponent(selected.apiCategory)}&path=${encodeURIComponent(fi.relPath)}">${ICONS.download} 下載</a>`
                          : `<a class="btn btn-secondary btn-sm" style="flex-shrink:0;" href="${selected.driveUrl}" target="_blank" rel="noopener">雲端下載 ${ICONS.ext}</a>`}
                      </div>
                    `).join('')}

                    ${(liveListing.folders?.length || 0) + (liveListing.files?.length || 0) === 0 ? `<div style="padding:18px; text-align:center; color:var(--text-muted); font-size:var(--text-sm);">此資料夾尚無檔案</div>` : ''}
                  `}
                </div>
              </div>
            ` : ''}
          ` : ''}
        </section>
      </div>
    `;
  }

  // ==========================================================================
  // View 5: 領域初審 ＆ 課發會審查檢核表（表 4：依各領域原始文件原文照錄＋複數初審教師防覆蓋同步）
  // ==========================================================================
  function renderReviewChecklist() {
    const tc = getTermContext();
    const domains = getReviewDomainList();
    const selected = domains.find((d) => d.id === state.review.selectedDomainId) || domains[0];
    const spec = getDomainReviewSpec(selected);
    const items = spec.items || [];
    const totalItems = items.length;
    const rec = normalizeClientReviewRec(state.review.records[selected.id]);

    const isInitialRole = state.role === 'domain' || state.role === 'admin';
    const isFinalRole = state.role === 'reviewer' || state.role === 'admin';
    const initDone = items.filter((it) => rec.initialChecks?.[it.id]).length;
    const finalDone = items.filter((it) => rec.finalChecks?.[it.id]).length;
    const cnGrade = { '1': '一', '2': '二', '3': '三', '4': '四', '5': '五', '6': '六' };

    const initNamesList = rec.initialReviewers || [];
    const finalNamesList = rec.finalReviewers || [];
    const initNamesText = initNamesList.length ? initNamesList.join('、') : '尚未填寫';
    const finalNamesText = finalNamesList.length ? finalNamesList.join('、') : '尚未簽認';
    const activeConflict = state.review.conflict && state.review.conflict.domainId === selected.id
      ? state.review.conflict
      : null;

    const matchedCloudFile = state.review.cloudFiles.find(
      (f) => selected.file && f.name.replace(/\s+/g, '') === selected.file.replace(/\s+/g, '')
    ) || state.review.cloudFiles.find(
      (f) => f.name.includes(selected.label.replace(/\(.*\)/, ''))
    );

    const hasAnyDomainData = initNamesList.length > 0
      || finalNamesList.length > 0
      || initDone > 0
      || finalDone > 0
      || Boolean(rec.initialResult)
      || Boolean(rec.finalResult)
      || selected.grades.some((g) => rec.grades?.[g]?.status || rec.grades?.[g]?.comment);

    return `
      <section class="panel" style="margin-bottom:20px;">
        <!-- 多人初審同步與防覆蓋狀態列 -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:10px 14px; margin-bottom:16px; border-radius:var(--radius-md); background:var(--bg-subtle); border:1px solid var(--border-default);">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:var(--text-xs);">
            <span class="tag ${state.weekly.serverConnected ? 'tag-ok' : 'tag-neutral'}">${state.weekly.serverConnected ? '多人初審同步・防覆蓋保護中' : '本機暫存模式'}</span>
            <span style="color:var(--text-secondary);">目前填寫人員：<strong style="color:var(--text-primary);">${esc((state.teacherName || '').trim() || '未填姓名')}</strong>（已填選項與姓名皆可隨時修正或取消）</span>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="btn btn-secondary btn-sm" id="btn-rev-sync">${ICONS.refresh} 同步最新紀錄</button>
            ${hasAnyDomainData ? `
              <button type="button" class="btn btn-danger-outline btn-sm" id="btn-rev-reset-domain">清空本領域紀錄</button>
            ` : ''}
          </div>
        </div>

        <!-- 1. 選擇審查領域表件（下拉式選單） -->
        <div class="zone-select" style="margin-bottom:20px;">
          <div class="zone-header">
            <label for="rev-domain-select" style="cursor:pointer;">1. 選擇審查領域表件</label>
            <span>依領域載入原始表 4 條文</span>
          </div>
          <select class="select-ctrl" id="rev-domain-select">
            ${domains.map((d) => {
              const dSpec = getDomainReviewSpec(d);
              const dItems = dSpec.items || [];
              const r = normalizeClientReviewRec(state.review.records[d.id]);
              const dInit = dItems.filter((x) => r.initialChecks?.[x.id]).length;
              const dFinal = dItems.filter((x) => r.finalChecks?.[x.id]).length;
              const dWho = r.initialReviewers.length ? `｜初審教師：${r.initialReviewers.join('、')}` : '';
              const prog = state.role === 'reviewer'
                ? `複審 ${dFinal}/${dItems.length}`
                : `初審 ${dInit}/${dItems.length}`;
              return `
                <option value="${esc(d.id)}" ${d.id === selected.id ? 'selected' : ''}>
                  ${esc(d.code)}-${esc(d.label)}（${prog}${esc(dWho)}）
                </option>
              `;
            }).join('')}
          </select>
        </div>

        <!-- 標題列與顯眼初審教師姓名標示（支援個別移除 ✕ 與修正名單） -->
        <div class="panel-head">
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <h2 class="panel-title">${esc(selected.code)}-${esc(selected.label)} 課程計畫審查檢核表（表 4）</h2>
              <span class="tag ${initDone === totalItems ? 'tag-ok' : 'tag-warn'}">初審 ${initDone}/${totalItems}</span>
              <span class="tag ${finalDone === totalItems ? 'tag-ok' : 'tag-neutral'}">複審 ${finalDone}/${totalItems}</span>
            </div>

            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;" id="rev-init-teachers-badge">
              <span style="font-size:12.5px; font-weight:700; color:var(--text-secondary);">初審教師：</span>
              ${state.review.editingNamesStage === 'init' ? `
                <input type="text" class="input-ctrl" id="rev-names-input" value="${esc(initNamesList.join('、'))}" placeholder="多位請以頓號分隔，留空即清空" style="width:220px; height:30px; font-size:12.5px;" />
                <button type="button" class="btn btn-primary btn-sm" style="height:28px; padding:0 10px;" id="btn-rev-save-names" data-stage="init">儲存</button>
                <button type="button" class="btn btn-ghost btn-sm" style="height:28px; padding:0 8px;" id="btn-rev-cancel-names">取消</button>
              ` : `
                ${initNamesList.length ? initNamesList.map((nm) => `
                  <span class="tag tag-primary" style="font-size:12.5px; padding:2px 8px; gap:6px;">
                    <span>${esc(nm)}</span>
                    ${isInitialRole ? `<button type="button" data-rev-remove-who="init:${esc(nm)}" title="移除「${esc(nm)}」" style="appearance:none; border:none; background:transparent; color:var(--color-primary); cursor:pointer; padding:0; font-size:12px; line-height:1; font-weight:700;">✕</button>` : ''}
                  </span>
                `).join('') : `<span class="tag tag-warn">尚未填寫</span>`}
                ${isInitialRole ? `<button type="button" class="btn btn-ghost btn-sm" style="height:26px; padding:0 8px; font-size:12px;" data-rev-edit-names="init">修正名單</button>` : ''}
              `}

              ${(finalNamesList.length > 0 || state.review.editingNamesStage === 'final' || isFinalRole) ? `
                <span style="margin-left:8px; font-size:12.5px; font-weight:700; color:var(--text-secondary);">複審委員：</span>
                ${state.review.editingNamesStage === 'final' ? `
                  <input type="text" class="input-ctrl" id="rev-names-input" value="${esc(finalNamesList.join('、'))}" placeholder="多位請以頓號分隔，留空即清空" style="width:220px; height:30px; font-size:12.5px;" />
                  <button type="button" class="btn btn-primary btn-sm" style="height:28px; padding:0 10px;" id="btn-rev-save-names" data-stage="final">儲存</button>
                  <button type="button" class="btn btn-ghost btn-sm" style="height:28px; padding:0 8px;" id="btn-rev-cancel-names">取消</button>
                ` : `
                  ${finalNamesList.length ? finalNamesList.map((nm) => `
                    <span class="tag tag-neutral" style="font-size:12.5px; padding:2px 8px; gap:6px;">
                      <span>${esc(nm)}</span>
                      ${isFinalRole ? `<button type="button" data-rev-remove-who="final:${esc(nm)}" title="移除「${esc(nm)}」" style="appearance:none; border:none; background:transparent; color:var(--text-secondary); cursor:pointer; padding:0; font-size:12px; line-height:1; font-weight:700;">✕</button>` : ''}
                    </span>
                  `).join('') : `<span class="tag tag-neutral">尚未簽認</span>`}
                  ${isFinalRole ? `<button type="button" class="btn btn-ghost btn-sm" style="height:26px; padding:0 8px; font-size:12px;" data-rev-edit-names="final">修正名單</button>` : ''}
                `}
              ` : ''}
            </div>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <a class="btn btn-secondary btn-sm" href="${selected.planUrl}" target="_blank" rel="noopener">
              檢視該領域計畫 ${ICONS.ext}
            </a>
            ${(state.weekly.serverConnected && matchedCloudFile) ? `
              <a class="btn btn-secondary btn-sm" href="/api/download?category=checklists&path=${encodeURIComponent(matchedCloudFile.relPath)}">
                ${ICONS.download} 下載原表件 (.docx)
              </a>
            ` : `
              <a class="btn btn-secondary btn-sm" href="${DRIVE.checklists}" target="_blank" rel="noopener">
                雲端表 4 資料夾 ${ICONS.ext}
              </a>
            `}
            <button type="button" class="btn btn-primary btn-sm" id="btn-export-rev-word">
              ${ICONS.download} 匯出填妥表 4 (.doc)
            </button>
          </div>
        </div>

        ${(state.role === 'reviewer' || state.role === 'admin') ? `
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
            <a class="btn btn-secondary btn-sm" href="${DRIVE.checklists}" target="_blank" rel="noopener">4-審查檢核表總夾 ${ICONS.ext}</a>
            <a class="btn btn-secondary btn-sm" href="${DRIVE.returned7}" target="_blank" rel="noopener">7-課發會審退區 ${ICONS.ext}</a>
            <a class="btn btn-secondary btn-sm" href="${DRIVE.fixed8}" target="_blank" rel="noopener">8-修正完課程計畫 ${ICONS.ext}</a>
          </div>
        ` : ''}

        ${activeConflict ? `
          <div class="callout callout-err" style="margin-bottom:16px; border-left:4px solid var(--status-danger);">
            <div style="font-weight:700; margin-bottom:8px;">衝突攔截保護：【${cnGrade[activeConflict.grade]}年級 審查意見】剛由「${esc(activeConflict.latestGrade.updatedBy || '其他初審教師')}」更新，系統已暫停覆寫</div>
            <div class="grid-2" style="margin-bottom:12px;">
              <div style="background:#FFFFFF; border:1px solid var(--border-default); border-radius:var(--radius-sm); padding:10px 12px; color:var(--text-primary);">
                <div style="font-size:11.5px; font-weight:700; color:var(--status-ok); margin-bottom:4px;">已存版本（${esc(activeConflict.latestGrade.updatedBy || '教師')}・${formatShortTime(activeConflict.latestGrade.updatedAt)}）</div>
                <div style="white-space:pre-wrap; font-size:13px;">${esc(activeConflict.latestGrade.comment || '（空白）')}</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid var(--border-default); border-radius:var(--radius-sm); padding:10px 12px; color:var(--text-primary);">
                <div style="font-size:11.5px; font-weight:700; color:var(--color-primary); margin-bottom:4px;">您剛輸入的意見</div>
                <div style="white-space:pre-wrap; font-size:13px;">${esc(activeConflict.myComment || '（空白）')}</div>
              </div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button type="button" class="btn btn-primary btn-sm" id="btn-rev-conflict-merge">合併保留雙方意見</button>
              <button type="button" class="btn btn-secondary btn-sm" id="btn-rev-conflict-keep-theirs">採用已存版本</button>
              <button type="button" class="btn btn-danger-outline btn-sm" id="btn-rev-conflict-force">強制覆寫</button>
            </div>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
          <strong style="font-size:var(--text-sm);">2. 各年級課發會審查情形與審查意見（學校：龍埔國小　領域/科目：${esc(spec.subjectLine || selected.label)}）</strong>
        </div>

        ${spec.table1CommentPrompt ? `
          <div class="callout" style="margin-bottom:12px; white-space:pre-line; font-size:13px;">${esc(spec.table1CommentPrompt)}</div>
        ` : ''}

        <div class="table-wrap">
          <table class="clean-table" style="min-width:640px;">
            <thead>
              <tr>
                <th style="width:84px;">年級</th>
                <th style="width:276px;">課發會審查情形（✓）</th>
                <th>審查意見</th>
              </tr>
            </thead>
            <tbody>
              ${selected.grades.map((g) => {
                const gr = (rec.grades && rec.grades[g]) || {};
                const status = gr.status || '';
                const rowClass = status === 'revise'
                  ? 'row-danger'
                  : (!status ? 'row-attention' : '');
                const stamp = gr.updatedBy
                  ? `填寫：${gr.updatedBy}${gr.updatedAt ? `・${formatShortTime(gr.updatedAt)}` : ''}`
                  : '';
                return `
                  <tr class="${rowClass}">
                    <td style="font-weight:700; white-space:nowrap;">${cnGrade[g]}年級</td>
                    <td>
                      <div style="display:flex; align-items:center; gap:6px; flex-wrap:nowrap;">
                        <div class="seg-group" style="background:#FFFFFF;">
                          <button type="button" class="seg-btn ${status === 'excellent' ? 'active-ok' : ''}" data-rev-gstatus="${g}:excellent" title="再次點擊可取消選取">評選優良</button>
                          <button type="button" class="seg-btn ${status === 'pass' ? 'active' : ''}" data-rev-gstatus="${g}:pass" title="再次點擊可取消選取">審查通過</button>
                          <button type="button" class="seg-btn ${status === 'revise' ? 'active-danger' : ''}" data-rev-gstatus="${g}:revise" title="再次點擊可取消選取">待修正</button>
                        </div>
                        ${(status || gr.comment) ? `
                          <button type="button" class="btn btn-ghost btn-sm" style="height:28px; padding:0 7px; font-size:12px; color:var(--text-muted);" data-rev-clear-grade="${g}" title="取消此年級審查結果與意見">取消</button>
                        ` : ''}
                      </div>
                    </td>
                    <td style="min-width:240px;">
                      <input
                        class="input-ctrl"
                        style="height:36px;"
                        type="text"
                        data-rev-gcomment="${g}"
                        value="${esc(gr.comment || '')}"
                        placeholder="選填審查建議（自動存檔）"
                      />
                      ${stamp ? `<div style="font-size:11px; color:var(--text-muted); margin-top:3px;">${esc(stamp)}</div>` : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        ${spec.noteBetweenTables ? `
          <div style="margin-top:10px; font-size:var(--text-xs); color:var(--text-secondary);">${esc(spec.noteBetweenTables)}</div>
        ` : ''}
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <div style="font-size:var(--text-xs); color:var(--text-muted); margin-bottom:2px;">項目分類：${esc(spec.categoryLabel || '十二年國教課綱')}</div>
            <h2 class="panel-title">${esc(spec.table2Heading || `【${selected.label}】課程計畫通過備查標準檢核請逐項勾選 ☑`)}</h2>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${isInitialRole ? `<button type="button" class="btn btn-secondary btn-sm" id="btn-rev-check-all-init">${ICONS.check} 初審全部勾選</button>` : ''}
            ${(isInitialRole && initDone > 0) ? `<button type="button" class="btn btn-ghost btn-sm" id="btn-rev-uncheck-all-init">取消初審勾選</button>` : ''}
            ${isFinalRole ? `<button type="button" class="btn btn-secondary btn-sm" id="btn-rev-check-all-final">${ICONS.check} 複審全部勾選</button>` : ''}
            ${(isFinalRole && finalDone > 0) ? `<button type="button" class="btn btn-ghost btn-sm" id="btn-rev-uncheck-all-final">取消複審勾選</button>` : ''}
          </div>
        </div>
        <div class="table-wrap">
          <table class="clean-table" style="min-width:600px;">
            <thead>
              <tr>
                <th style="width:64px;">項目</th>
                <th>備查內容（原始文件全文）</th>
                <th style="width:92px; text-align:center;">初審</th>
                <th style="width:92px; text-align:center;">複審</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((it) => {
                const cInit = Boolean(rec.initialChecks?.[it.id]);
                const cFinal = Boolean(rec.finalChecks?.[it.id]);
                const initMeta = rec.initialCheckMeta?.[it.id];
                const finalMeta = rec.finalCheckMeta?.[it.id];
                const initBg = cInit ? 'transparent' : (isInitialRole ? 'var(--bg-pending)' : 'var(--bg-canvas)');
                const finalBg = cFinal ? 'transparent' : (isFinalRole ? 'var(--bg-pending)' : 'var(--bg-canvas)');
                return `
                  ${it.sectionHeader ? `
                    <tr style="background:var(--bg-subtle);">
                      <td colspan="4" style="font-weight:700; font-size:13px; color:var(--color-primary); padding:8px 14px;">${esc(it.sectionHeader)}</td>
                    </tr>
                  ` : ''}
                  <tr>
                    <td class="num-col" style="text-align:${it.isSub ? 'right' : 'left'}; font-weight:700; color:${it.isSub ? 'var(--text-secondary)' : 'var(--text-primary)'};">${esc(it.no)}</td>
                    <td style="padding-left:${it.isSub ? '26px' : '14px'}; white-space:pre-line; line-height:1.65;">${esc(it.text)}</td>
                    <td style="text-align:center; background:${initBg};" title="${initMeta?.by ? `勾選：${esc(initMeta.by)}` : ''}">
                      <input type="checkbox" data-rev-check="init:${esc(it.id)}" ${cInit ? 'checked' : ''} ${isInitialRole ? '' : 'disabled'} style="width:17px; height:17px; cursor:${isInitialRole ? 'pointer' : 'not-allowed'}; accent-color:var(--color-primary);" />
                    </td>
                    <td style="text-align:center; background:${finalBg};" title="${finalMeta?.by ? `勾選：${esc(finalMeta.by)}` : ''}">
                      <input type="checkbox" data-rev-check="final:${esc(it.id)}" ${cFinal ? 'checked' : ''} ${isFinalRole ? '' : 'disabled'} style="width:17px; height:17px; cursor:${isFinalRole ? 'pointer' : 'not-allowed'}; accent-color:var(--color-primary);" />
                    </td>
                  </tr>
                `;
              }).join('')}
              ${(spec.excellentCriteria && spec.excellentCriteria.length) ? `
                <tr style="background:var(--bg-canvas);">
                  <td style="font-weight:700; color:var(--text-secondary); vertical-align:top; white-space:nowrap;">優良課程<br/>具備條件</td>
                  <td colspan="3" style="white-space:pre-line; font-size:13px; color:var(--text-secondary); line-height:1.65;">${esc(spec.excellentCriteria.join('\n'))}</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>

        <!-- 表末簽認區（對應原檔表末初審／複審結果與簽名，支援隨時取消或修正） -->
        <div style="margin-top:16px; padding-top:16px; border-top:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:var(--text-sm);">
              <strong>領域小組初審結果：</strong>
              <div class="seg-group">
                <button type="button" class="seg-btn ${rec.initialResult === 'revise' ? 'active-danger' : ''}" data-rev-overall="init:revise" ${isInitialRole ? '' : 'disabled'}>須修正</button>
                <button type="button" class="seg-btn ${rec.initialResult === 'pass' ? 'active-ok' : ''}" data-rev-overall="init:pass" ${isInitialRole ? '' : 'disabled'}>通過</button>
              </div>
              ${(isInitialRole && rec.initialResult) ? `<button type="button" class="btn btn-ghost btn-sm" style="height:28px; padding:0 8px; font-size:12px;" data-rev-overall="init:${rec.initialResult}">取消</button>` : ''}
            </div>
            <div style="font-size:var(--text-sm);">初審教師簽名：<strong>${esc(initNamesText)}</strong></div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:var(--text-sm);">
              <strong>課發會委員複審結果：</strong>
              <div class="seg-group">
                <button type="button" class="seg-btn ${rec.finalResult === 'revise' ? 'active-danger' : ''}" data-rev-overall="final:revise" ${isFinalRole ? '' : 'disabled'}>須修正</button>
                <button type="button" class="seg-btn ${rec.finalResult === 'pass' ? 'active-ok' : ''}" data-rev-overall="final:pass" ${isFinalRole ? '' : 'disabled'}>通過</button>
              </div>
              ${(isFinalRole && rec.finalResult) ? `<button type="button" class="btn btn-ghost btn-sm" style="height:28px; padding:0 8px; font-size:12px;" data-rev-overall="final:${rec.finalResult}">取消</button>` : ''}
            </div>
            <div style="font-size:var(--text-sm);">複審委員簽名：<strong>${esc(finalNamesText)}</strong></div>
          </div>
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // View 6: 全校進度看板（課研組長專屬）
  // ==========================================================================
  function renderKanban() {
    const tc = getTermContext();
    const cols = [
      { id: 'todo',      label: '未開始' },
      { id: 'writing',   label: '撰寫中' },
      { id: 'review',    label: '待檢核' },
      { id: 'submitted', label: '已繳交' }
    ];

    const generalCards = tc.hasGeneralOpen
      ? ['1', '2', '3', '4', '5', '6']
          .filter((g) => tc.activeGeneralByGrade[g].length > 0)
          .map((g) => ({
            id: `gen-g${g}`,
            name: `${g}年級校訂（${tc.activeGeneralByGrade[g].join('、')}）`,
            type: '一般校訂',
            ext: true,
            isGeneral: true,
            url: DRIVE.schoolGrades[g]
          }))
      : [];

    const allTrackItems = [...DRIVE.domains, ...generalCards];

    const list = allTrackItems.filter((d) => {
      if (state.kanbanFilter === 'ext') return !!d.ext && !d.isGeneral;
      if (state.kanbanFilter === 'general') return !!d.isGeneral;
      if (state.kanbanFilter === 'warn') {
        const st = state.liveDomainStats[d.name.slice(0, 2)];
        return st && st.missingPdf > 0;
      }
      return true;
    });

    return `
      <div class="grid-3" style="margin-bottom:16px;">
        <a class="link-card" href="${DRIVE.checklists}" target="_blank" rel="noopener">
          <div class="link-card-left">
            <div class="link-card-ico">${ICONS.clipboard}</div>
            <div class="link-card-title" style="white-space:nowrap;">4-審查檢核表</div>
          </div>
          ${ICONS.ext}
        </a>
        <a class="link-card" href="${DRIVE.legalIssues}" target="_blank" rel="noopener">
          <div class="link-card-left">
            <div class="link-card-ico">${ICONS.calendar}</div>
            <div class="link-card-title" style="white-space:nowrap;">5-各學年法定議題</div>
          </div>
          ${ICONS.ext}
        </a>
        <a class="link-card" href="${DRIVE.fixed8}" target="_blank" rel="noopener">
          <div class="link-card-left">
            <div class="link-card-ico">${ICONS.folder}</div>
            <div class="link-card-title" style="white-space:nowrap;">8-修正完課程計畫</div>
          </div>
          ${ICONS.ext}
        </a>
      </div>

      <div class="zone-select" style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:16px;">
        <div class="chip-row">
          <button type="button" class="chip-select ${state.kanbanFilter === 'all' ? 'active' : ''}" data-kb-filter="all">全部（${allTrackItems.length} 項）</button>
          <button type="button" class="chip-select ${state.kanbanFilter === 'ext' ? 'active' : ''}" data-kb-filter="ext">僅看英轉・資轉</button>
          ${tc.hasGeneralOpen ? `<button type="button" class="chip-select ${state.kanbanFilter === 'general' ? 'active' : ''}" data-kb-filter="general">僅看一般校訂（${generalCards.length}）</button>` : ''}
          <button type="button" class="chip-select ${state.kanbanFilter === 'warn' ? 'active' : ''}" data-kb-filter="warn">僅看缺 PDF 預警</button>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" id="kb-reset">${ICONS.refresh} 重設示範狀態</button>
      </div>

      <div class="kanban-board">
        ${cols.map((col, colIdx) => {
          const items = list.filter((d) => (state.kanbanStatus[d.id] || 'todo') === col.id);
          return `
            <div class="kb-col" data-kb-col="${col.id}">
              <div class="kb-head">
                <span>${col.label}</span>
                <span class="kb-count">${items.length}</span>
              </div>
              ${items.map((d) => {
                const live = d.isGeneral ? null : state.liveDomainStats[d.name.slice(0, 2)];
                return `
                  <article class="kb-card ${d.ext ? 'is-school-ext' : ''}" draggable="true" data-kb-card="${d.id}">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
                      <span class="tag ${d.isGeneral ? 'tag-warn' : d.ext ? 'tag-ok' : 'tag-neutral'}">${esc(d.type)}</span>
                      ${live && live.missingPdf > 0 ? `<span class="tag tag-danger">缺 PDF ${live.missingPdf}</span>` : ''}
                    </div>
                    <div class="kb-title">${esc(d.name)}</div>
                    ${live ? `<div class="kb-meta">雲端 ${live.totalFiles} 檔（Word+PDF 齊全 ${live.completePairs} 組）</div>` : ''}
                    <div class="kb-actions">
                      <a class="btn btn-secondary btn-sm" style="height:28px; padding:0 9px;" href="${d.url}" target="_blank" rel="noopener">雲端夾 ${ICONS.ext}</a>
                      <div style="display:flex; gap:4px;">
                        ${colIdx > 0 ? `<button type="button" class="btn btn-ghost btn-sm" style="height:28px; padding:0 7px;" data-kb-move="${d.id}" data-kb-to="${cols[colIdx - 1].id}" title="移至上一階段">◀</button>` : ''}
                        ${colIdx < cols.length - 1 ? `<button type="button" class="btn btn-ghost btn-sm" style="height:28px; padding:0 7px;" data-kb-move="${d.id}" data-kb-to="${cols[colIdx + 1].id}" title="移至下一階段">▶</button>` : ''}
                      </div>
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          `;
        }).join('')}
      </div>

      ${(!tc.hasGeneralOpen || !tc.hasSpedOpen) ? `
        <div class="locked-panel" style="margin-top:16px;">
          ${ICONS.lock}
          <span>${tc.termTag}目前鎖定：${[!tc.hasGeneralOpen ? '一般校訂' : '', !tc.hasSpedOpen ? '特殊教育' : ''].filter(Boolean).join('、')}</span>
        </div>
      ` : ''}
    `;
  }

  // ==========================================================================
  // View 7: 學年度與課程設定（課研組長永續管理中心）
  // ==========================================================================
  function ensureSettingsDraft() {
    if (!state.settingsDraft) {
      state.settingsDraft = JSON.parse(JSON.stringify(state.settings));
    }
    return state.settingsDraft;
  }

  function renderAdminSettings() {
    const d = ensureSettingsDraft();
    const previewTc = getTermContext(d);

    return `
      <section class="panel">
        <div class="panel-head">
          <h2 class="panel-title">學年度、學期與各年級校訂課程連動設定</h2>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="btn btn-secondary btn-sm" id="btn-preset-term1">套用上學期預設</button>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-preset-term2">套用下學期預設</button>
            <button type="button" class="btn btn-primary btn-sm" id="btn-save-settings">儲存並全站套用</button>
          </div>
        </div>

        <div class="zone-select" style="margin-bottom:16px;">
          <div class="zone-header"><span>1. 學年度、學期與週次基準</span></div>
          <div class="grid-3">
            <div class="field" style="margin:0;">
              <label for="adm-year">學年度</label>
              <input id="adm-year" type="text" value="${esc(d.academicYear)}" placeholder="例：115" />
            </div>
            <div class="field" style="margin:0;">
              <label>學期切換</label>
              <div class="seg-group" style="width:100%; display:grid; grid-template-columns:1fr 1fr; height:40px; align-items:center;">
                <button type="button" class="seg-btn ${d.semester === '上' ? 'active' : ''}" data-adm-sem="上">上學期</button>
                <button type="button" class="seg-btn ${d.semester === '下' ? 'active' : ''}" data-adm-sem="下">下學期</button>
              </div>
            </div>
            <div class="field" style="margin:0;">
              <label>總週次（1–5 年級 ／ 6 年級）</label>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <input id="adm-w15" type="number" min="15" max="25" value="${d.weeksG15}" aria-label="一至五年級週次" />
                <input id="adm-w6" type="number" min="15" max="25" value="${d.weeksG6}" aria-label="六年級週次" />
              </div>
            </div>
          </div>
        </div>

        <div class="zone-select" style="margin-bottom:16px;">
          <div class="zone-header"><span>2. 跨學期開放類別控制</span></div>
          <div style="display:flex; flex-wrap:wrap; gap:20px; font-size:var(--text-sm); font-weight:600; color:var(--text-primary);">
            <label style="display:inline-flex; align-items:center; gap:7px; cursor:pointer;">
              <input type="checkbox" id="adm-open-ministry" ${d.openMinistry ? 'checked' : ''} style="width:16px; height:16px; accent-color:var(--color-primary);" />
              <span>部定領域課程</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:7px; cursor:pointer;">
              <input type="checkbox" id="adm-sped-t1" ${d.openSpedTerm1 ? 'checked' : ''} style="width:16px; height:16px; accent-color:var(--color-primary);" />
              <span>特殊教育（上學期開放）</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:7px; cursor:pointer;">
              <input type="checkbox" id="adm-sped-t2" ${d.openSpedTerm2 ? 'checked' : ''} style="width:16px; height:16px; accent-color:var(--color-primary);" />
              <span>特殊教育（下學期開放）</span>
            </label>
          </div>
        </div>

        <div class="zone-pending" style="margin-bottom:16px;">
          <div class="zone-header">
            <span>3. 各年級校訂課程名稱與上下學期撰寫勾選</span>
            <span>勾選後全站自動解鎖</span>
          </div>
          <div class="admin-course-grid">
            ${['1', '2', '3', '4', '5', '6'].map((g) => {
              const courses = (d.gradeCourses && d.gradeCourses[g]) || [];
              return `
                <div style="background:var(--bg-surface); border:1px solid var(--border-default); border-radius:var(--radius-md); padding:12px 14px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <strong style="font-size:var(--text-sm); color:var(--text-primary);">${g} 年級校訂課程</strong>
                    <button type="button" class="btn btn-secondary btn-sm" style="height:28px; padding:0 9px;" data-adm-add-course="${g}">${ICONS.plus} 新增課程</button>
                  </div>
                  <div style="display:flex; flex-direction:column; gap:8px;">
                    ${courses.length === 0 ? `<div style="font-size:var(--text-xs); color:var(--text-muted);">尚未設定課程</div>` : courses.map((c, idx) => {
                      const activeNow = d.semester === '上' ? c.term1 : c.term2;
                      return `
                        <div style="display:flex; flex-direction:column; gap:6px; padding:8px 10px; border-radius:var(--radius-sm); border:1px solid ${activeNow ? 'var(--status-ok-border)' : 'var(--border-subtle)'}; background:${activeNow ? 'var(--bg-surface)' : 'var(--bg-canvas)'};">
                          <div style="display:flex; gap:6px; align-items:center;">
                            <input type="text" class="input-ctrl" data-adm-cname="${g}:${idx}" value="${esc(c.name)}" placeholder="課程名稱" style="flex:1; min-width:0; height:34px; font-size:13px;" />
                            <select class="select-ctrl" data-adm-ccat="${g}:${idx}" style="width:104px; flex-shrink:0; height:34px; padding:0 6px; font-size:12px;">
                              <option value="general" ${c.category === 'general' ? 'selected' : ''}>一般校訂</option>
                              <option value="ext" ${c.category === 'ext' ? 'selected' : ''}>英轉/資轉</option>
                            </select>
                            <button type="button" class="btn btn-ghost btn-sm" style="height:28px; padding:0 7px; flex-shrink:0; color:var(--status-danger);" data-adm-del="${g}:${idx}" title="移除課程">✕</button>
                          </div>
                          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; font-size:12px;">
                            <div style="display:flex; gap:12px; flex-wrap:wrap;">
                              <label style="display:inline-flex; align-items:center; gap:5px; cursor:pointer; color:var(--text-secondary); white-space:nowrap;">
                                <input type="checkbox" data-adm-cterm="${g}:${idx}:term1" ${c.term1 ? 'checked' : ''} style="accent-color:var(--color-primary);" /> 上學期撰寫
                              </label>
                              <label style="display:inline-flex; align-items:center; gap:5px; cursor:pointer; color:var(--text-secondary); white-space:nowrap;">
                                <input type="checkbox" data-adm-cterm="${g}:${idx}:term2" ${c.term2 ? 'checked' : ''} style="accent-color:var(--color-primary);" /> 下學期撰寫
                              </label>
                            </div>
                            <span class="tag ${activeNow ? 'tag-ok' : 'tag-neutral'}">${activeNow ? '本學期開放' : '本學期鎖定'}</span>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="callout callout-ok" id="adm-live-preview">
          <div style="font-weight:700; margin-bottom:6px;">${esc(previewTc.termFull)} 開放撰寫校訂課程即時預覽（修改後已即時同步至全站）</div>
          <div class="grid-3" style="gap:8px; font-size:13px;">
            ${['1', '2', '3', '4', '5', '6'].map((g) => `
              <div><strong>${g} 年級：</strong>${previewTc.activeAllSchoolByGrade[g].length ? esc(previewTc.activeAllSchoolByGrade[g].join('、')) : '<span style="color:var(--text-muted);">無</span>'}</div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // Master Chrome Sync & Event Bindings
  // ==========================================================================
  function syncChrome() {
    const tc = getTermContext();
    const roleCfg = ROLES[state.role] || ROLES.teacher;
    const allowed = roleCfg.allowedViews || ['wizard', 'ai-audit', 'weekly', 'library'];
    if (!allowed.includes(state.view)) {
      state.view = roleCfg.defaultView || allowed[0];
      LS.save('lp115_ws_view', state.view);
    }

    const viewMeta = VIEWS_META[state.view] || VIEWS_META.wizard;
    const dynamicTitle = state.view === 'review-checklist'
      ? (state.role === 'domain' ? '領域初審檢核表' : state.role === 'reviewer' ? '課發會審查檢核表' : viewMeta.title)
      : viewMeta.title;

    const sideRoleDisp = document.getElementById('sidebar-role-display');
    const mobRoleDisp = document.getElementById('mobile-role-display');
    const topTitle = document.getElementById('topbar-title');
    const sideTermSub = document.getElementById('sidebar-term-sub');
    if (sideRoleDisp) sideRoleDisp.textContent = roleCfg.label;
    if (mobRoleDisp) mobRoleDisp.textContent = roleCfg.label;
    if (topTitle) topTitle.textContent = dynamicTitle;
    if (sideTermSub) sideTermSub.textContent = tc.termFull;

    const topChip = document.getElementById('topbar-scope-chip');
    const cloudLbl = document.getElementById('sidebar-cloud-label');
    const lockWrap = document.getElementById('sidebar-lock-wrap');
    const lockTitle = document.getElementById('sidebar-lock-title');
    const lockGen = document.getElementById('sidebar-lock-general');
    const lockSped = document.getElementById('sidebar-lock-sped');
    if (topChip) topChip.textContent = tc.scopeChipText;
    if (cloudLbl) cloudLbl.textContent = `${tc.y} 雲端總目錄`;
    if (lockTitle) lockTitle.textContent = `${tc.termTag} 鎖定項目`;
    if (lockGen) lockGen.style.display = tc.hasGeneralOpen ? 'none' : '';
    if (lockSped) lockSped.style.display = tc.hasSpedOpen ? 'none' : '';
    if (lockWrap) lockWrap.style.display = (tc.hasGeneralOpen && tc.hasSpedOpen) ? 'none' : '';

    document.querySelectorAll('.sidebar-nav [data-view], .mobile-bottom-nav [data-view]').forEach((btn) => {
      const visible = allowed.includes(btn.dataset.view);
      btn.style.display = visible ? '' : 'none';
      btn.classList.toggle('active', visible && btn.dataset.view === state.view);
    });
  }

  function renderWorkspace() {
    syncChrome();
    const root = document.getElementById('workspace-root');
    if (!root) return;
    if (state.view === 'wizard') root.innerHTML = renderWizard();
    else if (state.view === 'ai-audit') root.innerHTML = renderAiAudit();
    else if (state.view === 'weekly') root.innerHTML = renderWeeklyPanel();
    else if (state.view === 'library') root.innerHTML = renderLibrary();
    else if (state.view === 'review-checklist') root.innerHTML = renderReviewChecklist();
    else if (state.view === 'kanban') {
      if (!Object.keys(state.liveDomainStats).length) tryFetchLiveOverview();
      root.innerHTML = renderKanban();
    }
    else if (state.view === 'admin-settings') root.innerHTML = renderAdminSettings();
    bindViewEvents(root);
  }

  function bindViewEvents(root) {
    root.querySelectorAll('[data-goto-view]').forEach((b) => {
      b.addEventListener('click', () => setView(b.dataset.gotoView));
    });
    root.querySelectorAll('[data-goto-wizard-step]').forEach((b) => {
      b.addEventListener('click', () => {
        state.wizardStep = Number(b.dataset.gotoWizardStep);
        setView('wizard');
      });
    });

    // Wizard
    root.querySelectorAll('[data-wiz-step]').forEach((b) => {
      b.addEventListener('click', () => { state.wizardStep = Number(b.dataset.wizStep); renderWorkspace(); });
    });
    root.querySelector('#wiz-prev')?.addEventListener('click', () => { if (state.wizardStep > 1) { state.wizardStep--; renderWorkspace(); } });
    root.querySelector('#wiz-next')?.addEventListener('click', () => { if (state.wizardStep < 4) { state.wizardStep++; renderWorkspace(); } });
    root.querySelectorAll('[data-wiz-check]').forEach((cb) => {
      cb.addEventListener('change', () => {
        state.checklist[cb.dataset.wizCheck] = cb.checked;
        LS.save('lp115_ws_checklist', state.checklist);
        renderWorkspace();
      });
    });
    root.querySelector('#wiz-reset-check')?.addEventListener('click', () => {
      state.checklist = {};
      LS.save('lp115_ws_checklist', state.checklist);
      toast('已重設自我檢核勾選');
      renderWorkspace();
    });
    const bindNm = (id, key) => root.querySelector(`#${id}`)?.addEventListener('change', (e) => { state.naming[key] = e.target.value; renderWorkspace(); });
    bindNm('nm-type', 'type'); bindNm('nm-grade', 'grade'); bindNm('nm-pub', 'publisher'); bindNm('nm-subj', 'subject'); bindNm('nm-ext', 'extName');
    root.querySelector('#btn-copy-name')?.addEventListener('click', async (e) => {
      const txt = e.currentTarget.dataset.copyName;
      try { await navigator.clipboard.writeText(txt); toast(`已複製標準檔名：${txt}`); } catch { toast('請手動反白複製'); }
    });

    // AI Audit Assistant
    root.querySelector('#ai-course-type')?.addEventListener('change', (e) => { state.aiAudit.courseType = e.target.value; });
    root.querySelector('#ai-grade-band')?.addEventListener('change', (e) => { state.aiAudit.gradeBand = e.target.value; });
    const aiDz = root.querySelector('#ai-dropzone');
    const aiInp = root.querySelector('#ai-file-input');
    if (aiDz && aiInp) {
      aiDz.addEventListener('click', () => aiInp.click());
      aiDz.addEventListener('dragover', (e) => { e.preventDefault(); aiDz.classList.add('is-over'); });
      aiDz.addEventListener('dragleave', () => aiDz.classList.remove('is-over'));
      aiDz.addEventListener('drop', (e) => {
        e.preventDefault(); aiDz.classList.remove('is-over');
        if (e.dataTransfer.files?.[0]) {
          state.aiAudit.file = e.dataTransfer.files[0];
          state.aiAudit.error = '';
          renderWorkspace();
        }
      });
      aiInp.addEventListener('change', () => {
        if (aiInp.files?.[0]) {
          state.aiAudit.file = aiInp.files[0];
          state.aiAudit.error = '';
          renderWorkspace();
        }
      });
    }

    root.querySelector('#btn-run-ai-audit')?.addEventListener('click', async () => {
      const ai = state.aiAudit;
      if (!ai.file) {
        ai.error = '請先點選或拖曳要檢核的課程計畫檔案（建議使用 .docx）。';
        renderWorkspace();
        return;
      }
      ai.loading = true;
      ai.error = '';
      renderWorkspace();
      try {
        let data = null;
        if (window.location.protocol !== 'file:') {
          try {
            const fd = new FormData();
            fd.append('courseType', ai.courseType);
            fd.append('gradeBand', ai.gradeBand);
            fd.append('file', ai.file, ai.file.name);
            const res = await fetch('/api/audit-plan', { method: 'POST', body: fd });
            if (res.ok) data = await res.json();
          } catch {}
        }
        if (!data) {
          if (!window.BrowserAuditor) throw new Error('找不到瀏覽器檢核引擎，請重新整理頁面');
          data = await window.BrowserAuditor.auditFile(ai.file, {
            courseType: ai.courseType,
            gradeBand: ai.gradeBand
          });
        }
        ai.report = data;
        toast('檢核完成，已列出待修正項目與建議');
      } catch (err) {
        ai.error = err.message || '檢核執行失敗';
      } finally {
        ai.loading = false;
        renderWorkspace();
      }
    });

    root.querySelector('#btn-copy-audit')?.addEventListener('click', async () => {
      const rep = state.aiAudit.report;
      if (!rep) return;
      const tc = getTermContext();
      const lines = [
        `【龍埔國小 ${tc.termShort} 課程計畫 AI 檢核摘要】`,
        ...(state.teacherName.trim() ? [`撰寫教師：${state.teacherName.trim()}`] : []),
        `檔案：${rep.filename}｜分數：${rep.summary.score}｜結論：${rep.summary.verdict}`,
        ``,
        `待修正項目（${rep.mustFix.length} 項）：`,
        ...(rep.mustFix.length ? rep.mustFix.map((m, i) => `${i + 1}. ${m.rule}：${m.detail}（建議：${m.suggestion || ''}）`) : ['（無必改紅線違規）']),
        ``,
        `建議確認項目（${rep.warnings.length} 項）：`,
        ...(rep.warnings.length ? rep.warnings.map((w, i) => `${i + 1}. ${w.rule}：${w.detail}`) : ['（無）'])
      ];
      try { await navigator.clipboard.writeText(lines.join('\n')); toast('已複製檢核摘要至剪貼簿'); } catch { toast('無法存取剪貼簿'); }
    });

    // Weekly Statutory & 115-2 School-based Framework
    root.querySelectorAll('[data-wk-mode]').forEach((b) => {
      b.addEventListener('click', () => { state.weekly.mode = b.dataset.wkMode; renderWorkspace(); });
    });
    root.querySelectorAll('[data-fw-grade]').forEach((b) => {
      b.addEventListener('click', () => { state.weekly.fwGradeFilter = b.dataset.fwGrade; renderWorkspace(); });
    });
    root.querySelector('#fw-editor-name')?.addEventListener('input', (e) => {
      setTeacherName(e.target.value, 'fw-editor-name');
    });
    root.querySelector('#btn-fw-sync')?.addEventListener('click', () => {
      syncFrameworkFromServer(false);
    });
    root.querySelector('#btn-fw-history')?.addEventListener('click', () => {
      state.weekly.fwShowHistory = !state.weekly.fwShowHistory;
      renderWorkspace();
      if (state.weekly.fwShowHistory) fetchFwHistory();
    });
    root.querySelector('#btn-fw-conflict-merge')?.addEventListener('click', () => {
      const cf = state.weekly.fwConflict;
      if (!cf) return;
      const a = String(cf.latestCell.value || '').trim();
      const b = String(cf.myValue || '').trim();
      const mergedVal = a && b && a !== b ? `${a}\n${b}` : (b || a);
      saveFwCell(cf.cellKey, mergedVal, { force: true, merged: true, skipBlankConfirm: true });
    });
    root.querySelector('#btn-fw-conflict-keep-theirs')?.addEventListener('click', () => {
      const cf = state.weekly.fwConflict;
      if (!cf) return;
      state.weekly.fwCells[cf.cellKey] = cf.latestCell;
      state.weekly.fwConflict = null;
      LS.save('lp115_ws_fw_cells', state.weekly.fwCells);
      toast('已採用伺服器最新版本');
      renderWorkspace();
    });
    root.querySelector('#btn-fw-conflict-force')?.addEventListener('click', () => {
      const cf = state.weekly.fwConflict;
      if (!cf) return;
      saveFwCell(cf.cellKey, cf.myValue, { force: true, skipBlankConfirm: true });
    });
    root.querySelectorAll('[data-fw-restore-idx]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const idx = Number(btn.dataset.fwRestoreIdx);
        const mode = btn.dataset.fwRestoreMode;
        const h = state.weekly.fwHistory[idx];
        if (!h) return;
        const targetVal = mode === 'old' ? h.oldValue : h.newValue;
        const label = getFwCellLabel(h.cellKey);
        if (!window.confirm(`確定要將【${label}】還原為：\n「${targetVal || '（空白）'}」嗎？`)) return;
        const updatedBy = (state.weekly.fwEditorName || '').trim() || ROLES[state.role]?.label || '管理員還原';
        try {
          const res = await fetch('/api/school-framework/restore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cellKey: h.cellKey, value: targetVal, updatedBy })
          });
          const data = await res.json();
          if (res.ok && data.cells) {
            state.weekly.fwCells = { ...state.weekly.fwCells, ...data.cells };
            LS.save('lp115_ws_fw_cells', state.weekly.fwCells);
            toast(`已成功還原【${label}】`);
            fetchFwHistory();
            renderWorkspace();
          }
        } catch {
          toast('還原失敗，請確認伺服器連線狀態');
        }
      });
    });

    root.querySelectorAll('[data-fw-cell]').forEach((ta) => {
      ta.addEventListener('change', () => {
        const key = ta.dataset.fwCell;
        const val = ta.value.trim();
        saveFwCell(key, val);
      });
    });

    root.querySelector('#btn-export-fw')?.addEventListener('click', () => {
      window.Framework115_2.exportFrameworkWord(state.weekly.fwCells);
      toast('已匯出《115下_龍埔國小校本課程架構表》Word 檔');
    });
    root.querySelector('#btn-export-stat-all')?.addEventListener('click', () => {
      window.Framework115_2.exportStatutoryWord(STATUTORY_ISSUES, state.weekly.items, 'all', state.weekly.stat115_1);
      toast('已匯出全校 1–6 年級《法律規定教育議題實施規劃》Word 檔');
    });
    root.querySelector('#btn-export-stat-grade')?.addEventListener('click', () => {
      window.Framework115_2.exportStatutoryWord(STATUTORY_ISSUES, state.weekly.items, state.weekly.chairGradeFilter, state.weekly.stat115_1);
      toast(`已匯出 ${state.weekly.chairGradeFilter} 年級《法律規定教育議題實施規劃》Word 檔`);
    });
    root.querySelectorAll('[data-quick-topic]').forEach((b) => {
      b.addEventListener('click', () => {
        state.weekly.topicName = b.dataset.quickTopic;
        renderWorkspace();
      });
    });

    root.querySelector('#wk-grade')?.addEventListener('change', (e) => {
      const tc = getTermContext();
      state.weekly.grade = e.target.value;
      const maxW = state.weekly.grade === '6' ? tc.weeksG6 : tc.weeksG15;
      state.weekly.selectedWeeks = state.weekly.selectedWeeks.filter((n) => n <= maxW);
      renderWorkspace();
    });
    root.querySelector('#wk-domain')?.addEventListener('change', (e) => { state.weekly.domain = e.target.value; });
    root.querySelector('#wk-teacher')?.addEventListener('input', (e) => { setTeacherName(e.target.value, 'wk-teacher'); });
    root.querySelector('#wk-topic')?.addEventListener('change', (e) => { state.weekly.topicName = e.target.value; renderWorkspace(); });
    root.querySelector('#wk-periods')?.addEventListener('input', (e) => {
      const p = Number(e.target.value || 0);
      state.weekly.periods = p;
      state.weekly.hours = Math.round((p * 40 / 60) * 10) / 10;
      const hEl = root.querySelector('#wk-hours');
      if (hEl) hEl.value = state.weekly.hours;
    });
    root.querySelector('#wk-hours')?.addEventListener('input', (e) => { state.weekly.hours = Number(e.target.value || 0); });
    root.querySelector('#wk-note')?.addEventListener('input', (e) => { state.weekly.note = e.target.value; });
    root.querySelectorAll('[data-wk-toggle]').forEach((b) => {
      b.addEventListener('click', () => {
        const n = Number(b.dataset.wkToggle);
        const idx = state.weekly.selectedWeeks.indexOf(n);
        if (idx >= 0) state.weekly.selectedWeeks.splice(idx, 1);
        else state.weekly.selectedWeeks.push(n);
        state.weekly.selectedWeeks.sort((a, b2) => a - b2);
        renderWorkspace();
      });
    });

    root.querySelector('#btn-save-weekly')?.addEventListener('click', async () => {
      const wk = state.weekly;
      if (!wk.selectedWeeks.length) { toast('請至少勾選一個實施週次'); return; }
      const payload = {
        grade: wk.grade,
        domain: wk.domain,
        teacherName: wk.teacherName.trim() || '編寫教師',
        entryType: 'statutory',
        topicName: wk.topicName,
        weeks: [...wk.selectedWeeks],
        hours: wk.hours,
        periods: wk.periods,
        note: wk.note
      };
      if (wk.serverConnected) {
        try {
          const res = await fetch('/api/weekly-plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          wk.items.unshift(data.entry);
          toast('已儲存至全校週次總表');
        } catch (err) { toast(err.message); }
      } else {
        wk.items.unshift({ id: `WP-${Date.now()}`, createdAt: new Date().toISOString(), ...payload, reviewedByChair: false });
        LS.save('lp115_ws_weekly_local', wk.items);
        toast('已儲存至總表，可於檢核分頁匯出 Word 檔');
      }
      renderWorkspace();
    });

    root.querySelectorAll('[data-wk-del]').forEach((b) => {
      b.addEventListener('click', async () => {
        const id = b.dataset.wkDel;
        if (state.weekly.serverConnected) {
          await fetch(`/api/weekly-plan?id=${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {});
        }
        state.weekly.items = state.weekly.items.filter((x) => x.id !== id);
        LS.save('lp115_ws_weekly_local', state.weekly.items);
        toast('已刪除該筆週次紀錄');
        renderWorkspace();
      });
    });

    root.querySelectorAll('[data-chair-grade]').forEach((b) => {
      b.addEventListener('click', () => { state.weekly.chairGradeFilter = b.dataset.chairGrade; renderWorkspace(); });
    });

    root.querySelectorAll('[data-chair-toggle-review]').forEach((b) => {
      b.addEventListener('click', async () => {
        const id = b.dataset.chairToggleReview;
        const nextVal = b.dataset.cur !== '1';
        const item = state.weekly.items.find((x) => x.id === id);
        if (item) item.reviewedByChair = nextVal;
        if (state.weekly.serverConnected) {
          await fetch('/api/weekly-plan', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, reviewedByChair: nextVal }) }).catch(() => {});
        } else {
          LS.save('lp115_ws_weekly_local', state.weekly.items);
        }
        toast(nextVal ? '已標記學年主任檢核完成' : '已取消檢核標記');
        renderWorkspace();
      });
    });

    // Library
    const libSearch = root.querySelector('#lib-search');
    if (libSearch) {
      libSearch.addEventListener('input', () => {
        state.libQuery = libSearch.value;
        const pos = libSearch.selectionStart;
        renderWorkspace();
        const nextInput = document.getElementById('lib-search');
        if (nextInput) { nextInput.focus(); nextInput.setSelectionRange(pos, pos); }
      });
    }
    root.querySelectorAll('[data-lib-filter]').forEach((b) => b.addEventListener('click', () => { state.libFilter = b.dataset.libFilter; state.libSubpath = ''; renderWorkspace(); }));
    root.querySelectorAll('[data-lib-select]').forEach((b) => b.addEventListener('click', () => { state.libSelectedId = b.dataset.libSelect; state.libSubpath = ''; renderWorkspace(); }));
    root.querySelectorAll('[data-lib-open-sub]').forEach((b) => b.addEventListener('click', () => { state.libSubpath = b.dataset.libOpenSub || ''; renderWorkspace(); }));
    root.querySelector('#btn-lib-refresh')?.addEventListener('click', (e) => {
      const cat = e.currentTarget.dataset.libCat;
      if (cat) tryFetchLiveLibraryFiles(cat, state.libSubpath || '', true);
    });

    // Kanban
    root.querySelectorAll('[data-kb-filter]').forEach((b) => b.addEventListener('click', () => { state.kanbanFilter = b.dataset.kbFilter; renderWorkspace(); }));
    root.querySelectorAll('[data-kb-move]').forEach((b) => {
      b.addEventListener('click', () => {
        state.kanbanStatus[b.dataset.kbMove] = b.dataset.kbTo;
        LS.save('lp115_ws_kanban', state.kanbanStatus);
        renderWorkspace();
      });
    });
    root.querySelector('#kb-reset')?.addEventListener('click', () => {
      state.kanbanStatus = defaultKanbanStatus();
      LS.save('lp115_ws_kanban', state.kanbanStatus);
      toast('已重設看板示範狀態');
      renderWorkspace();
    });
    let draggedId = null;
    root.querySelectorAll('[data-kb-card]').forEach((card) => card.addEventListener('dragstart', () => { draggedId = card.dataset.kbCard; }));
    root.querySelectorAll('[data-kb-col]').forEach((col) => {
      col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('is-over'); });
      col.addEventListener('dragleave', () => col.classList.remove('is-over'));
      col.addEventListener('drop', (e) => {
        e.preventDefault(); col.classList.remove('is-over');
        if (draggedId) {
          state.kanbanStatus[draggedId] = col.dataset.kbCol;
          LS.save('lp115_ws_kanban', state.kanbanStatus);
          toast('已更新進度狀態');
          renderWorkspace();
        }
      });
    });

    // Review Checklist (下拉式選單 ＋ 複數初審教師防覆蓋同步 ＋ 可修正取消模式)
    root.querySelector('#rev-domain-select')?.addEventListener('change', (e) => {
      state.review.selectedDomainId = e.target.value;
      state.review.conflict = null;
      state.review.editingNamesStage = '';
      LS.save('lp115_ws_review_domain', state.review.selectedDomainId);
      renderWorkspace();
      syncReviewFromServer(true);
    });
    root.querySelector('#btn-rev-sync')?.addEventListener('click', () => {
      syncReviewFromServer(false);
    });
    root.querySelector('#btn-rev-reset-domain')?.addEventListener('click', async () => {
      const domains = getReviewDomainList();
      const selected = domains.find((d) => d.id === state.review.selectedDomainId) || domains[0];
      if (!window.confirm(`確定要清空【${selected.code}-${selected.label}】的所有審查結果、勾選與初審／複審教師姓名嗎？`)) return;
      state.review.conflict = null;
      state.review.editingNamesStage = '';
      await patchReviewDomain(selected.id, { op: 'resetDomain' });
      toast(`已清空【${selected.code}-${selected.label}】審查紀錄與署名`);
      renderWorkspace();
    });
    root.querySelectorAll('[data-rev-remove-who]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const raw = btn.dataset.revRemoveWho || '';
        const sep = raw.indexOf(':');
        if (sep < 0) return;
        const stage = raw.slice(0, sep);
        const targetName = raw.slice(sep + 1);
        const did = state.review.selectedDomainId;
        await patchReviewDomain(did, { op: 'removeReviewer', stage, targetName });
        toast(`已移除「${targetName}」`);
        renderWorkspace();
      });
    });
    root.querySelectorAll('[data-rev-edit-names]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.review.editingNamesStage = btn.dataset.revEditNames || 'init';
        renderWorkspace();
        const inp = document.getElementById('rev-names-input');
        if (inp) { inp.focus(); inp.select(); }
      });
    });
    root.querySelector('#btn-rev-save-names')?.addEventListener('click', async (e) => {
      const stage = e.currentTarget.dataset.stage || 'init';
      const inp = root.querySelector('#rev-names-input');
      const val = inp ? inp.value.trim() : '';
      const did = state.review.selectedDomainId;
      state.review.editingNamesStage = '';
      await patchReviewDomain(did, { op: 'setReviewers', stage, names: val });
      toast('已更新審查人員名單');
      renderWorkspace();
    });
    root.querySelector('#rev-names-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        root.querySelector('#btn-rev-save-names')?.click();
      } else if (e.key === 'Escape') {
        state.review.editingNamesStage = '';
        renderWorkspace();
      }
    });
    root.querySelector('#btn-rev-cancel-names')?.addEventListener('click', () => {
      state.review.editingNamesStage = '';
      renderWorkspace();
    });
    root.querySelectorAll('[data-rev-clear-grade]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const g = btn.dataset.revClearGrade;
        const did = state.review.selectedDomainId;
        await patchReviewDomain(did, { op: 'clearGrade', grade: g });
        toast('已取消該年級審查結果與意見');
        renderWorkspace();
      });
    });
    root.querySelectorAll('[data-rev-gstatus]').forEach((b) => {
      b.addEventListener('click', async () => {
        const [g, status] = b.dataset.revGstatus.split(':');
        const did = state.review.selectedDomainId;
        const cur = normalizeClientReviewRec(state.review.records[did]);
        const prevStatus = cur.grades?.[g]?.status || '';
        const nextStatus = prevStatus === status ? '' : status;
        await patchReviewDomain(did, { op: 'gradeStatus', grade: g, status: nextStatus });
        toast(nextStatus ? '已同步儲存審查情形與填寫人' : '已取消該年級審查選取');
        renderWorkspace();
      });
    });
    root.querySelectorAll('[data-rev-gcomment]').forEach((inp) => {
      inp.addEventListener('change', async () => {
        const g = inp.dataset.revGcomment;
        const did = state.review.selectedDomainId;
        const cur = normalizeClientReviewRec(state.review.records[did]);
        const expectedVersion = typeof cur.grades?.[g]?.version === 'number' ? cur.grades[g].version : 0;
        const res = await patchReviewDomain(did, {
          op: 'gradeComment',
          grade: g,
          comment: inp.value.trim(),
          expectedVersion
        });
        if (!res?.conflict) {
          toast('已同步儲存審查意見');
          renderWorkspace();
        }
      });
    });
    root.querySelector('#btn-rev-conflict-merge')?.addEventListener('click', async () => {
      const cf = state.review.conflict;
      if (!cf) return;
      const a = String(cf.latestGrade.comment || '').trim();
      const b = String(cf.myComment || '').trim();
      const mergedVal = a && b && a !== b ? `${a}；${b}` : (b || a);
      await patchReviewDomain(cf.domainId, {
        op: 'gradeComment',
        grade: cf.grade,
        comment: mergedVal,
        force: true,
        merged: true
      });
      toast('已合併保留雙方意見並安全存檔');
      renderWorkspace();
    });
    root.querySelector('#btn-rev-conflict-keep-theirs')?.addEventListener('click', () => {
      state.review.conflict = null;
      toast('已採用伺服器最新版本');
      renderWorkspace();
    });
    root.querySelector('#btn-rev-conflict-force')?.addEventListener('click', async () => {
      const cf = state.review.conflict;
      if (!cf) return;
      await patchReviewDomain(cf.domainId, {
        op: 'gradeComment',
        grade: cf.grade,
        comment: cf.myComment,
        force: true
      });
      toast('已更新審查意見');
      renderWorkspace();
    });
    root.querySelectorAll('[data-rev-check]').forEach((cb) => {
      cb.addEventListener('change', async () => {
        const [stage, itemId] = cb.dataset.revCheck.split(':');
        const did = state.review.selectedDomainId;
        await patchReviewDomain(did, {
          op: 'checkItem',
          stage,
          itemId,
          checked: cb.checked
        });
        renderWorkspace();
      });
    });
    root.querySelector('#btn-rev-check-all-init')?.addEventListener('click', async () => {
      const domains = getReviewDomainList();
      const selected = domains.find((d) => d.id === state.review.selectedDomainId) || domains[0];
      const spec = getDomainReviewSpec(selected);
      const itemIds = (spec.items || []).map((it) => it.id);
      await patchReviewDomain(selected.id, { op: 'checkAll', stage: 'init', itemIds });
      toast(`初審 ${itemIds.length} 項已全部勾選並存檔`);
      renderWorkspace();
    });
    root.querySelector('#btn-rev-uncheck-all-init')?.addEventListener('click', async () => {
      const did = state.review.selectedDomainId;
      await patchReviewDomain(did, { op: 'uncheckAll', stage: 'init' });
      toast('已取消全部初審勾選');
      renderWorkspace();
    });
    root.querySelector('#btn-rev-check-all-final')?.addEventListener('click', async () => {
      const domains = getReviewDomainList();
      const selected = domains.find((d) => d.id === state.review.selectedDomainId) || domains[0];
      const spec = getDomainReviewSpec(selected);
      const itemIds = (spec.items || []).map((it) => it.id);
      await patchReviewDomain(selected.id, { op: 'checkAll', stage: 'final', itemIds });
      toast(`複審 ${itemIds.length} 項已全部勾選並存檔`);
      renderWorkspace();
    });
    root.querySelector('#btn-rev-uncheck-all-final')?.addEventListener('click', async () => {
      const did = state.review.selectedDomainId;
      await patchReviewDomain(did, { op: 'uncheckAll', stage: 'final' });
      toast('已取消全部複審勾選');
      renderWorkspace();
    });
    root.querySelectorAll('[data-rev-overall]').forEach((b) => {
      b.addEventListener('click', async () => {
        const [stage, val] = b.dataset.revOverall.split(':');
        const did = state.review.selectedDomainId;
        const cur = normalizeClientReviewRec(state.review.records[did]);
        const prev = stage === 'final' ? cur.finalResult : cur.initialResult;
        const nextVal = prev === val ? '' : val;
        await patchReviewDomain(did, { op: 'overallResult', stage, result: nextVal });
        toast('已儲存審查結果');
        renderWorkspace();
      });
    });
    root.querySelector('#btn-export-rev-word')?.addEventListener('click', () => {
      const domains = getReviewDomainList();
      const selected = domains.find((d) => d.id === state.review.selectedDomainId) || domains[0];
      const spec = getDomainReviewSpec(selected);
      const rec = normalizeClientReviewRec(state.review.records[selected.id]);
      const tc = getTermContext();
      window.Framework115_2.exportReviewChecklistWord(selected, rec, spec, tc.termFull);
      toast(`已匯出《${selected.code}-${selected.label} 審查檢核表》Word 檔`);
    });

    // Admin Settings (即時連動儲存，確保正式繳交上傳之校訂名稱 100% 同步)
    const refreshAdmPreviewDom = (draft) => {
      const box = root.querySelector('#adm-live-preview');
      if (!box) return;
      const ptc = getTermContext(draft);
      box.innerHTML = `
        <div style="font-weight:700; margin-bottom:6px;">${esc(ptc.termFull)} 開放撰寫校訂課程即時預覽（修改後已即時同步至全站）</div>
        <div class="grid-3" style="gap:8px; font-size:13px;">
          ${['1', '2', '3', '4', '5', '6'].map((g) => `
            <div><strong>${g} 年級：</strong>${ptc.activeAllSchoolByGrade[g].length ? esc(ptc.activeAllSchoolByGrade[g].join('、')) : '<span style="color:var(--text-muted);">無</span>'}</div>
          `).join('')}
        </div>
      `;
    };

    root.querySelector('#adm-year')?.addEventListener('input', (e) => {
      const d = ensureSettingsDraft();
      d.academicYear = e.target.value;
      refreshAdmPreviewDom(d);
      queueAutoSaveSettings(d, false);
    });
    root.querySelectorAll('[data-adm-sem]').forEach((b) => {
      b.addEventListener('click', () => {
        const d = ensureSettingsDraft();
        d.semester = b.dataset.admSem;
        d.weeksG6 = d.semester === '上' ? 21 : 19;
        queueAutoSaveSettings(d, true);
      });
    });
    root.querySelector('#adm-w15')?.addEventListener('input', (e) => {
      const d = ensureSettingsDraft();
      d.weeksG15 = Number(e.target.value || 21);
      queueAutoSaveSettings(d, false);
    });
    root.querySelector('#adm-w6')?.addEventListener('input', (e) => {
      const d = ensureSettingsDraft();
      d.weeksG6 = Number(e.target.value || 19);
      queueAutoSaveSettings(d, false);
    });
    root.querySelector('#adm-open-ministry')?.addEventListener('change', (e) => {
      const d = ensureSettingsDraft();
      d.openMinistry = e.target.checked;
      queueAutoSaveSettings(d, true);
    });
    root.querySelector('#adm-sped-t1')?.addEventListener('change', (e) => {
      const d = ensureSettingsDraft();
      d.openSpedTerm1 = e.target.checked;
      queueAutoSaveSettings(d, true);
    });
    root.querySelector('#adm-sped-t2')?.addEventListener('change', (e) => {
      const d = ensureSettingsDraft();
      d.openSpedTerm2 = e.target.checked;
      queueAutoSaveSettings(d, true);
    });

    root.querySelectorAll('[data-adm-cname]').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        const [g, idx] = inp.dataset.admCname.split(':');
        const d = ensureSettingsDraft();
        if (d.gradeCourses[g]?.[Number(idx)]) {
          d.gradeCourses[g][Number(idx)].name = e.target.value;
          refreshAdmPreviewDom(d);
          queueAutoSaveSettings(d, false);
        }
      });
    });
    root.querySelectorAll('[data-adm-ccat]').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        const [g, idx] = sel.dataset.admCcat.split(':');
        const d = ensureSettingsDraft();
        if (d.gradeCourses[g]?.[Number(idx)]) d.gradeCourses[g][Number(idx)].category = e.target.value;
        queueAutoSaveSettings(d, true);
      });
    });
    root.querySelectorAll('[data-adm-cterm]').forEach((cb) => {
      cb.addEventListener('change', (e) => {
        const [g, idx, key] = cb.dataset.admCterm.split(':');
        const d = ensureSettingsDraft();
        if (d.gradeCourses[g]?.[Number(idx)]) d.gradeCourses[g][Number(idx)][key] = e.target.checked;
        queueAutoSaveSettings(d, true);
      });
    });
    root.querySelectorAll('[data-adm-add-course]').forEach((b) => {
      b.addEventListener('click', () => {
        const g = b.dataset.admAddCourse;
        const d = ensureSettingsDraft();
        if (!d.gradeCourses[g]) d.gradeCourses[g] = [];
        d.gradeCourses[g].push({
          name: '新校訂課程',
          category: d.semester === '下' ? 'ext' : 'general',
          term1: d.semester === '上',
          term2: d.semester === '下'
        });
        queueAutoSaveSettings(d, true);
      });
    });
    root.querySelectorAll('[data-adm-del]').forEach((b) => {
      b.addEventListener('click', () => {
        const [g, idx] = b.dataset.admDel.split(':');
        const d = ensureSettingsDraft();
        if (d.gradeCourses[g]) d.gradeCourses[g].splice(Number(idx), 1);
        queueAutoSaveSettings(d, true);
      });
    });
    root.querySelector('#btn-preset-term1')?.addEventListener('click', () => {
      const d = ensureSettingsDraft();
      d.semester = '上';
      d.weeksG15 = 21;
      d.weeksG6 = 21;
      d.openMinistry = true;
      d.openSpedTerm1 = true;
      queueAutoSaveSettings(d, true);
      toast('已套用並同步「上學期」預設');
    });
    root.querySelector('#btn-preset-term2')?.addEventListener('click', () => {
      const d = ensureSettingsDraft();
      d.semester = '下';
      d.weeksG15 = 21;
      d.weeksG6 = 19;
      d.openMinistry = true;
      d.openSpedTerm2 = false;
      queueAutoSaveSettings(d, true);
      toast('已套用並同步「下學期」預設');
    });
    root.querySelector('#btn-save-settings')?.addEventListener('click', () => {
      const d = ensureSettingsDraft();
      if (!String(d.academicYear || '').trim()) {
        toast('請輸入學年度（例如 115 或 116）');
        return;
      }
      savePlatformSettings(d);
    });
  }

  function setView(viewId) {
    state.view = viewId;
    LS.save('lp115_ws_view', viewId);
    renderWorkspace();
  }

  function setRole(roleId, silent = false) {
    const roleCfg = ROLES[roleId] || ROLES.teacher;
    state.role = roleId;
    LS.save('lp115_ws_role', roleId);
    state.view = roleCfg.defaultView || 'wizard';
    if (roleCfg.defaultWeeklyMode) {
      state.weekly.mode = roleCfg.defaultWeeklyMode;
    }
    LS.save('lp115_ws_view', state.view);
    if (!silent) toast(`已切換至「${roleCfg.label}」工作區`);
    renderWorkspace();
  }

  function syncEntryPortalUI() {
    const tc = getTermContext();
    const subEl = document.getElementById('entry-term-subtitle');
    const chipEl = document.getElementById('entry-scope-chip');
    const lockEl = document.getElementById('entry-locked-note');
    if (subEl) subEl.textContent = tc.termFull;
    if (chipEl) chipEl.textContent = tc.entryScopeText;
    if (lockEl) lockEl.textContent = tc.lockedNoteText;

    const filled = Boolean(String(state.teacherName || '').trim());
    const entryInput = document.getElementById('entry-teacher-name');
    const entryZone = document.getElementById('entry-name-zone');
    const entryTag = document.getElementById('entry-name-tag');
    if (entryInput && entryInput.value !== state.teacherName) {
      entryInput.value = state.teacherName;
    }
    if (entryZone) {
      entryZone.classList.toggle('is-resolved', filled);
    }
    if (entryTag) {
      entryTag.textContent = filled ? '已填妥・自動帶入' : '待填寫';
    }
    document.querySelectorAll('[data-entry-role]').forEach((btn) => {
      btn.classList.toggle('selected', btn.dataset.entryRole === state.role);
    });
  }

  function setTeacherName(name, sourceId = '') {
    state.teacherName = name;
    state.weekly.teacherName = name;
    state.weekly.fwEditorName = name;
    LS.save('lp115_ws_teacher_name', name);
    LS.save('lp115_ws_editor_name', name);
    const filled = Boolean(String(name || '').trim());
    ['entry-teacher-name', 'sidebar-teacher-name', 'mobile-teacher-name', 'fw-editor-name', 'wk-teacher'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (id !== sourceId && el.value !== name) el.value = name;
      if (id === 'sidebar-teacher-name') {
        el.classList.toggle('has-value', filled);
      } else if (id === 'wk-teacher' || id === 'fw-editor-name') {
        el.classList.toggle('is-filled-ok', filled);
        el.classList.toggle('is-empty-warn', !filled);
      }
    });
    syncEntryPortalUI();
  }

  function enterWorkspace(roleId) {
    const chosenRole = roleId || state.role || 'teacher';
    const name = String(state.teacherName || '').trim();
    if (!name) {
      const inp = document.getElementById('entry-teacher-name');
      if (inp) inp.focus();
      toast('請先於「步驟一」填入您的姓名');
      return;
    }
    try { sessionStorage.setItem('lp115_ws_entered', '1'); } catch {}
    document.body.classList.add('is-entered');
    setRole(chosenRole);
  }

  function showEntryPortal() {
    try { sessionStorage.removeItem('lp115_ws_entered'); } catch {}
    document.body.classList.remove('is-entered');
    syncEntryPortalUI();
  }

  document.querySelectorAll('[data-view]').forEach((btn) => btn.addEventListener('click', () => setView(btn.dataset.view)));
  document.getElementById('entry-teacher-name')?.addEventListener('input', (e) => setTeacherName(e.target.value, 'entry-teacher-name'));
  document.getElementById('entry-teacher-name')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      enterWorkspace(state.role);
    }
  });
  document.getElementById('sidebar-teacher-name')?.addEventListener('input', (e) => setTeacherName(e.target.value, 'sidebar-teacher-name'));
  document.getElementById('mobile-teacher-name')?.addEventListener('input', (e) => setTeacherName(e.target.value, 'mobile-teacher-name'));

  document.querySelectorAll('[data-entry-role]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const picked = btn.dataset.entryRole;
      state.role = picked;
      LS.save('lp115_ws_role', picked);
      syncEntryPortalUI();
    });
  });

  document.getElementById('btn-enter-workspace')?.addEventListener('click', () => enterWorkspace(state.role));
  document.getElementById('btn-back-entry')?.addEventListener('click', showEntryPortal);
  document.getElementById('mobile-back-entry')?.addEventListener('click', showEntryPortal);

  // 初始化
  setTeacherName(state.teacherName);
  let alreadyEntered = false;
  try { alreadyEntered = sessionStorage.getItem('lp115_ws_entered') === '1'; } catch {}
  if (alreadyEntered && String(state.teacherName || '').trim()) {
    document.body.classList.add('is-entered');
  } else {
    document.body.classList.remove('is-entered');
    syncEntryPortalUI();
  }

  renderWorkspace();
  tryFetchPlatformSettings();
  tryFetchReviewChecklists();
  tryFetchWeeklyPlans();
  setInterval(() => {
    if (!document.body.classList.contains('is-entered')) return;
    if (state.view === 'weekly' && state.weekly.mode === 'framework' && !state.weekly.fwConflict) {
      syncFrameworkFromServer(true);
    } else if (state.view === 'review-checklist' && !state.review.conflict) {
      syncReviewFromServer(true);
    }
  }, 12000);
})();
