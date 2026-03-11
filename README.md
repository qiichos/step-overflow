# step-overflow

CLI walking log tool. Record walks, sync to GitHub, visualize on GitHub Pages.

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

| Route | Distance | Difficulty |
|-------|----------|------------|
| Tokyo → Osaka (Tokaido) | 495 km | ★☆☆☆☆ |
| Tokyo → Sapporo | 1,150 km | ★★☆☆☆ |
| Camino de Santiago | 800 km | ★★☆☆☆ |
| Route 66 | 3,940 km | ★★★☆☆ |
| Around the World | 40,075 km | ★★★★★ |

Each route has waypoints — you'll be notified when you arrive at each city along the way. Complete a route and choose your next adventure.

## Achievements

Unlock achievements as you walk:

- **Distance**: First Step, 10K, Century, 500 Club, Thousand Miles
- **Journey**: First Journey, World Traveler, Globe Trotter
- **Records**: Early Bird, Night Owl, Speed Demon, Marathon, Long Haul

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
