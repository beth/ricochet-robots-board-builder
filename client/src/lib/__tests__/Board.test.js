import { expect } from 'chai';
import Board from '../Board';
import SIZE from '../config/size';

describe('Board', () => {
  describe('instance', () => {
    let board;
    beforeEach(() => {
      board = new Board(SIZE);
    });

    describe('properties', () => {
      it('should have a walls, glyph, and connector property', () => {
        expect(board).to.have.keys('size', 'squares', 'quadrants', 'remainingGlyphs', 'remainingQuadrants');
      });

      it('should have default quadrant values of null', () => {
        expect(board.quadrants).to.deep.equal({
          TL: null,
          TR: null,
          BL: null,
          BR: null,
        });
      });
    });

    describe('#checkBounds', () => {
      it('not throw if row, col are in bounds', () => {
        const inBounds = () => board.checkBounds(SIZE, SIZE);
        expect(inBounds).to.not.throw();
      });

      it('should throw if row is not in bounds', () => {
        const notInBounds = () => board.checkBounds(SIZE * 2, SIZE);
        expect(notInBounds).to.throw();
      });

      it('should throw if col is not in bounds', () => {
        const notInBounds = () => board.checkBounds(SIZE, SIZE * 2);
        expect(notInBounds).to.throw();
      });
    });

    describe('#setQuadrant', () => {
      it('should set a new quadrant', () => {
        board.setQuadrant('TL', 'RED');
        expect(board.quadrants.TL).to.equal('RED');
      });

      it('should remove the quadrant from remainingQuadrants', () => {
        board.setQuadrant('BL', 'RED');
        expect(board.remainingQuadrants.has('RED')).to.equal(false);
      });


      it('should add the existing quadrant color to remainingQuadrants', () => {
        board.setQuadrant('TL', 'RED');
        board.setQuadrant('TL', 'GREEN');
        expect(board.remainingQuadrants.has('RED')).to.equal(true);
        expect(board.remainingQuadrants.has('GREEN')).to.equal(false);
      });

      it('should not set a color that is somewhere else', () => {
        board.setQuadrant('TL', 'RED');
        board.setQuadrant('BL', 'RED');
        expect(board.quadrants.BL).to.equal(null);
      });
    });

    describe('#determineQuadrant', () => {
      it('should return TL for anywhere in TL', () => {
        expect(board.determineQuadrant(0, 0)).to.equal('TL');
        expect(board.determineQuadrant(SIZE - 1, 0)).to.equal('TL');
        expect(board.determineQuadrant(0, SIZE - 1)).to.equal('TL');
        expect(board.determineQuadrant(SIZE - 1, SIZE - 1)).to.equal('TL');
      });

      it('should return BL for anywhere in BL', () => {
        expect(board.determineQuadrant(SIZE, 0)).to.equal('BL');
        expect(board.determineQuadrant((SIZE * 2) - 1, SIZE - 1)).to.equal('BL');
        expect(board.determineQuadrant(SIZE, 0)).to.equal('BL');
        expect(board.determineQuadrant((SIZE * 2) - 1, SIZE - 1)).to.equal('BL');
      });

      it('should return BR for anywhere in BR', () => {
        expect(board.determineQuadrant(SIZE, SIZE)).to.equal('BR');
        expect(board.determineQuadrant((SIZE * 2) - 1, SIZE)).to.equal('BR');
        expect(board.determineQuadrant(SIZE, (SIZE * 2) - 1)).to.equal('BR');
        expect(board.determineQuadrant((SIZE * 2) - 1, (SIZE * 2) - 1)).to.equal('BR');
      });

      it('should return TR for anywhere in TR', () => {
        expect(board.determineQuadrant(0, SIZE)).to.equal('TR');
        expect(board.determineQuadrant(SIZE - 1, SIZE)).to.equal('TR');
        expect(board.determineQuadrant(0, (SIZE * 2) - 1)).to.equal('TR');
        expect(board.determineQuadrant(SIZE - 1, (SIZE * 2) - 1)).to.equal('TR');
      });
    });

    describe('#glyphInQuadrant', () => {
      it('should return true if glyph is in quadrant', () => {
        board.setQuadrant('BL', 'GREEN');
        const glyph = Array.from(board.remainingGlyphs).find(g => g.getName() === 'PLANET-BLUE');
        expect(board.glyphInQuadrant(glyph, SIZE, 0)).to.equal(true);
      });

      it('should return false if glyph is not in quadrant', () => {
        board.setQuadrant('BL', 'RED');
        const glyph = Array.from(board.remainingGlyphs).find(g => g.getName() === 'PLANET-BLUE');
        expect(board.glyphInQuadrant(glyph, SIZE, 0)).to.equal(false);
      });
    });

    describe('#setGlyph', () => {
      it('should set the glyph', () => {
        board.setQuadrant('BL', 'GREEN');
        const glyph = Array.from(board.remainingGlyphs).find(g => g.getName() === 'PLANET-BLUE');
        board.setGlyph(glyph, SIZE, 0);
        expect(board.squares[SIZE][0].glyph).to.equal(glyph);
      });

      it('should not set the glyph on a connector square', () => {
        board.setQuadrant('BL', 'GREEN');
        const glyph = Array.from(board.remainingGlyphs).find(g => g.getName() === 'PLANET-BLUE');
        board.setGlyph(glyph, SIZE, SIZE - 1);
        expect(board.squares[SIZE][0].glyph).to.equal(null);
      });

      it('should remove the glyph from remaining glyphs after setting the glyph', () => {
        board.setQuadrant('BL', 'GREEN');
        const glyph = Array.from(board.remainingGlyphs).find(g => g.getName() === 'PLANET-BLUE');
        board.setGlyph(glyph, SIZE, 0);
        expect(board.remainingGlyphs.has(glyph)).to.equal(false);
      });

      it('should remove the glyph from remaining glyphs if it does not set the glyph', () => {
        board.setQuadrant('BL', 'GREEN');
        const glyph = Array.from(board.remainingGlyphs).find(g => g.getName() === 'PLANET-BLUE');
        board.setGlyph(glyph, SIZE, SIZE - 1);
        expect(board.squares[SIZE][0].glyph).to.equal(null);
        expect(board.remainingGlyphs.has(glyph)).to.equal(true);
      });

      it('should add an existing glyph back to the remaining glyphs if one is already present', () => {
        board.setQuadrant('BL', 'GREEN');
        const planetBlueGlyph = Array.from(board.remainingGlyphs).find(g => g.getName() === 'PLANET-BLUE');
        const diamondYellowGlyph = Array.from(board.remainingGlyphs).find(g => g.getName() === 'DIAMOND-YELLOW');
        board.setGlyph(planetBlueGlyph, SIZE, 0);
        board.setGlyph(diamondYellowGlyph, SIZE, 0);
        expect(board.squares[SIZE][0].glyph).to.equal(diamondYellowGlyph);
        expect(board.remainingGlyphs.has(planetBlueGlyph)).to.equal(true);
      });
    });
  });
});

