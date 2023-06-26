import { render, cleanup } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { Loading } from './Loading.tsx';

describe('Loading', async () => {
  afterEach(cleanup);

  test('renders without errors', () => {
    render(<Loading />);
  });

  test('applies styles and classes on mount', () => {
    render(<Loading />);

    // eslint-disable-next-line testing-library/no-node-access
    const contentArea = document.querySelector('#contentArea') as HTMLElement;
    const htmlTag = document.documentElement;
    const body = document.body;

    expect(contentArea).toBeNull();
    expect(htmlTag).toHaveAttribute('data-show', 'false');
    expect(body).toHaveClass('spinner');
  });

  test('restores styles and classes on unmount', () => {
    const { unmount } = render(<Loading />);
    // eslint-disable-next-line testing-library/no-node-access
    const contentArea = document.querySelector('#contentArea') as HTMLElement;
    const htmlTag = document.documentElement;
    const body = document.body;

    expect(contentArea).toBeNull();
    expect(htmlTag).toHaveAttribute('data-show', 'false');
    expect(body).toHaveClass('spinner');

    unmount();

    expect(contentArea).toBeNull();
    expect(htmlTag).toHaveAttribute('data-show', 'false');
    expect(body).toHaveClass('spinner');
  });
});
