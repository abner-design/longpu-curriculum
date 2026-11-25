/**
 * 龍埔國小 115 學年度第二學期（115下）校本課程架構表資料 ＆ 課程總體架構表 Word 一鍵匯出引擎
 * 資料來源：本校《附件4-115學年度校本課程架構(115.06.03課發會通過).docx》第 21–32 列
 */

window.Framework115_2 = (function () {
  const COMPETENCIES = [
    { key: 'en',     group: '全球素養｜大眼看世界(龍埔Link)',素养: '國際理解',  ability: '英語力' },
    { key: 'read',   group: '全球素養｜大眼看世界(龍埔Link)',素养: '多元文化',  ability: '閱讀寫作力' },
    { key: 'explore',group: '低碳環境｜龍埔好環境',         素养: '環境探索',  ability: '探索力' },
    { key: 'act',    group: '低碳環境｜龍埔好環境',         素养: '生活實踐',  ability: '實踐力' },
    { key: 'art',    group: '多元展能｜小龍與小埔',         素养: '藝術科技涵養', ability: '美感素養' },
    { key: 'health', group: '多元展能｜小龍與小埔',         素养: '身心精進',  ability: '健康樂活' }
  ];

  // 真實 115 第二學期各年級主題課程與初始實施時間（依課發會通過版）
  const ROWS = [
    {
      grade: '一',
      gradeNum: '1',
      cols: {
        en:      { topic: '1. ABC字母創作\n2. 英語同樂會-英語學習闖關活動', defaultTime: '' },
        read:    { topic: '1. 親近大草坡 (國)\n2. 共讀書9本', defaultTime: '' },
        explore: { topic: '1. 繪本：嘓嘓探險記(校訂)\n2. 認識龍埔花草 (實地探查)(校訂)', defaultTime: '' },
        act:     { topic: '1. 戶外教育-社教場所(校訂)\n2. 防災教育：認識防災避難包(校訂)', defaultTime: '' },
        art:     { topic: '1. 運動會藝術裝飾創意進場(美)\n2. 版畫：珍珠版畫(美)\n3. 與音樂家有約：莫札特(音)\n4. 與藝術家有約：草間彌生(美)', defaultTime: '3. 第13-17週（其餘待填）' },
        health:  { topic: '1. 洗手預防腸病毒和流感(健)\n2. 生命教育宣導(輔)', defaultTime: '配合115下學校行事曆' }
      }
    },
    {
      grade: '二',
      gradeNum: '2',
      cols: {
        en:      { topic: '1. ABC Phonics Chant(英)\n2. 英語同樂會--唸謠表演(校訂)', defaultTime: '' },
        read:    { topic: '1. 大草坡詩歌2(國)\n2. 共讀書8本', defaultTime: '' },
        explore: { topic: '1. 認識龍埔八大景(校訂)\n2. 親親綠意森林/鳳凰木(校訂)', defaultTime: '1. 第4週\n2. 第19週' },
        act:     { topic: '1. 文化小學堂(校訂)\n2. 戶外教育(校訂)', defaultTime: '1. 第12週\n2. 第10週' },
        art:     { topic: '1. 歌曲：龍埔校歌(音)\n2. 運動會手拿扇創意進場(美)\n3. 版畫：紙版畫(美)\n4. 歌曲-心願(音)', defaultTime: '' },
        health:  { topic: '1. 活力四射運動會(校訂)\n2. 流感小尖兵(健)', defaultTime: '配合115下學校行事曆' }
      }
    },
    {
      grade: '三',
      gradeNum: '3',
      cols: {
        en:      { topic: '1. 英語歌曲教學(英)', defaultTime: '' },
        read:    { topic: '1. 大草坡五感小書創作(國)\n2. 共讀書9本', defaultTime: '' },
        explore: { topic: '1. 珍惜水資源(綜)\n2. 家鄉風情畫-三峽(社)', defaultTime: '' },
        act:     { topic: '1. 戶外教育(農場體驗)(綜)\n2. 防災教育：煙霧體驗(學)\n3. 我的夢想職業(綜)\n4. 龍埔開心蔬果園丁(自)', defaultTime: '' },
        art:     { topic: '1. 校慶藝術佈置(美)\n2. 資訊-打字迅猛龍(資)\n3. 版畫：軟塑版(美)\n4. 與音樂家有約：貝多芬(音)', defaultTime: '' },
        health:  { topic: '1. 校慶運動會相關系列活動(學/體)', defaultTime: '配合115下學校行事曆' }
      }
    },
    {
      grade: '四',
      gradeNum: '4',
      cols: {
        en:      { topic: '1. 英語同樂會-英語童詩創作朗誦表演', defaultTime: '' },
        read:    { topic: '1. 大草坡故事小書創作(國)\n2. 共讀書10本', defaultTime: '' },
        explore: { topic: '1. 愛我家鄉2-三峽(社)\n2. 認識先民的器具(參觀校史室)(社)', defaultTime: '' },
        act:     { topic: '1. 戶外教育(綜)', defaultTime: '' },
        art:     { topic: '1. 資訊—文書處理(資)\n2. 版畫：樹脂版(美)\n3. 與音樂家有約：巴赫(音)\n4. 與藝術家有約：秀拉(美)', defaultTime: '' },
        health:  { topic: '1. 家庭教育宣導(輔/綜)\n2. 校慶運動會相關系列活動(學/體)', defaultTime: '配合115下學校行事曆' }
      }
    },
    {
      grade: '五',
      gradeNum: '5',
      cols: {
        en:      { topic: '1. 讀者劇場課堂延伸練習', defaultTime: '' },
        read:    { topic: '1. 共讀書9本', defaultTime: '' },
        explore: { topic: '1. 踏查龍埔生態廊道-生物運動繁殖(自)\n2. 龍埔綠建築1(綜)', defaultTime: '' },
        act:     { topic: '1. 戶外教育(綜)\n2. 自治市長選舉(綜)', defaultTime: '' },
        art:     { topic: '1. 資訊—簡報製作(資)\n2. 版畫：軟塑版(美)\n3. 與音樂家有約：舒伯特(音)\n4. 與藝術家有約：李梅樹(美)', defaultTime: '' },
        health:  { topic: '1. 校慶運動會相關系列活動(學/體)\n2. 水域活動體驗(體)', defaultTime: '配合115下學校行事曆' }
      }
    },
    {
      grade: '六',
      gradeNum: '6',
      cols: {
        en:      { topic: '1. 畢業歌曲大合唱表演', defaultTime: '' },
        read:    { topic: '1. 共讀書9本', defaultTime: '第1-17週' },
        explore: { topic: '（本學期重點移至實踐力環境檢測）', defaultTime: '—', readonly: true },
        act:     { topic: '1. 龍埔探險家-環境檢測(自)\n2. 社會關懷與服務(綜)\n3. 畢業感恩餐會(綜)\n4. 畢業典禮(綜)', defaultTime: '1. 待填\n2. 第17週\n3. 第17週\n4. 第17週' },
        art:     { topic: '1. 畢業歌曲(音)\n2. 畢業美展(美)\n3. 資訊—影音編輯(資)\n4. 版畫：新孔版(美)\n5. 與藝術家有約：亨利·馬諦斯(美)\n6. 生活美感與創新(綜)\n7. 網路資源使用(綜)', defaultTime: '3. 第1週（其餘待填）' },
        health:  { topic: '1. 校慶健康操表演(學/體)\n2. 水域活動體驗(體)\n3. 性平教育宣導(輔/綜)', defaultTime: '配合115下學校行事曆' }
      }
    }
  ];

  const SCHOOL_EVENTS_ROW = {
    en:      { topic: '', time: '' },
    read:    { topic: '週三無聲共讀(教)\n圖書館每月主題活動(教)\n學年共讀書箱(教)\n閱讀認證(教)\n龍飛PHONE舞廣播(學)\n校刊—龍時代出版(教)', time: '配合115下學校行事曆' },
    explore: { topic: '', time: '' },
    act:     { topic: '防災防震教育(學)\n母親節活動(輔)\n自治市長選舉(學)', time: '配合115下學校行事曆' },
    art:     { topic: '校園藝術秀(學)\n學藝活動(學)', time: '配合115下學校行事曆' },
    health:  { topic: '校慶運動園遊會(學)\n反毒健康小學堂(學)\n反霸凌宣導(學)\n交通安全教育宣導(學)\n兒童節系列活動(學)', time: '配合115下學校行事曆' }
  };

  // [115-1 STATUTORY SNAPSHOT]
  // 來源：115-1 部定課程／08-學校課程總體架構／115學年度議題實施融入時數彙整表（G1–G6）
  const STATUTORY_115_1_SNAPSHOT = {"1":{"3":{"moePeriods":18,"moeHours":12,"flex1Hours":9,"flex2Hours":0,"flex2Periods":0,"term1Hours":21,"term1Periods":31.5,"entries":["校訂-走讀龍埔(上9)","生活6節","國語文12節"]},"4":{"moePeriods":18,"moeHours":12,"flex1Hours":2,"flex2Hours":0,"flex2Periods":0,"term1Hours":14,"term1Periods":21,"entries":["校訂-走讀龍埔(上2)","數學12節","國語文6節"]},"7":{"moePeriods":11,"moeHours":7.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":7.33,"term1Periods":11,"entries":["數學8節","生活3節"]},"9":{"moePeriods":14,"moeHours":9.33,"flex1Hours":2,"flex2Hours":0,"flex2Periods":0,"term1Hours":11.33,"term1Periods":17,"entries":["校訂-走讀龍埔(上1)","校訂-英閱繪(上1)","數學8節","生活6節"]},"10":{"moePeriods":8,"moeHours":5.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":5.33,"term1Periods":8,"entries":["數學8節"]},"11":{"moePeriods":12,"moeHours":8,"flex1Hours":1,"flex2Hours":0,"flex2Periods":0,"term1Hours":9,"term1Periods":13.5,"entries":["校訂-走讀龍埔(上1)","國語文12節"]}},"2":{"1":{"moePeriods":19,"moeHours":12.67,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":12.67,"term1Periods":19,"entries":["生活11節","數學2節","國語6節"]},"2":{"moePeriods":0,"moeHours":0,"flex1Hours":0,"flex2Hours":0.67,"flex2Periods":1,"term1Hours":0,"term1Periods":0,"entries":["校訂-我是身體的主人(下40分鐘)"]},"3":{"moePeriods":40,"moeHours":26.67,"flex1Hours":2.67,"flex2Hours":4.67,"flex2Periods":7,"term1Hours":29.34,"term1Periods":44,"entries":["校訂-防溺安全宣導防震防災演練/火警疏散(上40分鐘)(下80分鐘)","校訂-校園走一走(上80分鐘)(下80分鐘)","校訂-資源回收利用教育(上40分鐘)","校訂-認識龍埔八大景(下40分鐘)","校訂-健康好寶寶-洗手講座(下80分鐘)","生活10節","數學(未填節數)","國語30節"]},"4":{"moePeriods":6,"moeHours":4,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":4,"term1Periods":6,"entries":["數學(未填節數)","國語6節"]},"7":{"moePeriods":0,"moeHours":0,"flex1Hours":0,"flex2Hours":2,"flex2Periods":3,"term1Hours":0,"term1Periods":0,"entries":["校訂-文化小學堂/多元文化宣導(下40分鐘)","校訂-英語同樂會 /唸謠表演(下80分鐘)"]},"8":{"moePeriods":6,"moeHours":4,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":4,"term1Periods":6,"entries":["生活6節"]},"9":{"moePeriods":6,"moeHours":4,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":4,"term1Periods":6,"entries":["數學(未填節數)","國語6節"]},"10":{"moePeriods":18,"moeHours":12,"flex1Hours":0,"flex2Hours":3,"flex2Periods":4.5,"term1Hours":12,"term1Periods":18,"entries":["校訂-學校生日囉!(下3)","國語18節"]},"11":{"moePeriods":16,"moeHours":10.67,"flex1Hours":2,"flex2Hours":1.33,"flex2Periods":2,"term1Hours":12.67,"term1Periods":19,"entries":["校訂-認識木柵動物園，go! go! go!(上2)","校訂-親親農場體驗(下80分鐘)","生活10節","數學(未填節數)","國語6節"]}},"3":{"1":{"moePeriods":24,"moeHours":16,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":16,"term1Periods":24,"entries":["綜合4節","藝術與人文20節"]},"2":{"moePeriods":4,"moeHours":2.67,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":2.67,"term1Periods":4,"entries":["綜合4節"]},"3":{"moePeriods":14,"moeHours":9.33,"flex1Hours":0,"flex2Hours":2,"flex2Periods":3,"term1Hours":9.33,"term1Periods":14,"entries":["校訂-人文閱讀(下2)","自然5節","國語1節","綜合2節","健體6節"]},"4":{"moePeriods":19,"moeHours":12.67,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":12.67,"term1Periods":19,"entries":["閩語3節","國語3節","綜合6節","社會6節","健體1節"]},"5":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":1.33,"term1Periods":2,"entries":["綜合2節"]},"6":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":1.33,"term1Periods":2,"entries":["綜合2節"]},"7":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":4,"flex2Periods":6,"term1Hours":1.33,"term1Periods":2,"entries":["校訂-人文閱讀(下4)","綜合2節"]},"8":{"moePeriods":5,"moeHours":3.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":3.33,"term1Periods":5,"entries":["閩語3節","綜合2節"]},"9":{"moePeriods":2,"moeHours":1.33,"flex1Hours":1,"flex2Hours":0,"flex2Periods":0,"term1Hours":2.33,"term1Periods":3.5,"entries":["校訂-人文閱讀(上1)","綜合2節"]},"10":{"moePeriods":8,"moeHours":5.33,"flex1Hours":0,"flex2Hours":1,"flex2Periods":1.5,"term1Hours":5.33,"term1Periods":8,"entries":["校訂-人文閱讀(下1)","國語4節","綜合4節"]},"11":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":1.33,"term1Periods":2,"entries":["綜合2節"]}},"4":{"1":{"moePeriods":6,"moeHours":4,"flex1Hours":1,"flex2Hours":0,"flex2Periods":0,"term1Hours":5,"term1Periods":7.5,"entries":["校訂-英閱繪(上1)","國語4節","綜合2節"]},"2":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":1.33,"term1Periods":2,"entries":["綜合2節"]},"3":{"moePeriods":21,"moeHours":14,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":14,"term1Periods":21,"entries":["國語7節","數學4節","自然4節","社會6節"]},"4":{"moePeriods":44,"moeHours":29.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":29.33,"term1Periods":44,"entries":["閩南語6節","數學12節","國語8節","綜合6節","社會12節"]},"5":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":1.33,"term1Periods":2,"entries":["綜合2節"]},"6":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":1.33,"term1Periods":2,"entries":["綜合2節"]},"7":{"moePeriods":15,"moeHours":10,"flex1Hours":3,"flex2Hours":0,"flex2Periods":0,"term1Hours":13,"term1Periods":19.5,"entries":["校訂-人文閱讀(上3)","國語2節","數學5節","綜合2節","社會6節"]},"9":{"moePeriods":4,"moeHours":2.67,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":2.67,"term1Periods":4,"entries":["綜合4節"]},"10":{"moePeriods":14,"moeHours":9.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":9.33,"term1Periods":14,"entries":["國語10節","綜合4節"]},"11":{"moePeriods":27,"moeHours":18,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":18,"term1Periods":27,"entries":["閩南語3節","數學5節","國語5節","綜合8節","社會6節"]}},"5":{"1":{"moePeriods":7,"moeHours":4.67,"flex1Hours":4,"flex2Hours":10,"flex2Periods":15,"term1Hours":8.67,"term1Periods":13,"entries":["校訂-國際教育(下5)","校訂-差異化數學(上4)(下5)","國語文3節","綜合活動4節"]},"2":{"moePeriods":4,"moeHours":2.67,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":2.67,"term1Periods":4,"entries":["綜合活動4節"]},"3":{"moePeriods":64,"moeHours":42.67,"flex1Hours":14,"flex2Hours":6,"flex2Periods":9,"term1Hours":56.67,"term1Periods":85,"entries":["校訂-國際教育(上10)(下6)","校訂-資訊(上4)","社會36節","自然6節","國語文10節","綜合活動12節"]},"4":{"moePeriods":6,"moeHours":4,"flex1Hours":2,"flex2Hours":0,"flex2Periods":0,"term1Hours":6,"term1Periods":9,"entries":["校訂-差異化數學(上2)","綜合活動6節"]},"5":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":1.33,"term1Periods":2,"entries":["綜合活動2節"]},"7":{"moePeriods":2,"moeHours":1.33,"flex1Hours":21,"flex2Hours":20,"flex2Periods":30,"term1Hours":22.33,"term1Periods":33.5,"entries":["校訂-國際教育(上21)(下20)","英語(未填節數)","綜合活動2節"]},"8":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":1.33,"term1Periods":2,"entries":["綜合活動2節"]},"10":{"moePeriods":14,"moeHours":9.33,"flex1Hours":10,"flex2Hours":0,"flex2Periods":0,"term1Hours":19.33,"term1Periods":29,"entries":["校訂-國際教育(上10)","國語文14節"]},"11":{"moePeriods":30,"moeHours":20,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":20,"term1Periods":30,"entries":["自然(未填節數)","國語文20節","綜合活動10節"]}},"6":{"1":{"moePeriods":18,"moeHours":12,"flex1Hours":2,"flex2Hours":2,"flex2Periods":3,"term1Hours":14,"term1Periods":21,"entries":["校訂-數位閱讀寫作(上2)(下2)","綜合14節","社會4節"]},"2":{"moePeriods":2,"moeHours":1.33,"flex1Hours":0,"flex2Hours":2,"flex2Periods":3,"term1Hours":1.33,"term1Periods":2,"entries":["校訂-數位閱讀寫作(下2)","綜合2節"]},"3":{"moePeriods":39,"moeHours":26,"flex1Hours":3,"flex2Hours":1,"flex2Periods":1.5,"term1Hours":29,"term1Periods":43.5,"entries":["校訂-國際教育(上3)(下1)","數學6節","國語文6節","綜合12節","自然11節","社會4節"]},"4":{"moePeriods":8,"moeHours":5.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":5.33,"term1Periods":8,"entries":["國語文4節","綜合2節","社會2節"]},"5":{"moePeriods":4,"moeHours":2.67,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":2.67,"term1Periods":4,"entries":["綜合4節"]},"7":{"moePeriods":15,"moeHours":10,"flex1Hours":8,"flex2Hours":5,"flex2Periods":7.5,"term1Hours":18,"term1Periods":27,"entries":["校訂-國際教育(上3)(下3)","校訂-數位閱讀寫作(下2)","校訂-英語(上5)","數學7節","國語文1節","自然5節","社會2節"]},"8":{"moePeriods":5,"moeHours":3.33,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":3.33,"term1Periods":5,"entries":["綜合5節"]},"9":{"moePeriods":1,"moeHours":0.67,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":0.67,"term1Periods":1,"entries":["自然1節"]},"10":{"moePeriods":9,"moeHours":6,"flex1Hours":0,"flex2Hours":2,"flex2Periods":3,"term1Hours":6,"term1Periods":9,"entries":["校訂-數位閱讀寫作(下2)","數學2節","國語文5節","綜合2節"]},"11":{"moePeriods":12,"moeHours":8,"flex1Hours":0,"flex2Hours":0,"flex2Periods":0,"term1Hours":8,"term1Periods":12,"entries":["數學5節","國語文3節","自然4節"]}}};
  // [/115-1 STATUTORY SNAPSHOT]

  function isCellFilled(val) {
    const s = String(val || '').trim();
    if (!s || s === '—') return false;
    if (/待填|未定|^第\s*週$/.test(s)) return false;
    return true;
  }

  function escHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');
  }

  function triggerWordDownload(filename, htmlBody, landscape = true) {
    const docHtml = `\uFEFF<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>${filename}</title>
<style>
  @page Section1 {
    size: ${landscape ? '29.7cm 21.0cm' : '21.0cm 29.7cm'};
    mso-page-orientation: ${landscape ? 'landscape' : 'portrait'};
    margin: 1.2cm 1.2cm 1.2cm 1.2cm;
  }
  div.Section1 { page: Section1; }
  body { font-family: "標楷體", "DFKai-SB", "Microsoft JhengHei", serif; font-size: 10pt; color: #000000; }
  h2 { text-align: center; font-size: 14pt; margin: 0 0 8pt 0; }
  p.meta { text-align: right; font-size: 9pt; margin: 0 0 6pt 0; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th, td { border: 1px solid #000000; padding: 4pt 5pt; vertical-align: middle; word-wrap: break-word; line-height: 1.35; }
  th { background: #EBF4FA; text-align: center; font-weight: bold; }
  .subhead { background: #F5F7F9; text-align: center; font-weight: bold; }
  .center { text-align: center; }
</style>
</head>
<body><div class="Section1">${htmlBody}</div></body></html>`;

    const blob = new Blob([docHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 800);
  }

  /**
   * 一鍵下載「表 6：115 學年度下學期校本課程架構表（Word 檔）」
   */
  function exportFrameworkWord(savedCells) {
    const today = new Date();
    const rocY = today.getFullYear() - 1911;
    const stamp = `${rocY}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const rowsHtml = ROWS.map((r) => {
      const cellsHtml = COMPETENCIES.map((c) => {
        const key = `${r.gradeNum}_${c.key}`;
        const cellDef = r.cols[c.key];
        const val = savedCells[key]?.value ?? cellDef.defaultTime;
        return `<td>${escHtml(cellDef.topic)}</td><td class="center">${escHtml(val || '待填')}</td>`;
      }).join('');
      return `<tr><td class="center"><b>${r.grade}</b></td>${cellsHtml}</tr>`;
    }).join('');

    const eventsHtml = COMPETENCIES.map((c) => {
      const ev = SCHOOL_EVENTS_ROW[c.key];
      return `<td>${escHtml(ev.topic)}</td><td class="center">${escHtml(ev.time)}</td>`;
    }).join('');

    const htmlBody = `
      <h2>龍埔國小 115 學年度第二學期校本課程架構表</h2>
      <p class="meta">學校願景：低碳、人文、社群、行動的新校園 ｜ 匯出日期：${stamp}</p>
      <table>
        <tr>
          <th style="width:5%;">核心概念</th>
          <th colspan="4">全球素養｜大眼看世界(龍埔Link)</th>
          <th colspan="4">低碳環境｜龍埔好環境</th>
          <th colspan="4">多元展能｜小龍與小埔</th>
        </tr>
        <tr>
          <th class="subhead">核心素養</th>
          <th colspan="2" class="subhead">國際理解</th>
          <th colspan="2" class="subhead">多元文化</th>
          <th colspan="2" class="subhead">環境探索</th>
          <th colspan="2" class="subhead">生活實踐</th>
          <th colspan="2" class="subhead">藝術科技涵養</th>
          <th colspan="2" class="subhead">身心精進</th>
        </tr>
        <tr>
          <th class="subhead">核心能力</th>
          <th colspan="2">英語力</th>
          <th colspan="2">閱讀寫作力</th>
          <th colspan="2">探索力</th>
          <th colspan="2">實踐力</th>
          <th colspan="2">美感素養</th>
          <th colspan="2">健康樂活</th>
        </tr>
        <tr>
          <th class="subhead">年級</th>
          <th class="subhead">主題課程</th><th class="subhead" style="width:6.5%;">實施時間</th>
          <th class="subhead">主題課程</th><th class="subhead" style="width:6.5%;">實施時間</th>
          <th class="subhead">主題課程</th><th class="subhead" style="width:6.5%;">實施時間</th>
          <th class="subhead">主題課程</th><th class="subhead" style="width:6.5%;">實施時間</th>
          <th class="subhead">主題課程</th><th class="subhead" style="width:6.5%;">實施時間</th>
          <th class="subhead">主題課程</th><th class="subhead" style="width:6.5%;">實施時間</th>
        </tr>
        ${rowsHtml}
        <tr><td class="center"><b>學校行事課程</b></td>${eventsHtml}</tr>
      </table>
    `;

    triggerWordDownload(`115下_龍埔國小校本課程架構表_${stamp}.doc`, htmlBody, true);
  }

  /**
   * 一鍵下載「表 5：法律規定教育議題實施規劃（Word 檔，支援單學年或全校 1–6 年級）」
   */
  function exportStatutoryWord(statutoryDefs, allItems, targetGrade = 'all', stat115_1Grades = null) {
    const today = new Date();
    const rocY = today.getFullYear() - 1911;
    const stamp = `${rocY}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const gradesToExport = targetGrade === 'all' ? ['1', '2', '3', '4', '5', '6'] : [String(targetGrade)];
    const cnGrade = { '1': '一', '2': '二', '3': '三', '4': '四', '5': '五', '6': '六' };
    const snap = stat115_1Grades || STATUTORY_115_1_SNAPSHOT;

    const sectionsHtml = gradesToExport.map((g, gIdx) => {
      const gradeItems = allItems.filter((x) => String(x.grade) === g && x.entryType === 'statutory');
      const g115_1 = snap[g] || {};
      const rows = statutoryDefs.map((iss) => {
        const matched = gradeItems.filter((it) => it.topicName && it.topicName.includes(iss.name));
        const prev = g115_1[String(iss.no)] || { term1Hours: 0, term1Periods: 0 };
        const metIn115_1 = iss.basis === 'year' && (
          iss.anyPositive ? (prev.term1Periods > 0 || prev.term1Hours > 0) :
          iss.metric === 'periods' ? (prev.term1Periods >= iss.minYear) :
          (prev.term1Hours >= iss.minYear)
        );
        const prevNote = prev.term1Hours > 0 || prev.term1Periods > 0
          ? `<br/><span style="color:#166534;">【115上實績：${prev.term1Periods}節／${prev.term1Hours}時${metIn115_1 ? '｜已達全學年標準' : ''}】</span>`
          : '';
        if (matched.length === 0) {
          return `
            <tr>
              <td class="center">${iss.no}</td>
              <td>${escHtml(iss.name)}</td>
              <td class="center">${cnGrade[g]}</td>
              <td>${metIn115_1 ? '（115上學期已達全學年標準）' : ''}</td>
              <td class="center"></td>
              <td class="center">0</td>
              <td class="center">0</td>
              <td>${escHtml(iss.rule)}${prevNote}</td>
            </tr>
          `;
        }
        return matched.map((m, idx) => `
          <tr>
            ${idx === 0 ? `<td class="center" rowspan="${matched.length}">${iss.no}</td><td rowspan="${matched.length}">${escHtml(iss.name)}</td>` : ''}
            <td class="center">${cnGrade[g]}</td>
            <td>${escHtml(m.domain)}${m.note ? `（${escHtml(m.note)}）` : ''}</td>
            <td class="center">${(m.weeks || []).join('、')}</td>
            <td class="center">${m.periods || 0}</td>
            <td class="center">${m.hours || 0}</td>
            ${idx === 0 ? `<td rowspan="${matched.length}">${escHtml(iss.rule)}${prevNote}</td>` : ''}
          </tr>
        `).join('');
      }).join('');

      return `
        ${gIdx > 0 ? '<br clear="all" style="page-break-before:always;" />' : ''}
        <h2>龍埔國小 115 學年度下學期【${cnGrade[g]}年級】法律規定教育議題實施規劃（部定課程）</h2>
        <p class="meta">匯出日期：${stamp}</p>
        <table>
          <tr>
            <th style="width:5%;">序號</th>
            <th style="width:18%;">重要教育工作</th>
            <th style="width:6%;">年級</th>
            <th style="width:18%;">領域學習課程別</th>
            <th style="width:12%;">實施週次</th>
            <th style="width:7%;">實施節數</th>
            <th style="width:7%;">實施時數</th>
            <th style="width:27%;">相關規定說明</th>
          </tr>
          ${rows}
        </table>
      `;
    }).join('');

    const label = targetGrade === 'all' ? '全校1-6年級彙整' : `G${targetGrade}學年`;
    triggerWordDownload(`115下_法律規定教育議題實施規劃_${label}_${stamp}.doc`, sectionsHtml, true);
  }

  /**
   * 一鍵下載「表 4：領域課程計畫審查檢核表（Word 檔，依各領域原始文件原文照錄，含複數初審教師簽名與各年級意見）」
   */
  function exportReviewChecklistWord(domainMeta, record, domainSpec, termFull = '115 學年度下學期') {
    const today = new Date();
    const rocY = today.getFullYear() - 1911;
    const stamp = `${rocY}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const cnGrade = { '1': '一', '2': '二', '3': '三', '4': '四', '5': '五', '6': '六' };
    const grades = domainMeta.grades || ['1', '2', '3', '4', '5', '6'];
    const rec = record || { initialChecks: {}, finalChecks: {}, grades: {} };
    const spec = Array.isArray(domainSpec)
      ? { items: domainSpec, categoryLabel: '十二年國教課綱', excellentCriteria: [], table2Heading: `【${domainMeta.label}】課程計畫通過備查標準檢核請逐項勾選 ☑`, noteBetweenTables: '', table1CommentPrompt: '' }
      : (domainSpec || { items: [] });
    const checklistItems = spec.items || [];

    const initNames = Array.isArray(rec.initialReviewers) && rec.initialReviewers.length
      ? rec.initialReviewers.join('、')
      : (rec.initialReviewer || '（未填）');
    const finalNames = Array.isArray(rec.finalReviewers) && rec.finalReviewers.length
      ? rec.finalReviewers.join('、')
      : (rec.finalReviewer || '（未填）');

    const commentHeaderExtra = spec.table1CommentPrompt
      ? `<div style="font-weight:normal; font-size:8.5pt; text-align:left; margin-top:3pt;">${escHtml(spec.table1CommentPrompt)}</div>`
      : '';

    const gradeRows = grades.map((g) => {
      const gr = (rec.grades && rec.grades[g]) || {};
      const byNote = gr.updatedBy ? `<div style="font-size:8pt; color:#555555;">（填寫：${escHtml(gr.updatedBy)}）</div>` : '';
      return `
        <tr>
          <td class="center"><b>${cnGrade[g]}</b></td>
          <td class="center">${gr.status === 'excellent' ? '☑' : '☐'}</td>
          <td class="center">${gr.status === 'pass' ? '☑' : '☐'}</td>
          <td class="center">${gr.status === 'revise' ? '☑' : '☐'}</td>
          <td>${escHtml(gr.comment || '')}${byNote}</td>
        </tr>
      `;
    }).join('');

    const itemRows = checklistItems.map((it, idx) => `
      <tr>
        ${idx === 0 ? `<td class="center" rowspan="${checklistItems.length}"><b>${escHtml(spec.categoryLabel || '十二年國教課綱')}</b></td>` : ''}
        <td style="padding-left:${it.isSub ? '16pt' : '5pt'};">
          ${it.sectionHeader ? `<div style="font-weight:bold; margin-bottom:3pt;">${escHtml(it.sectionHeader)}</div>` : ''}
          <b>${escHtml(it.no)}${String(it.no).includes('-') ? ' ' : '.'}</b>${escHtml(it.text)}
        </td>
        <td class="center">${rec.initialChecks?.[it.id] ? '☑' : '☐'}</td>
        <td class="center">${rec.finalChecks?.[it.id] ? '☑' : '☐'}</td>
      </tr>
    `).join('');

    const excellentText = Array.isArray(spec.excellentCriteria)
      ? spec.excellentCriteria.join('\n')
      : String(spec.excellentCriteria || '');
    const excellentRow = excellentText
      ? `
        <tr>
          <td class="center"><b>優良課程計畫具備條件</b></td>
          <td colspan="3">${escHtml(excellentText)}</td>
        </tr>
      `
      : '';

    const initResPass = rec.initialResult === 'pass' ? '☑' : '☐';
    const initResRev  = rec.initialResult === 'revise' ? '☑' : '☐';
    const finalResPass = rec.finalResult === 'pass' ? '☑' : '☐';
    const finalResRev  = rec.finalResult === 'revise' ? '☑' : '☐';

    const htmlBody = `
      <h2>${escHtml(termFull.replace(/\s+/g, ''))}學校課程計畫審查檢核表</h2>
      <p style="font-size:10.5pt; margin:0 0 6pt 0;"><b>學校：龍埔國小　　　領域/科目：${escHtml(spec.subjectLine || domainMeta.label)}</b></p>
      <table>
        <tr>
          <th rowspan="2" style="width:10%;">年級</th>
          <th colspan="3" style="width:30%;">課發會審查情形（✓）</th>
          <th rowspan="2" style="width:60%;">審查意見${commentHeaderExtra}</th>
        </tr>
        <tr>
          <th class="subhead">評選優良</th>
          <th class="subhead">審查通過</th>
          <th class="subhead">待修正</th>
        </tr>
        ${gradeRows}
      </table>
      ${spec.noteBetweenTables ? `<p style="font-size:9pt; margin:5pt 0;">${escHtml(spec.noteBetweenTables)}</p>` : '<br/>'}
      <p style="font-size:10.5pt; font-weight:bold; margin:6pt 0 4pt 0;">${escHtml(spec.table2Heading || `【${domainMeta.label}】課程計畫通過備查標準檢核請逐項勾選 ☑`)}</p>
      <table>
        <tr>
          <th style="width:14%;">項目</th>
          <th style="width:68%;">備查內容</th>
          <th style="width:9%;">初審</th>
          <th style="width:9%;">複審</th>
        </tr>
        ${itemRows}
        ${excellentRow}
      </table>
      <p style="font-size:10.5pt; margin:10pt 0 4pt 0;">領域小組初審結果： ${initResRev}須修正　${initResPass}通過　初審教師簽名：<b>${escHtml(initNames)}</b></p>
      <p style="font-size:10.5pt; margin:4pt 0 0 0;">課發會委員複審結果： ${finalResRev}須修正　${finalResPass}通過　複審委員簽名：<b>${escHtml(finalNames)}</b></p>
    `;

    triggerWordDownload(`${domainMeta.code}-${domainMeta.label}_審查檢核表_${stamp}.doc`, htmlBody, false);
  }

  return {
    COMPETENCIES,
    ROWS,
    SCHOOL_EVENTS_ROW,
    isCellFilled,
    exportFrameworkWord,
    exportStatutoryWord,
    exportReviewChecklistWord,
    STATUTORY_115_1_SNAPSHOT
  };
})();
