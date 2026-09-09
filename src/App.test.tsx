import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login with azure button', () => {
  render(<App />);
  const loginButton = screen.getByRole('button', { name: /loginwithazure/i });
  expect(loginButton).toBeInTheDocument();
});
