import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from 'components/App';
// import { render } from '@testing-library/react';
// import App from '../App.tsx';

describe('first test', () => { 

it('should second', () => {
  render(<App />);
  expect(true).toBeTruthy();
});

 })
