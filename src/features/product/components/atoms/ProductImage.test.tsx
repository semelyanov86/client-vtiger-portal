import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { Product } from '../../types';

import { ProductImage } from './ProductImage.tsx';

describe('ProductImage', () => {
  test('should render image with product image content', () => {
    const product = {
      imagecontent: 'base64-encoded-image-data',
      productcategory: 'Product Category',
    } as Product;
    const view = render(<ProductImage product={product} />);

    const image = screen.getByAltText('Product Category');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'data:image/png;base64, base64-encoded-image-data');
    view.unmount();
  });
  test('should render default image without product image content', () => {
    const product = {
      productcategory: 'Product Category',
    } as Product;

    render(<ProductImage product={product} />);

    const image = screen.getByAltText('Product Category');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/img/product/small/service.jpeg');
  });
});
