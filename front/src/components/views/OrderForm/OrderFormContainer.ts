import { connect } from 'react-redux';
import { getCartLines, sendOrderRequest , getRequest } from '../../../redux/cartRedux';
import { IAppState } from '../../../redux/initialState';
import { AnyAction } from 'redux';
import { ThunkDispatch } from "redux-thunk";
import OrderForm from './OrderForm';
import { IOrder } from './OrderForm';

const mapStateToProps = (state: IAppState) => ({
  cartLines: getCartLines(state),
  request: getRequest(state, 'SEND_ORDER')
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState,undefined, AnyAction>) => ({
  sendOrder: (payload: IOrder) => dispatch(sendOrderRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);