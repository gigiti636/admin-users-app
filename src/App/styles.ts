import sc from 'styled-components';
import { breakpoints } from '@/theme/breakpoints';

export const StyledRoot = sc.div`
  height: 100vh;
  background-color: whitesmoke;;
  @media only screen and ${breakpoints.desktop} {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
