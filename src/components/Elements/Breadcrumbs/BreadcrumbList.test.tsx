import { render, screen } from '@testing-library/react';
import chai from 'chai';
import chaiDom from 'chai-dom';
import { expect, vi, describe } from 'vitest';

chai.use(chaiDom);

// Mock the react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

// Import the BreadcrumbList component after the mock
import { BreadcrumbList } from './BreadcrumbList';

describe('BreadcrumbList', () => {
  test('renders BreadcrumbList with default items', async () => {
    render(<BreadcrumbList basePath="http://127.0.0.1" />);

    const homeBreadcrumb = screen.getByText('Home');
    expect(homeBreadcrumb).to.exist;
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).to.have.attr('href', 'http://127.0.0.1/');
  });

  test('renders BreadcrumbList with custom items', async () => {
    const customItems = [
      { to: 'app/custom1', text: 'Custom 1' },
      { to: 'app/custom2', text: 'Custom 2', title: 'Custom Title 2' },
    ];

    render(<BreadcrumbList items={customItems} basePath="http://127.0.0.1/" />);

    const custom1Breadcrumb = screen.getByText('Custom 1');
    expect(custom1Breadcrumb).to.exist;
    const custom1Link = screen.getByRole('link', { name: /custom 1/i });
    expect(custom1Link).to.have.attr('href', 'http://127.0.0.1/app/custom1');

    const custom2Breadcrumb = screen.getByText('Custom Title 2');
    expect(custom2Breadcrumb).to.exist;
    const custom2Link = screen.getByRole('link', { name: /custom title 2/i });
    expect(custom2Link).to.have.attr('href', 'http://127.0.0.1/app/custom2');
  });
});
