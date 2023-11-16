import { act, screen } from '@testing-library/react';
import { AppPage } from '@/components/Layout';
import { ReactElement } from 'react';

export const waitForDelay = async (delayMs: number) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  });
};

export const withLayout = (component: ReactElement) => {
  return <AppPage>{component}</AppPage>;
};

export const getListInfo = (ListContainerID: string) => {
  const userList = screen.getByTestId(ListContainerID);
  return {
    List: userList as HTMLUListElement,
    FirstItem: userList.querySelector('ul li:first-child') as HTMLLIElement,
  };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (value: number): string => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hexRed = toHex(r);
  const hexGreen = toHex(g);
  const hexBlue = toHex(b);

  return `#${hexRed}${hexGreen}${hexBlue}`;
};
