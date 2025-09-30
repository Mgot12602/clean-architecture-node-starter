import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductResponseDTO } from '../dto/ProductResponseDTO';

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<ProductResponseDTO[]> {
    const products = await this.productRepository.findAll();
    return ProductResponseDTO.fromEntities(products);
  }
}
