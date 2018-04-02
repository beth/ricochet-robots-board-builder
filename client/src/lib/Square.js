const allowedWalls = new Set(['top', 'bottom', 'left', 'right']);

class Square {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.walls = {};
    this.glyph = null;
    this.connector = null;
  }

  setWall(wall) {
    this.walls[wall] = true;
  }

  removeWall(wall) {
    delete this.walls[wall];
  }

  modifyWall(wall, val) {
    if (val !== undefined && allowedWalls.has(wall)) {
      if (val) {
        this.setWall(wall);
      } else {
        this.removeWall(wall);
      }
    }
  }

  modifyWalls(wallsToModify) {
    const walls = Object.entries(wallsToModify);
    const WALL = 0;
    const VAL = 1;
    for (let i = 0; i < walls.length; i += 1) {
      this.modifyWall(walls[i][WALL], walls[i][VAL]);
    }
  }

  setGlyph(name) {
    this.glyph = name;
  }

  removeGlyph() {
    this.glyph = null;
  }

  setConnector(color) {
    this.connector = color;
  }
}

const addWalls = (squares, [rStart, rStop = rStart], [cStart, cStop = cStart], wall) => {
  for (let row = rStart; row <= rStop; row += 1) {
    for (let col = cStart; col <= cStop; col += 1) {
      squares[row][col].setWall(wall);
    }
  }
};

const addBorderWalls = (squares, size) => {
  addWalls(squares, [0], [0, (size * 2) - 1], 'top');
  addWalls(squares, [(size * 2) - 1], [0, (size * 2) - 1], 'bottom');
  addWalls(squares, [0, (size * 2) - 1], [0], 'left');
  addWalls(squares, [0, (size * 2) - 1], [(size * 2) - 1], 'right');
};

const addConnectorSquares = (squares, size) => {
  squares[size - 1][size - 1].modifyWalls({ top: true, left: true });
  squares[size - 1][size].modifyWalls({ top: true, right: true });
  squares[size][size - 1].modifyWalls({ bottom: true, left: true });
  squares[size][size].modifyWalls({ bottom: true, right: true });
  squares[size - 1][size - 1].setConnector(true);
  squares[size - 1][size].setConnector(true);
  squares[size][size - 1].setConnector(true);
  squares[size][size].setConnector(true);
};

const generateBlankSquares = (size) => {
  const squares = [];
  for (let row = 0; row < size * 2; row += 1) {
    squares.push([]);
    for (let col = 0; col < size * 2; col += 1) {
      squares[row].push(new Square(row, col));
    }
  }
  return squares;
};

const generateSquares = (size) => {
  const squares = generateBlankSquares(size);
  addBorderWalls(squares, size);
  addConnectorSquares(squares, size);
  return squares;
};

export {
  Square,
  generateSquares,
};

