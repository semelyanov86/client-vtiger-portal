import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';
import { Currency } from '../../misc/types/currency.ts';
import { Product } from '../types';

import { ProductListWidget } from './ProductListWidget.tsx';

describe('ProductListWidget', () => {
  test('should render widget with no errors', () => {
    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: {} }));
    axios.get = mockFn;

    const view = render(
      <WrapToRouterAndIntl>
        <ProductListWidget></ProductListWidget>
      </WrapToRouterAndIntl>
    );

    expect(mockFn).toBeCalledTimes(1);
    const par = screen.getByTestId('spinner');
    expect(par).toBeInTheDocument();

    view.unmount();
  });
  test('should display no data if empty array', async () => {
    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: { data: [] } }));
    axios.get = mockFn;
    const view = render(
      <WrapToRouterAndIntl>
        <ProductListWidget></ProductListWidget>
      </WrapToRouterAndIntl>
    );
    expect(mockFn).toBeCalledTimes(1);
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'), { timeout: 10 });
    const par = screen.getByTestId('no-data-message');
    expect(par).toBeInTheDocument();

    view.unmount();
  });
  test('should correctly display products', async () => {
    const mockedProduct: Product = {
      id: '18x3',
      website: 'https://www.amazon.com/dp/B07XQXZXJC',
      productname: 'Apple iPhone 11 Pro Max, 256GB, Midnight Green, Fully Unlocked (Renewed)',
      description:
        'Fully unlocked and compatible with any carrier of choice (e.g. AT&T, T-Mobile, Sprint, Verizon, US-Cellular, Cricket, Metro, etc.).',
      unit_price: 1099.99,
      currency: {
        currency_symbol: '$',
        id: 'USD',
        conversion_rate: 1,
      } as Currency,
      productcategory: 'Electronics',
      imagecontent: 'somesome',
    } as Product;
    const mockFn = vi.fn().mockReturnValue(
      Promise.resolve({
        data: {
          data: [mockedProduct],
          count: 1,
          page: 1,
          size: 1,
        },
      })
    );
    axios.get = mockFn;
    const view = render(
      <WrapToRouterAndIntl>
        <ProductListWidget></ProductListWidget>
      </WrapToRouterAndIntl>
    );
    expect(mockFn).toBeCalledTimes(1);
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'), { timeout: 10 });
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();

    expect(screen.getByText(mockedProduct.productname)).toBeInTheDocument();
    expect(screen.getByText(mockedProduct.productname)).toBeInTheDocument();

    view.unmount();
  });
});
