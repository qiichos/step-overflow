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
];

export function checkNewAchievements(
  ctx: AchievementContext,
  unlocked: Record<string, string>
): Achievement[] {
  return ACHIEVEMENTS.filter((a) => !unlocked[a.id] && a.check(ctx));
}
