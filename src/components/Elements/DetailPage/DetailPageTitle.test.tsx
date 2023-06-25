import { render, screen } from '@testing-library/react';
import chai from 'chai';
import chaiDom from 'chai-dom';
import { IntlProvider } from 'react-intl';
import { expect, vi } from 'vitest';

import { formatToUserReadableDate } from '../../../features/misc/services/Dates.ts';
import { messages } from '../../../providers/messages/messages.ts';

import { DetailPageTitle } from './DetailPageTitle';

chai.use(chaiDom);

// Mock the react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

test('renders DetailPageTitle with title, modified, target, parent, and children', async () => {
  const title = 'Test Title';
  const modified = '2022-12-31T23:59:59';
  const target = { to: 'app/target', text: 'Target' };
  const parent = { to: 'app/parent', text: 'Parent' };
  const childrenContent = 'Test Children';

  render(
    <IntlProvider locale="en" messages={messages['en-US']}>
      <DetailPageTitle title={title} modified={modified} target={target} parent={parent}>
        {childrenContent}
      </DetailPageTitle>
    </IntlProvider>
  );

  const titleElement = screen.getByText(title);
  expect(titleElement).to.exist;
  expect(titleElement).to.have.class('display-4');

  const modifiedElement = screen.getByText(
    `Last update of record: ${formatToUserReadableDate(modified)}`
  );
  expect(modifiedElement).to.exist;
  expect(modifiedElement).to.have.class('text-muted');

  const parentBreadcrumb = screen.getByRole('link', { name: /Parent/i });
  expect(parentBreadcrumb).to.exist;
  expect(parentBreadcrumb).to.have.attr('href', '/' + parent.to);

  const targetBreadcrumb = screen.getByRole('link', { name: /Target/i });
  expect(targetBreadcrumb).to.exist;
  expect(targetBreadcrumb).to.have.attr('href', '/' + target.to);

  const childrenElement = screen.getByText(childrenContent);
  expect(childrenElement).to.exist;
});
