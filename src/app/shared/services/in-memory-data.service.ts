import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Product } from 'shared/models/Product';

export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    let mockProduct1: Product = {
      id: 1,
      code: "ABCDE00001",
      name: "Product 1",
      description: "First product",
      price: 1.50,
      stockQty: 100,
      uom: "PC",
      expiration: new Date("01/01/2019")
    };

    const products = [
      // { mockProduct1 },
      { id: 1, code: "ABCDE00001", name: "Product 1", description: "First product", price: 1.50, stockQty: 100, uom: "PC", expiration: new Date("01/01/2019")},
      { id: 2, code: "ABCDE00002", name: "Product 2", description: "Second product", price: 2.50, stockQty: 200, uom: "PC", expiration: new Date("02/01/2019")},
      { id: 3, code: "ABCDE00003", name: "Product 3", description: "Third product", price: 3.50, stockQty: 300, uom: "PC", expiration: new Date("03/01/2019")},
    ];

    const orders = [
      {
        id: 1,
        items: [mockProduct1],
        totalCount: 1,
        totalAmount: mockProduct1.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 1.50,
        changeAmount: 0,
        orderDate: new Date("08/01/2018"),
        user: {username: "admin", isAdmin: true }
      }
    ];
    return {products, orders};
  }

}