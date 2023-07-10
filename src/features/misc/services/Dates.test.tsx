import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { NULLABLE_DATE } from '../../../config/constants.ts';

import { formatToUserReadableDate } from './Dates.ts';

describe('formatToUserReadableDate', () => {
  test('should formats the date correctly', () => {
    const date = '2022-06-15T09:30:00Z';
    const formattedDate = formatToUserReadableDate(date);

    expect(formattedDate).toBe('2022-06-15 09:30:00');
  });
  test('returns "--" for NULLABLE_DATE', () => {
    const formattedDate = formatToUserReadableDate(NULLABLE_DATE);

    expect(formattedDate).toBe('--');
  });
});
