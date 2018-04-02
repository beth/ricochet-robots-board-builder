import SIZE from './config/size';

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

const addBorderWalls = (squares) => {
  addWalls(squares, [0], [0, (SIZE * 2) - 1], 'top');
  addWalls(squares, [(SIZE * 2) - 1], [0, (SIZE * 2) - 1], 'bottom');
  addWalls(squares, [0, (SIZE * 2) - 1], [0], 'left');
  addWalls(squares, [0, (SIZE * 2) - 1], [(SIZE * 2) - 1], 'right');
};

const addConnectorSquares = (squares) => {
  squares[SIZE - 1][SIZE - 1].modifyWalls({ top: true, left: true });
  squares[SIZE - 1][SIZE].modifyWalls({ top: true, right: true });
  squares[SIZE][SIZE - 1].modifyWalls({ bottom: true, left: true });
  squares[SIZE][SIZE].modifyWalls({ bottom: true, right: true });
  squares[SIZE - 1][SIZE - 1].setConnector(true);
  squares[SIZE - 1][SIZE].setConnector(true);
  squares[SIZE][SIZE - 1].setConnector(true);
  squares[SIZE][SIZE].setConnector(true);
};

const generateBlankSquares = () => {
  const squares = [];
  for (let row = 0; row < SIZE * 2; row += 1) {
    squares.push([]);
    for (let col = 0; col < SIZE * 2; col += 1) {
      squares[row].push(new Square(row, col));
    }
  }
  return squares;
};

const generateSquares = () => {
  const squares = generateBlankSquares();
  addBorderWalls(squares);
  addConnectorSquares(squares);
  return squares;
};

export {
  Square,
  generateSquares,
};

