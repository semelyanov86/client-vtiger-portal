import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { useUserStore } from '../../../stores/user.ts';
import { UserSidebar } from '../components/UserSidebar.tsx';

const schema = z.object({
  email: z.string().min(1, 'Required').email('Should be a valid email address'),
  firstname: z.string().min(3, 'Required'),
  lastname: z.string().min(3, 'Required'),
  description: z.string().min(5, 'Required'),
  account_name: z.string().min(2, 'Required'),
  title: z.string().min(2, 'Required'),
  department: z.string().min(2, 'Required'),
  mailingcity: z.string().min(2, 'Required'),
  mailingstreet: z.string().min(2, 'Required'),
  mailingcountry: z.string().min(2, 'Required'),
  othercountry: z.string(),
  mailingstate: z.string(),
  mailingpobox: z.string(),
  othercity: z.string(),
  otherstate: z.string(),
  mailingzip: z.string().min(4),
  otherzip: z.string(),
  otherstreet: z.string(),
  otherpobox: z.string(),
  phone: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export const UserEdit = () => {
  const { value: user } = useUserStore();
  const title = 'Edit Profile';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '/app/auth/info', text: 'Profile' },
    { to: '/app/auth/edit', text: 'Edit' },
  ];

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <>
      <Head title={title} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">Edit profile information</h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}
      <Row className="g-5">
        <Col xl="4" xxl="3">
          <h2 className="small-title">
            <FormattedMessage id="menu.profile" />
          </h2>
          <UserSidebar user={user}></UserSidebar>
        </Col>
        <Col xl="8" xxl="9">
          {/* Public Info Start */}
          <h2 className="small-title">Public Info</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form id="profileEditForm" onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Name</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('firstname')}
                      defaultValue={user.firstname}
                    />
                    {errors.firstname && (
                      <div className="d-block invalid-tooltip">{errors.firstname.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">User Name</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue="writerofrohan" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Company</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Location</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Birthday</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Gender</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Bio</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      defaultValue="I'm a Cyborg, But That's OK"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Email</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" value="me@lisajackson.com" disabled />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button variant="outline-primary" className="mb-1">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Public Info End */}
        </Col>
      </Row>
    </>
  );
};
