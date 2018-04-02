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
  <div className={classes(props.square)} />
);

Square.propTypes = {
  square: PropTypes.shape({ walls: PropTypes.object }).isRequired,
};

export default Square;
