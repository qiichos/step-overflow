import type { Config } from "./config.js";
import { getRoute } from "./routes.js";
import { ACHIEVEMENTS } from "./achievements.js";

export function generateIndexHtml(config?: Config): string {
  const journey = config?.journey ?? null;
  const route = journey ? getRoute(journey.route_id) ?? null : null;
  const achievements = config?.achievements ?? {};
  const allAchievements = ACHIEVEMENTS.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
  }));

  const journeyJson = JSON.stringify(journey);
  const routeJson = JSON.stringify(route);
  const achievementsJson = JSON.stringify(achievements);
  const allAchievementsJson = JSON.stringify(allAchievements);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Step Overflow</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #fff;
      color: #333;
    }
    .header {
      padding: 24px 20px 0;
      max-width: 960px;
      margin: 0 auto;
    }
    .header h1 { font-size: 1.1rem; font-weight: 600; color: #333; }
    .header p { font-size: 0.8rem; color: #aaa; margin-top: 2px; }
    .container { max-width: 960px; margin: 0 auto; padding: 16px 20px; }

    /* Main tabs */
    .main-tab-bar {
      display: flex;
      gap: 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #e5e7eb;
    }
    .main-tab-bar button {
      padding: 10px 24px;
      border: none;
      background: none;
      font-size: 0.9rem;
      font-weight: 600;
      color: #888;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      transition: color 0.2s, border-color 0.2s;
    }
    .main-tab-bar button.active { color: #333; border-bottom-color: #333; }
    .main-tab-bar button:hover:not(.active) { color: #555; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }

    /* Summary cards */
    .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
    .summary-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
    .summary-card .value { font-size: 1.5rem; font-weight: 700; color: #333; }
    .summary-card .label { font-size: 0.75rem; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }

    /* Chart sub-tabs */
    .sub-tab-bar { display: flex; gap: 0; margin-bottom: 16px; }
    .sub-tab-bar button {
      padding: 6px 16px;
      border: 1px solid #e5e7eb;
      background: #fff;
      font-size: 0.8rem;
      color: #888;
      cursor: pointer;
      transition: all 0.15s;
    }
    .sub-tab-bar button:first-child { border-radius: 6px 0 0 6px; }
    .sub-tab-bar button:last-child { border-radius: 0 6px 6px 0; }
    .sub-tab-bar button:not(:first-child) { border-left: none; }
    .sub-tab-bar button.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
    .sub-tab-bar button.active[data-tab*="calories"] { background: #e05080; border-color: #e05080; }

    .chart-wrapper { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    canvas { max-height: 300px; }

    .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .card h2 { font-size: 1rem; font-weight: 600; margin-bottom: 12px; }

    table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #f0f0f0; }
    th { font-weight: 600; color: #666; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
    tr:hover td { background: #fafafa; }
    .empty { text-align: center; color: #999; padding: 40px; }

    /* Journey */
    .journey-header { text-align: center; margin-bottom: 24px; }
    .journey-header .route-name { font-size: 1.3rem; font-weight: 700; }
    .journey-header .route-sub { font-size: 0.85rem; color: #888; margin-top: 4px; }
    .journey-progress { text-align: center; margin-bottom: 32px; }
    .journey-progress .bar-bg {
      width: 100%; height: 24px; background: #f0f0f0; border-radius: 12px; overflow: hidden; margin: 8px 0;
    }
    .journey-progress .bar-fill {
      height: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa); border-radius: 12px;
      transition: width 0.3s;
    }
    .journey-progress .percent { font-size: 1.8rem; font-weight: 700; color: #3b82f6; }
    .journey-progress .km-text { font-size: 0.85rem; color: #888; }
    .route-visual { position: relative; margin: 40px 20px 60px; }
    .route-line { position: absolute; top: 50%; left: 0; right: 0; height: 3px; background: #e5e7eb; transform: translateY(-50%); }
    .route-fill { position: absolute; top: 50%; left: 0; height: 3px; background: #3b82f6; transform: translateY(-50%); border-radius: 2px; }
    .waypoint {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid #ccc; background: #fff; z-index: 1;
    }
    .waypoint.passed { border-color: #3b82f6; background: #3b82f6; }
    .waypoint.next { border-color: #3b82f6; background: #fff; }
    .waypoint-label {
      position: absolute; top: calc(50% + 14px); transform: translateX(-50%);
      font-size: 0.7rem; color: #888; white-space: nowrap;
    }
    .waypoint-label.passed { color: #3b82f6; font-weight: 600; }
    .current-marker {
      position: absolute; top: calc(50% - 22px); transform: translateX(-50%);
      font-size: 1rem;
    }

    /* Achievements */
    .achievement-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
    .achievement-card {
      display: flex; align-items: center; gap: 12px;
      border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 16px;
    }
    .achievement-card.locked { opacity: 0.45; }
    .achievement-card .icon { font-size: 1.6rem; flex-shrink: 0; }
    .achievement-card .info { flex: 1; min-width: 0; }
    .achievement-card .name { font-weight: 600; font-size: 0.9rem; }
    .achievement-card .desc { font-size: 0.75rem; color: #888; margin-top: 2px; }
    .achievement-card .date { font-size: 0.7rem; color: #3b82f6; margin-top: 2px; }
    .achievement-count { text-align: center; margin-bottom: 20px; font-size: 0.9rem; color: #888; }
    .achievement-count span { font-weight: 700; color: #333; font-size: 1.1rem; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Step Overflow</h1>
    <p>walking log dashboard</p>
  </div>

  <div class="container">
    <div class="main-tab-bar">
      <button class="active" data-main="walking">Walking</button>
      <button data-main="journey">Journey</button>
      <button data-main="achievements">Achievements</button>
    </div>

    <div id="walking-content" class="tab-content active">
      <div class="summary" id="summary"></div>
      <div class="sub-tab-bar">
        <button class="active" data-tab="daily-distance">Distance (Daily)</button>
        <button data-tab="cumulative-distance">Distance (Total)</button>
        <button data-tab="daily-calories">Calories (Daily)</button>
        <button data-tab="cumulative-calories">Calories (Total)</button>
      </div>
      <div class="chart-wrapper"><canvas id="chart"></canvas></div>
      <div class="card"><h2>Records</h2><div id="table-container"></div></div>
    </div>

    <div id="journey-content" class="tab-content">
      <div id="journey-container"></div>
    </div>

    <div id="achievements-content" class="tab-content">
      <div id="achievements-container"></div>
    </div>
  </div>

  <script>
    // Embedded data (regenerated on each stp add)
    const JOURNEY = ${journeyJson};
    const ROUTE = ${routeJson};
    const UNLOCKED = ${achievementsJson};
    const ALL_ACHIEVEMENTS = ${allAchievementsJson};

    // --- MET / Calorie calculation (mirrors src/lib/calories.ts) ---
    const MET_TABLE = [[2.0,2.0],[3.2,2.8],[4.0,3.5],[4.8,4.3],[5.6,5.0],[6.4,7.0],[8.0,8.3]];
    function getMets(speed) {
      if (speed <= MET_TABLE[0][0]) return MET_TABLE[0][1];
      if (speed >= MET_TABLE[MET_TABLE.length-1][0]) return MET_TABLE[MET_TABLE.length-1][1];
      for (let i = 0; i < MET_TABLE.length-1; i++) {
        const [s0,m0] = MET_TABLE[i], [s1,m1] = MET_TABLE[i+1];
        if (speed >= s0 && speed <= s1) return m0 + (speed-s0)/(s1-s0) * (m1-m0);
      }
      return 3.5;
    }
    function calcCalories(speed, timeMin, weight) {
      if (!weight) return 0;
      return Math.round(getMets(speed) * weight * (timeMin / 60));
    }

    // --- Walking tab ---
    let chart = null;
    let dailyDistance = {};
    let dailyCalories = {};
    let sortedLabels = [];
    let hasCalories = false;

    function buildChart(mode) {
      const ctx = document.getElementById('chart');
      if (chart) chart.destroy();
      const labels = sortedLabels;
      const isCalories = mode.includes('calories');
      const isCumulative = mode.includes('cumulative');
      const color = isCalories ? '#e05080' : '#3b82f6';
      const bgColor = isCalories ? 'rgba(224, 80, 128, 0.12)' : 'rgba(59, 130, 246, 0.12)';
      const source = isCalories ? dailyCalories : dailyDistance;
      const unit = isCalories ? 'kcal' : 'km';
      let data, label;
      if (isCumulative) {
        let sum = 0;
        data = labels.map(d => { sum += (source[d] ?? 0); return isCalories ? sum : parseFloat(sum.toFixed(2)); });
        label = isCalories ? 'Total Calories' : 'Total Distance (km)';
      } else {
        data = labels.map(d => isCalories ? (source[d] ?? 0) : parseFloat((source[d] ?? 0).toFixed(2)));
        label = isCalories ? 'Calories (kcal)' : 'Distance (km)';
      }
      chart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label, data, borderColor: color, backgroundColor: bgColor, fill: true, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#fff', pointBorderColor: color, pointBorderWidth: 2, pointHoverRadius: 6, borderWidth: 2 }] },
        options: {
          responsive: true,
          interaction: { intersect: false, mode: 'index' },
          plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#333', titleColor: '#fff', bodyColor: '#fff', padding: 10, cornerRadius: 6, callbacks: { label: (c) => c.parsed.y.toLocaleString() + ' ' + unit } }
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: unit, color: '#888' }, grid: { color: '#f0f0f0' }, ticks: { color: '#888' } },
            x: { grid: { display: false }, ticks: { color: '#888', maxRotation: 45 } }
          }
        }
      });
    }

    // --- Journey tab ---
    function renderJourney(totalKm) {
      const el = document.getElementById('journey-container');
      if (!JOURNEY || !ROUTE) {
        el.innerHTML = '<p class="empty">No journey set. Run <code>stp config route</code> to choose a route.</p>';
        return;
      }
      const journeyKm = Math.max(0, totalKm - JOURNEY.started_km);
      const progress = Math.min(journeyKm / ROUTE.total_km * 100, 100);
      const walkedClamped = Math.min(journeyKm, ROUTE.total_km);

      let html = '<div class="journey-header">';
      html += '<div class="route-name">' + ROUTE.emoji + ' ' + ROUTE.from + ' \\u2192 ' + ROUTE.to + '</div>';
      html += '<div class="route-sub">' + ROUTE.name + ' \\u2014 ' + ROUTE.total_km.toLocaleString() + ' km</div>';
      html += '</div>';

      html += '<div class="journey-progress">';
      html += '<div class="percent">' + progress.toFixed(1) + '%</div>';
      html += '<div class="bar-bg"><div class="bar-fill" style="width:' + progress + '%"></div></div>';
      html += '<div class="km-text">' + Math.floor(walkedClamped) + ' / ' + ROUTE.total_km.toLocaleString() + ' km</div>';
      html += '</div>';

      // Route visual
      html += '<div class="route-visual" style="height:60px">';
      html += '<div class="route-line"></div>';
      const fillPct = Math.min(progress, 100);
      html += '<div class="route-fill" style="width:' + fillPct + '%"></div>';
      const nextWp = ROUTE.waypoints.find(w => journeyKm < w.km);
      for (const wp of ROUTE.waypoints) {
        const pct = (wp.km / ROUTE.total_km * 100).toFixed(2);
        const passed = journeyKm >= wp.km;
        const isNext = nextWp && nextWp.km === wp.km;
        const cls = passed ? 'waypoint passed' : (isNext ? 'waypoint next' : 'waypoint');
        html += '<div class="' + cls + '" style="left:' + pct + '%"></div>';
        html += '<div class="waypoint-label' + (passed ? ' passed' : '') + '" style="left:' + pct + '%"  title="' + (wp.description || '') + '">' + wp.name + '</div>';
      }
      // Current position marker
      if (progress < 100) {
        html += '<div class="current-marker" style="left:' + fillPct + '%">\\u{1F6B6}</div>';
      }
      html += '</div>';

      el.innerHTML = html;
    }

    // --- Achievements tab ---
    function renderAchievements() {
      const el = document.getElementById('achievements-container');
      const count = Object.keys(UNLOCKED).length;
      let html = '<div class="achievement-count"><span>' + count + '</span> / ' + ALL_ACHIEVEMENTS.length + ' unlocked</div>';
      html += '<div class="achievement-grid">';
      for (const a of ALL_ACHIEVEMENTS) {
        const isUnlocked = !!UNLOCKED[a.id];
        html += '<div class="achievement-card' + (isUnlocked ? '' : ' locked') + '">';
        html += '<div class="icon">' + (isUnlocked ? '\\u{1F3C5}' : '\\u{1F512}') + '</div>';
        html += '<div class="info">';
        html += '<div class="name">' + a.name + '</div>';
        html += '<div class="desc">' + a.description + '</div>';
        if (isUnlocked) {
          html += '<div class="date">Unlocked: ' + UNLOCKED[a.id].split('T')[0] + '</div>';
        }
        html += '</div></div>';
      }
      html += '</div>';
      el.innerHTML = html;
    }

    // --- Main ---
    async function main() {
      let text;
      try {
        const paths = ['../data/walking.csv', '/data/walking.csv', 'data/walking.csv'];
        for (const p of paths) {
          try {
            const res = await fetch(p);
            if (res.ok) { text = await res.text(); break; }
          } catch {}
        }
        if (!text) throw new Error('not found');
      } catch {
        document.getElementById('table-container').innerHTML = '<p class="empty">No data found.</p>';
        renderJourney(0);
        renderAchievements();
        return;
      }

      const lines = text.trim().split('\\n');
      if (lines.length < 2) {
        document.getElementById('table-container').innerHTML = '<p class="empty">No records yet.</p>';
        renderJourney(0);
        renderAchievements();
        return;
      }

      const records = lines.slice(1).map(line => {
        const [datetime, time_min, speed_kmh, distance_km, weight_kg] = line.split(',');
        return { datetime, time_min: parseFloat(time_min), speed_kmh: parseFloat(speed_kmh), distance_km: parseFloat(distance_km), weight_kg: weight_kg ? parseFloat(weight_kg) : null };
      });

      let totalMin = 0, totalKm = 0, totalCal = 0;
      for (const r of records) {
        totalMin += r.time_min;
        totalKm += r.distance_km;
        const cal = calcCalories(r.speed_kmh, r.time_min, r.weight_kg);
        totalCal += cal;
        if (r.weight_kg) hasCalories = true;
      }
      const totalH = Math.floor(totalMin / 60);
      const remainM = Math.round(totalMin % 60);

      let summaryHtml =
        '<div class="summary-card"><div class="value">' + totalKm.toFixed(1) + ' km</div><div class="label">Total Distance</div></div>' +
        '<div class="summary-card"><div class="value">' + totalH + 'h ' + remainM + 'm</div><div class="label">Total Time</div></div>';
      if (hasCalories) {
        summaryHtml += '<div class="summary-card"><div class="value">' + totalCal.toLocaleString() + ' kcal</div><div class="label">Total Calories</div></div>';
      }
      document.getElementById('summary').innerHTML = summaryHtml;

      const sorted = [...records].reverse();
      let tableHtml = '<table><thead><tr><th>Date</th><th>Time (min)</th><th>Speed (km/h)</th><th>Distance (km)</th>' + (hasCalories ? '<th>Calories</th>' : '') + '</tr></thead><tbody>';
      for (const r of sorted) {
        const cal = calcCalories(r.speed_kmh, r.time_min, r.weight_kg);
        const calStr = cal ? cal + ' kcal' : '-';
        const dateStr = new Date(r.datetime).toLocaleString();
        tableHtml += '<tr><td>' + dateStr + '</td><td>' + r.time_min + '</td><td>' + r.speed_kmh + '</td><td>' + r.distance_km + '</td>' + (hasCalories ? '<td>' + calStr + '</td>' : '') + '</tr>';
      }
      tableHtml += '</tbody></table>';
      document.getElementById('table-container').innerHTML = tableHtml;

      for (const r of records) {
        const date = r.datetime.split('T')[0];
        dailyDistance[date] = (dailyDistance[date] ?? 0) + r.distance_km;
        dailyCalories[date] = (dailyCalories[date] ?? 0) + calcCalories(r.speed_kmh, r.time_min, r.weight_kg);
      }
      sortedLabels = Object.keys(dailyDistance).sort();

      if (!hasCalories) {
        document.querySelectorAll('[data-tab*="calories"]').forEach(el => el.style.display = 'none');
      }

      buildChart('daily-distance');
      renderJourney(totalKm);
      renderAchievements();

      // Chart sub-tab switching
      document.querySelectorAll('.sub-tab-bar button').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.sub-tab-bar button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          buildChart(btn.dataset.tab);
        });
      });
    }

    // Main tab switching
    document.querySelectorAll('.main-tab-bar button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.main-tab-bar button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(btn.dataset.main + '-content').classList.add('active');
      });
    });

    main();

    // Auto-reload: poll CSV for changes every 3 seconds
    if (location.protocol !== 'file:') {
      let lastText = '';
      setInterval(async () => {
        try {
          const paths = ['../data/walking.csv', '/data/walking.csv', 'data/walking.csv'];
          for (const p of paths) {
            try {
              const res = await fetch(p, { cache: 'no-store' });
              if (res.ok) {
                const text = await res.text();
                if (lastText && text !== lastText) location.reload();
                lastText = text;
                break;
              }
            } catch {}
          }
        } catch {}
      }, 3000);
    }
  </script>
</body>
</html>`;
}
