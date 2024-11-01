import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Faq from '../../components/Help/Faq';

test('renders Faq component', () => {
  render(<Faq />);
  expect(screen.getByText('Product Info')).toBeInTheDocument();
  expect(screen.getByText('¿Puedo desactivar mi cuenta?')).toBeInTheDocument();
});
