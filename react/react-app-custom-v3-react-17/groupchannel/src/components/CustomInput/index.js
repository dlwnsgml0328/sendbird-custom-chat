import React from 'react';

const CustomInput = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange} />;
};

export default CustomInput;
