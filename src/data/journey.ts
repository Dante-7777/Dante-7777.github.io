export type JourneyPlace = {
  id: string;
  name: string;
  region: string;
  coordinates: [number, number];
  period: string;
  kind: 'home' | 'stay' | 'visit';
  articles: string[];
};

export type JourneyStop = { id: string; placeId: string; period: string; title: string };

// 以用户确认的 2002—2012、2012—2016、2016—2017、2017—2020、2020—2026 为准。
// 2010 年北京旅行发生在平凉居住期间，并非迁居。
export const journeyPlaces: JourneyPlace[] = [
  {
    id: 'pingliang', name: '平凉', region: '甘肃', coordinates: [106.67, 35.54],
    period: '2002—2012 · 2016—2017 · 2020', kind: 'home', articles: [],
  },
  {
    id: 'beijing', name: '北京', region: '北京', coordinates: [116.41, 39.9],
    period: '2010 · 2020—2026', kind: 'stay', articles: [],
  },
  {
    id: 'zhuzhou', name: '株洲', region: '湖南', coordinates: [113.13, 27.83],
    period: '2012—2016', kind: 'stay', articles: [],
  },
  {
    id: 'lanzhou', name: '兰州', region: '甘肃', coordinates: [103.83, 36.06],
    period: '2017—2020', kind: 'stay', articles: [],
  },
  {
    id: 'baoding', name: '保定', region: '河北', coordinates: [115.47, 38.87],
    period: '2026', kind: 'visit', articles: [],
  },
];

export const journeyStops: JourneyStop[] = [
  { id: 'birth', placeId: 'pingliang', period: '2002—2012', title: '平凉' },
  { id: 'beijing-child', placeId: 'beijing', period: '2010', title: '北京' },
  { id: 'zhuzhou-years', placeId: 'zhuzhou', period: '2012—2016', title: '株洲' },
  { id: 'pingliang-return', placeId: 'pingliang', period: '2016—2017', title: '平凉' },
  { id: 'lanzhou-high', placeId: 'lanzhou', period: '2017—2020', title: '兰州' },
  { id: 'beijing-university', placeId: 'beijing', period: '2020—2026', title: '北京' },
  { id: 'baoding-visit', placeId: 'baoding', period: '2026', title: '保定' },
];
