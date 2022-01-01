import React from "react";
import styles from './Home.module.scss';
import { IAppState } from '../../../redux/initialState';
import { AppDispatch } from "../../../redux/store";

export interface ICartLine {
  id: number,
  title: string,
  author: string,
  cover_url: string,
  price: number,
  currency: string,
  quantity: number,
  pages: number,
}
type HomeProps = {
  books: IAppState['products']['data'],
  request: {active: boolean, error: boolean},
  loadProducts: () => Promise<void>,
  addToCart: (line: ICartLine) => AppDispatch;
}
type HomeState = {
  images: number,
};
class Home extends React.Component<HomeProps, HomeState> {
  state: HomeState = {
    images: 0,
  }
  componentDidMount = () => {
    const { loadProducts, books } = this.props;
    if (!books || !books.length) {
      loadProducts();
    }    
  }
  setImageLoaded = () => {
    this.setState({...this.state, images: this.state.images + 1});
  }
  manageAddToCart = (line: ICartLine) => {    
    const {addToCart} = this.props;
    addToCart(line);
  }
  
  render = (): React.ReactNode => {
    const {books, request} = this.props;
    const { images} = this.state;
    const imagesLoaded = images === books.length;
    return ( 
      <div className={styles.root}>
        { request.error && <div className="alert errorAlert" role="alert" >Request Error.</div> }
        { (request.active && !request.error) && <div className="d-flex justify-content-center"><div className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></div></div> }
        { !request.active && !request.error && (
          <div className="row gy-4 gx-3 g-md-5">
            {books.map((book) => (            
              <div key={book.id}  className="col-4 col-md-3" >
                
                  <div className={styles.bookBox}>
                    <div className={styles.bookImage} >
                      <img onLoad={() => this.setImageLoaded()} className={imagesLoaded ? styles.visible : styles.hidden} src={`${book.cover_url}`} alt="something" />
                      <div onClick={() => this.manageAddToCart({...book, quantity: 1})} className={styles.addButton}>DODAJ DO KOSZYKA</div>
                    </div>
                    <div className={styles.bookTitle} >
                      {book.title}
                    </div>
                    <div className={styles.bookPages}>
                      {book.pages} stron
                    </div>
                    <div className={styles.bookAuthor}>
                      {book.author}
                    </div>
                   
                  </div>
               
              </div>                   
            ))}
          </div>) }
      </div>
    );
  }
}

export default Home;