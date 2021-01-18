import React from 'react';
import { shallow, render, mount } from 'enzyme';
import AlertComponent from './AlertComponent';

describe('AlertComponent', () => {
  let props;
  let shallowAlertComponent;
  let renderedAlertComponent;
  let mountedAlertComponent;

  const shallowTestComponent = () => {
    if (!shallowAlertComponent) {
      shallowAlertComponent = shallow(<AlertComponent {...props} />);
    }
    return shallowAlertComponent;
  };

  const renderTestComponent = () => {
    if (!renderedAlertComponent) {
      renderedAlertComponent = render(<AlertComponent {...props} />);
    }
    return renderedAlertComponent;
  };

  const mountTestComponent = () => {
    if (!mountedAlertComponent) {
      mountedAlertComponent = mount(<AlertComponent {...props} />);
    }
    return mountedAlertComponent;
  };  

  beforeEach(() => {
    props = {};
    shallowAlertComponent = undefined;
    renderedAlertComponent = undefined;
    mountedAlertComponent = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
