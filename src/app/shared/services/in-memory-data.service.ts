import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Product } from 'shared/models/Product';
import { User } from 'shared/models/User';

const mockProduct1: Product = {
  id: 1,
  code: "ABCDE00001",
  name: "Product 1",
  description: "First product",
  price: 1.50,
  stockQty: 100,
  uom: "PC",
  expiration: new Date("01/01/2019")
};

const mockProduct2: Product = {
  id: 2, 
  code: "ABCDE00002", 
  name: "Product 2", 
  description: "Second product", 
  price: 2.50, 
  stockQty: 200, 
  uom: "PC", 
  expiration: new Date("02/01/2019")
}

const mockProduct3: Product = {
  id: 3, 
  code: "ABCDE00003", 
  name: "Product 3", 
  description: "Third product", 
  price: 3.50, 
  stockQty: 3, 
  uom: "PC", 
  expiration: new Date("03/01/2019")
}

const mockProduct4: Product = {
  id: 4, 
  code: "ABCDE00004", 
  name: "Product 4", 
  description: "Fourth product expired", 
  price: 1500, 
  stockQty: 2, 
  uom: "PC", 
  expiration: new Date("04/01/2018")
}

const mockUser: User = {
  username: "user",
  isAdmin: false
}

const mockAdmin: User = {
  username: "admin",
  isAdmin: true
}

export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    const products = [ mockProduct1, mockProduct2, mockProduct3, mockProduct4 ];

    const orders = [
      {
        id: 1,
        items: [mockProduct1],
        totalCount: 1,
        totalAmount: mockProduct1.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 1.50,
        changeAmount: 0,
        orderDate: new Date("08/01/2018 11:30 pm"),
        user: mockAdmin
      },
      {
        id: 2,
        items: [mockProduct1, mockProduct2, mockProduct3],
        totalCount: 3,
        totalAmount: mockProduct1.price + mockProduct2.price + mockProduct3.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 8,
        changeAmount: 0.50,
        orderDate: new Date("08/02/2018 9:30 am"),
        user: mockUser
      },
      {
        id: 3,
        items: [mockProduct1, mockProduct2],
        totalCount: 2,
        totalAmount: mockProduct1.price + mockProduct2.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 4,
        changeAmount: 0,
        orderDate: new Date("08/03/2018 9:35 am"),
        user: mockUser
      },
      {
        id: 4,
        items: [mockProduct1],
        totalCount: 1,
        totalAmount: mockProduct1.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 5,
        changeAmount: 3.50,
        orderDate: new Date("08/04/2018 9:40 am"),
        user: mockUser
      },
      {
        id: 5,
        items: [mockProduct2, mockProduct3],
        totalCount: 2,
        totalAmount: mockProduct2.price + mockProduct2.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 10,
        changeAmount: 4,
        orderDate: new Date("08/05/2018 9:45 am"),
        user: mockUser
      },
      {
        id: 6,
        items: [mockProduct1, mockProduct3],
        totalCount: 2,
        totalAmount: mockProduct1.price + mockProduct3.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 20,
        changeAmount: 15,
        orderDate: new Date("08/06/2018 9:50 am"),
        user: mockUser
      },
      {
        id: 7,
        items: [mockProduct3],
        totalCount: 1,
        totalAmount: mockProduct3.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 3.50,
        changeAmount: 0,
        orderDate: new Date("08/07/2018 9:55 am"),
        user: mockUser
      },
      {
        id: 8,
        items: [mockProduct2],
        totalCount: 1,
        totalAmount: mockProduct2.price,
        paymentMethod: "Cash on delivery",
        paidAmount: 5,
        changeAmount: 1.50,
        orderDate: new Date("08/08/2018 10:00 am"),
        user: mockUser
      }
    ];
    return { products, orders };
  }

}