export class Tableaux {
    image: string;
    constructor(
        public author: number,
        public title: string,
        public date: number,
        public description: string,
        public date_rea: number,
        public to_sell: boolean,
        public price: number,
        public height: number,
        public length: number,
        public categorie: number,
        public sell: boolean
    ) {}
}