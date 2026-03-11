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

function getDate(record: WalkingRecord): string {
  return record.datetime.split("T")[0];
}

function getDayOfWeek(record: WalkingRecord): number {
  return new Date(record.datetime).getDay();
}

function hasMultipleOnSameDay(records: WalkingRecord[]): boolean {
  const dates = records.map(getDate);
  return dates.length !== new Set(dates).size;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── Distance ──
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
    id: "2000_club",
    name: "2,000 Club",
    description: "Walk further than the length of the Rhine",
    check: (ctx) => ctx.totalKm >= 2000,
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

  // ── Route Completion ──
  {
    id: "first_journey",
    name: "First Journey",
    description: "Complete your first route",
    check: (ctx) => ctx.completedRoutes.length >= 1,
  },
  {
    id: "tokaido_master",
    name: "Tokaido Master",
    description: "Walk the path of the samurai",
    check: (ctx) => ctx.completedRoutes.includes("tokaido"),
  },
  {
    id: "northern_explorer",
    name: "Northern Explorer",
    description: "Brave the snow and reach the frontier island",
    check: (ctx) => ctx.completedRoutes.includes("hokkaido"),
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
    id: "desert_caravan",
    name: "Desert Caravan",
    description: "Cross the Sahara with gold and salt",
    check: (ctx) => ctx.completedRoutes.includes("trans_sahara"),
  },
  {
    id: "sun_walker",
    name: "Sun Walker",
    description: "Walk the Royal Road of the Sun",
    check: (ctx) => ctx.completedRoutes.includes("qhapaq_nan"),
  },
  {
    id: "spice_master",
    name: "Spice Master",
    description: "Master the seas of the spice trade",
    check: (ctx) => ctx.completedRoutes.includes("spice_trader"),
  },
  {
    id: "silk_merchant",
    name: "Silk Merchant",
    description: "Trade silk and ideas across continents",
    check: (ctx) => ctx.completedRoutes.includes("silk_road"),
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

  // ── Route Collection ──
  {
    id: "world_traveler",
    name: "World Traveler",
    description: "Complete 3 routes",
    check: (ctx) => ctx.completedRoutes.length >= 3,
  },
  {
    id: "five_journeys",
    name: "Five Journeys",
    description: "Complete 5 different routes",
    check: (ctx) => ctx.completedRoutes.length >= 5,
  },
  {
    id: "legendary_walker",
    name: "Legendary Walker",
    description: "Walk every route in the world",
    check: (ctx) => ctx.completedRoutes.length >= 9,
  },

  // ── Single Walk Records ──
  {
    id: "five_k_walk",
    name: "5K Walk",
    description: "Walk 5 km in a single session",
    check: (ctx) => ctx.allRecords.some((r) => r.distance_km >= 5),
  },
  {
    id: "ten_k_walk",
    name: "10K Walk",
    description: "Double digits in a single walk",
    check: (ctx) => ctx.allRecords.some((r) => r.distance_km >= 10),
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
    id: "speed_demon",
    name: "Speed Demon",
    description: "Walk at 6+ km/h",
    check: (ctx) => ctx.allRecords.some((r) => r.speed_kmh >= 6),
  },
  {
    id: "long_haul",
    name: "Long Haul",
    description: "Walk 120+ minutes in a single session",
    check: (ctx) => ctx.allRecords.some((r) => r.time_min >= 120),
  },

  // ── Time & Habit ──
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
    id: "weekend_warrior",
    name: "Weekend Warrior",
    description: "Record a walk on the weekend",
    check: (ctx) =>
      ctx.allRecords.some((r) => {
        const day = getDayOfWeek(r);
        return day === 0 || day === 6;
      }),
  },
  {
    id: "double_up",
    name: "Double Up",
    description: "Record two walks in a single day",
    check: (ctx) => hasMultipleOnSameDay(ctx.allRecords),
  },

  // ── Walk Count ──
  {
    id: "getting_started",
    name: "Getting Started",
    description: "Log 10 walks",
    check: (ctx) => ctx.allRecords.length >= 10,
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Log 50 walks",
    check: (ctx) => ctx.allRecords.length >= 50,
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
