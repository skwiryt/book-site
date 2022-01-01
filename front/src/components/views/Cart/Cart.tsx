import React from 'react';
import { Link} from 'react-router-dom';
import styles from './Cart.module.scss';
import CartLine from '../../common/CartLine/CartLine';
import { ICartLine } from '../Home/Home';
type CartProps = {
  cartLines: ICartLine[]

}

class Cart extends React.Component<CartProps>  {
  
  render = () => {
    const {cartLines} = this.props;
    const isContent = cartLines.length > 0;
    const cartValue = cartLines.reduce((a, c) => c.quantity * c.price + a, 0);
    return (
      <div className={styles.root}>
        <div className={styles.pageHeader}>TWÓJ KOSZYK</div>
        {cartLines.map((cartLine, i) => (
          <CartLine lineNb={i + 1} key={cartLine.id} cartLine={cartLine}/>
        ))}
        { isContent && <Link to="/order"><div className={styles.orderButton}>{`DALEJ (Suma: ${cartValue/100} zł)`}</div></Link>}
        { !isContent && <div className={styles.orderButton}>KOSZYK JEST PUSTY</div>}   
      </div>
    );
  }
}
export default Cart;