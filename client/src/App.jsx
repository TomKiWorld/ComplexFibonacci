import React from 'react';
// import styled from 'styled-components';
// import { fetchIndexes, fetchValues } from './modules/fetchData';

import { FlexContainer, AppBG, AppHeader, PageTitle } from './styledComponents/styledComponents';

import FibPage from './pages/FibPage';

import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <FlexContainer className="App">
      <AppBG />
      <AppHeader>
        <PageTitle>Fibonacci Calculator</PageTitle>
      </AppHeader>
      <FibPage />
      <Footer />
    </FlexContainer>
  );
};

export default App;
