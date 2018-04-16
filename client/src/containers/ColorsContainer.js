import { connect } from 'react-redux';
import Colors from '../components/Colors';

const mapStateToProps = state => ({
  colors: state.board.get('remainingColors').toJS(),
});

export default connect(mapStateToProps)(Colors);
