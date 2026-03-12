<h1 align="center">step-overflow</h1>

<p align="center">
  <strong>A high-energy CLI for treadmill desk walkers.</strong>
</p>

<p align="center">
  Track your steps at work, log progress instantly, auto-push to GitHub,  
  and stay motivated with virtual journeys and unlockable achievements —
  all while building healthier habits without slowing down.
</p>

<p align="center">
  <a href="./README.md">English</a> ·
  <a href="./README.ja.md">日本語</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/CLI-fast%20logging-blue" />
  <img src="https://img.shields.io/badge/GitHub-auto--push-black" />
  <img src="https://img.shields.io/badge/Journey-gameful-green" />
  <img src="https://img.shields.io/badge/Achievements-49%20unlockables-orange" />
</p>

---

## Why step-overflow?

- **Fast logging** — record a walk in seconds from the terminal
- **GitHub sync** — automatically commit and push your progress
- **Journey mode** — turn daily walking into a virtual adventure
- **Achievements** — unlock milestones and keep momentum going

## Preview

<p align="center">
  <img width="976" alt="Dashboard overview" src="https://github.com/user-attachments/assets/d9f5ea55-2313-41dd-9dd8-64413587feb8" />
</p>

<p align="center">
  <img width="983" alt="Journey view" src="https://github.com/user-attachments/assets/e153b8a2-91b0-4d7d-ae51-440b869bdd53" />
</p>

<p align="center">
  <img width="953" alt="Achievements view" src="https://github.com/user-attachments/assets/02fa44be-61d4-4a71-9012-a0ab0711999c" />
</p>

## Install

```bash
npm install -g step-overflow
```

### Requirements

- Node.js >= 18
- git
- [GitHub CLI](https://cli.github.com/) (`gh`)

## Quick Start

```bash
# Initial setup (creates GitHub repo, local config, choose a journey)
stp init

# Record a 60-minute walk
stp add 60

# View dashboard in browser
stp open
```

## Commands

| Command | Description |
|---------|-------------|
| `stp init` | Interactive setup (repo, speed, weight, journey) |
| `stp add <minutes>` | Record a walk |
| `stp sync` | Push unpushed commits |
| `stp open` | Open dashboard locally |
| `stp open --remote` | Open GitHub Pages (public repos) |
| `stp status` | Show current status, journey progress, achievements |
| `stp config speed <value>` | Update default speed (km/h) |
| `stp config weight <value>` | Update weight (kg, `none` to clear) |
| `stp config route` | Change journey route |
| `stp log` | Show recent records in terminal |

### `stp add` options

```bash
stp add 60                        # 60 min at default speed
stp add 60 --speed 5.0            # 60 min at 5 km/h
stp add 60 --date 2026-03-01      # Backdate a record
```

## Journey

Choose a route during setup and track your virtual progress as you walk:

| Title | Route | Distance | Difficulty |
|-------|-------|----------|------------|
| ⛷️ Tour du Mont Blanc | Chamonix → Chamonix | 170 km | ★☆☆☆☆ |
| 🏯 Tokaido | Tokyo → Osaka | 495 km | ★☆☆☆☆ |
| 🕊️ Camino de Santiago | Lisbon → Santiago | 620 km | ★★☆☆☆ |
| 🏛️ Nile Valley | Aswan → Cairo | 1,100 km | ★★☆☆☆ |
| 🐘 Hannibal's March | Cartagena → Rome | 1,500 km | ★★☆☆☆ |
| ⛪ Via Francigena | Canterbury → Rome | 1,900 km | ★★★☆☆ |
| 🏜️ Trans-Saharan | Timbuktu → Marrakech | 2,200 km | ★★★☆☆ |
| 🏔️ Qhapaq Ñan | Quito → Cusco | 2,500 km | ★★★☆☆ |
| ⛵ Spice Route | Banda Neira → Singapore | 3,500 km | ★★★☆☆ |
| 🇺🇸 Route 66 | Chicago → Los Angeles | 3,940 km | ★★★☆☆ |
| 🐫 Silk Road | Xi'an → Constantinople | 7,000 km | ★★★★☆ |
| 🌍 Around the World | London → London | 40,075 km | ★★★★★ |

Each route has waypoints — you'll be notified when you arrive at each city along the way. Complete a route and choose your next adventure.

## Achievements

Unlock 49 achievements as you walk:

- **Distance**: First Step, Century, Thousand Miles, 10K Club, ...
- **Route**: Tokaido Master, Pilgrim, Silk Merchant, Globe Trotter, ...
- **Single Walk**: 5K Walk, Half Marathon, Marathon, Speed Demon, ...
- **Time & Habit**: Early Bird, Night Owl, Weekend Warrior, Double Up
- **Walk Count**: Milestones at 5, 10, 50, 100, and every 100 up to 1,000

## Data

Records are stored in `~/.local/share/step-overflow/<repo>/data/walking.csv`:

```
datetime,time_min,speed_kmh,distance_km,weight_kg
2026-03-06T07:30:00,60,4.0,4.00,70
```

Config is stored in `~/.config/step-overflow/config.json`.

Paths follow the [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/latest/). Override with `$XDG_CONFIG_HOME` and `$XDG_DATA_HOME`.

## Dashboard

The web dashboard (`stp open`) has three tabs:

- **Walking**: Summary cards, daily/cumulative charts, record table
- **Journey**: Route progress visualization with waypoints
- **Achievements**: Unlocked/locked achievement grid

Calories are calculated using METs (Metabolic Equivalent of Task) based on walking speed.

## License

MIT
