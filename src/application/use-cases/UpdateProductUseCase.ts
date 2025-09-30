import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { UpdateProductDTO } from '../dto/UpdateProductDTO';
import { ProductResponseDTO } from '../dto/ProductResponseDTO';

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number, dto: UpdateProductDTO): Promise<ProductResponseDTO | null> {
    // Check if product exists
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      return null;
    }
    
    // Update product properties using domain methods
    if (dto.name !== undefined) {
      product.updateName(dto.name);
      await this.productRepository.updateName(product);
    }
    
    if (dto.price !== undefined) {
      product.updatePrice(dto.price);
      await this.productRepository.updatePrice(product);
    }
    
    if (dto.stock !== undefined) {
      product.updateStock(dto.stock);
      await this.productRepository.updateStock(product);
    }
    
    if (dto.category !== undefined) {
      product.setCategory(dto.category);
      await this.productRepository.updateCategory(product);
    }
    
    // Get updated product
    const updatedProduct = await this.productRepository.findById(id);
    
    if (!updatedProduct) {
      return null;
    }
    
    return ProductResponseDTO.fromEntity(updatedProduct);
  }
}
