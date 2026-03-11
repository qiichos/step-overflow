import logUpdate from "log-update";

// 6-frame running stick figure with arm swing and leg stride
// Each frame: head, torso+arms, legs (all 5 chars wide for alignment)
const FRAMES = [
  // Frame 0: right leg forward stride, left arm reach
  [
    "  o  ",
    " -|\\ ",
    " / > ",
  ],
  // Frame 1: legs crossing, arms pull in
  [
    "  o  ",
    " /|\\ ",
    "  || ",
  ],
  // Frame 2: left leg forward stride, right arm reach
  [
    "  o  ",
    " /|- ",
    " < \\ ",
  ],
  // Frame 3: push off, legs crossing back
  [
    "  o  ",
    " /|\\ ",
    "  || ",
  ],
  // Frame 4: airborne, legs tucked
  [
    "  o  ",
    " -|- ",
    " > < ",
  ],
  // Frame 5: landing, arms down
  [
    "  o  ",
    " /|\\ ",
    " / \\ ",
  ],
];

const GROUND_CHAR = "\u2500";
const GROUND_LEN = 46;

export async function playWalkAnimation(
  until: Promise<unknown>,
  minMs: number = 1000
): Promise<void> {
  const frameWidth = 5;
  let frameIdx = 0;
  let pos = 0;

  const interval = setInterval(() => {
    const frame = FRAMES[frameIdx % FRAMES.length];
    const pad = " ".repeat(pos);
    const ground = GROUND_CHAR.repeat(GROUND_LEN);

    const lines = [
      pad + frame[0],
      pad + frame[1],
      pad + frame[2],
      ground,
    ];

    logUpdate(lines.join("\n"));

    frameIdx++;
    pos += 2;
    if (pos > GROUND_LEN - frameWidth) pos = 0;
  }, 120);

  await Promise.all([
    until.catch(() => {}),
    new Promise((resolve) => setTimeout(resolve, minMs)),
  ]);

  clearInterval(interval);
  logUpdate.clear();
}
