import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { expect, test, describe } from 'vitest';

import useCompanyStore from '../../features/company/stores/company.ts';
import { Company } from '../../features/company/types';
import { messages } from '../../providers/messages/messages.ts';

import { Footer } from './Footer.tsx';

import '@testing-library/jest-dom';

describe('Footer', () => {
  test('should display a default footer', async () => {
    const view = render(
      <IntlProvider locale="en" messages={messages['en-US']}>
        <Footer></Footer>
      </IntlProvider>
    );

    const foundFooter = await screen.findByTestId('footer');
    expect(foundFooter).toHaveTextContent(String(new Date().getFullYear()));
    expect(screen.getByRole('button')).toHaveClass('btn-link');
    expect(screen.getByRole('button')).toHaveTextContent('Our Website');
    view.unmount();
  });

  test('should display content of company', async () => {
    useCompanyStore.setState({
      value: {
        organizationname: 'Test company',
        website: 'https://itvolga.com',
      } as Company,
    });
    const view = render(
      <IntlProvider locale="en" messages={messages['en-US']}>
        <Footer></Footer>
      </IntlProvider>
    );
    const foundFooter = await screen.findByTestId('footer');
    expect(foundFooter).toHaveTextContent('Test company');
    expect(foundFooter).toBeInTheDocument();
    // Assert the rendered website link
    const websiteLink = screen.getByText('Our Website');
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute('href', 'https://itvolga.com');

    view.unmount();
  });
});
