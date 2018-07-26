import { Product } from "./Product";

export class GroupedItem {
    items: Product[];
    subName: string;
    subPrice: number;
    subQuantity: number;
    subTotalPrice: number;

    constructor() {
        this.items = [];
    }
}