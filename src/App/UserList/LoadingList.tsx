import sc, { keyframes } from 'styled-components';
import { breakpoints } from '@/theme/breakpoints';

const loadingAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;
const LoadingAvatar = sc.div<{ size?: string }>`
  margin-left: 8px;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  animation: ${loadingAnimation} 1.5s infinite linear;
  background-size: 200% 100%;
  overflow: hidden;
  `;
const LoadingDetails = sc.div`
   padding: 10px 5px 10px 5px;
   display: none;
   margin-left: 12px;
   @media only screen and ${breakpoints.desktop} {
       display: block;
   }
`;
const LoadingDetailsText = sc.div<{ width: string }>`
   padding: 10px 5px 10px 5px;
   margin-bottom: 12px;
   margin-left: 22px;
   background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
   animation: ${loadingAnimation} 1.5s infinite linear;
   background-size: 200% 100%;
   overflow: hidden;
   width: ${(props) => props.width};
`;
const LoadingWrapper = sc.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  transition: background-color 0.4s ease-in-out;
  cursor: pointer;
  min-height: 80px;
  &:hover {
    background-color:  ${(props) => props.theme.colors.primary};
  }
`;
const LoadingListContainer = sc.div`

`;
const LoadingItem = () => {
  return (
    <LoadingWrapper>
      <LoadingAvatar />
      <LoadingDetails>
        <LoadingDetailsText width={'80px'} />
        <LoadingDetailsText width={'120px'} />
      </LoadingDetails>
    </LoadingWrapper>
  );
};

interface LoadingListProps {
  times: number;
}
export const LoadingList = ({ times }: LoadingListProps) => {
  const loadingItems = Array.from({ length: times }, (_, index) => <LoadingItem key={index} />);

  return <LoadingListContainer>{loadingItems}</LoadingListContainer>;
};
