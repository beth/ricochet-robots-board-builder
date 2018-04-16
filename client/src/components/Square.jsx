import React from 'react';
import PropTypes from 'prop-types';
import ConnectorContainer from '../containers/ConnectorContainer';
import styles from '../styles/Square.css';

const classes = (square) => {
  const classNames = Object.keys(square.walls).map(wall => styles[wall]);
  classNames.push(styles.square);
  if (square.connector) {
    classNames.push(styles.connector);
  }
  return classNames.join(' ');
};

const Square = ({ row, col, square }) => (
  <div className={classes(square)} >
    {
      square.connector ?
        <ConnectorContainer row={row} col={col} /> :
        null
    }
  </div>
);

Square.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  square: PropTypes.shape({
    walls: PropTypes.object,
    connector: PropTypes.bool,
  }).isRequired,
};

export default Square;
