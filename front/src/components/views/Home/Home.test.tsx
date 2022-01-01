// @ts-nocheck 

import {shallow} from 'enzyme';
import Home from './Home';

describe('Component Home', () => {
  const mockLoad = jest.fn();
  const mockAdd = jest.fn();
  const mockProps = {
    books: [
      {
        "id": 457,
        "title": "Matematyka 1. Podręcznik. Zakres podstawowy",
        "author": "M. Karpiński, M. Dobrowolska, M. Braun, J. Lech",
        "cover_url": "/static/cover/book/457.jpg",
        "pages": 280,
        "price": 3200,
        "currency": "PLN"
      },
      {
        "id": 458,
        "title": "Matematyka 1. Podręcznik. Zakres rozszerzony",
        "author": "M., M., M., J.",
        "cover_url": "/static/cover/book/458.jpg",
        "pages": 300,
        "price": 3300,
        "currency": "PLN"
      },
    ],  
    request: {actve: false, error: false},
    loadProducts: mockLoad,
    addToCart: mockAdd,
  }
  
  it('should render without crashing', () => {
    const component = shallow(<Home {...mockProps}/>);
    expect(component).toBeTruthy();
    //console.log(component.debug());
  });
  
  it('should throw error without required props', () => {
    expect(() => shallow(<Home />)).toThrow();
  });
  
  it('should render alert message if no connection to api', () => {
    const expectedMessage = 'Request Error.';
    const props = {...mockProps, request: {active:false, error: true}};
    const component = shallow(<Home {...props} />);
  
    const renderedMessage = component.find('.alert').text();
    expect(renderedMessage).toEqual(expectedMessage);
    
  });
  it('should render loadin message, if connection to api active', () => {
    const expectedMessage = 'Loading...';
    const props = {...mockProps, request: {active:true, error: false}};
    const component = shallow(<Home {...props} />);
  
    const renderedMessage = component.find('.spinner-border').text();
    expect(renderedMessage).toEqual(expectedMessage);    
  });
  
  it('renders correct elements on page', () => {  
    const component = shallow(<Home {...mockProps} />);
    const images = component.find('img');
    expect(images.length).toBe(2);
    const buttons = component.find('.addButton');
    expect(buttons.length).toBe(2);
    const authors = component.find('.bookAuthor')
    expect(authors.length).toBe(2);
    expect(authors.at(1).text()).toBe('M., M., M., J.');
  });

  it('calls load of books on mount when no books', () => {
    const props = {...mockProps, books: []};
    shallow(<Home {...props} />);
    expect(mockLoad).toBeCalledTimes(1);
  });
  it('calls addToCart when clicked on button', () => {      
    const component = shallow(<Home {...mockProps} />);
    const buttons = component.find('.addButton');
    buttons.at(0).simulate('click')
    expect(mockAdd).toBeCalledTimes(1);
  })

});