import sc from 'styled-components';
import ThemeProvider from '@/theme/ThemeProvider';
import { ReactNode } from 'react';
import { GlobalStyle } from '@/theme/theme';
import { breakpoints } from '@/theme/breakpoints';

interface BaseProviderProps {
  children: ReactNode;
}
const StyledRoot = sc.div`
    background-color: whitesmoke;
    height: 100vh;
    justify-content: center;
`;
const AppTheme = ({ children }: BaseProviderProps) => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <StyledRoot>{children}</StyledRoot>
    </ThemeProvider>
  );
};

const Container = sc.main`
    margin: 0;
    position: relative;
    width: 100%;
    display: flex;
    height: 100%;
    max-width: 1000px;
    max-height: unset;
    background-color: ${(props) => props.theme.background.paper};
    box-shadow: none;
    @media only screen and ${breakpoints.desktop} {
         box-shadow: ${(props) => props.theme.boxShadow.basic};
         max-height: 600px;
         margin-left: auto;
         margin-right: auto;
         margin-top: 140px;
    }

`;
export const AppPage = ({ children }: BaseProviderProps) => {
  return (
    <AppTheme>
      <Container>{children}</Container>
    </AppTheme>
  );
};
