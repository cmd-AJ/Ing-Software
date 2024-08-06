import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExploreContainer from './components/ExploreContainer';

test('renders ExploreContainer component', () => {
  render(<ExploreContainer />);

  expect(screen.getByText('Ready to create an app?')).toBeInTheDocument();

  expect(screen.getByText('Start with Ionic')).toBeInTheDocument();

  expect(screen.getByRole('link', { name: /UI Components/i })).toHaveAttribute('href', 'https://ionicframework.com/docs/components');
});
