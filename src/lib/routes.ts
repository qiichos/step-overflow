export interface Waypoint {
  name: string;
  km: number;
  description: string;
}

export interface Route {
  id: string;
  name: string;
  description: string;
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
    description: "Walk the ancient highway where samurai and merchants once traveled between two great cities",
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
    id: "nile_valley",
    name: "Nile Valley",
    description: "Walk upstream along the world's longest river through 5,000 years of civilization",
    from: "Aswan",
    to: "Cairo",
    total_km: 1100,
    emoji: "\u{1F1EA}\u{1F1EC}",
    difficulty: 2,
    waypoints: [
      { name: "Aswan", km: 0, description: "Gateway to Nubia" },
      { name: "Kom Ombo", km: 50, description: "Temple of the crocodile god" },
      { name: "Edfu", km: 110, description: "Best-preserved temple in Egypt" },
      { name: "Luxor", km: 220, description: "World's greatest open-air museum" },
      { name: "Qena", km: 280, description: "Gateway to the Valley of the Kings" },
      { name: "Abydos", km: 380, description: "Sacred burial ground of Osiris" },
      { name: "Sohag", km: 430, description: "Heart of Upper Egypt" },
      { name: "Asyut", km: 550, description: "Ancient crossroads of the Nile" },
      { name: "Minya", km: 700, description: "Gateway to Amarna" },
      { name: "Beni Suef", km: 850, description: "Edge of the Fayoum oasis" },
      { name: "Giza", km: 1050, description: "Home of the Great Pyramids" },
      { name: "Cairo", km: 1100, description: "City of a thousand minarets" },
    ],
  },
  {
    id: "hannibal",
    name: "Hannibal's March",
    description: "March with elephants from Iberia across the Alps to challenge the Roman Republic",
    from: "Cartagena",
    to: "Rome",
    total_km: 1500,
    emoji: "\u{1F418}",
    difficulty: 2,
    waypoints: [
      { name: "Cartagena", km: 0, description: "Carthaginian stronghold in Iberia" },
      { name: "Valencia", km: 250, description: "City on the Mediterranean coast" },
      { name: "Barcelona", km: 500, description: "Gateway to the Pyrenees" },
      { name: "Perpignan", km: 650, description: "Last stop before Gaul" },
      { name: "Narbonne", km: 750, description: "Roman crossroads of Gaul" },
      { name: "N\u00EEmes", km: 900, description: "Rome of France" },
      { name: "Avignon", km: 950, description: "City of Popes" },
      { name: "Gap", km: 1050, description: "Foothills of the Alps" },
      { name: "Turin", km: 1200, description: "First city beyond the Alps" },
      { name: "Piacenza", km: 1350, description: "Crossing the Po Valley" },
      { name: "Rome", km: 1500, description: "Heart of the Roman Republic" },
    ],
  },
  {
    id: "via_francigena",
    name: "Via Francigena",
    description: "Walk the medieval pilgrimage from Canterbury Cathedral across the Alps to the Eternal City",
    from: "Canterbury",
    to: "Rome",
    total_km: 1900,
    emoji: "\u26EA",
    difficulty: 3,
    waypoints: [
      { name: "Canterbury", km: 0, description: "Where the pilgrimage begins" },
      { name: "Calais", km: 130, description: "Gateway to the continent" },
      { name: "Reims", km: 350, description: "City of coronations" },
      { name: "Besan\u00E7on", km: 650, description: "Gateway to the Jura" },
      { name: "Lausanne", km: 800, description: "Pearl of Lake Geneva" },
      { name: "Great St Bernard Pass", km: 900, description: "Alpine crossing" },
      { name: "Aosta", km: 950, description: "Roman gateway to Italy" },
      { name: "Pavia", km: 1150, description: "Medieval capital of Lombardy" },
      { name: "Lucca", km: 1400, description: "City of 100 churches" },
      { name: "Siena", km: 1550, description: "Heart of Tuscany" },
      { name: "Bolsena", km: 1700, description: "City of the miracle" },
      { name: "Rome", km: 1900, description: "The Eternal City" },
    ],
  },
  {
    id: "camino",
    name: "Camino de Santiago",
    description: "Follow the ancient pilgrimage from Lisbon through port wine country to the sacred cathedral",
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
    description: "Get your kicks on the Mother Road, from the Windy City to the California coast",
    from: "Chicago",
    to: "Los Angeles",
    total_km: 3940,
    emoji: "\u{1F1FA}\u{1F1F8}",
    difficulty: 3,
    waypoints: [
      { name: "Chicago", km: 0, description: "The Windy City" },
      { name: "Bloomington", km: 200, description: "Crossroads of middle America" },
      { name: "Springfield", km: 320, description: "Lincoln's hometown" },
      { name: "St. Louis", km: 480, description: "Gateway to the West" },
      { name: "Joplin", km: 700, description: "Mining town on the Mother Road" },
      { name: "Tulsa", km: 910, description: "Art Deco capital" },
      { name: "Oklahoma City", km: 1290, description: "2025 NBA Champion" },
      { name: "Amarillo", km: 1730, description: "Home of Cadillac Ranch" },
      { name: "Tucumcari", km: 1900, description: "Tucumcari Tonite!" },
      { name: "Santa Fe", km: 2050, description: "Art capital of the Southwest" },
      { name: "Gallup", km: 2530, description: "Heart of Native American culture" },
      { name: "Winslow", km: 2700, description: "Standin' on the Corner" },
      { name: "Flagstaff", km: 2900, description: "Gateway to the Grand Canyon" },
      { name: "Kingman", km: 3120, description: "Heart of Historic Route 66" },
      { name: "Needles", km: 3300, description: "Hottest town on Route 66" },
      { name: "Barstow", km: 3500, description: "Desert crossroads" },
      { name: "San Bernardino", km: 3750, description: "Gateway to Southern California" },
      { name: "Los Angeles", km: 3940, description: "City of Angels" },
    ],
  },
  {
    id: "trans_sahara",
    name: "Trans-Saharan Trade Route",
    description: "Cross the greatest desert on Earth with the caravans that traded gold for salt",
    from: "Timbuktu",
    to: "Marrakech",
    total_km: 2200,
    emoji: "\u{1F42A}",
    difficulty: 3,
    waypoints: [
      { name: "Timbuktu", km: 0, description: "City of 333 saints" },
      { name: "Oualata", km: 500, description: "Ancient gateway to the Sahara" },
      { name: "Taghaza", km: 1200, description: "Salt mines of the desert" },
      { name: "Sijilmasa", km: 1800, description: "Oasis terminus of the caravan route" },
      { name: "Marrakech", km: 2200, description: "Red city of Morocco" },
    ],
  },
  {
    id: "qhapaq_nan",
    name: "Qhapaq \u00D1an",
    description: "Walk the Royal Road of the Incas through mountain passes and imperial way stations",
    from: "Quito",
    to: "Cusco",
    total_km: 2500,
    emoji: "\u{1F3D4}\u{FE0F}",
    difficulty: 3,
    waypoints: [
      { name: "Quito", km: 0, description: "Northern capital of the Inca Empire" },
      { name: "Riobamba", km: 200, description: "At the foot of Chimborazo" },
      { name: "Cuenca", km: 400, description: "UNESCO World Heritage colonial city" },
      { name: "Loja", km: 600, description: "Gateway between Andes and Amazon" },
      { name: "Cajamarca", km: 1000, description: "Where the Inca Empire fell" },
      { name: "Huamachuco", km: 1250, description: "Ancient highland citadel" },
      { name: "Hu\u00E1nuco Pampa", km: 1500, description: "Imperial way station" },
      { name: "Jauja", km: 1750, description: "First Spanish capital of Peru" },
      { name: "Ayacucho", km: 2000, description: "City of churches and battlefields" },
      { name: "Abancay", km: 2250, description: "Gateway to Cusco" },
      { name: "Cusco", km: 2500, description: "Navel of the Inca world" },
    ],
  },
  {
    id: "spice_trader",
    name: "Spice Route",
    description: "Sail from the nutmeg islands through the spice archipelago to the gateway of world trade",
    from: "Banda Neira",
    to: "Singapore",
    total_km: 3500,
    emoji: "\u26F5",
    difficulty: 3,
    waypoints: [
      { name: "Banda Neira", km: 0, description: "Birthplace of the nutmeg trade" },
      { name: "Ambon", km: 200, description: "Clove island capital" },
      { name: "Makassar", km: 900, description: "Maritime crossroads of the archipelago" },
      { name: "Surabaya", km: 1200, description: "Indonesia's city of heroes" },
      { name: "Semarang", km: 1450, description: "Port of the Javanese north coast" },
      { name: "Batavia", km: 1700, description: "Heart of the Dutch East Indies" },
      { name: "Palembang", km: 2100, description: "Ancient capital of Srivijaya" },
      { name: "Malacca", km: 2600, description: "Gateway between two oceans" },
      { name: "Kuala Lumpur", km: 2800, description: "Capital of Malaysia" },
      { name: "Penang", km: 3000, description: "Pearl of the Orient" },
      { name: "Singapore", km: 3500, description: "The Lion City" },
    ],
  },
  {
    id: "silk_road",
    name: "Silk Road",
    description: "Trace the legendary route where silk and ideas crossed deserts and oases to reach the Mediterranean",
    from: "Xi'an",
    to: "Constantinople",
    total_km: 7000,
    emoji: "\u{1F42B}",
    difficulty: 4,
    waypoints: [
      { name: "Xi'an", km: 0, description: "Ancient capital, start of the Silk Road" },
      { name: "Tianshui", km: 350, description: "Home of Maiji Mountain Grottoes" },
      { name: "Lanzhou", km: 650, description: "Gateway to the Hexi Corridor" },
      { name: "Zhangye", km: 950, description: "Rainbow Mountains of the Silk Road" },
      { name: "Jiayuguan", km: 1150, description: "Westernmost fortress of the Great Wall" },
      { name: "Dunhuang", km: 1500, description: "Oasis city of the Mogao Caves" },
      { name: "Hami", km: 1800, description: "Oasis of sweet melons" },
      { name: "Turpan", km: 2100, description: "Oasis below sea level in the Taklamakan" },
      { name: "Kucha", km: 2400, description: "Ancient Buddhist kingdom" },
      { name: "Kashgar", km: 2800, description: "Crossroads of Central Asia" },
      { name: "Osh", km: 3100, description: "Oldest city in Central Asia" },
      { name: "Fergana", km: 3400, description: "Heart of the fertile valley" },
      { name: "Samarkand", km: 3800, description: "Jewel of the Silk Road" },
      { name: "Bukhara", km: 4100, description: "City of scholars and merchants" },
      { name: "Turkmenabat", km: 4400, description: "Crossroads of Turkmenistan" },
      { name: "Merv", km: 4700, description: "Once the world's largest city" },
      { name: "Mashhad", km: 5100, description: "Iran's holiest city" },
      { name: "Tehran", km: 5400, description: "Capital of Iran" },
      { name: "Tabriz", km: 5800, description: "Gateway to the Persian highlands" },
      { name: "Erzurum", km: 6200, description: "Fortress of eastern Anatolia" },
      { name: "Konya", km: 6600, description: "City of the Whirling Dervishes" },
      { name: "Constantinople", km: 7000, description: "Where East meets West" },
    ],
  },
  {
    id: "around",
    name: "Around the World",
    description: "Circle the entire globe, crossing every continent and ocean along the way",
    from: "London",
    to: "London",
    total_km: 40075,
    emoji: "\u{1F30D}",
    difficulty: 5,
    waypoints: [
      { name: "London", km: 0, description: "Capital of the United Kingdom" },
      { name: "Paris", km: 500, description: "City of Light" },
      { name: "Brussels", km: 700, description: "Capital of the European Union" },
      { name: "Berlin", km: 1400, description: "Capital of Germany" },
      { name: "Warsaw", km: 1800, description: "Capital of Poland" },
      { name: "Budapest", km: 2100, description: "Pearl of the Danube" },
      { name: "Istanbul", km: 2500, description: "Where Europe meets Asia" },
      { name: "Cairo", km: 3500, description: "City of the Pyramids" },
      { name: "Riyadh", km: 4300, description: "Capital of Saudi Arabia" },
      { name: "Dubai", km: 5000, description: "City of the Future" },
      { name: "Karachi", km: 5500, description: "Pakistan's port metropolis" },
      { name: "Delhi", km: 6000, description: "Capital of India" },
      { name: "Mumbai", km: 7000, description: "Bollywood capital" },
      { name: "Hyderabad", km: 7800, description: "City of pearls" },
      { name: "Kolkata", km: 8800, description: "City of Joy" },
      { name: "Dhaka", km: 9300, description: "Capital of Bangladesh" },
      { name: "Yangon", km: 10000, description: "City of the golden pagoda" },
      { name: "Bangkok", km: 11000, description: "City of Angels" },
      { name: "Kuala Lumpur", km: 12000, description: "Capital of Malaysia" },
      { name: "Singapore", km: 12500, description: "The Lion City" },
      { name: "Ho Chi Minh City", km: 13000, description: "Vietnam's vibrant heart" },
      { name: "Hong Kong", km: 13500, description: "Pearl of the Orient" },
      { name: "Shanghai", km: 14200, description: "China's largest city" },
      { name: "Tokyo", km: 15000, description: "Capital of Japan" },
      { name: "Honolulu", km: 21500, description: "Paradise of the Pacific" },
      { name: "San Francisco", km: 25800, description: "City by the Bay" },
      { name: "Las Vegas", km: 26500, description: "Entertainment capital of the world" },
      { name: "Denver", km: 27500, description: "Mile High City" },
      { name: "Kansas City", km: 28200, description: "Heart of America" },
      { name: "Chicago", km: 29000, description: "The Windy City" },
      { name: "Washington DC", km: 30000, description: "Capital of the United States" },
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
  return `${route.emoji} ${route.from} \u2192 ${route.to}  (${km} km)  ${stars}\n   ${route.description}`;
}

export function progressBar(percent: number, width: number = 20): string {
  const clamped = Math.min(Math.max(percent, 0), 100);
  const filled = Math.round((clamped / 100) * width);
  const empty = width - filled;
  return "\u2588".repeat(filled) + "\u2591".repeat(empty);
}
