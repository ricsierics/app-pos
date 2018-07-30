import { User } from "src/app/shared/models/User";
import { GroupedItem } from "./GroupedItem";

export class Order {
    items: GroupedItem[];
    totalCount: number;
    totalAmount: number;
    paymentMethod: string;
    paidAmount: number;
    changeAmount: number;
    orderDate: Date;
    user: User;
}