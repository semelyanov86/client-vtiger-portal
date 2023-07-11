import { Product } from '../../types';

interface ProductImageProps {
  product: Product;
}

export const ProductImage = ({ product }: ProductImageProps) => {
  if (product.imagecontent) {
    return (
      <img
        src={'data:image/png;base64, ' + product.imagecontent}
        alt={product.productcategory}
        className="card-img card-img-horizontal sw-13 sw-lg-15"
      />
    );
  }
  return (
    <img
      src="/img/product/small/service.jpeg"
      alt={product.productcategory}
      className="card-img card-img-horizontal sw-13 sw-lg-15"
    />
  );
};
