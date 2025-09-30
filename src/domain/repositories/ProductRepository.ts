import { Product } from "../entities/Product";

export interface ProductRepository {
    // Create
    save(product: Product): Promise<Product>;
    
    // Read
    findById(id: number): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findByCategory(category: string): Promise<Product[]>;
    findByName(name: string): Promise<Product | null>;
    
    // Update
    updateName(product: Product): Promise<Product>;
    updatePrice(product: Product): Promise<Product>;
    updateStock(product: Product): Promise<Product>;
    updateCategory(product: Product): Promise<Product>;
    
    // Delete
    delete(id: number): Promise<void>;
    

}