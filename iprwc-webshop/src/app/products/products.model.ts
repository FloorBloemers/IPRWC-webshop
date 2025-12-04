export class Product {
  public name: string;
  public description: string;
  public imagePath: string;
  public price: number;

  constructor(name: string, description: string, imagePath: string, price: number) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.price = price;
  }
}
