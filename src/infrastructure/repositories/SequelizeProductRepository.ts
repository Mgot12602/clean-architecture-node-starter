import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { Product } from "../../domain/entities/Product";
import { ProductModel } from "../database/sqlite/schemas/ProductSchema";
import { Category } from "../../domain/types/Category";
import { Op } from "sequelize";

export class SequelizeProductRepository implements ProductRepository {
    
    async save(product: Product): Promise<Product> {
        const productData = {
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };

        const savedProduct = await ProductModel.create(productData);
        return this.toDomainEntity(savedProduct);
    }

    async findById(id: number): Promise<Product | null> {
        const productModel = await ProductModel.findByPk(id);
        if (!productModel) return null;
        
        return this.toDomainEntity(productModel);
    }

    async findAll(): Promise<Product[]> {
        const products: ProductModel[] = await ProductModel.findAll();
        return products.map(p => this.toDomainEntity(p));
    }

    async findByCategory(category: string): Promise<Product[]> {
        const products: ProductModel[] = await ProductModel.findAll({
            where: { category }
        });
        return products.map(p => this.toDomainEntity(p));
    }

    async findByName(name: string): Promise<Product | null> {
        const productModel = await ProductModel.findOne({
            where: { name }
        });
        if (!productModel) return null;
        
        return this.toDomainEntity(productModel);
    }

    async updateName(product: Product): Promise<Product> {
        if (!product.id) {
            throw new Error("Product must have an ID to be updated");
        }

        const [affectedRows] = await ProductModel.update(
            {
                name: product.name,
                updatedAt: new Date()
            },
            {
                where: { id: product.id },
                returning: true
            }
        );

        if (affectedRows === 0) {
            throw new Error("Product not found");
        }

        const updatedProduct = await this.findById(product.id);
        if (!updatedProduct) {
            throw new Error("Failed to retrieve updated product");
        }

        return updatedProduct;
    }

    async updatePrice(product: Product): Promise<Product> {
        if (!product.id) {
            throw new Error("Product must have an ID to be updated");
        }

        const [affectedRows] = await ProductModel.update(
            {
                price: product.price,
                updatedAt: new Date()
            },
            {
                where: { id: product.id },
                returning: true
            }
        );

        if (affectedRows === 0) {
            throw new Error("Product not found");
        }

        const updatedProduct = await this.findById(product.id);
        if (!updatedProduct) {
            throw new Error("Failed to retrieve updated product");
        }

        return updatedProduct;
    }

    async updateStock(product: Product): Promise<Product> {
        if (!product.id) {
            throw new Error("Product must have an ID to be updated");
        }

        const [affectedRows] = await ProductModel.update(
            {
                stock: product.stock,
                updatedAt: new Date()
            },
            {
                where: { id: product.id },
                returning: true
            }
        );

        if (affectedRows === 0) {
            throw new Error("Product not found");
        }

        const updatedProduct = await this.findById(product.id);
        if (!updatedProduct) {
            throw new Error("Failed to retrieve updated product");
        }

        return updatedProduct;
    }

    async updateCategory(product: Product): Promise<Product> {
        if (!product.id) {
            throw new Error("Product must have an ID to be updated");
        }

        const [affectedRows] = await ProductModel.update(
            {
                category: product.category,
                updatedAt: new Date()
            },
            {
                where: { id: product.id },
                returning: true
            }
        );

        if (affectedRows === 0) {
            throw new Error("Product not found");
        }

        const updatedProduct = await this.findById(product.id);
        if (!updatedProduct) {
            throw new Error("Failed to retrieve updated product");
        }

        return updatedProduct;
    }

    async delete(id: number): Promise<void> {
        const deletedRows = await ProductModel.destroy({
            where: { id }
        });

        if (deletedRows === 0) {
            throw new Error("Product not found");
        }
    }

    async findLowStockProducts(threshold: number): Promise<Product[]> {
        const products: ProductModel[] = await ProductModel.findAll({
            where: {
                stock: {
                    [Op.lte]: threshold
                }
            }
        });
        return products.map((p) => this.toDomainEntity(p));
    }

    async findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
        const products: ProductModel[] = await ProductModel.findAll({
            where: {
                price: {
                    [Op.between]: [minPrice, maxPrice]
                }
            }
        });
        return products.map((p) => this.toDomainEntity(p));
    }

    async exists(id: number): Promise<boolean> {
        const count = await ProductModel.count({
            where: { id }
        });
        return count > 0;
    }

    async existsByName(name: string): Promise<boolean> {
        const count = await ProductModel.count({
            where: { name }
        });
        return count > 0;
    }

    private toDomainEntity(productModel: ProductModel): Product {
        const product = new Product(
            productModel.name,
            productModel.price,
            productModel.stock,
            productModel.category
        );
        
        product.id = productModel.id;
        product.createdAt = productModel.createdAt;
        product.updatedAt = productModel.updatedAt;
        
        return product;
    }
}