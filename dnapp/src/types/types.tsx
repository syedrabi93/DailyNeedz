export type Status = 'UNDEFINED' | 'LOADING' | 'SUCCESS' | 'FAIL';

export type User = {
   email: string | null;
   name: string | null;
   phone: string | null | number;
   uid: string | null;
   loggedIn: boolean;
};

export interface Product {
   id: string;
   product_name: string;
   product_image: {url: string};
   product_brand_name?: string;
   product_available_quantity?: number;
   product_mrp: number;
   product_discount?: number;
   product_description: {
      about: {
         nutritional_facts: string;
         more_info: string;
         about_product: string;
      };
   };
   product_type: 'none' | 'veg' | 'non-veg';
   product_size: string;
   product_count: number;
}

export interface ProductList {
   [id: string]: Product;
}

export interface Address {
   id: string;
   streetAddress: string;
   houseNumber: number | string;
   city: string;
   state: string;
   country?: string;
   pincode?: string;
   location?: {
      lat: string;
      long: string;
   } | null;
}

export interface AddressList {
   [id: string]: Address;
}
