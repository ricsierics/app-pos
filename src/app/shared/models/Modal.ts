export class Modal {
    id: string;
    title: string;
    body: string;
    secondaryText: string;
    primaryText: string;

    constructor(id: string, title: string, body: string, secondaryText: string, primaryText: string){
        this.id = id;
        this.title = title;
        this.body = body;
        this.secondaryText = secondaryText;
        this.primaryText = primaryText;
    }
}