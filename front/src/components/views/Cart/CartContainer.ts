import { connect } from 'react-redux';
import {getCartLines} from '../../../redux/cartRedux';
import { IAppState } from '../../../redux/initialState';
import Cart from './Cart';

const matchStateToProps = (state: IAppState) => ({
  cartLines: getCartLines(state),
});

export default connect(matchStateToProps)(Cart);