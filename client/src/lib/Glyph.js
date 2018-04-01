import COLORS from './config/colors';
import TOKEN_DESIGNS from './config/tokenDesigns';

class Glyph {
  constructor(color, design) {
    this.color = color;
    this.design = design;
  }

  getName() {
    return `${this.design}-${this.color}`;
  }
}

const generateGlyphs = () => {
  const glyphs = [];
  COLORS.forEach((color) => {
    TOKEN_DESIGNS.forEach((design) => {
      glyphs.push(new Glyph(color, design));
    });
  });
  glyphs.push(new Glyph('ALL', 'ALL'));
  return glyphs;
};

export {
  Glyph,
  generateGlyphs,
};
