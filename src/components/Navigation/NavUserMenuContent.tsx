import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Lock, Question } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import { DEFAULT_PATHS } from '../../config';
import { HELP_URL } from '../../config/constants.ts';
import { useAuthContext } from '../../lib/auth.tsx';

export const NavUserMenuContent = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const onLogout = () => {
    logout();
    navigate('/auth/login');
  };
  return (
    <div>
      <Row className="mb-3 ms-0 me-0">
        <Col xs="12" className="ps-1 mb-2">
          <div className="text-extra-small text-primary">
            <FormattedMessage id="menu.account"></FormattedMessage>
          </div>
        </Col>
        <Col xs="6" className="ps-1 pe-1">
          <ul className="list-unstyled">
            <li>
              <NavLink to={DEFAULT_PATHS.USER_INFO}>
                <FormattedMessage id="user.info"></FormattedMessage>
              </NavLink>
            </li>
            <li>
              <NavLink to={DEFAULT_PATHS.USER_SETTINGS}>
                <FormattedMessage id="menu.preferencies"></FormattedMessage>
              </NavLink>
            </li>
          </ul>
        </Col>
        <Col xs="6" className="ps-1 pe-1">
          <ul className="list-unstyled">
            <li>
              <NavLink to={DEFAULT_PATHS.USER_SECURITY}>
                <FormattedMessage id="otp.header"></FormattedMessage>
              </NavLink>
            </li>
            <li>
              <NavLink to={DEFAULT_PATHS.USER_PAYMENTS}>
                <FormattedMessage id="menu.billing"></FormattedMessage>
              </NavLink>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="mb-1 ms-0 me-0">
        <Col xs="12" className="p-1 mb-3 pt-3">
          <div className="separator-light" />
        </Col>
        <Col xs="6" className="ps-1 pe-1">
          <ul className="list-unstyled">
            <li>
              <a href={HELP_URL} target="_blank" rel="noreferrer">
                <Question size={17} />{' '}
                <span className="align-middle">
                  <FormattedMessage id="menu.help"></FormattedMessage>
                </span>
              </a>
            </li>
          </ul>
        </Col>
        <Col xs="6" className="pe-1 ps-1">
          <ul className="list-unstyled">
            <li>
              <a href="#" onClick={onLogout}>
                <Lock size={17} />{' '}
                <span className="align-middle">
                  <FormattedMessage id="menu.logout"></FormattedMessage>
                </span>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};
