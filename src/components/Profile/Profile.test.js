import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Profile from './Profile';

describe('Profile', () => {
  let props;
  let shallowProfile;
  let renderedProfile;
  let mountedProfile;

  const shallowTestComponent = () => {
    if (!shallowProfile) {
      shallowProfile = shallow(<Profile {...props} />);
    }
    return shallowProfile;
  };

  const renderTestComponent = () => {
    if (!renderedProfile) {
      renderedProfile = render(<Profile {...props} />);
    }
    return renderedProfile;
  };

  const mountTestComponent = () => {
    if (!mountedProfile) {
      mountedProfile = mount(<Profile {...props} />);
    }
    return mountedProfile;
  };  

  beforeEach(() => {
    props = {};
    shallowProfile = undefined;
    renderedProfile = undefined;
    mountedProfile = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
