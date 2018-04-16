import { connect } from 'react-redux';
import Connector from '../components/Connector';
import { determineQuadrant } from '../lib/Board';
import size from '../lib/config/size';

const mapStateToProps = (state, ownProps) => ({
  color: state.board.getIn(['quadrants', determineQuadrant(size, ownProps.row, ownProps.col)]) || '',
});

export default connect(mapStateToProps)(Connector);
