import { expect } from 'chai';
import { Map } from 'immutable';
import generateBoard from '../generators/Board';


const size = 8;

describe('Board', () => {
  let board;
  beforeEach(() => {
    board = generateBoard(size);
  });

  it('should have a walls, glyph, and connector property', () => {
    expect(board.toJS()).to.have.keys('size', 'squares', 'quadrants', 'remainingGlyphs', 'remainingColors');
  });

  it('should have default quadrant values of null', () => {
    expect(board.toJS().quadrants).to.deep.equal({
      TL: null,
      TR: null,
      BL: null,
      BR: null,
    });
  });

  it('should be an instance of immutable Map', () => {
    expect(board).to.be.instanceOf(Map);
  });
});

