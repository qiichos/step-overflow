export interface Waypoint {
  name: string;
  km: number;
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
      { name: "Tokyo", km: 0 },
      { name: "Yokohama", km: 28 },
      { name: "Odawara", km: 83 },
      { name: "Shizuoka", km: 180 },
      { name: "Hamamatsu", km: 257 },
      { name: "Nagoya", km: 366 },
      { name: "Kyoto", km: 476 },
      { name: "Osaka", km: 495 },
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
      { name: "Tokyo", km: 0 },
      { name: "Utsunomiya", km: 108 },
      { name: "Sendai", km: 352 },
      { name: "Morioka", km: 535 },
      { name: "Aomori", km: 713 },
      { name: "Hakodate", km: 822 },
      { name: "Asahikawa", km: 1020 },
      { name: "Sapporo", km: 1150 },
    ],
  },
  {
    id: "camino",
    name: "Camino de Santiago",
    from: "St-Jean-Pied-de-Port",
    to: "Santiago de Compostela",
    total_km: 800,
    emoji: "\u{1F1EA}\u{1F1F8}",
    difficulty: 2,
    waypoints: [
      { name: "St-Jean", km: 0 },
      { name: "Pamplona", km: 67 },
      { name: "Logro\u00F1o", km: 175 },
      { name: "Burgos", km: 283 },
      { name: "Le\u00F3n", km: 463 },
      { name: "Sarria", km: 655 },
      { name: "Santiago", km: 800 },
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
      { name: "Chicago", km: 0 },
      { name: "St. Louis", km: 480 },
      { name: "Oklahoma City", km: 1290 },
      { name: "Amarillo", km: 1730 },
      { name: "Albuquerque", km: 2270 },
      { name: "Flagstaff", km: 2900 },
      { name: "Los Angeles", km: 3940 },
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
      { name: "London", km: 0 },
      { name: "Istanbul", km: 2500 },
      { name: "Mumbai", km: 7000 },
      { name: "Bangkok", km: 11000 },
      { name: "Tokyo", km: 15000 },
      { name: "Honolulu", km: 21500 },
      { name: "San Francisco", km: 25800 },
      { name: "New York", km: 30500 },
      { name: "London", km: 40075 },
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
