import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Square.css';

const classes = (square) => {
  const classNames = Object.keys(square.walls).map(wall => styles[wall]);
  classNames.push(styles.square);
  if (square.connector) {
    classNames.push(styles.connector);
  }
  return classNames.join(' ');
};

const Square = props => (
  <div className={classes(props.square)} onClick={() => props.setQuadrant(props.row, props.col)} >
  </div>
);

Square.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  square: PropTypes.shape({
    walls: PropTypes.object,
    row: PropTypes.number,
    col: PropTypes.number,
  }).isRequired,
  setQuadrant: PropTypes.func,
};

export default Square;
