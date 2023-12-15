import { useState, useEffect } from 'react';
import PizzaList from '@/pages/PizzaList';

interface Pizza {
    id: number;
    name: string;
    description: string;
}


const API_URL: string = 'https://localhost:5000/pizzas';
const headers: HeadersInit = {
    'Content-Type': 'application/json',
};
const term = "Pizza";
function Pizza() {
    const [data, setData] = useState<Pizza[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchPizzaData();
    }, []);

    const fetchPizzaData = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then((data: Pizza[]) => setData(data))
            .catch((error: Error) => setError(error));
    };

    const handleCreate = (item: Pizza) => {
        console.log(`add item: ${JSON.stringify(item)}`);
        fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name: item.name, description: item.description }),
        })
            .then(response => response.json())
            .then((returnedItem: Pizza) => setData([...data, returnedItem]))
            .catch((error: Error) => setError(error));
    };

    const handleUpdate = (updatedItem: Pizza) => {
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
            <PizzaList
                name={term}
                data={data}
                error={error}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Pizza;
