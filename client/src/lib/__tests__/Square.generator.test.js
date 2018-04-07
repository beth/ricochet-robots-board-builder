import { expect } from 'chai';
import generateSquares from '../generators/Square';


describe('square generator', () => {
  let squares;
  const size = 8;

  beforeEach(() => {
    squares = generateSquares(size);
  });

  it('should have size * 2 rows and size * 2 columns', () => {
    expect(squares).to.have.lengthOf(size * 2);
    expect(squares[0]).to.have.lengthOf(size * 2);
  });

  it('should have generate squares with a glyph, walls, and connector property', () => {
    expect(squares[0][0]).to.have.keys(['glyph', 'walls', 'connector']);
  });

  it('should have generate squares with a border top wall', () => {
    squares[0].forEach(square => expect(square.walls.top).to.be.true);
  });

  it('should have generate squares with a border bottom wall', () => {
    squares[(size * 2) - 1].forEach(square => expect(square.walls.bottom).to.be.true);
  });

  it('should have generate squares with a border left wall', () => {
    squares.forEach(row => expect(row[0].walls.left).to.be.true);
  });

  it('should have generate squares with a border right wall', () => {
    squares.forEach(row => expect(row[(size * 2) - 1].walls.right).to.be.true);
  });
});
