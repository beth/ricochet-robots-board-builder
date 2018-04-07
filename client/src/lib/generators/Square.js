const Square = () => ({
  walls: {},
  glyph: null,
  connector: null,
});

const generateBlankSquares = (size) => {
  const squares = [];
  for (let row = 0; row < size * 2; row += 1) {
    squares.push([]);
    for (let col = 0; col < size * 2; col += 1) {
      squares[row].push(new Square());
    }
  }
  return squares;
};

const generateSquares = (size) => {
  const squares = generateBlankSquares(size);

  const addWalls = ([rStart, rStop = rStart], [cStart, cStop = cStart], wall) => {
    for (let row = rStart; row <= rStop; row += 1) {
      for (let col = cStart; col <= cStop; col += 1) {
        squares[row][col].walls[wall] = true;
      }
    }
  };

  const addBorderWalls = () => {
    addWalls([0], [0, (size * 2) - 1], 'top');
    addWalls([(size * 2) - 1], [0, (size * 2) - 1], 'bottom');
    addWalls([0, (size * 2) - 1], [0], 'left');
    addWalls([0, (size * 2) - 1], [(size * 2) - 1], 'right');
  };

  const addConnectorWalls = () => {
    addWalls([size - 1], [size - 1, size], 'top');
    addWalls([size], [size - 1, size], 'bottom');
    addWalls([size - 1, size], [size - 1], 'left');
    addWalls([size - 1, size], [size], 'right');
  };

  const addConnectorSquares = () => {
    squares[size - 1][size - 1].connector = true;
    squares[size - 1][size].connector = true;
    squares[size][size - 1].connector = true;
    squares[size][size].connector = true;
  };

  addBorderWalls(size);
  addConnectorSquares(size);
  addConnectorWalls(size);
  return squares;
};

export default generateSquares;
