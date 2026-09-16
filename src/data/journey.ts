export type JourneyChapter = { period: string; title: string; note: string };

export type JourneyPlace = {
  id: string;
  name: string;
  region: string;
  coordinates: [number, number];
  period: string;
  role: string;
  note: string;
  kind: 'home' | 'stay' | 'visit';
  chapters: JourneyChapter[];
  articles: string[];
};

export type JourneyStop = { id: string; placeId: string; period: string; title: string; note: string };

// 以用户确认的 2002—2012、2012—2016、2016—2017、2017—2020、2020—2026 为准。
// 2010 年北京旅行发生在平凉居住期间，并非迁居。
export const journeyPlaces: JourneyPlace[] = [
  {
    id: 'pingliang', name: '平凉', region: '甘肃', coordinates: [106.67, 35.54],
    period: '2002—2012 · 2016—2017 · 2020', role: '故乡',
    note: '出生在平凉，从出生到小学四年级一直在这里生活。后来从株洲返乡继续读初中，并在平凉参加高考。', kind: 'home',
    chapters: [
      { period: '2002—2012', title: '在平凉长大', note: '出生于甘肃省平凉市，一直在这里生活到小学四年级；2010 年去北京是这段生活中的一次旅行。' },
      { period: '2016—2017', title: '返乡读初中', note: '在株洲生活四年后回到平凉，继续完成初中阶段的学习。' },
      { period: '2020', title: '参加高考', note: '在平凉参加高考。' },
    ], articles: [],
  },
  {
    id: 'beijing', name: '北京', region: '北京', coordinates: [116.41, 39.9],
    period: '2010 · 2020—2026', role: '旅行 · 求学与生活',
    note: '八岁时曾到北京旅行；2020 年考入北京的大学，此后一直在北京生活到 2026 年。', kind: 'stay',
    chapters: [
      { period: '2010', title: '八岁时的旅行', note: '从平凉去北京旅行，并不是迁居。' },
      { period: '2020—2026', title: '在北京求学与生活', note: '2020 年来到北京上大学，之后一直在北京生活到 2026 年。' },
    ], articles: [],
  },
  {
    id: 'zhuzhou', name: '株洲', region: '湖南', coordinates: [113.13, 27.83],
    period: '2012—2016', role: '生活四年',
    note: '小学五年级时去了湖南株洲，并在那里生活了四年。', kind: 'stay',
    chapters: [
      { period: '2012—2016', title: '在株洲生活', note: '从小学五年级开始，在株洲生活四年。' },
    ], articles: [],
  },
  {
    id: 'lanzhou', name: '兰州', region: '甘肃', coordinates: [103.83, 36.06],
    period: '2017—2020', role: '高中三年',
    note: '2017 年高一来到兰州，在这里读完三年高中，直到 2020 年。', kind: 'stay',
    chapters: [
      { period: '2017—2020', title: '高中三年', note: '从高一开始在兰州读高中。' },
    ], articles: [],
  },
  {
    id: 'baoding', name: '保定', region: '河北', coordinates: [115.47, 38.87],
    period: '2026', role: '旅行',
    note: '2026 年去河北保定旅行一次。', kind: 'visit',
    chapters: [
      { period: '2026', title: '保定之行', note: '去河北保定旅行一次。' },
    ], articles: [],
  },
];

export const journeyStops: JourneyStop[] = [
  { id: 'birth', placeId: 'pingliang', period: '2002—2012', title: '平凉', note: '出生至小学四年级，一直在此生活' },
  { id: 'beijing-child', placeId: 'beijing', period: '2010', title: '北京', note: '八岁时旅行；平凉生活期间的插曲' },
  { id: 'zhuzhou-years', placeId: 'zhuzhou', period: '2012—2016', title: '株洲', note: '小学五年级起，在此生活四年' },
  { id: 'pingliang-return', placeId: 'pingliang', period: '2016—2017', title: '平凉', note: '从株洲返乡，继续读初中' },
  { id: 'lanzhou-high', placeId: 'lanzhou', period: '2017—2020', title: '兰州', note: '高中三年' },
  { id: 'beijing-university', placeId: 'beijing', period: '2020—2026', title: '北京', note: '大学及之后的北京生活' },
  { id: 'baoding-visit', placeId: 'baoding', period: '2026', title: '保定', note: '去河北保定旅行一次' },
];
