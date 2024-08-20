import { act, screen } from '@testing-library/react';

export const waitForDelay = async (delayMs: number) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  });
};

export const getListInfo = (ListContainerID: string) => {
  const userList = screen.getByTestId(ListContainerID);
  return {
    List: userList as HTMLUListElement,
    FirstItem: userList.querySelector('ul li:first-child') as HTMLLIElement,
  };
};
