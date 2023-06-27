import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { DEFAULT_PATHS } from '../../../config';
import { queryClient } from '../../../lib/react-query.ts';
import { useUserStore } from '../../../stores/user.ts';
import { clearRouteDelimeter } from '../../../utils/format.ts';
import { updateUser } from '../api/update.ts';
import { ImageUploadOptions, UserProfileImage } from '../components/UserProfileImage.tsx';
import { UserSidebar } from '../components/UserSidebar.tsx';
import { AuthUser } from '../types';

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
  imagename: z.string(),
  imagetype: z.string(),
  imagecontent: z.string(),
});

type FormData = z.infer<typeof schema>;

export const UserEdit = () => {
  const { value: user } = useUserStore();
  const title = 'Edit Profile';
  const breadcrumbs = [
    { to: clearRouteDelimeter(DEFAULT_PATHS.DASHBOARD), text: 'Home' },
    { to: clearRouteDelimeter(DEFAULT_PATHS.USER_INFO), text: 'Profile' },
    { to: clearRouteDelimeter(DEFAULT_PATHS.USER_EDIT), text: 'Edit' },
  ];

  const onSubmit = (data: FieldValues) => {
    updateUser(data as AuthUser)
      .then(() => {
        NotifySuccess('Data successfully updated!');
        queryClient.refetchQueries(['user']);
      })
      .catch((error) => NotifyError(error.message));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      description: user.description,
      account_name: user.account_name,
      department: user.department,
      title: user.title,
      mailingcity: user.mailingcity,
      mailingcountry: user.mailingcountry,
      mailingpobox: user.mailingpobox,
      mailingstate: user.mailingstate,
      mailingstreet: user.mailingstreet,
      mailingzip: user.mailingzip,
      othercity: user.othercity,
      othercountry: user.othercountry,
      otherpobox: user.otherpobox,
      otherstate: user.otherstate,
      otherstreet: user.otherstreet,
      otherzip: user.otherzip,
      phone: user.phone,
      imagename: '',
      imagetype: '',
      imagecontent: '',
    },
  });

  const handleImageUpload = (img: ImageUploadOptions) => {
    setValue('imagename', img.imagename);
    setValue('imagetype', img.imagetype);
    setValue('imagecontent', img.imagecontent);
  };

  return (
    <>
      <Head title={title} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">
              <FormattedMessage id="user.edit-profile-info"></FormattedMessage>
            </h1>
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
          <h2 className="small-title">
            <FormattedMessage id="user.public-info"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body>
              <Form id="profileEditForm" onSubmit={handleSubmit(onSubmit)}>
                <UserProfileImage user={user} onImageUpload={handleImageUpload}></UserProfileImage>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.firstname"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" {...register('firstname')} />
                    {errors.firstname && (
                      <div className="d-block invalid-tooltip">{errors.firstname.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.lastname"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" {...register('lastname')} />
                    {errors.lastname && (
                      <div className="d-block invalid-tooltip">{errors.lastname.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.account-name"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" {...register('account_name')} />
                    {errors.account_name && (
                      <div className="d-block invalid-tooltip">{errors.account_name.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.title"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" {...register('title')} defaultValue={user.title} />
                    {errors.title && (
                      <div className="d-block invalid-tooltip">{errors.title.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.department"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('department')}
                      defaultValue={user.department}
                    />
                    {errors.department && (
                      <div className="d-block invalid-tooltip">{errors.department.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.phone"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" {...register('phone')} defaultValue={user.phone} />
                    {errors.phone && (
                      <div className="d-block invalid-tooltip">{errors.phone.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.description"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...register('description')}
                      defaultValue={user.description}
                    />
                    {errors.description && (
                      <div className="d-block invalid-tooltip">{errors.description.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.email"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" {...register('email')} defaultValue={user.email} />
                    {errors.email && (
                      <div className="d-block invalid-tooltip">{errors.email.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.mailing-zip"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('mailingzip')}
                      defaultValue={user.mailingzip}
                    />
                    {errors.mailingzip && (
                      <div className="d-block invalid-tooltip">{errors.mailingzip.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.mailing-pobox"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('mailingpobox')}
                      defaultValue={user.mailingpobox}
                    />
                    {errors.mailingpobox && (
                      <div className="d-block invalid-tooltip">{errors.mailingpobox.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.mailing-country"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('mailingcountry')}
                      defaultValue={user.mailingcountry}
                    />
                    {errors.mailingcountry && (
                      <div className="d-block invalid-tooltip">{errors.mailingcountry.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.mailing-state"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('mailingstate')}
                      defaultValue={user.mailingstate}
                    />
                    {errors.mailingstate && (
                      <div className="d-block invalid-tooltip">{errors.mailingstate.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.mailing-street"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('mailingstreet')}
                      defaultValue={user.mailingstreet}
                    />
                    {errors.mailingstreet && (
                      <div className="d-block invalid-tooltip">{errors.mailingstreet.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.other-zip"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('otherzip')}
                      defaultValue={user.otherzip}
                    />
                    {errors.otherzip && (
                      <div className="d-block invalid-tooltip">{errors.otherzip.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.other-po-box"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('otherpobox')}
                      defaultValue={user.otherpobox}
                    />
                    {errors.otherpobox && (
                      <div className="d-block invalid-tooltip">{errors.otherpobox.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.other-country"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('othercountry')}
                      defaultValue={user.othercountry}
                    />
                    {errors.othercountry && (
                      <div className="d-block invalid-tooltip">{errors.othercountry.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.other-state"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('otherstate')}
                      defaultValue={user.otherstate}
                    />
                    {errors.otherstate && (
                      <div className="d-block invalid-tooltip">{errors.otherstate.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">
                      <FormattedMessage id="user.other-street"></FormattedMessage>
                    </Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control
                      type="text"
                      {...register('otherstreet')}
                      defaultValue={user.otherstreet}
                    />
                    {errors.otherstreet && (
                      <div className="d-block invalid-tooltip">{errors.otherstreet.message}</div>
                    )}
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button type="submit" variant="outline-primary" className="mb-1">
                      <FormattedMessage id="user.update"></FormattedMessage>
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
