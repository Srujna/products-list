import React from 'react';
import { shallow, render, mount } from 'enzyme';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  let props;
  let shallowLandingPage;
  let renderedLandingPage;
  let mountedLandingPage;

  const shallowTestComponent = () => {
    if (!shallowLandingPage) {
      shallowLandingPage = shallow(<LandingPage {...props} />);
    }
    return shallowLandingPage;
  };

  const renderTestComponent = () => {
    if (!renderedLandingPage) {
      renderedLandingPage = render(<LandingPage {...props} />);
    }
    return renderedLandingPage;
  };

  const mountTestComponent = () => {
    if (!mountedLandingPage) {
      mountedLandingPage = mount(<LandingPage {...props} />);
    }
    return mountedLandingPage;
  };  

  beforeEach(() => {
    props = {};
    shallowLandingPage = undefined;
    renderedLandingPage = undefined;
    mountedLandingPage = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
