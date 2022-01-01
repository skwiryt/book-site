import React from 'react';
import styles from './TextField.module.scss';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  id: string,
  value: string, 
  name: string, 
  disabled: boolean,
  label: string, 
  error: string | null,
}

export const TextField: React.FC<Props> = ({onChange, id, value, name, disabled, label, error}) => (
  <div className={styles.component}>
    <label className={styles.label} htmlFor={id}>{label}</label>
    <input className={styles.textBox} onChange={onChange} type="text" id={id} value={value} name={name} disabled={disabled}></input>
    { error && !disabled && <p className={styles.error}>{error}</p>}
  </div>
);