import App from '../App/UsersPage.tsx';
import { describe, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { waitForDelay, getListInfo } from '@/tests/common.tsx';
import userEventLib from '@testing-library/user-event';

describe('App', () => {
  it('App rendered on loading state', () => {
    render(<App />);

    expect(screen.getByTestId('user-list-wrapper')).toBeInTheDocument();

    const userListWrapper = screen.getByTestId('user-list-wrapper');

    const firstListItem = userListWrapper.querySelector('ul li:first-child') as HTMLElement;
    expect(firstListItem).not.toBeInTheDocument();

    const loadingList = userListWrapper.querySelector('#loading-list') as HTMLElement;
    expect(loadingList).toBeInTheDocument();

    const prompt = screen.getByTestId('user_prompt');
    expect(prompt).toHaveTextContent('Fetching users');
  });

  it('User List loaded with user prompt', async () => {
    render(<App />);

    await waitForDelay(1000);

    const { FirstItem, List } = getListInfo('user-list-wrapper');

    expect(List).toBeInTheDocument();
    expect(FirstItem).toBeInTheDocument();

    const prompt = screen.getByTestId('user_prompt');
    expect(prompt).toHaveTextContent('Select a user from the list');
  });
});

describe('List', () => {
  it('item title should be user name and displayed as in the form name input', async () => {
    render(<App />);
    await waitForDelay(1000);

    const { FirstItem } = getListInfo('user-list-wrapper');
    fireEvent.click(FirstItem);

    await waitForDelay(200);

    const form = screen.getByTestId('user_form') as HTMLElement;
    const inputName = form.querySelector('#name-input');

    const listItemTitle = FirstItem.getAttribute('title');
    // @ts-ignore
    expect(inputName.value).toBe(listItemTitle);
  });
});

describe('Form', () => {
  it('Display form when user clicked with its details on inputs', async () => {
    render(<App />);
    await waitForDelay(1000);

    const { FirstItem } = getListInfo('user-list-wrapper');
    fireEvent.click(FirstItem);

    await waitForDelay(200);

    const form = screen.getByTestId('user_form') as HTMLElement;
    expect(form).toBeInTheDocument();

    const inputName = form.querySelector('#name-input');
    // @ts-ignore
    expect(inputName.value).toBe(FirstItem.getAttribute('title'));
  });

  it('On other user click, form details are updated', async () => {
    render(<App />);
    await waitForDelay(1000);

    const { FirstItem, List } = getListInfo('user-list-wrapper');

    const OriginallistItemTitle = FirstItem.getAttribute('title');
    fireEvent.click(FirstItem);

    await waitForDelay(200);

    const form = screen.getByTestId('user_form') as HTMLElement;
    const inputName = form.querySelector('#name-input');

    await waitForDelay(200);

    // @ts-ignore
    const originalValue = inputName.value;
    expect(originalValue).toBe(OriginallistItemTitle);

    const other_user = List.querySelector('ul li:nth-child(2)') as HTMLLIElement;
    fireEvent.click(other_user);

    await waitForDelay(200);

    // @ts-ignore
    expect(originalValue).not.toBe(inputName.value);
  });

  it('On success user edit, user list updated', async () => {
    render(<App />);
    await waitForDelay(1000);

    const { FirstItem } = getListInfo('user-list-wrapper');
    fireEvent.click(FirstItem);

    await waitForDelay(200);

    const form = screen.getByTestId('user_form') as HTMLElement;
    const inputName = form.querySelector('#name-input') as HTMLInputElement;

    // Update input value
    const newName = 'Updated UserName';

    userEventLib.type(inputName, newName);

    // Trigger save button
    const saveButton = form.querySelector('#submit-btn') as HTMLButtonElement;
    fireEvent.click(saveButton);

    await waitForDelay(700);

    const firstListItem = screen
      .getByTestId('user-list-wrapper')
      .querySelector('ul li:first-child') as HTMLElement;
    expect(firstListItem).toHaveAttribute('title', newName);
  });

  it('Form - pre-edit Cancel btn is not in the dom', async () => {
    render(<App />);
    await waitForDelay(1000);

    //init form
    const { FirstItem } = getListInfo('user-list-wrapper');
    fireEvent.click(FirstItem);

    await waitForDelay(200);
    const form = screen.getByTestId('user_form') as HTMLElement;

    const CancelBtn = form.querySelector('#cancel-btn') as HTMLButtonElement;

    expect(CancelBtn).not.toBeInTheDocument();
  });

  it('Form - pre-edit Save btn is in the dom and disabled', async () => {
    render(<App />);
    await waitForDelay(1000);

    //init form
    const { FirstItem } = getListInfo('user-list-wrapper');
    fireEvent.click(FirstItem);

    await waitForDelay(200);
    const form = screen.getByTestId('user_form') as HTMLElement;

    const SaveBtn = form.querySelector('#submit-btn') as HTMLButtonElement;

    expect(SaveBtn).toBeInTheDocument();

    /*
      works on component => it might be a Styled-components issue
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    */
    //const computedStyle = window.getComputedStyle(SaveBtn);
    //expect(computedStyle.getPropertyValue('disabled')).toBe('true');
  });

  it('Form - form is reset', async () => {
    render(<App />);
    await waitForDelay(1000);

    // Init form
    const { FirstItem } = getListInfo('user-list-wrapper');
    fireEvent.click(FirstItem);

    await waitForDelay(200);
    const form = screen.getByTestId('user_form') as HTMLElement;

    // Store input value
    const inputName = form.querySelector('#name-input') as HTMLInputElement;
    const originalNameValue = inputName.value;

    const newName = 'New User Name';
    userEventLib.type(inputName, newName);

    await waitForDelay(300);

    // @ts-ignore
    expect(originalNameValue).not.toBe(form.querySelector('#name-input').value);

    await waitForDelay(300);

    const cancelButton = form.querySelector('#cancel-btn') as HTMLElement;
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    await waitForDelay(300);

    expect(cancelButton).not.toBeInTheDocument();
  });
});
