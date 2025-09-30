import { Category } from "../types/Category"


export class Product {
    public id?:number;
    public name:string;
    public price:number;
    public stock:number;
    public createdAt?:Date;
    public updatedAt?:Date;
    public category?:Category;


    constructor(name:string, price:number, stock:number, category:string){ 
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.setCategory(category)
    }


  hasStock(quantity:number):boolean{
    return this.stock-quantity >= 0;
  }

  removeStock(quantity:number){
    if(!this.hasStock(quantity)){
      throw new Error("Not enough stock");
    }
    this.stock -= quantity;
    this.updatedAt = new Date();
  }
  updateStock(quantity:number){
    this.stock = quantity;
    this.updatedAt = new Date();
  }
 updateName(name:string){
    this.name = name;
    this.updatedAt = new Date();
  }
 updatePrice(price:number){
    this.price = price;
    this.updatedAt = new Date();
  }


  private isValidCategory(category:string):category is Category{
    return category in Category;
}
  setCategory(category:Category|string){
    if(!this.isValidCategory(category)){
        throw new Error("Invalid category");
    }
    this.category = category;
    this.updatedAt = new Date();
}


}
