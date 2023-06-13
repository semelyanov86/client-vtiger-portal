import { NavLink } from 'react-router-dom';

interface NotificationItemProps {
  detail?: string;
  link?: string;
  img?: string;
}

export const NotificationItem = ({
  detail = '',
  img = '/img/profile/profile-11.webp',
  link = '#',
}: NotificationItemProps) => {
  return (
    <li className="mb-3 pb-3 border-bottom border-separator-light d-flex">
      <img src={img} className="me-3 sw-4 sh-4 rounded-xl align-self-center" alt="notification" />
      <div className="align-self-center">
        <NavLink to={link}>{detail}</NavLink>
      </div>
    </li>
  );
};
