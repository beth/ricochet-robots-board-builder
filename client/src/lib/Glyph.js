import COLORS from './config/colors';
import GLYPH_DESIGNS from './config/glyphDesigns';

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
    GLYPH_DESIGNS.forEach((design) => {
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
