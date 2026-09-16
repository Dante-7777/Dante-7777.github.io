declare module 'china-map-geojson/src/china.js' {
  const data: GeoJSON.FeatureCollection<GeoJSON.Geometry, { name: string; cp: [number, number] }>;
  export default data;
}
