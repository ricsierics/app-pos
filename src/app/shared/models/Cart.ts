import { GroupedItem } from "./GroupedItem";
import { User } from "src/app/shared/models/User";

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