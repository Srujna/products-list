import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ProductsList from './ProductsList';

describe('ProductsList', () => {
  let props;
  let shallowProductsList;
  let renderedProductsList;
  let mountedProductsList;

  const shallowTestComponent = () => {
    if (!shallowProductsList) {
      shallowProductsList = shallow(<ProductsList {...props} />);
    }
    return shallowProductsList;
  };

  const renderTestComponent = () => {
    if (!renderedProductsList) {
      renderedProductsList = render(<ProductsList {...props} />);
    }
    return renderedProductsList;
  };

  const mountTestComponent = () => {
    if (!mountedProductsList) {
      mountedProductsList = mount(<ProductsList {...props} />);
    }
    return mountedProductsList;
  };  

  beforeEach(() => {
    props = {};
    shallowProductsList = undefined;
    renderedProductsList = undefined;
    mountedProductsList = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
