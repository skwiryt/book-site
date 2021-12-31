import React from "react";
import styles from './Home.module.scss';
import { IAppState } from '../../../App';

type HomeProps = {
  books: IAppState['products']['data'],
  request: {active: boolean, error: boolean},
  loadProducts: () => Promise<void>,
}
type HomeState = {
  images: number,
};
class Home extends React.Component<HomeProps> {
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
  manageAddToCart = () => {

  }
  
  render = (): React.ReactNode => {
    const {books, request} = this.props;
    const { images} = this.state;
    const imagesLoaded = images === books.length;
    return ( 
      <div className={styles.root}>
        { request.error && <div className="alert errorAlert" role="alert" > Request Error.</div> }
        { (request.active && !request.error) && <div className="d-flex justify-content-center"><div className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></div></div> }
        { !request.active && !request.error && (
          <div className="row gy-4 gx-3 g-md-5">
            {books.map(book => (            
              <div key={book.id}  className="col-4 col-md-3" >
                
                  <div className={styles.bookBox}>
                    <div className={styles.bookImage} >
                      <img onLoad={() => this.setImageLoaded()} className={imagesLoaded ? styles.visible : styles.hidden} src={`${book.cover_url}`} alt="something" />
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
                    <div onClick={this.manageAddToCart} className={styles.addButton}>DODAJ DO KOSZYKA</div>
                  </div>
               
              </div>                   
            ))}
          </div>) }
      </div>
    );
  }
}

export default Home;