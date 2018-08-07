import { GroupedItem } from "shared/models/GroupedItem";
import { User } from "shared/models/User";

export class Cart {
    items: Map<number, GroupedItem>;
    totalItems: number;
    totalPrice: number;
    user: User;

    constructor() {
        this.items = new Map<number, GroupedItem>();
        this.totalItems = 0;
        this.totalPrice = 0;
    }
}