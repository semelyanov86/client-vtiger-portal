/*const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type LoginValues = {
  email: string;
  password: string;
};*/

/*type LoginFormProps = {
  onSuccess: () => void;
};*/

import { useAuthContext } from '../../../lib/auth.tsx';

export const LoginForm = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Login form</h1>
      {user?.email}
    </div>
  );
};
