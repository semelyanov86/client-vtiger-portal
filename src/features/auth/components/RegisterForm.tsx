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

import { Envelope, UpcScan, Lock } from 'react-bootstrap-icons';
export const RegisterForm = () => {
  // const { register, isRegistering } = useAuth();

  return (
    <>
      <div className="fixed-background"></div>

      <div className="container-fluid p-0 h-100 position-relative">
        <div className="row g-0 h-100">
          <div className="offset-0 col-12 d-none d-lg-flex offset-md-1 col-lg h-lg-100">
            <div className="min-h-100 d-flex align-items-center">
              <div className="w-100 w-lg-75 w-xxl-50">
                <div>
                  <div className="mb-5">
                    <h1 className="display-3 text-white">Welcome to our customer portal</h1>
                    <h1 className="display-3 text-white">Start manage your tickets</h1>
                  </div>
                  <p className="h6 text-white lh-1-5 mb-5">
                    Full set of features to manage your business data with our company. See your
                    tickets, track your budget, manage invoices and more!
                  </p>
                  <div className="mb-5">
                    <a className="btn btn-lg btn-outline-white" href="https://itvolga.com">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-auto h-100 pb-4 px-4 pt-0 p-lg-0">
            <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
              <div className="sw-lg-50 px-5">
                <div className="sh-11">
                  <a href="index.html">
                    <div className="logo-default"></div>
                  </a>
                </div>
                <div className="mb-5">
                  <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
                  <h2 className="cta-1 text-primary">let us get the ball rolling!</h2>
                </div>
                <div className="mb-5">
                  <p className="h6">Please use the form to register.</p>
                  <p className="h6">
                    If you are a member, please
                    <a href="Pages.Authentication.Login.html"> login</a>.
                  </p>
                </div>
                <div>
                  <form id="registerForm" className="tooltip-end-bottom" noValidate>
                    <div className="mb-3 filled form-group tooltip-end-top">
                      <Envelope />
                      <input className="form-control" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-3 filled form-group tooltip-end-top">
                      <UpcScan />
                      <input className="form-control" placeholder="Code" name="code" />
                    </div>
                    <div className="mb-3 filled form-group tooltip-end-top">
                      <Lock></Lock>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="mb-3 position-relative form-group">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="registerCheck"
                          name="registerCheck"
                        />
                        <label className="form-check-label" htmlFor="registerCheck">
                          I have read and accept the &nbsp;
                          <a href="index.html" target="_blank">
                            terms and conditions.
                          </a>
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary">
                      Signup
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
