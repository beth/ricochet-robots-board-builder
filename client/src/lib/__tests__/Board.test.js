import { expect } from 'chai';
import generateBoard from '../generators/Board';
import {
  determineQuadrant,
  glyphAllowedInColorQuadrant,
  isConnector,
  setQuadrant,
  setGlyph,
} from '../Board';

const SIZE = 8;

describe('Board', () => {
  let board;
  beforeEach(() => {
    board = generateBoard(SIZE);
  });

  describe('determineQuadrant', () => {
    it('should return TL for anywhere in TL', () => {
      expect(determineQuadrant(SIZE, 0, 0)).to.equal('TL');
      expect(determineQuadrant(SIZE, SIZE - 1, 0)).to.equal('TL');
      expect(determineQuadrant(SIZE, 0, SIZE - 1)).to.equal('TL');
      expect(determineQuadrant(SIZE, SIZE - 1, SIZE - 1)).to.equal('TL');
    });

    it('should return BL for anywhere in BL', () => {
      expect(determineQuadrant(SIZE, SIZE, 0)).to.equal('BL');
      expect(determineQuadrant(SIZE, (SIZE * 2) - 1, SIZE - 1)).to.equal('BL');
      expect(determineQuadrant(SIZE, SIZE, 0)).to.equal('BL');
      expect(determineQuadrant(SIZE, (SIZE * 2) - 1, SIZE - 1)).to.equal('BL');
    });

    it('should return BR for anywhere in BR', () => {
      expect(determineQuadrant(SIZE, SIZE, SIZE)).to.equal('BR');
      expect(determineQuadrant(SIZE, (SIZE * 2) - 1, SIZE)).to.equal('BR');
      expect(determineQuadrant(SIZE, SIZE, (SIZE * 2) - 1)).to.equal('BR');
      expect(determineQuadrant(SIZE, (SIZE * 2) - 1, (SIZE * 2) - 1)).to.equal('BR');
    });

    it('should return TR for anywhere in TR', () => {
      expect(determineQuadrant(SIZE, 0, SIZE)).to.equal('TR');
      expect(determineQuadrant(SIZE, SIZE - 1, SIZE)).to.equal('TR');
      expect(determineQuadrant(SIZE, 0, (SIZE * 2) - 1)).to.equal('TR');
      expect(determineQuadrant(SIZE, SIZE - 1, (SIZE * 2) - 1)).to.equal('TR');
    });
  });

  describe('glyphAllowedInColorQuadrant', () => {
    it('should return true if glyph is in quadrant', () => {
      const glyph = board.get('remainingGlyphs').toJS().find(g => g.getName() === 'PLANET-BLUE');
      expect(glyphAllowedInColorQuadrant(glyph, 'GREEN')).to.equal(true);
    });

    it('should return false if glyph is not in quadrant', () => {
      const glyph = board.get('remainingGlyphs').toJS().find(g => g.getName() === 'PLANET-BLUE');
      expect(glyphAllowedInColorQuadrant(glyph, 'RED')).to.equal(false);
    });
  });

  describe('isConnector', () => {
    it('should return true for connector row, col', () => {
      expect(isConnector(board, SIZE, SIZE)).to.equal(true);
    });

    it('should return false for non-connector row, col', () => {
      expect(isConnector(board, SIZE + 1, SIZE)).to.equal(false);
    });
  });

  describe('setQuadrant', () => {
    it('should set a new quadrant', () => {
      const newBoard = setQuadrant(board, 'TL', 'RED');
      expect(newBoard.toJS().quadrants.TL).to.equal('RED');
    });

    it('should remove the quadrant from remainingColors', () => {
      const newBoard = setQuadrant(board, 'BL', 'RED');
      expect(newBoard.get('remainingColors').has('RED')).to.equal(false);
    });


    it('should add the existing quadrant color to remainingColors', () => {
      let newBoard = setQuadrant(board, 'TL', 'RED');
      newBoard = setQuadrant(newBoard, 'TL', 'GREEN');
      expect(newBoard.get('remainingColors').has('RED')).to.equal(true);
      expect(newBoard.get('remainingColors').has('GREEN')).to.equal(false);
    });

    it('should not set a color that is somewhere else', () => {
      let newBoard = setQuadrant(board, 'TL', 'RED');
      newBoard = setQuadrant(newBoard, 'BL', 'RED');
      expect(newBoard.getIn(['quadrants', 'BL'])).to.equal(null);
    });
  });

  describe('setGlyph', () => {
    it('should set the glyph', () => {
      let newBoard = setQuadrant(board, 'BL', 'GREEN');
      const glyph = newBoard.get('remainingGlyphs').toJS().find(g => g.getName() === 'PLANET-BLUE');
      newBoard = setGlyph(newBoard, glyph, SIZE, 0);
      expect(newBoard.getIn(['squares', SIZE, 0, 'glyph'])).to.equal(glyph);
    });

    it('should not set the glyph on a connector square', () => {
      let newBoard = setQuadrant(board, 'BL', 'GREEN');
      const glyph = newBoard.get('remainingGlyphs').toJS().find(g => g.getName() === 'PLANET-BLUE');
      newBoard = setGlyph(newBoard, glyph, SIZE, SIZE - 1);
      expect(newBoard.getIn(['squares', SIZE, 0, 'glyph'])).to.equal(null);
    });

    it('should remove the glyph from remaining glyphs after setting the glyph', () => {
      let newBoard = setQuadrant(board, 'BL', 'GREEN');
      const glyph = newBoard.get('remainingGlyphs').toJS().find(g => g.getName() === 'PLANET-BLUE');
      newBoard = setGlyph(newBoard, glyph, SIZE, 0);
      expect(newBoard.get('remainingGlyphs').has(glyph)).to.equal(false);
    });

    it('should remove the glyph from remaining glyphs if it does not set the glyph', () => {
      let newBoard = setQuadrant(board, 'BL', 'GREEN');
      const glyph = newBoard.get('remainingGlyphs').toJS().find(g => g.getName() === 'PLANET-BLUE');
      newBoard = setGlyph(newBoard, glyph, SIZE, SIZE - 1);
      expect(newBoard.getIn(['squares', SIZE, 0, 'glyph'])).to.equal(null);
      expect(newBoard.get('remainingGlyphs').has(glyph)).to.equal(true);
    });

    it('should add an existing glyph back to the remaining glyphs if one is already present', () => {
      let newBoard = setQuadrant(board, 'BL', 'GREEN');
      const planetBlueGlyph = newBoard.get('remainingGlyphs').toJS().find(g => g.getName() === 'PLANET-BLUE');
      const diamondYellowGlyph = newBoard.get('remainingGlyphs').toJS().find(g => g.getName() === 'DIAMOND-YELLOW');
      newBoard = setGlyph(newBoard, planetBlueGlyph, SIZE, 0);
      newBoard = setGlyph(newBoard, diamondYellowGlyph, SIZE, 0);
      expect(newBoard.getIn(['squares', SIZE, 0, 'glyph'])).to.equal(diamondYellowGlyph);
      expect(newBoard.get('remainingGlyphs').has(planetBlueGlyph)).to.equal(true);
    });
  });
});
