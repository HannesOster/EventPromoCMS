import { useState, useEffect } from 'react';
import ProductList from '@/pages/ProductList';
import Link from 'next/link';

export interface Product {
    id: number;
    name: string;
    price: number;
}


const API_URL: string = 'https://localhost:5000/products';
const headers: HeadersInit = {
    'Content-Type': 'application/json',
};
function Product() {
    const [data, setData] = useState<Product[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then((data: Product[]) => setData(data))
            .catch((error: Error) => setError(error));
    };

    const handleCreate = (item: Product) => {
        console.log(`add item: ${JSON.stringify(item)}`);
        fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name: item.name, price: item.price }),
        })
            .then(response => response.json())
            .then((returnedItem: Product) => setData([...data, returnedItem]))
            .catch((error: Error) => setError(error));
    };

    const handleUpdate = (updatedItem: Product) => {
        console.log(`update item: ${JSON.stringify(updatedItem)}`);
        fetch(`${API_URL}/${updatedItem.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updatedItem),
        })
            .then(() => setData(data.map(item => item.id === updatedItem.id ? updatedItem : item)))
            .catch((error: Error) => setError(error));
    };

    const handleDelete = (id: number) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers,
        })
            .then(() => setData(data.filter(item => item.id !== id)))
            .catch((error: Error) => console.error('Error deleting item:', error));
    };

    return (
        <div>
            <ProductList
                data={data}
                error={error}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
            <Link href='/PrdouctList'>Add Customers</Link>
        </div>
    );
}

export default Product;
