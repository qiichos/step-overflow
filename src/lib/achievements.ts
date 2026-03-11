import type { WalkingRecord } from "./csv.js";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  check: (ctx: AchievementContext) => boolean;
}

export interface AchievementContext {
  allRecords: WalkingRecord[];
  totalKm: number;
  completedRoutes: string[];
}

function getHour(record: WalkingRecord): number {
  return parseInt(record.datetime.split("T")[1]?.split(":")[0] ?? "12");
}

export const ACHIEVEMENTS: Achievement[] = [
  // Distance
  {
    id: "first_step",
    name: "First Step",
    description: "Record your first walk",
    check: (ctx) => ctx.allRecords.length >= 1,
  },
  {
    id: "10k",
    name: "10K",
    description: "Walk 10 km total",
    check: (ctx) => ctx.totalKm >= 10,
  },
  {
    id: "century",
    name: "Century",
    description: "Walk 100 km total",
    check: (ctx) => ctx.totalKm >= 100,
  },
  {
    id: "500_club",
    name: "500 Club",
    description: "Walk 500 km total",
    check: (ctx) => ctx.totalKm >= 500,
  },
  {
    id: "thousand",
    name: "Thousand Miles",
    description: "Walk 1,000 km total",
    check: (ctx) => ctx.totalKm >= 1000,
  },
  {
    id: "5000_club",
    name: "5,000 Club",
    description: "Walk further than the length of Japan",
    check: (ctx) => ctx.totalKm >= 5000,
  },
  {
    id: "ten_thousand",
    name: "10K Club",
    description: "Five digits of distance",
    check: (ctx) => ctx.totalKm >= 10000,
  },
  // Route
  {
    id: "first_journey",
    name: "First Journey",
    description: "Complete your first route",
    check: (ctx) => ctx.completedRoutes.length >= 1,
  },
  {
    id: "world_traveler",
    name: "World Traveler",
    description: "Complete 3 routes",
    check: (ctx) => ctx.completedRoutes.length >= 3,
  },
  {
    id: "tokaido_master",
    name: "Tokaido Master",
    description: "Walk the path of the samurai",
    check: (ctx) => ctx.completedRoutes.includes("tokaido"),
  },
  {
    id: "pilgrim",
    name: "Pilgrim",
    description: "Complete the Camino de Santiago",
    check: (ctx) => ctx.completedRoutes.includes("camino"),
  },
  {
    id: "route66_rider",
    name: "Route 66 Rider",
    description: "Get your kicks on Route 66",
    check: (ctx) => ctx.completedRoutes.includes("route66"),
  },
  {
    id: "transcontinental",
    name: "Transcontinental",
    description: "Cross a continent on foot",
    check: (ctx) =>
      ctx.completedRoutes.includes("route66") ||
      ctx.completedRoutes.includes("around"),
  },
  {
    id: "globe_trotter",
    name: "Globe Trotter",
    description: "Complete Around the World",
    check: (ctx) => ctx.completedRoutes.includes("around"),
  },
  // Record
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Record a walk before 6:00 AM",
    check: (ctx) => ctx.allRecords.some((r) => getHour(r) < 6),
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Record a walk after 22:00",
    check: (ctx) => ctx.allRecords.some((r) => getHour(r) >= 22),
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    description: "Walk at 6+ km/h",
    check: (ctx) => ctx.allRecords.some((r) => r.speed_kmh >= 6),
  },
  {
    id: "half_marathon",
    name: "Half Marathon",
    description: "Complete a half marathon distance",
    check: (ctx) => ctx.allRecords.some((r) => r.distance_km >= 21.1),
  },
  {
    id: "marathon",
    name: "Marathon",
    description: "Walk 42.195 km in a single session",
    check: (ctx) => ctx.allRecords.some((r) => r.distance_km >= 42.195),
  },
  {
    id: "long_haul",
    name: "Long Haul",
    description: "Walk 120+ minutes in a single session",
    check: (ctx) => ctx.allRecords.some((r) => r.time_min >= 120),
  },
  {
    id: "centurion",
    name: "Centurion",
    description: "Log 100 walks",
    check: (ctx) => ctx.allRecords.length >= 100,
  },
];

export function checkNewAchievements(
  ctx: AchievementContext,
  unlocked: Record<string, string>
): Achievement[] {
  return ACHIEVEMENTS.filter((a) => !unlocked[a.id] && a.check(ctx));
}
