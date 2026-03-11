// MET values for walking (Compendium of Physical Activities)
// Speed (km/h) -> METs mapping points for linear interpolation
const MET_TABLE: [number, number][] = [
  [2.0, 2.0],
  [3.2, 2.8],
  [4.0, 3.5],
  [4.8, 4.3],
  [5.6, 5.0],
  [6.4, 7.0],
  [8.0, 8.3],
];

export function getMets(speedKmh: number): number {
  if (speedKmh <= MET_TABLE[0][0]) return MET_TABLE[0][1];
  if (speedKmh >= MET_TABLE[MET_TABLE.length - 1][0]) {
    return MET_TABLE[MET_TABLE.length - 1][1];
  }

  for (let i = 0; i < MET_TABLE.length - 1; i++) {
    const [s0, m0] = MET_TABLE[i];
    const [s1, m1] = MET_TABLE[i + 1];
    if (speedKmh >= s0 && speedKmh <= s1) {
      const ratio = (speedKmh - s0) / (s1 - s0);
      return m0 + ratio * (m1 - m0);
    }
  }

  return 3.5; // fallback: normal walking
}

export function calcCalories(
  speedKmh: number,
  timeMin: number,
  weightKg: number
): number {
  const mets = getMets(speedKmh);
  const timeHours = timeMin / 60;
  return Math.round(mets * weightKg * timeHours);
}
