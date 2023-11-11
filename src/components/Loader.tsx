import sc, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoaderContainer = sc.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledLoader = sc.div`
  border: 4px solid ${(props) => props.theme.colors.secondaryDark};
  border-radius: 50%;
  border-top: 4px solid ${(props) => props.theme.colors.primary || '#fff'};
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 1s linear infinite;
`;

const Loader = () => {
  return (
    <StyledLoaderContainer>
      <StyledLoader />
    </StyledLoaderContainer>
  );
};

export default Loader;
