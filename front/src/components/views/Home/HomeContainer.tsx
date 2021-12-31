
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from '../../../App';
import { getBooks, getRequest, loadProductsRequest } from '../../../redux/productsRedux';
import Home from './Home';

const mapStateToProps = (state: IAppState) => ({
  books: getBooks(state),
  request: getRequest(state, 'LOAD_PRODUCTS'),
});
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState,undefined, AnyAction>) => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);