export interface IOrderDTO {
    id?: string;
    items: { productId: string, quantity: number }[],
    status?: "processing" | "paid" | "completed";
    ordertotal: number;
    paymentId?: string;
    userId: string;
}

