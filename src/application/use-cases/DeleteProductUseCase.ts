import type { ProductRepository } from '../../domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number): Promise<boolean> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      return false;
    }
    
    await this.productRepository.delete(id);
    
    return true;
  }
}
