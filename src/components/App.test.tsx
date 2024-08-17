import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import App from 'components/App';

describe('Homepage tests', () => {
  it('should include completed filter', () => {
    const { container } = render(<App />);
    const select = container.querySelector('#completed-filter');
    expect(select).toBeInTheDocument();
  });

  test('should check all checkboxes with id="completed" when "completed" is selected in the select element', async () => {
    const { container, getByLabelText } = render(<App />);

    const selectElement = container.querySelector('#completed-filter');

    if (!selectElement) {
      throw new Error('Select element not found');
    }
    fireEvent.change(selectElement, { target: { value: 'completed' } });

    const checkboxes = container.querySelectorAll(
      'input[type="checkbox"]#completed'
    );

    checkboxes.forEach((checkbox) => {
      // @ts-ignore
      expect(checkbox.checked).toBe(true);
    });
  });
});
