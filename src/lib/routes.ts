export interface Waypoint {
  name: string;
  km: number;
  description: string;
}

export interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  total_km: number;
  emoji: string;
  difficulty: number;
  waypoints: Waypoint[];
}

export const ROUTES: Route[] = [
  {
    id: "tokaido",
    name: "Tokaido",
    from: "Tokyo",
    to: "Osaka",
    total_km: 495,
    emoji: "\u{1F1EF}\u{1F1F5}",
    difficulty: 1,
    waypoints: [
      { name: "Tokyo", km: 0, description: "Capital of Japan" },
      { name: "Yokohama", km: 28, description: "Japan's largest port city" },
      { name: "Odawara", km: 83, description: "Castle town, gateway to Hakone" },
      { name: "Atami", km: 105, description: "Famous hot spring resort" },
      { name: "Numazu", km: 130, description: "Gateway to Mt. Fuji views" },
      { name: "Shizuoka", km: 180, description: "City of tea and Mt. Fuji" },
      { name: "Hamamatsu", km: 257, description: "City of music and motorcycles" },
      { name: "Okazaki", km: 330, description: "Birthplace of Tokugawa Ieyasu" },
      { name: "Nagoya", km: 366, description: "Heart of Japan's industry" },
      { name: "Suzuka", km: 395, description: "Home of the F1 Grand Prix" },
      { name: "Kyoto", km: 476, description: "Ancient capital of Japan" },
      { name: "Osaka", km: 495, description: "Japan's kitchen" },
    ],
  },
  {
    id: "hokkaido",
    name: "Northern Route",
    from: "Tokyo",
    to: "Sapporo",
    total_km: 1150,
    emoji: "\u{1F1EF}\u{1F1F5}",
    difficulty: 2,
    waypoints: [
      { name: "Tokyo", km: 0, description: "Capital of Japan" },
      { name: "Utsunomiya", km: 108, description: "Gyoza capital of Japan" },
      { name: "Fukushima", km: 270, description: "Land of samurai heritage" },
      { name: "Sendai", km: 352, description: "City of trees" },
      { name: "Hiraizumi", km: 430, description: "UNESCO World Heritage site" },
      { name: "Morioka", km: 535, description: "City of wanko soba" },
      { name: "Hirosaki", km: 670, description: "Famous for cherry blossoms and castle" },
      { name: "Aomori", km: 713, description: "Home of the Nebuta Festival" },
      { name: "Hakodate", km: 822, description: "Million-dollar night view" },
      { name: "Noboribetsu", km: 940, description: "Famous hot spring valley" },
      { name: "Sapporo", km: 1150, description: "City of snow and beer" },
    ],
  },
  {
    id: "camino",
    name: "Camino Portugu\u00E9s",
    from: "Lisbon",
    to: "Santiago de Compostela",
    total_km: 620,
    emoji: "\u{1F1F5}\u{1F1F9}",
    difficulty: 2,
    waypoints: [
      { name: "Lisbon", km: 0, description: "Capital of Portugal" },
      { name: "Santar\u00E9m", km: 78, description: "Gothic architecture capital" },
      { name: "Tomar", km: 120, description: "City of the Knights Templar" },
      { name: "Coimbra", km: 200, description: "Oldest university in Portugal" },
      { name: "Aveiro", km: 260, description: "Venice of Portugal" },
      { name: "Porto", km: 310, description: "Home of port wine, UNESCO World Heritage" },
      { name: "Barcelos", km: 370, description: "City of the Rooster" },
      { name: "Ponte de Lima", km: 400, description: "Oldest town in Portugal" },
      { name: "Valen\u00E7a", km: 430, description: "Fortress on the Spanish border" },
      { name: "Pontevedra", km: 490, description: "Pedestrian-friendly city of Galicia" },
      { name: "Santiago de Compostela", km: 620, description: "End of the Camino" },
    ],
  },
  {
    id: "route66",
    name: "Route 66",
    from: "Chicago",
    to: "Los Angeles",
    total_km: 3940,
    emoji: "\u{1F1FA}\u{1F1F8}",
    difficulty: 3,
    waypoints: [
      { name: "Chicago", km: 0, description: "The Windy City" },
      { name: "Springfield", km: 320, description: "Lincoln's hometown" },
      { name: "St. Louis", km: 480, description: "Gateway to the West" },
      { name: "Tulsa", km: 910, description: "Art Deco capital" },
      { name: "Oklahoma City", km: 1290, description: "2025 NBA Champion" },
      { name: "Amarillo", km: 1730, description: "Home of Cadillac Ranch" },
      { name: "Santa Fe", km: 2050, description: "Art capital of the Southwest" },
      { name: "Gallup", km: 2530, description: "Heart of Native American culture" },
      { name: "Flagstaff", km: 2900, description: "Gateway to the Grand Canyon" },
      { name: "Kingman", km: 3120, description: "Heart of Historic Route 66" },
      { name: "Barstow", km: 3500, description: "Desert crossroads" },
      { name: "Los Angeles", km: 3940, description: "City of Angels" },
    ],
  },
  {
    id: "around",
    name: "Around the World",
    from: "London",
    to: "London",
    total_km: 40075,
    emoji: "\u{1F30D}",
    difficulty: 5,
    waypoints: [
      { name: "London", km: 0, description: "Capital of the United Kingdom" },
      { name: "Paris", km: 500, description: "City of Light" },
      { name: "Berlin", km: 1400, description: "Capital of Germany" },
      { name: "Warsaw", km: 1800, description: "Capital of Poland" },
      { name: "Istanbul", km: 2500, description: "Where Europe meets Asia" },
      { name: "Cairo", km: 3500, description: "City of the Pyramids" },
      { name: "Dubai", km: 5000, description: "City of the Future" },
      { name: "Delhi", km: 6000, description: "Capital of India" },
      { name: "Mumbai", km: 7000, description: "Bollywood capital" },
      { name: "Kolkata", km: 8800, description: "City of Joy" },
      { name: "Bangkok", km: 11000, description: "City of Angels" },
      { name: "Singapore", km: 12500, description: "The Lion City" },
      { name: "Hong Kong", km: 13500, description: "Pearl of the Orient" },
      { name: "Shanghai", km: 14200, description: "China's largest city" },
      { name: "Tokyo", km: 15000, description: "Capital of Japan" },
      { name: "Honolulu", km: 21500, description: "Paradise of the Pacific" },
      { name: "San Francisco", km: 25800, description: "City by the Bay" },
      { name: "Denver", km: 27500, description: "Mile High City" },
      { name: "Chicago", km: 29000, description: "The Windy City" },
      { name: "New York", km: 30500, description: "The Big Apple" },
      { name: "Reykjavik", km: 35000, description: "World's northernmost capital" },
      { name: "London", km: 40075, description: "Journey complete" },
    ],
  },
];

export function getRoute(id: string): Route | undefined {
  return ROUTES.find((r) => r.id === id);
}

export interface RouteProgress {
  walkedKm: number;
  percent: number;
  completed: boolean;
  passed: Waypoint[];
  next: Waypoint | undefined;
  nextDistance: number;
}

export function getProgress(route: Route, walkedKm: number): RouteProgress {
  const clamped = Math.min(walkedKm, route.total_km);
  const percent = (clamped / route.total_km) * 100;
  const passed = route.waypoints.filter((w) => walkedKm >= w.km);
  const next = route.waypoints.find((w) => walkedKm < w.km);

  return {
    walkedKm: clamped,
    percent,
    completed: walkedKm >= route.total_km,
    passed,
    next,
    nextDistance: next ? next.km - walkedKm : 0,
  };
}

export function getNewlyPassedWaypoints(
  route: Route,
  prevKm: number,
  currentKm: number
): Waypoint[] {
  return route.waypoints.filter(
    (w) => w.km > 0 && prevKm < w.km && currentKm >= w.km
  );
}

export function formatRouteOption(route: Route): string {
  const stars =
    "\u2605".repeat(route.difficulty) +
    "\u2606".repeat(5 - route.difficulty);
  const km = route.total_km.toLocaleString();
  return `${route.emoji} ${route.from} \u2192 ${route.to}  (${km} km)  ${stars}`;
}

export function progressBar(percent: number, width: number = 20): string {
  const clamped = Math.min(Math.max(percent, 0), 100);
  const filled = Math.round((clamped / 100) * width);
  const empty = width - filled;
  return "\u2588".repeat(filled) + "\u2591".repeat(empty);
}
