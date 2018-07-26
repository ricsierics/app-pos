import { GroupedItem } from "./GroupedItem";

export class Cart {
    items: Map<number, GroupedItem>;
    totalItems: number;
    totalPrice: number;

    constructor() {
        this.items = new Map<number, GroupedItem>();
        this.totalItems = 0;
        this.totalPrice = 0;
    }
}