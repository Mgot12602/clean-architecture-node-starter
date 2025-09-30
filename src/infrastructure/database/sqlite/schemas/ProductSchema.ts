import { DataTypes, Model, Sequelize } from "sequelize";
import { Category } from "../../../../domain/types/Category";

export class ProductModel extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public stock!: number;
    public category!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export const initProductModel = (sequelize: Sequelize) => {
    ProductModel.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM(...Object.values(Category)),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Product",
        tableName: "products",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    });
}