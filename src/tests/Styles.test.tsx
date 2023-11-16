import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoizedItem as UserListItem } from '@/components/UserItem';
import { rgbToHex, withLayout } from '@/tests/common';
import { SaveBtn } from '@/components/SaveBtn';
import theme from '@/theme/theme.ts';
import '@testing-library/jest-dom';
import { CancelBtn } from '@/components/CancelBtn.tsx';
import App from '../App/UsersPage.tsx';
import { MemoizedInput } from '@/components/FormInput.tsx';

describe('Styles', () => {
  it('should have correct body background color', () => {
    render(<App />);
    expect(window.getComputedStyle(document.body).background).toBe('whitesmoke');
  });

  it('should have correct styles for user hover and selected', () => {
    render(
      withLayout(
        <UserListItem
          isSelected={false}
          user={{
            id: '1',
            photo: '',
            name: 'John Doe',
            company: 'ABC Inc.',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            address: '123 Mordor.',
          }}
        />,
      ),
    );

    const listItem = screen.getByRole('listitem');

    fireEvent.mouseEnter(listItem);
    expect(window.getComputedStyle(listItem).backgroundColor).toBe('rgb(27, 104, 179)');

    fireEvent.click(listItem);
    expect(window.getComputedStyle(listItem).backgroundColor).toBe('rgb(232,232,232)');
  });

  it('should have correct styles for input border color and label color', () => {
    render(
      withLayout(
        <MemoizedInput
          label="Test Label"
          has_error={false}
          placeholder="Test Placeholder"
          error_message="Test Error Message"
        />,
      ),
    );
    const label = screen.getByText('Test Label:');
    const input = screen.getByRole('textbox');

    // Check label color
    expect(window.getComputedStyle(label).color).toBe('rgb(128, 128, 128)');
    // Check input border color
    expect(window.getComputedStyle(input).borderColor).toBe('rgb(236,236,236)');
  });

  it('should have correct styles for cancel button', () => {
    render(withLayout(<CancelBtn onClick={() => false} />));
    const cancelButton = screen.getByTestId('cancel-btn');

    expect(cancelButton).toHaveStyle({ backgroundColor: 'rgb(247,247,247)' });
  });

  it('should have correct styles save button', () => {
    render(withLayout(<SaveBtn isDirty={false} />));

    const saveBtn = screen.getByTestId('save-btn') as HTMLElement;
    expect(saveBtn).toHaveStyle({
      background: 'rgb(27, 104, 179)',
    });

    expect(theme.colors.primary).toBe('#1b68b3');
  });

  it('expect theme.palette.primary to be #1b68b3', () => {
    const primaryColor = rgbToHex(27, 104, 179);
    expect(primaryColor).toBe('#1b68b3');
  });
});
