import React from 'react';
import styles from './MainLayout.module.scss';

import Header from '../Header/Header';

class MainLayout extends React.Component {
  
  render = () => {
    const {children} = this.props;
    return (
      <div className={styles.root}>
        <Header />
        <div className={styles.content}>
          {children}
        </div>   
      </div>
    );
  }
} 

export default MainLayout;