export interface IProductDTO {
    id?: string;
    name: string,
    description: string,
    extras?: any,
    stock: number,
    createdBy: string
    discount?: number;
    images: string[];
    mrp: number;
    product_size: string;
    othersizes?: string[];
    product_type: "none" | "veg" | "non-veg";
}

