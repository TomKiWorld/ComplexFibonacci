import styled from 'styled-components';

import fibonacci_bg from '../images/fibonacci.png'  ;

export const FlexContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AppBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity: 0.3;
  background-image: url(${fibonacci_bg});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
`;

export const AppHeader = styled.header`
  width: 100%;
  height: 5rem;
  margin-top: 2rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageTitle = styled.h1`
  font-weight: 700;
  font-size: 2rem;
`;

export const SecondaryTitle = styled.h2`
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1rem;
`;

export const FormElm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const InputElm = styled.input`
  display: block;
  margin: 0.5rem;
  padding: 0.5rem;
  border: none;
`;

export const SmallText = styled.small`
  font-size: 0.8rem;
  line-height: 2rem;
`;

export const ErrorText = styled.small`
  font-size: 0.8rem;
  line-height: 2rem;
  color: red;
`;
