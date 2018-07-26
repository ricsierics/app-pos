import { InMemoryDbService } from 'angular-in-memory-web-api'

export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    const products = [
      { id: 1, code: "A001", name: "Product 1", description: "First product", price: 1.50, stockQty: 100, uom: "PC", expiration: new Date("01/01/2019")},
      { id: 2, code: "A002", name: "Product 2", description: "Second product", price: 2.50, stockQty: 200, uom: "PC", expiration: new Date("02/01/2019")},
      { id: 3, code: "A003", name: "Product 3", description: "Third product", price: 3.50, stockQty: 300, uom: "PC", expiration: new Date("03/01/2019")},
    ];
    return {products};
  }

}