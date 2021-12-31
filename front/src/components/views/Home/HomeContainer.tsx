
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from '../../../redux/initialState';
import { AppDispatch, RootState } from '../../../redux/store';
import { getBooks, getRequest, loadProductsRequest } from '../../../redux/productsRedux';
import { addLine } from '../../../redux/cartRedux';
import Home, { ICartLine } from './Home';

const mapStateToProps = (state: IAppState) => ({
  books: getBooks(state),
  request: getRequest(state, 'LOAD_PRODUCTS'),
});
// const mapDispatchToProps = (dispatch: ThunkDispatch<RootState,undefined, AnyAction>) => ({
const mapDispatchToProps = (dispatch: any) => ({
  loadProducts: () => dispatch(loadProductsRequest()),
  addToCart: (line: ICartLine) => dispatch(addLine(line)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);