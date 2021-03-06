import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import firebase from 'firebase';
import { render, screen } from '@testing-library/react';
import Header from './Header';

firebase.initializeApp({ apiKey: 'fake-api-key' });

test('does not render alert by default', () => {
  delete window.location;
  window.location = new URL('https://www.example.com');

  render(<Header />, { wrapper: MemoryRouter });

  const alertElement = screen.queryByText(/This is a preview/i);
  expect(alertElement).not.toBeInTheDocument();
});

test('renders alert on PR preview URL', () => {
  delete window.location;
  window.location = new URL('https://s4us-pr-49.onrender.com/foo');

  render(<Header />, { wrapper: MemoryRouter });

  const alertElement = screen.getByText(/This is a preview/i);
  expect(alertElement).toBeInTheDocument();
  const linkElement = screen.getByText(/Pull Request #49/i);
  expect(linkElement.href).toEqual(
    'https://github.com/beyondhb1079/s4us/pull/49'
  );
});
