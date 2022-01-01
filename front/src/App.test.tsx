import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {shallow} from 'enzyme';

test('render tested with test-library', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy()
});

describe('Component Hero', () => {
  it('should render without crashing', () => {
    const component = shallow(<App/>);
    expect(component).toBeTruthy();
  });
    
 
});

/*
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
*/