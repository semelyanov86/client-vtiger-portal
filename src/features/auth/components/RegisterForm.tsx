/*const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
      })
      .or(z.object({ teamName: z.string().min(1, 'Required') }))
  );*/

/*type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};*/

export const RegisterForm = () => {
  // const { register, isRegistering } = useAuth();

  return (
    <div>
      <h1>Register form</h1>
    </div>
  );
};
