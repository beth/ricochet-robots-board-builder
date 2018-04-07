import { expect } from 'chai';
import generateBoard from '../generators/Board';
import {
  setWall,
  removeWall,
  setGlyph,
  removeGlyph,
} from '../Square';

const SIZE = 8;

describe('Square', () => {
  let board;

  beforeEach(() => {
    board = generateBoard(SIZE);
  });

  describe('setWall', () => {
    it('should set a wall', () => {
      let square = board.getIn(['squares', 0, 0]);
      square = setWall(square, 'left');
      expect(square.getIn(['walls', 'left'])).to.equal(true);
    });
  });

  describe('removeWall', () => {
    it('should remove a wall', () => {
      let square = board.getIn(['squares', 0, 0]);
      square = setWall(square, 'left');
      square = removeWall(square, 'left');
      expect(square.getIn(['walls', 'left'])).to.equal(undefined);
    });
  });

  describe('setGlyph', () => {
    it('should set a glyph', () => {
      let square = board.getIn(['squares', 0, 0]);
      const glyph = { color: 'RED', design: 'CIRCLE' };
      square = setGlyph(square, glyph);
      expect(square.get('glyph')).to.equal(glyph);
    });
  });

  describe('removeGlyph', () => {
    it('should remove a glyph', () => {
      let square = board.getIn(['squares', 0, 0]);
      const glyph = { color: 'RED', design: 'CIRCLE' };
      square = setGlyph(square, glyph);
      square = removeGlyph(square, glyph);
      expect(square.get('glyph')).to.equal(null);
    });
  });
});
