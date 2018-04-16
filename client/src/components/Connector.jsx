import React from 'react';
import PropTypes from 'prop-types';
import COLORS from '../lib/config/colors';
import ColorsContainer from '../containers/ColorsContainer';
import styles from '../styles/Connector.css';

const connectorStyles = color => `${styles['set-connector']} ${styles[color.toLowerCase()]}`;

const Connector = ({ color, row, col }) => (
  COLORS.includes(color) ?
    <div className={connectorStyles(color)} /> :
    <ColorsContainer row={row} col={col} />
);

Connector.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Connector;
