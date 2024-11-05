import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // change any one test `toBe` parameter so that it is incorrect 
  // expect(linkElement).toBeInTheDocument();
});
