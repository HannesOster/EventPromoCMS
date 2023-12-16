import { useState, useEffect } from 'react';
import EventList from '@/pages/EventForm'; 
import Link from 'next/link';

export interface Event {
    id: number;
    name: string;
    description: string;
    subDescription: string;
    price: number;
    imageUrl: string;
}

const API_URL: string = 'https://localhost:5000/events'; 
const headers: HeadersInit = {
    'Content-Type': 'application/json',
};

function EventPage() {
    const [data, setData] = useState<Event[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchEventData();
    }, []);

    const fetchEventData = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then((data: Event[]) => setData(data))
            .catch((error: Error) => setError(error));
    };

    const handleCreate = (item: Event) => {
        console.log(`add item: ${JSON.stringify(item)}`);
        fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(item),
        })
            .then(response => response.json())
            .then((returnedItem: Event) => setData([...data, returnedItem]))
            .catch((error: Error) => setError(error));
    };

    const handleUpdate = (updatedItem: Event) => {
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
            <EventList
                data={data}
                error={error}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
            <Link href='/EventList'>Add Events</Link>
        </div>
    );
}

export default EventPage;
