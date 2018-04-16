import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Color.css';

const Color = ({
  color,
  row,
  col,
  setQuadrant,
}) => (
  <div 
    className={`${styles.color} ${styles[color.toLowerCase()]}`}
    onClick={() => setQuadrant(row, col, color)}
  />
);

Color.propTypes = {
  color: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  setQuadrant: PropTypes.func.isRequired,
};

export default Color;
