export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    userId: string;
}