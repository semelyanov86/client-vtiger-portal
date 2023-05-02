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

import { Button, Form } from 'react-bootstrap';
import { Envelope, Lock } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { LogoAuth } from './LogoAuth.tsx';

export const LoginForm = () => {
  return (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <LogoAuth></LogoAuth>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let us get started!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
          <p className="h6">
            If you are not a member, please <NavLink to="/auth/register">register</NavLink>.
          </p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom">
            <div className="mb-3 filled form-group tooltip-end-top">
              <Envelope></Envelope>
              <Form.Control type="text" name="email" placeholder="Email" />
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <Lock></Lock>
              <Form.Control type="password" name="password" placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/auth/forgot">
                Forgot?
              </NavLink>
            </div>
            <Button size="lg" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
