import type { ProductRepository } from '../../domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number): Promise<boolean> {
    // Check if product exists
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      return false;
    }
    
    // Delete product
    await this.productRepository.delete(id);
    
    return true;
  }
}
