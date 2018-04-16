import { connect } from 'react-redux';
import Square from '../components/Square';

const mapStateToProps = (state, ownProps) => ({
  square: state.board.getIn(['squares', ownProps.row, ownProps.col]).toJS(),
});

export default connect(mapStateToProps)(Square);
