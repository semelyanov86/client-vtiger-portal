import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import SearchInput from './SearchInput.tsx';

describe('SearchInput', async () => {
  const setSearchFilterMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the search input correctly', () => {
    const searchFilter = 'initial value';

    render(<SearchInput searchFilter={searchFilter} setSearchFilter={setSearchFilterMock} />);

    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe(searchFilter);
  });

  test('updates search value and calls setSearchFilter on input change', async () => {
    const searchFilter = 'initial value';

    render(<SearchInput searchFilter={searchFilter} setSearchFilter={setSearchFilterMock} />);

    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'new value' } });

    await waitFor(
      () => {
        expect(setSearchFilterMock).toHaveBeenCalledWith('new value');
      },
      { timeout: 2500 }
    );
  });

  test('clears search filter when input is empty', async () => {
    const searchFilter = 'initial value';

    render(<SearchInput searchFilter={searchFilter} setSearchFilter={setSearchFilterMock} />);

    const searchInput = screen.getByPlaceholderText('Search');

    fireEvent.change(searchInput, { target: { value: '' } });

    await waitFor(() => {
      expect(setSearchFilterMock).toHaveBeenCalledWith('');
    });
  });

  test('debounces search filter updates', async () => {
    const searchFilter = 'initial value';

    render(<SearchInput searchFilter={searchFilter} setSearchFilter={setSearchFilterMock} />);

    const searchInput = screen.getByPlaceholderText('Search');

    fireEvent.change(searchInput, { target: { value: 'new value' } });
    fireEvent.change(searchInput, { target: { value: 'new value 2' } });

    await waitFor(
      () => {
        expect(setSearchFilterMock).toHaveBeenCalledWith('new value 2');
      },
      { timeout: 2500 }
    );
  });
});
