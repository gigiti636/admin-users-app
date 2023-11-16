import sc from 'styled-components';
import { FC } from 'react';

const SaveButton = sc.button`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  &:active {
    background: #4d93d7;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

interface SaveBtnProps {
  isDirty: boolean;
}
export const SaveBtn: FC<SaveBtnProps> = ({ isDirty = false }) => (
  <SaveButton disabled={!isDirty} aria-label="submit-form" id="submit-btn" data-testid={'save-btn'}>
    Save
  </SaveButton>
);
