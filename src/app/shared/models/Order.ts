import { User } from "shared/models/User";
import { GroupedItem } from "shared/models/GroupedItem";

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