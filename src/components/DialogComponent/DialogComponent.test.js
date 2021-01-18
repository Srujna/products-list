import React from 'react';
import { shallow, render, mount } from 'enzyme';
import DialogComponent from './DialogComponent';

describe('DialogComponent', () => {
  let props;
  let shallowDialogComponent;
  let renderedDialogComponent;
  let mountedDialogComponent;

  const shallowTestComponent = () => {
    if (!shallowDialogComponent) {
      shallowDialogComponent = shallow(<DialogComponent {...props} />);
    }
    return shallowDialogComponent;
  };

  const renderTestComponent = () => {
    if (!renderedDialogComponent) {
      renderedDialogComponent = render(<DialogComponent {...props} />);
    }
    return renderedDialogComponent;
  };

  const mountTestComponent = () => {
    if (!mountedDialogComponent) {
      mountedDialogComponent = mount(<DialogComponent {...props} />);
    }
    return mountedDialogComponent;
  };  

  beforeEach(() => {
    props = {};
    shallowDialogComponent = undefined;
    renderedDialogComponent = undefined;
    mountedDialogComponent = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
