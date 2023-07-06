import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { SideBlockHeader } from './SideBlockHeader.tsx';

describe('SideBlockHeader', () => {
  test('should render component correctly', () => {
    const children = 'This is the header text';

    render(<SideBlockHeader>{children}</SideBlockHeader>);

    const headerElement = screen.getByText('This is the header text');

    expect(headerElement).toBeInTheDocument();
  });
});
