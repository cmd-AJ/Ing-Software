import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from '../../pages/About';

test('renders About component', () => {
  render(<About />);
});
