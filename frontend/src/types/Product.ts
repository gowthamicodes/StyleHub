
export interface Product {
_id: number;
name: string;
category: "Men" | "Women" | "Kids";
subCategory: string;
price: number;
image: string;
colors: string[];
sizes: string[];
description: string;

}