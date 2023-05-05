import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { DEFAULT_PATHS } from '../../../config';

type breadcrumbItem = {
  to: string;
  text: string;
  title?: string;
};

interface BreadcrumbListProps {
  items?: breadcrumbItem[];
  basePath?: string;
}

export const BreadcrumbList = ({
  items = [{ to: '/', text: 'Home' }],
  basePath = DEFAULT_PATHS.APP,
}: BreadcrumbListProps) => {
  return (
    <Breadcrumb className="breadcrumb-container d-inline-block">
      {items.map((breadcrumb, bIndex) => (
        <Breadcrumb.Item
          key={`breadCrumb.${bIndex}`}
          linkAs={Link}
          linkProps={{ to: `${basePath}${breadcrumb.to}` }}
        >
          {breadcrumb.title || breadcrumb.text}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
