import type { UserModel } from '@/App/types';

interface UserFormProps {
  user: UserModel;
}

export const UserForm = ({ user }: UserFormProps) => {
  return (
    <form>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>{user.address}</div>
    </form>
  );
};
