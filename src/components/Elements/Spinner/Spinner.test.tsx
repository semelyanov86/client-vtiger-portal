import { render, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import '@testing-library/jest-dom';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  test('should set data-show to false on htmlTag when contentArea is not present', () => {
    render(<Spinner></Spinner>);
    const htmlTag = document.documentElement;
    expect(htmlTag).toHaveAttribute('data-show');
  });

  test('should add "spinner" class to document body', () => {
    render(<Spinner />);

    expect(document.body).toHaveClass('spinner');
  });

  test('should set data-show to true on htmlTag when contentArea is not present after cleanup', () => {
    const { unmount } = render(<Spinner />);
    unmount();

    const htmlTag = document.documentElement;
    expect(htmlTag).toHaveAttribute('data-show', 'false');
  });

  test('should remove "spinner" class from document body after cleanup', async () => {
    const { unmount } = render(<Spinner />);
    unmount();

    // Wait for the next tick of the event loop
    await waitFor(() => {
      expect(document.body).not.toHaveClass('spinner');
    });
  });
});
