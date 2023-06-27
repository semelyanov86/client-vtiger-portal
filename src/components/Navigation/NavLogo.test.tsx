import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { Company } from '../../features/company';
import useCompanyStore from '../../features/company/stores/company.ts';

import { NavLogo } from './NavLogo.tsx';

describe('NavLogo', () => {
  test('should renders without errors', async () => {
    const view = render(
      <MemoryRouter>
        <NavLogo />
      </MemoryRouter>
    );
    const logo = screen.getByTestId('mainlogo');
    expect(logo).toBeInTheDocument();

    view.unmount();
  });
  test('renders logo image when company logo exists', async () => {
    useCompanyStore.setState({
      value: {
        organizationname: 'Test company',
        website: 'https://itvolga.com',
        logo: 'base64encodedimage',
      } as Company,
    });
    const view = render(
      <MemoryRouter>
        <NavLogo />
      </MemoryRouter>
    );

    const logoImage = screen.getByAltText('Test company');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'data:image/png;base64, base64encodedimage');
    view.unmount();
  });
  test('renders empty logo div when company logo does not exist', async () => {
    useCompanyStore.setState({
      value: {
        organizationname: 'Test company',
        website: 'https://itvolga.com',
      } as Company,
    });

    const view = render(
      <MemoryRouter>
        <NavLogo />
      </MemoryRouter>
    );

    const emptyLogoDiv = screen.getByTestId('defaultlogo');
    expect(emptyLogoDiv).toBeInTheDocument();
    view.unmount();
  });
});
