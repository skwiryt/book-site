import React from 'react';
import { NavLink, Link} from 'react-router-dom';
import styles from './Header.module.scss';


class Header extends React.Component{  
  render = () => {      
    return (
      <div className={styles.root}>           
        <nav className={styles.navBar}>
          <div className={styles.menu}>
            <NavLink className={(navData) => navData.isActive ? styles.link + ' active' : styles.link } to={`/`} >HOME</NavLink> 
          </div>
          <div className={styles.logo}>
            <Link className={styles.link} to={`/`} >BOOKS-SITE</Link>
          </div>
          <div className={styles.menu}>            
            <NavLink className={(navData) => navData.isActive ? styles.link + ' active' : styles.link } to={`/cart`} >KOSZYK</NavLink>
          </div> 
        </nav>
      </div>
    );
  }
} 

export default Header;
