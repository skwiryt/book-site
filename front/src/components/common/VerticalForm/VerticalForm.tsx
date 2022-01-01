import React from 'react';
import styles from './VerticalForm.module.scss';

type Props = {
  children: React.ReactChild[]
}
export const VerticalForm: React.FC<Props> = (props) => (
  <div className={styles.component}>
    {props.children}
  </div>
);
