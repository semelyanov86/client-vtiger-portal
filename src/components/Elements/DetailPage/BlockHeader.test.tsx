import { render, screen } from '@testing-library/react';
import chai from 'chai';
import chaiDom from 'chai-dom';
import { expect, describe } from 'vitest';

import { BlockHeader } from './BlockHeader';

chai.use(chaiDom);

describe('BlockHeader', () => {
  test('renders BlockHeader with children', async () => {
    const testContent = 'Test Content';
    render(<BlockHeader>{testContent}</BlockHeader>);

    const blockHeaderElement = screen.getByText(testContent);
    expect(blockHeaderElement).to.exist;
    expect(blockHeaderElement.tagName).to.equal('H2');
    expect(blockHeaderElement).to.have.class('small-title');
  });
});
