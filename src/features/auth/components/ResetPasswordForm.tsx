import { Button, Form } from 'react-bootstrap';
import { Lock } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { LogoAuth } from './LogoAuth.tsx';

export const ResetPasswordForm = () => {
  return (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <LogoAuth></LogoAuth>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Password trouble?</h2>
          <h2 className="cta-1 text-primary">Renew it here!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use below form to reset your password.</p>
          <p className="h6">
            If you are a member, please <NavLink to="/auth/login">login</NavLink>.
          </p>
        </div>
        <div>
          <form id="resetForm" className="tooltip-end-bottom">
            <div className="mb-3 filled">
              <Lock />
              <Form.Control type="password" name="password" placeholder="Password" />
            </div>
            <div className="mb-3 filled">
              <Lock />
              <Form.Control type="password" name="passwordConfirm" placeholder="Verify Password" />
            </div>
            <Button size="lg" type="submit">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
