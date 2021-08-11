export interface IAddressDTA {
    id?: string;
    name: string,
    userId: string;
    extras?: any;
    location?: {type: "Point", coords: [number, number]};
    street: string;
}

