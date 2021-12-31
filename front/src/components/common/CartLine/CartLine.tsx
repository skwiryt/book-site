import React from 'react';
import styles from './CartLine.module.scss';
import { ICartLine } from '../../views/Home/Home';

type CartLineProps = {
  cartLine: ICartLine
  lineNb: number
}


class CartLine extends React.Component<CartLineProps> { 
  render() {
    const {cartLine, lineNb} = this.props;
    return (
      <div className={styles.root}>        
        <div className='row g-3'>          
          <div className='col-12 col-sm-1'>
            <div className={styles.itemNb}>
              <div>{`${lineNb}.`}</div>
            </div>
          </div>
          <div className='col-4 col-sm-5 col-md-2'>
            <div className={styles.productImage}>
              <img src={`${cartLine.cover_url}`} alt='product'/>
            </div>
          </div>
          <div className='col-7 col-sm-9'>
            <div className={styles.productInfo}>
              <div>
                <div className={styles.productTitle}>
                  {cartLine.title}
                </div>
                <div className={styles.productPrice}>
                  {cartLine.price/100} zł
                </div>
              </div>      
              <p>{cartLine.quantity} szt.</p>
            </div>
          </div>
        </div>   
      </div>
    );
  }
};

export default CartLine;
