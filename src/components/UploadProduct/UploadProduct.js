import React from 'react';
import PropTypes from 'prop-types';
import styles from './UploadProduct.scss';

const UploadProduct = props => (
	<div>This is a component called UploadProduct.</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class UploadProduct extends React.Component {
//   render() {
//     return <div>This is a component called UploadProduct.</div>;
//   }
// }

const UploadProductPropTypes = {
	// always use prop types!
};

UploadProduct.propTypes = UploadProductPropTypes;

export default UploadProduct;
