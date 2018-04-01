import { generateGlyphs } from './Glyph';
import { generateSquares } from './Square';
import COLORS from './config/colors';
import GLYPH_QUADRANTS from './config/glyphQuadrants';

class Board {
  constructor(size) {
    this.size = size;
    this.squares = generateSquares(size);
    this.quadrants = {
      TL: null,
      TR: null,
      BL: null,
      BR: null,
    };
    this.remainingGlyphs = new Set(generateGlyphs());
    this.remainingQuadrants = new Set(COLORS);
  }

  checkBounds(row, col) {
    if (row >= 0 && col >= 0 && row < this.size * 2 && col < this.size * 2) {
      return true;
    }
    throw new Error(`row ${row} col ${col} is not in bounds for size ${this.size}`);
  }

  setQuadrant(quadrant, color) {
    if (!this.remainingQuadrants.has(color)) {
      return;
    }
    if (this.quadrants[quadrant]) {
      this.remainingQuadrants.add(this.quadrants[quadrant]);
    }
    this.quadrants[quadrant] = color;
    this.remainingQuadrants.delete(color);
  }

  determineQuadrant(row, col) {
    this.checkBounds(row, col);

    if (row <= this.size - 1 && col <= this.size - 1) {
      return 'TL';
    } else if (row <= this.size - 1) {
      return 'TR';
    } else if (col <= this.size - 1) {
      return 'BL';
    }
    return 'BR';
  }

  glyphInQuadrant(glyph, row, col) {
    const quadrant = this.determineQuadrant(row, col);
    return GLYPH_QUADRANTS[glyph.getName()] === this.quadrants[quadrant];
  }

  setGlyph(glyph, row, col) {
    if (!this.glyphInQuadrant(glyph, row, col) || this.squares[row][col].connector) {
      return;
    }

    const square = this.squares[row][col];
    if (square.glyph) {
      this.remainingGlyphs.add(square.glyph);
    }
    square.setGlyph(glyph);
    this.remainingGlyphs.delete(glyph);
  }
}

export default Board;
