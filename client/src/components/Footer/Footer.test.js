import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('render the footer Component', () => {
  const { getByText } = render(<Footer />);
  const linkElement = getByText(/TomKiWorld/i);
  expect(linkElement).toBeInTheDocument();
});
