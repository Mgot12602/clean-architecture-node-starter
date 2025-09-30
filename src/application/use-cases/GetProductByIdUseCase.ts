import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductResponseDTO } from '../dto/ProductResponseDTO';

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number): Promise<ProductResponseDTO | null> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      return null;
    }
    
    return ProductResponseDTO.fromEntity(product);
  }
}
