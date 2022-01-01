import React from 'react';
import { Link } from 'react-router-dom';
import { ICartLine } from '../Home/Home';
import styles from './OrderForm.module.scss';
import { TextField } from '../../common/TextField/TextField';
import { VerticalForm } from '../../common/VerticalForm/VerticalForm';

export interface IOrderLine {
  id: number,
  quantity: number,
}
export interface IOrder {
  order: IOrderLine[],
  first_name: string,
  last_name: string,
  city: string,
  zip_code: string,
}
type OrderFormProps = {
  sendOrder: (order: IOrder) => Promise<void>,
  cartLines: ICartLine[],
  request: {active: boolean, error: boolean},
};
class OrderForm extends React.Component<OrderFormProps>  { 
  state = {
    fields: {
      first_name: '',
      last_name: '',
      city: '',
      zip_code: '',
    },
    errors: {
      first_name: null,
      last_name: null,
      city: null,
      zip_code: null,
    },
    sent: false,
  }
  handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {   
    const { name, value } = target;
    const { errors, fields } = this.state;    
    this.setState({...this.state, fields: { ...fields, [name]: value}}, () => {
      this.setState({...this.state, errors: {...errors, [name]: this.fieldError(name)}});     
    });
  };

  fieldError = (field: string) => {
    let message = null;
    const { fields } = this.state;
    switch(field) {
      case 'first_name' :     
        if (!fields.first_name) {
          message = 'Text is required';
        }else if (fields.first_name.length > 10) {
          message = 'You can\'t enter more than 10 characters';
        }
      break;
      case 'last_name' :     
        if (!fields.last_name) {
          message = 'Text is required';
        }else if (fields.last_name.length > 25) {
          message = 'You can\'t enter more than 25 characters';
        }
      break;
      case 'city' :     
        if (!fields.city) {
          message = 'Text is required';
        }else if (fields.city.length > 10) {
          message = 'You can\'t enter more than 10 characters';
        }
      break;
      case 'zip_code' :     
        if (!fields.zip_code) {
          message = 'Text is required';
        }else if (!/^\d\d-\d\d\d$/.test(fields.zip_code)) {
          message = 'You must enter zip in 00-000 format';
        }
      break;
      default :
      break;
    }
    return message;
  }
  formValidation = () => {
    const errors:any = {};
    Object.keys(this.state.fields).forEach(field => errors[field] = this.fieldError(field));
    this.setState({...this.state, errors: errors});
    return Object.keys(errors).every(field => errors[field] === null);
  }   
  handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { sendOrder, cartLines } = this.props;
    const { fields } = this.state;
    const theOrder: IOrder = {
      order: [], ...fields
    }
    cartLines.forEach(cl => theOrder.order.push({id: cl.id, quantity: cl.quantity}));

    if (this.formValidation()) {
      this.setState({...this.state, sent: true });
      sendOrder(theOrder)
    }
  }
 
  render = () => {    
    const {request, cartLines} = this.props;
    const {sent, errors, fields} = this.state;
    const total = cartLines.reduce((a, c) => a + c.quantity * c.price, 0)/100;
    return (
      <div className={styles.root}>
        { (sent && !request.active && !request.error) && <div className="alert successAlert" role="alert">Your order has been succesfully submited.</div> }
        { (sent && request.error) && <div className="alert errorAlert" role="alert">Request Error.</div> }
        { (sent && request.active) && <div className="d-flex justify-content-center"><div className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></div></div> }
        { !sent && (
          <div>
            <div className={styles.pageHeader} >PODSUMOWANIE</div>
            <div className={styles.order}>
              <div className={styles.tableHeader}>
                <div className="row">            
                  <div className="col-1"></div>
                  <div className="col-5">Pozycja</div>
                  <div className="col-2 d-flex justify-content-center">Ilość</div>
                  <div className="col-2">Cena</div>
                  <div className="col-2 d-flex justify-content-end">Suma</div>
                </div>
              </div>
              <div className={styles.orderLines}>
                {cartLines.map((cl, i) => (
                  <div key={cl.id} className="row p-1 align-items-center">
                    <div className="col-1 d-flex justify-content-center">{i + 1}.</div>
                    <div className="col-5">
                      <div className="row">
                        <div className="col-12">{cl.title}</div>
                        <div className="col-12"><span className={styles.note}>{cl.author}</span></div>
                      </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center">{cl.quantity}</div>
                    <div className="col-2">{(cl.price/100).toFixed(2)} zł</div>
                    <div className="col-2 d-flex justify-content-end">{(cl.price/100 * cl.quantity).toFixed(2)} zł</div>                    
                  </div>
                ))}
              </div>  
            </div>
            <div className={styles.total}>
                Suma: {total.toFixed(2)} zł
            </div>
            <div className={styles.contact}>
              <div className={styles.contactHeader} >Dane Wysyłkowe</div>
              
              <div className="row g-4 gx-lg-5">                
                <VerticalForm>
                  <TextField 
                    onChange={this.handleChange} 
                    id="first_name" 
                    value={fields.first_name} 
                    name="first_name" 
                    label="Imię"
                    disabled={false}
                    error={errors.first_name}
                  /> 
                    <TextField 
                    onChange={this.handleChange} 
                    id="last_name" 
                    value={fields.last_name} 
                    name="last_name" 
                    label="Nazwisko"
                    disabled={false}
                    error={errors.last_name}
                  /> 
                  <TextField 
                    onChange={this.handleChange} 
                    id="city" 
                    value={fields.city} 
                    name="city" 
                    label="Miasto"
                    disabled={false}
                    error={errors.city}
                  /> 
                  <TextField 
                    onChange={this.handleChange} 
                    id="zip_code" 
                    value={fields.zip_code} 
                    name="zip_code" 
                    label="Kod Pocztowy"
                    disabled={false}
                    error={errors.zip_code}
                  /> 
                </VerticalForm>     
                <div className="col-12 col-md-6">
                  <button type="submit" onClick={this.handleSubmit} disabled={sent && request.active} className={styles.sendButton}>ZAMAWIAM I PŁACĘ</button>
                </div>
                <div className="col-12 col-md-6">
                  <Link to="/cart"><button type="button" className={styles.backButton}>Powrót</button></Link>
                </div>
              </div>
              
            </div>
          </div>
        )}
      </div>
    );
  }
}


export default OrderForm;