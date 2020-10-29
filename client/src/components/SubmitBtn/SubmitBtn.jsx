import React from 'react';
import styled from 'styled-components';

const SubmitElm = styled.input`
  display: block;
  width: 10rem;
  margin: 0.5rem;
  padding: 0.5rem;
  /* border: none; */
`;

const SubmitBtn = () => {
  return (
    <SubmitElm 
      type='submit' 
      aria-label='submit form'
    />
  )
};

export default SubmitBtn;
