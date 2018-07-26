export class Product {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    stockQty: number;
    uom: string;
    expiration: Date;

    public static generateCode(): string {
        let code = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let length = 10;

        for (let i = 0; i < length; i++)
            code += possible.charAt(Math.floor(Math.random() * possible.length));
        return code;
    }
}