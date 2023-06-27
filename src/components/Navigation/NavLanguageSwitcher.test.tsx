import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { useLanguagesStore } from '../../stores/languages.ts';

import { NavLanguageSwitcher } from './NavLanguageSwitcher.tsx';

describe('NavLanguageSwitcher', () => {
  test('should render without errors', async () => {
    const view = render(<NavLanguageSwitcher></NavLanguageSwitcher>);
    expect(screen.getByTestId('language-switch-container')).toBeInTheDocument();
    view.unmount();
  });
  test('renders language toggle button', async () => {
    const view = render(<NavLanguageSwitcher />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('EN');
    view.unmount();
  });

  test('opens language dropdown menu when toggle button is clicked', async () => {
    const view = render(<NavLanguageSwitcher />);
    const toggleButton = screen.getByRole('button');

    fireEvent.click(toggleButton);
    const dropdownMenu = screen.getByTestId('languagelistmenu');
    expect(dropdownMenu).toBeInTheDocument();
    view.unmount();
  });

  test('calls changeLang when a language is selected', async () => {
    const view = render(<NavLanguageSwitcher />);
    const toggleButton = screen.getAllByRole('button');
    fireEvent.click(toggleButton[0]);
    const languageItem = screen.getByText('RU');
    fireEvent.click(languageItem);
    expect(toggleButton[0]).toHaveTextContent('RU');
    expect(useLanguagesStore.getState().currentLang.code == 'RU').toBeTruthy();
    view.unmount();
  });
});
