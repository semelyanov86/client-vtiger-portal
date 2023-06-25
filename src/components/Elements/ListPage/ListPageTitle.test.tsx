import { render, screen } from '@testing-library/react';
import chai from 'chai';
import chaiDom from 'chai-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { BreadcrumbProp } from '../index';

import { ListPageTitle } from './ListPageTitle';

chai.use(chaiDom);

describe('ListPageTitle', () => {
  const renderComponent = (breadcrumb: BreadcrumbProp, title: string | React.ReactNode) => {
    const children = <div data-testid="children-content">Children Content</div>;
    render(
      <IntlProvider locale="en">
        <BrowserRouter>
          <ListPageTitle breadcrumb={breadcrumb} title={title}>
            {children}
          </ListPageTitle>
        </BrowserRouter>
      </IntlProvider>
    );
  };

  test('renders title, breadcrumbs, and children correctly', () => {
    const breadcrumb: BreadcrumbProp = { to: 'example', text: 'Example' };
    const title = 'Test Title';

    renderComponent(breadcrumb, title);

    expect(screen.getByText(title)).to.have.text(title);
    expect(screen.getByText('Home')).to.have.text('Home');
    expect(screen.getByText('Home')).to.have.attr('href', '/app');
    expect(screen.getByText('Example')).to.have.text('Example');
    expect(screen.getByText('Example')).to.have.attr('href', '/example');
  });
});
