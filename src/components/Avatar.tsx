import sc from 'styled-components';
import { FC } from 'react';

const AvatarContainer = sc.div<{ size?: string }>`
  width: ${(props) => (props.size ? props.size : '40px')};
  height: ${(props) => (props.size ? props.size : '40px')};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = sc.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
interface AvatarProps {
  photo: string;
  alt: string;
  size?: string;
  ariaLabel?: string;
}
export const Avatar: FC<AvatarProps> = ({ photo, alt, size, ariaLabel }) => {
  return (
    <AvatarContainer size={size} role="img" aria-label={ariaLabel || alt || 'User Avatar'}>
      <AvatarImage src={photo} alt={alt} />
    </AvatarContainer>
  );
};
