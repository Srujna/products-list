import React from 'react';
import { shallow, render, mount } from 'enzyme';
import UploadProduct from './UploadProduct';

describe('UploadProduct', () => {
  let props;
  let shallowUploadProduct;
  let renderedUploadProduct;
  let mountedUploadProduct;

  const shallowTestComponent = () => {
    if (!shallowUploadProduct) {
      shallowUploadProduct = shallow(<UploadProduct {...props} />);
    }
    return shallowUploadProduct;
  };

  const renderTestComponent = () => {
    if (!renderedUploadProduct) {
      renderedUploadProduct = render(<UploadProduct {...props} />);
    }
    return renderedUploadProduct;
  };

  const mountTestComponent = () => {
    if (!mountedUploadProduct) {
      mountedUploadProduct = mount(<UploadProduct {...props} />);
    }
    return mountedUploadProduct;
  };  

  beforeEach(() => {
    props = {};
    shallowUploadProduct = undefined;
    renderedUploadProduct = undefined;
    mountedUploadProduct = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
