import { Product } from '../../domain/entities/Product';
import { Category } from '../../domain/types/Category';

export class ProductResponseDTO {
  public id: number | undefined;
  public name: string;
  public price: number;
  public stock: number;
  public category: Category | undefined;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.stock = product.stock;
    this.category = product.category;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  static fromEntity(product: Product): ProductResponseDTO {
    return new ProductResponseDTO(product);
  }

  static fromEntities(products: Product[]): ProductResponseDTO[] {
    return products.map(product => new ProductResponseDTO(product));
  }
}
