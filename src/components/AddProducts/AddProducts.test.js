import React from 'react';
import { shallow, render, mount } from 'enzyme';
import AddProducts from './AddProducts';

describe('AddProducts', () => {
  let props;
  let shallowAddProducts;
  let renderedAddProducts;
  let mountedAddProducts;

  const shallowTestComponent = () => {
    if (!shallowAddProducts) {
      shallowAddProducts = shallow(<AddProducts {...props} />);
    }
    return shallowAddProducts;
  };

  const renderTestComponent = () => {
    if (!renderedAddProducts) {
      renderedAddProducts = render(<AddProducts {...props} />);
    }
    return renderedAddProducts;
  };

  const mountTestComponent = () => {
    if (!mountedAddProducts) {
      mountedAddProducts = mount(<AddProducts {...props} />);
    }
    return mountedAddProducts;
  };  

  beforeEach(() => {
    props = {};
    shallowAddProducts = undefined;
    renderedAddProducts = undefined;
    mountedAddProducts = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
