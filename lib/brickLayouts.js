export const GRID = {
  rows: 7,
  columns: 11,
};

const makeBrick = (row, column, unbreakable = false) => ({ row, column, unbreakable });

function rectangleLayout() {
  const bricks = [];
  for (let row = 0; row < 5; row += 1) {
    for (let column = 1; column < 10; column += 1) {
      bricks.push(makeBrick(row, column, (row === 1 && column % 4 === 0) || (row === 3 && column % 5 === 0)));
    }
  }
  return bricks;
}

function pyramidLayout() {
  const bricks = [];
  for (let row = 0; row < 6; row += 1) {
    const start = 5 - row;
    const end = 5 + row;
    for (let column = start; column <= end; column += 1) {
      bricks.push(makeBrick(row, column, row > 1 && column === 5));
    }
  }
  return bricks;
}

function diamondLayout() {
  const widths = [1, 3, 5, 7, 5, 3, 1];
  return widths.flatMap((width, row) => {
    const start = Math.floor((GRID.columns - width) / 2);
    return Array.from({ length: width }, (_, index) => {
      const column = start + index;
      return makeBrick(row, column, (row === 2 || row === 4) && column === 5);
    });
  });
}

function heartLayout() {
  const cells = [
    [1, 2], [1, 3], [1, 7], [1, 8],
    [2, 1], [2, 2], [2, 3], [2, 4], [2, 6], [2, 7], [2, 8], [2, 9],
    [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9],
    [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
    [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
    [6, 4], [6, 5], [6, 6],
  ];
  return cells.map(([row, column]) => makeBrick(row, column, (row === 3 && (column === 1 || column === 9)) || (row === 5 && column === 5)));
}

function mixedLayout() {
  const cells = [
    [0, 1], [0, 3], [0, 5], [0, 7], [0, 9],
    [1, 0], [1, 2], [1, 4], [1, 6], [1, 8], [1, 10],
    [2, 1], [2, 2], [2, 5], [2, 8], [2, 9],
    [3, 0], [3, 3], [3, 4], [3, 6], [3, 7], [3, 10],
    [4, 1], [4, 5], [4, 9],
    [5, 2], [5, 3], [5, 7], [5, 8],
  ];
  return cells.map(([row, column], index) => makeBrick(row, column, index % 7 === 0 || (row === 2 && column === 5)));
}

export const GROUNDS = [
  { id: "rectangle", label: "Rectangle", description: "A classic block wall with protected lanes.", bricks: rectangleLayout() },
  { id: "pyramid", label: "Pyramid", description: "A rising center stack with a guarded core.", bricks: pyramidLayout() },
  { id: "diamond", label: "Diamond", description: "Symmetric angles around a tough center.", bricks: diamondLayout() },
  { id: "heart", label: "Heart-like", description: "Curved rows with a few stubborn anchors.", bricks: heartLayout() },
  { id: "mixed", label: "Random mixed", description: "Open gaps and scattered obstacles.", bricks: mixedLayout() },
];

export function getGround(id) {
  return GROUNDS.find((ground) => ground.id === id) || GROUNDS[0];
}

export function applyDifficultyToLayout(groundId, difficultyId) {
  const ground = getGround(groundId);
  return ground.bricks.map((brick, index) => {
    if (brick.unbreakable) {
      return { ...brick, hp: Infinity, maxHp: Infinity };
    }

    let hp = 1;
    if (difficultyId === "medium") hp = index % 3 === 0 ? 2 : 1;
    if (difficultyId === "hard") hp = index % 5 === 0 ? 3 : index % 2 === 0 ? 2 : 1;

    return { ...brick, hp, maxHp: hp };
  });
}

export function countDestroyableBricks(bricks) {
  return bricks.filter((brick) => !brick.unbreakable).length;
}
