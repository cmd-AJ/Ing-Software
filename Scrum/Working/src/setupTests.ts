// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';

global.document = global.document || {
  createElement: vi.fn(),
  getElementById: vi.fn(),
};

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

vi.stubGlobal('console', {
  ...console,
  error: vi.fn(), 
});

vi.mock('@ionic/core/components/dir', () => ({
  isRTL: vi.fn().mockReturnValue(false),
}));

vi.mock('@ionic/core/components/swipe-back', () => ({
  createSwipeBackGesture: vi.fn(),
}));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});