import { Product } from '../../domain/entities/Product';

export class ProductResponseDTO {
  public id: number;
  public name: string;
  public price: number;
  public stock: number;
  public category?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(product: Product) {
    this.id = product.id!;
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
