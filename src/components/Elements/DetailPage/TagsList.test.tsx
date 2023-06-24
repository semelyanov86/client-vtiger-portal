import { render, screen } from '@testing-library/react';
import chai from 'chai';
import chaiDom from 'chai-dom';
import { IntlProvider } from 'react-intl';
import { describe, expect } from 'vitest';

import { messages } from '../../../providers/messages/messages.ts';

import { TagsList } from './TagsList';

chai.use(chaiDom);

describe('TagsList', () => {
  test('renders TagsList with tags', async () => {
    const testTags = ['tag1', 'tag2', 'tag3'];

    render(
      <IntlProvider locale="en" messages={messages['en-US']}>
        <TagsList tags={testTags} />
      </IntlProvider>
    );

    const tagElements = screen.getAllByTestId('tagTest');
    expect(tagElements).to.have.lengthOf(testTags.length);

    testTags.forEach((tag, index) => {
      const tagElement = tagElements[index];
      expect(tagElement).to.exist;
      expect(tagElement).to.have.text(tag);
    });
  });

  test('renders TagsList with no tags', async () => {
    const testTags = [''];

    render(
      <IntlProvider locale="en" messages={messages['en-US']}>
        <TagsList tags={testTags} />
      </IntlProvider>
    );

    const noTagsElement = screen.getByText('No tags available');
    expect(noTagsElement).to.exist;
  });
});
