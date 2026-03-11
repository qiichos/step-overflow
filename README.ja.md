# step-overflow

[English](./README.md) | [日本語](./README.ja.md)

ウォーキング記録CLIツール。歩いた記録をGitHubに保存し、GitHub Pagesで可視化します。

## インストール

```bash
npm install -g step-overflow
```

### 必要なもの

- Node.js >= 18
- git
- [GitHub CLI](https://cli.github.com/) (`gh`)

## クイックスタート

```bash
# 初期設定（GitHubリポジトリ作成、速度・体重設定、ルート選択）
stp init

# 60分のウォーキングを記録
stp add 60

# ダッシュボードをブラウザで開く
stp open
```

## コマンド

| コマンド | 説明 |
|---------|------|
| `stp init` | 初期設定（リポジトリ、速度、体重、ルート） |
| `stp add <分>` | ウォーキングを記録 |
| `stp sync` | 未プッシュのコミットを送信 |
| `stp open` | ダッシュボードをローカルで開く |
| `stp open --remote` | GitHub Pagesで開く（公開リポジトリ） |
| `stp status` | 現在の状態、ルート進捗、実績を表示 |
| `stp config speed <値>` | デフォルト速度を変更（km/h） |
| `stp config weight <値>` | 体重を変更（kg、`none`でクリア） |
| `stp config route` | ルートを変更 |
| `stp log` | 最近の記録をターミナルに表示 |

### `stp add` オプション

```bash
stp add 60                        # デフォルト速度で60分
stp add 60 --speed 5.0            # 5 km/hで60分
stp add 60 --date 2026-03-01      # 日付を指定して記録
```

## ジャーニー

初期設定時にルートを選び、歩いた距離に応じて仮想の旅を進めます:

| タイトル | ルート | 距離 | 難易度 |
|---------|-------|------|--------|
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

各ルートには中継地点があり、到着するたびに通知されます。ルートを完走したら、次の冒険を選びましょう。

## 実績

49の実績を歩いてアンロック:

- **距離**: First Step, Century, Thousand Miles, 10K Club, ...
- **ルート**: Tokaido Master, Pilgrim, Silk Merchant, Globe Trotter, ...
- **1回の記録**: 5K Walk, Half Marathon, Marathon, Speed Demon, ...
- **時間・習慣**: Early Bird, Night Owl, Weekend Warrior, Double Up
- **記録回数**: 5, 10, 50, 100回、以降100回刻みで1,000回まで

## データ

記録は `~/.local/share/step-overflow/<リポジトリ>/data/walking.csv` に保存:

```
datetime,time_min,speed_kmh,distance_km,weight_kg
2026-03-06T07:30:00,60,4.0,4.00,70
```

設定は `~/.config/step-overflow/config.json` に保存。

パスは [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/latest/) に準拠。`$XDG_CONFIG_HOME` と `$XDG_DATA_HOME` で変更可能。

## ダッシュボード

Webダッシュボード（`stp open`）は3つのタブで構成:

- **Walking**: サマリーカード、日次/累計チャート、記録テーブル
- **Journey**: ルート進捗の可視化と中継地点
- **Achievements**: 実績の一覧（アンロック済み/未アンロック）

カロリーはMETs（代謝当量）に基づき、歩行速度から計算されます。

## ライセンス

MIT
