import { Button, Form } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { LogoAuth } from './LogoAuth.tsx';

export const ForgotPasswordForm = () => {
  return (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <LogoAuth></LogoAuth>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Password is gone?</h2>
          <h2 className="cta-1 text-primary">Let's reset it!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please enter your email to receive a link to reset your password.</p>
          <p className="h6">
            If you are a member, please <NavLink to="/login">login</NavLink>.
          </p>
        </div>
        <div>
          <form id="forgotPasswordForm" className="tooltip-end-bottom">
            <div className="mb-3 filled form-group tooltip-end-top">
              <Envelope></Envelope>
              <Form.Control type="text" name="email" placeholder="Email" />
            </div>
            <Button size="lg" type="submit">
              Send Reset Email
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
