import sc from 'styled-components';

const CenteredErrorContainer = sc.div`
  color: white;
  background-color: rgba(160, 0, 0, 0.9); 
  padding: 10px;
  margin: 10px 0;
  font-size: 1.2em;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  z-index:3;
  cursor: pointer;
`;

interface ErrorMessageProps {
  error: string;
  handlerClear: () => void;
}

const ErrorMessage = ({ error, handlerClear }: ErrorMessageProps) => {
  return error ? (
    <CenteredErrorContainer onClick={handlerClear}>
      <strong>Error :</strong> <span>{error}</span>
    </CenteredErrorContainer>
  ) : (
    <span></span>
  );
};

export default ErrorMessage;
