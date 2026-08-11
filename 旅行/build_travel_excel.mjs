import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/yannilan/workspace/swe15041/MyNote/旅行";
const outputPath = path.join(outputDir, "澳洲旅游玩法方案推荐_20260801-0811.xlsx");
const previewDir = path.join(outputDir, "excel_previews");
const imagePath = path.join(outputDir, "travel-plan-source.png");

const itineraryRows = [
  [
    "D1",
    "2026-08-01",
    "悉尼 -> 悉尼",
    "金斯福德·史密斯国际机场 -> 悉尼",
    "无",
    "08/01 1晚 08/02\n悉尼中央宜必思尚品酒店(Ibis Styles Sydney Central)\n标准大床房，1间\n2成人，不含早餐",
    "无",
  ],
  [
    "D2",
    "2026-08-02",
    "悉尼 -> 悉尼",
    "悉尼 -> 悉尼大学 -> 悉尼歌剧院 -> 悉尼圣玛丽大教堂 -> 塔龙加动物园 -> 岩石区 -> 悉尼",
    "08/02 1天 08/02\n舒适5座 全天包车\n10小时 100公里\n可乘坐4人，2件行李",
    "08/02 1晚 08/03\n悉尼中央宜必思尚品酒店(Ibis Styles Sydney Central)\n标准大床房，1间\n2成人，不含早餐",
    "无",
  ],
  [
    "D3",
    "2026-08-03",
    "悉尼 -> 悉尼",
    "悉尼 -> 悉尼观鲸 -> 悉尼",
    "无",
    "08/03 1晚 08/04\n悉尼中央宜必思尚品酒店(Ibis Styles Sydney Central)\n标准大床房，1间\n2成人，不含早餐",
    "无",
  ],
  [
    "D4",
    "2026-08-04",
    "悉尼 -> 凯恩斯",
    "乘坐 JQ952 13:40:00 抵达凯恩斯机场T2 -> 悉尼 -> 金斯福德·史密斯国际机场 -> 凯恩斯机场 -> 凯恩斯水族馆 -> 凯恩斯",
    "08/04 1天 08/04\n舒适5座 接机\n可乘坐4人，2件行李",
    "08/04 1晚 08/05\n克里斯托布鲁克·弗林酒店(Crystalbrook Flynn)\n都市特大床房，1间\n2成人，不含早餐",
    "无",
  ],
  [
    "D5",
    "2026-08-05",
    "凯恩斯 -> 凯恩斯",
    "凯恩斯 -> 热带雨林天域观光缆车 -> 库兰达热带雨林自然公园 -> 库兰达小镇 -> 凯恩斯",
    "08/05 1天 08/05\n舒适5座 全天包车\n10小时 100公里\n可乘坐4人，2件行李",
    "08/05 1晚 08/06\n克里斯托布鲁克·弗林酒店(Crystalbrook Flynn)\n都市特大床房，1间\n2成人，不含早餐",
    "无",
  ],
  [
    "D6",
    "2026-08-06",
    "凯恩斯 -> 凯恩斯",
    "凯恩斯 -> 大堡礁 -> 凯恩斯",
    "无",
    "08/06 1晚 08/07\n克里斯托布鲁克·弗林酒店(Crystalbrook Flynn)\n都市特大床房，1间\n2成人，不含早餐",
    "无",
  ],
  [
    "D7",
    "2026-08-07",
    "凯恩斯 -> 墨尔本",
    "乘坐 JQ33 14:30:00 抵达墨尔本国际机场（图拉马莱恩机场）T2 -> 凯恩斯 -> 凯恩斯机场 -> 墨尔本",
    "08/07 1天 08/07\n舒适5座 接机\n可乘坐4人，2件行李",
    "08/07 1晚 08/08\n洲际酒店集团智选假日酒店墨尔本小柯林斯(Holiday Inn Express MELBOURNE LITTLE COLLINS by IHG)\n无障碍大床房，1间\n2成人，2份早餐",
    "无",
  ],
  [
    "D8",
    "2026-08-08",
    "墨尔本 -> 墨尔本",
    "墨尔本 -> 墨尔本国际机场（图拉马莱恩机场） -> 弗林德斯车站 -> 涂鸦街（霍西尔巷） -> 维多利亚州立图书馆 -> 维多利亚女皇市场 -> 墨尔本",
    "08/08 3天 08/10\n舒适5座 全天包车\n10小时 100公里\n可乘坐4人，2件行李",
    "08/08 1晚 08/09\n洲际酒店集团智选假日酒店墨尔本小柯林斯(Holiday Inn Express MELBOURNE LITTLE COLLINS by IHG)\n无障碍大床房，1间\n2成人，2份早餐",
    "无",
  ],
  [
    "D9",
    "2026-08-09",
    "墨尔本 -> 墨尔本",
    "墨尔本 -> 普芬比利蒸汽小火车 -> 菲利普岛 -> 墨尔本\n赴丹顿农山脉，乘蒸汽小火车，赶赴菲利普岛赏海岸风光。",
    "08/08 3天 08/10\n舒适5座 全天包车\n10小时 300公里\n可乘坐4人，2件行李",
    "08/09 1晚 08/10\n洲际酒店集团智选假日酒店墨尔本小柯林斯(Holiday Inn Express MELBOURNE LITTLE COLLINS by IHG)\n无障碍大床房，1间\n2成人，2份早餐",
    "无",
  ],
  [
    "D10",
    "2026-08-10",
    "墨尔本 -> 墨尔本",
    "墨尔本 -> 大洋路 -> 十二门徒石 -> 墨尔本\n观赏大洋路、打卡彩绘木屋、小红帽灯塔、夜宿阿波罗湾。",
    "08/08 3天 08/10\n舒适5座 全天包车\n10小时 600公里\n可乘坐4人，2件行李",
    "08/10 1晚 08/11\n洲际酒店集团智选假日酒店墨尔本小柯林斯(Holiday Inn Express MELBOURNE LITTLE COLLINS by IHG)\n无障碍大床房，1间\n2成人，2份早餐",
    "无",
  ],
  [
    "D11",
    "2026-08-11",
    "墨尔本 -> 墨尔本",
    "墨尔本 -> 墨尔本\n墨尔本返程",
    "无",
    "无",
    "无",
  ],
];

const transportPolicyLong = [
  "服务保障声明：平台为第三方代订服务，订单以供应商最终确认结果为准。",
  "取消规则（示意）：行程开始前7天以上免费；前5天(不含)-7天15%；前3天(不含)-5天20%；前2天(不含)-3天50%；前2天(含)及行程开始后100%。",
  "峰季条款：向导取消正峰季目的，平台优先保出行；若平台未能安排同等或更高级别车型和向导服务，额外补偿订单金额的30%，最高补偿订单金额的130%。",
  "政策提示：目的地及国家文旅部、外交部公告可能影响出行，最终以实际预订页和供应商规则为准。",
].join("\n");

const transportPolicyShort = [
  "服务保障声明：平台为第三方代订服务，订单以供应商最终确认结果为准。",
  "取消规则（示意）：行程开始前2天以上10%；前2天(含)及行程开始后100%。",
  "峰季条款与政策提示以实际预订页和供应商规则为准。",
].join("\n");

const quoteNote =
  "具体车型以您支付预估价后，选向导多退少补为准，未选到满意向导或车辆免费取消，里程与时间套餐内，可与向导协商灵活调整行程。";

const expenseRows = [
  ["当地交通", "2026-08-02", "1天", "2026-08-02", "舒适5座 华人包车\n可乘坐4人，2件行李", 1903, quoteNote, transportPolicyLong],
  ["当地交通", "2026-08-04", "1天", "2026-08-04", "舒适5座 华人接机\n可乘坐4人，2件行李", 406, quoteNote, transportPolicyShort],
  ["当地交通", "2026-08-05", "1天", "2026-08-05", "舒适5座 华人包车\n可乘坐4人，2件行李", 2975, quoteNote, transportPolicyLong],
  ["当地交通", "2026-08-07", "1天", "2026-08-07", "舒适5座 华人接机\n可乘坐4人，2件行李", 366, quoteNote, transportPolicyShort],
  ["当地交通", "2026-08-08", "3天", "2026-08-10", "舒适5座 华人包车\n可乘坐4人，2件行李", 7567, quoteNote, transportPolicyLong],
  [
    "酒店住宿",
    "2026-08-01",
    "3天",
    "2026-08-04",
    "悉尼中央宜必思尚品酒店(Ibis Styles Sydney Central)\n标准大床房，1间\n2成人，不含早餐",
    1221,
    "",
    "当地时间07月31日14:00前可免费取消。酒店当地时间07月31日14:00（北京时间07月31日12:00）前可免费取消；若未入住将收取您¥1220.96（如用优惠券、积分则以使用后的支付价为准）。订单需等酒店或供应商确认后生效，确认结果以短信、邮件或 app 通知为准，如订单不确认将全额退款至您的付款账户。",
  ],
  [
    "酒店住宿",
    "2026-08-04",
    "3天",
    "2026-08-07",
    "克里斯托布鲁克·弗林酒店(Crystalbrook Flynn)\n都市特大床房，1间\n2成人，不含早餐",
    4089,
    "",
    "当地时间08月03日16:00前可免费取消。酒店当地时间08月03日16:00（北京时间08月03日14:00）前可免费取消；若未入住将收取您全部房费¥4088.93（如用优惠券、积分则以使用后的支付价为准）。订单需等酒店或供应商确认后生效，确认结果以短信、邮件或 app 通知为准，如订单不确认将全额退款至您的付款账户。",
  ],
  [
    "酒店住宿",
    "2026-08-07",
    "4天",
    "2026-08-11",
    "洲际酒店集团智选假日酒店墨尔本小柯林斯(Holiday Inn Express MELBOURNE LITTLE COLLINS by IHG)\n无障碍大床房，1间\n2成人，2份早餐",
    3241,
    "",
    "当地时间07月06日23:59前可免费取消。酒店当地时间07月06日23:59（北京时间07月06日22:00）前可免费取消；若未入住将收取您全部房费¥3240.22（如用优惠券、积分则以使用后的支付价为准）。订单需等酒店或供应商确认后生效，确认结果以短信、邮件或 app 通知为准，如订单不确认将全额退款至您的付款账户。",
  ],
  ["大交通", "2026-08-04", "1天", "2026-08-04", "机票\nJQ952 金斯福德·史密斯国际机场T2 - 凯恩斯机场T2", null, "暂无报价", "无"],
  ["大交通", "2026-08-07", "1天", "2026-08-07", "机票\nJQ33 凯恩斯机场T1 - 墨尔本国际机场（图拉马莱恩机场）T2", null, "暂无报价", "无"],
];

/**
 * 设置指定区域的常用表格样式。
 * @param {import("@oai/artifact-tool").Range} range 目标区域。
 * @param {string} fillColor 背景色。
 * @param {boolean} isHeader 是否为表头。
 */
function styleRange(range, fillColor, isHeader = false) {
  range.format.fill = { color: fillColor };
  range.format.font = {
    name: "PingFang SC",
    size: isHeader ? 11 : 10,
    bold: isHeader,
    color: isHeader ? "#4B3A2E" : "#2F2F2F",
  };
  range.format.wrapText = true;
  range.format.verticalAlignment = "top";
  range.format.horizontalAlignment = isHeader ? "center" : "left";
  range.format.borders = { preset: "all", style: "thin", color: "#E7D9CC" };
}

/**
 * 将本地图片文件转换为 data URL，供 Excel 图片嵌入使用。
 * @param {string} filePath 图片绝对路径。
 * @returns {Promise<string>} base64 data URL。
 */
async function toDataUrl(filePath) {
  const buffer = await fs.readFile(filePath);
  const base64 = buffer.toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}

/**
 * 创建并格式化行程总览工作表。
 * @param {import("@oai/artifact-tool").Worksheet} sheet 目标工作表。
 */
function buildItinerarySheet(sheet) {
  sheet.showGridLines = false;
  sheet.getRange("A1:G1").merge();
  sheet.getRange("A1").values = [["旅游玩法方案推荐"]];
  sheet.getRange("A1:G1").format.fill = { color: "#FBE7D5" };
  sheet.getRange("A1:G1").format.font = {
    name: "PingFang SC",
    size: 16,
    bold: true,
    color: "#7A4B28",
  };
  sheet.getRange("A1:G1").format.horizontalAlignment = "center";
  sheet.getRange("A1:G1").format.verticalAlignment = "center";
  sheet.getRange("A1:G1").format.rowHeight = 28;

  sheet.getRange("A2:G2").values = [[
    "行程日期：2026/08/01-2026/08/11（11天）",
    "",
    "出发地：悉尼",
    "",
    "目的地：墨尔本",
    "",
    "出行人数：2人",
  ]];
  sheet.getRange("A2:B2").merge();
  sheet.getRange("C2:D2").merge();
  sheet.getRange("E2:F2").merge();
  styleRange(sheet.getRange("A2:G2"), "#FFF6EE");

  sheet.getRange("A4:G4").values = [[
    "日程",
    "日期",
    "城市",
    "行程安排",
    "当地交通",
    "酒店住宿",
    "玩乐/门票",
  ]];
  styleRange(sheet.getRange("A4:G4"), "#F6EFE8", true);

  sheet.getRange(`A5:G${itineraryRows.length + 4}`).values = itineraryRows;
  styleRange(sheet.getRange(`A5:G${itineraryRows.length + 4}`), "#FFFFFF");
  sheet.getRange(`B5:B${itineraryRows.length + 4}`).setNumberFormat("yyyy-mm-dd");
  sheet.getRange(`A5:A${itineraryRows.length + 4}`).format.font = {
    name: "PingFang SC",
    size: 11,
    bold: true,
    color: "#2F2F2F",
  };

  sheet.getRange("A:A").format.columnWidth = 10;
  sheet.getRange("B:B").format.columnWidth = 14;
  sheet.getRange("C:C").format.columnWidth = 18;
  sheet.getRange("D:D").format.columnWidth = 48;
  sheet.getRange("E:E").format.columnWidth = 24;
  sheet.getRange("F:F").format.columnWidth = 33;
  sheet.getRange("G:G").format.columnWidth = 12;
  sheet.getRange(`A5:G${itineraryRows.length + 4}`).format.rowHeight = 64;
  sheet.freezePanes.freezeRows(4);
}

/**
 * 创建并格式化费用明细工作表。
 * @param {import("@oai/artifact-tool").Worksheet} sheet 目标工作表。
 */
function buildExpenseSheet(sheet) {
  sheet.showGridLines = false;
  sheet.getRange("A1:H1").merge();
  sheet.getRange("A1").values = [["费用明细"]];
  sheet.getRange("A1:H1").format.fill = { color: "#FBE7D5" };
  sheet.getRange("A1:H1").format.font = {
    name: "PingFang SC",
    size: 16,
    bold: true,
    color: "#7A4B28",
  };
  sheet.getRange("A1:H1").format.horizontalAlignment = "center";

  sheet.getRange("A2:H2").values = [[
    "资源",
    "预定开始",
    "时长",
    "预定结束",
    "预定项",
    "预估费用",
    "备注",
    "政策",
  ]];
  styleRange(sheet.getRange("A2:H2"), "#F6EFE8", true);

  sheet.getRange(`A3:H${expenseRows.length + 2}`).values = expenseRows;
  styleRange(sheet.getRange(`A3:H${expenseRows.length + 2}`), "#FFFFFF");
  sheet.getRange(`B3:B${expenseRows.length + 2}`).setNumberFormat("yyyy-mm-dd");
  sheet.getRange(`D3:D${expenseRows.length + 2}`).setNumberFormat("yyyy-mm-dd");
  sheet.getRange(`F3:F${expenseRows.length}`).setNumberFormat('"¥"#,##0');
  sheet.getRange(`A3:A${expenseRows.length + 2}`).format.font = {
    name: "PingFang SC",
    size: 11,
    bold: true,
    color: "#2F2F2F",
  };

  const summaryRow = expenseRows.length + 4;
  sheet.getRange(`A${summaryRow}:E${summaryRow}`).merge();
  sheet.getRange(`A${summaryRow}`).values = [["参考报价（含税）"]];
  sheet.getRange(`F${summaryRow}`).formulas = [["=SUM(F3:F10)"]];
  sheet.getRange(`F${summaryRow}`).setNumberFormat('"¥"#,##0');
  styleRange(sheet.getRange(`A${summaryRow}:F${summaryRow}`), "#FFF6EE", true);
  sheet.getRange(`G${summaryRow}:H${summaryRow + 3}`).merge();
  sheet.getRange(`G${summaryRow}`).values = [[
    "说明：\n- 目的地机票、住宿、用车价格变动频繁，具体以实际支付后预订为准。\n- 包车价格默认为预估价，选向导与车型时可多退少补；未选到满意向导或车型可免费取消。\n- 可选择线上或线下签署旅游服务订单合同或单项委托合同。\n- 代订服务系免费协助通过第三方平台代订部分资源，平台仅提供代订；若需履约保障，请选择全包预订。",
  ]];
  styleRange(sheet.getRange(`G${summaryRow}:H${summaryRow + 3}`), "#FFF6EE");

  sheet.getRange("A:A").format.columnWidth = 12;
  sheet.getRange("B:B").format.columnWidth = 13;
  sheet.getRange("C:C").format.columnWidth = 9;
  sheet.getRange("D:D").format.columnWidth = 13;
  sheet.getRange("E:E").format.columnWidth = 34;
  sheet.getRange("F:F").format.columnWidth = 14;
  sheet.getRange("G:G").format.columnWidth = 28;
  sheet.getRange("H:H").format.columnWidth = 56;
  sheet.getRange(`A3:H${expenseRows.length + 2}`).format.rowHeight = 88;
  sheet.getRange(`G${summaryRow}:H${summaryRow + 3}`).format.rowHeight = 88;
  sheet.freezePanes.freezeRows(2);
}

/**
 * 创建原图备份工作表，方便后续人工核对。
 * @param {import("@oai/artifact-tool").Worksheet} sheet 目标工作表。
 * @returns {Promise<void>}
 */
async function buildReferenceSheet(sheet) {
  sheet.showGridLines = false;
  sheet.getRange("A1:D1").merge();
  sheet.getRange("A1").values = [["原图备份"]];
  sheet.getRange("A1:D1").format.fill = { color: "#FBE7D5" };
  sheet.getRange("A1:D1").format.font = {
    name: "PingFang SC",
    size: 16,
    bold: true,
    color: "#7A4B28",
  };
  sheet.getRange("A2:D3").merge();
  sheet.getRange("A2").values = [[
    "此工作表保留截图原图，便于后续继续校对细节或补充更细的政策文案。",
  ]];
  styleRange(sheet.getRange("A2:D3"), "#FFF6EE");

  const dataUrl = await toDataUrl(imagePath);
  sheet.images.add({
    dataUrl,
    anchor: {
      from: { row: 4, col: 0 },
      extent: { widthPx: 700, heightPx: 2800 },
    },
  });
  sheet.getRange("A:A").format.columnWidth = 20;
  sheet.getRange("B:D").format.columnWidth = 20;
}

/**
 * 渲染工作表预览并保存到本地，供人工验收。
 * @param {Workbook} workbook 工作簿实例。
 * @param {string} sheetName 工作表名称。
 * @param {string} fileName 输出文件名。
 * @returns {Promise<void>}
 */
async function renderPreview(workbook, sheetName, fileName) {
  const blob = await workbook.render({ sheetName, scale: 1.5, format: "png" });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await fs.writeFile(path.join(previewDir, fileName), bytes);
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const workbook = Workbook.create();
const itinerarySheet = workbook.worksheets.add("行程总览");
const expenseSheet = workbook.worksheets.add("费用明细");
const referenceSheet = workbook.worksheets.add("原图备份");

buildItinerarySheet(itinerarySheet);
buildExpenseSheet(expenseSheet);
await buildReferenceSheet(referenceSheet);

const exported = await SpreadsheetFile.exportXlsx(workbook);
await exported.save(outputPath);

await renderPreview(workbook, "行程总览", "itinerary.png");
await renderPreview(workbook, "费用明细", "expenses.png");

const itineraryCheck = await workbook.inspect({
  kind: "table",
  range: "行程总览!A4:G15",
  include: "values,formulas",
  tableMaxRows: 14,
  tableMaxCols: 7,
});

const expenseCheck = await workbook.inspect({
  kind: "table",
  range: "费用明细!A2:H16",
  include: "values,formulas",
  tableMaxRows: 16,
  tableMaxCols: 8,
});

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});

console.log(
  JSON.stringify(
    {
      outputPath,
      previewDir,
      itineraryCheck: itineraryCheck.ndjson,
      expenseCheck: expenseCheck.ndjson,
      formulaErrors: formulaErrors.ndjson,
    },
    null,
    2,
  ),
);
