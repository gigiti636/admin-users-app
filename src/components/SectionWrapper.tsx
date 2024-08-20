import { breakpoints } from '@/theme/breakpoints';
import sc from 'styled-components';

export const SectionWrapper = sc.aside`
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    padding-left: 17px;
    padding-right: 17px;
    position: relative;
    margin-left:auto;
    margin-right:auto;
    margin-top:30px;
    flex: 1;
       @media only screen and ${breakpoints.desktop} {
           margin-top:unset;
           justify-content: center;
           padding-left: 35px;
           padding-right: 35px;
   }
        
`;
