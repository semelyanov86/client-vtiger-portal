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

import { Button, Form } from 'react-bootstrap';
import { Envelope, UpcScan, Lock } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

export const RegisterForm = () => {
  // const { register, isRegistering } = useAuth();

  return (
    <>
      <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
        <div className="sw-lg-50 px-5">
          <div className="sh-11">
            <NavLink to="/">
              <div className="logo-default" />
            </NavLink>
          </div>
          <div className="mb-5">
            <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
            <h2 className="cta-1 text-primary">let us get the ball rolling!</h2>
          </div>
          <div className="mb-5">
            <p className="h6">Please use the form to register.</p>
            <p className="h6">
              If you are a member, please <NavLink to="/login">login</NavLink>.
            </p>
          </div>
          <div>
            <form id="registerForm" className="tooltip-end-bottom">
              <div className="mb-3 filled form-group tooltip-end-top">
                <Envelope></Envelope>
                <Form.Control type="text" name="name" placeholder="Name" />
              </div>
              <div className="mb-3 filled form-group tooltip-end-top">
                <UpcScan></UpcScan>
                <Form.Control type="text" name="email" placeholder="Email" />
              </div>
              <div className="mb-3 filled form-group tooltip-end-top">
                <Lock></Lock>
                <Form.Control type="password" name="password" placeholder="Password" />
              </div>
              <div className="mb-3 position-relative form-group">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="terms" />
                  <label className="form-check-label">
                    I have read and accept the{' '}
                    <NavLink to="/" target="_blank">
                      terms and conditions.
                    </NavLink>
                  </label>
                </div>
              </div>
              <Button size="lg" type="submit">
                Signup
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
