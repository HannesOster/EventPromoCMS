import { useState, useEffect } from 'react';
import EventList from '@/pages/EventForm';
import { v4 as uuid } from 'uuid';

export interface Event {
    id?: string;
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
    const [eventData, setEventData] = useState<Event[]>([]); 
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchEventData();
    }, []);

    const fetchEventData = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then((data: Event[]) => setEventData(data)) 
            .catch((error: Error) => setError(error));
    };

    const handleCreate = (item: Event) => {
        const newItemWithUid = { ...item, id: uuid() };
        console.log(`add item: ${JSON.stringify(newItemWithUid)}`);

        fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(newItemWithUid),
        })
            .then(response => response.json())
            .then((returnedItem: Event) => setEventData([...eventData, returnedItem])) 
            .catch((error: Error) => setError(error));
    };

    const handleUpdate = (updatedItem: Event) => {
        console.log(`update item: ${JSON.stringify(updatedItem)}`);
        fetch(`${API_URL}/${updatedItem.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updatedItem),
        })
            .then(() => setEventData(eventData.map(item => item.id === updatedItem.id ? updatedItem : item))) 
            .catch((error: Error) => setError(error));
    };

    const handleDelete = (id: string | undefined) => {
        if (id !== undefined) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers,
            })
                .then(() => setEventData(eventData.filter(item => item.id !== id))) 
                .catch((error: Error) => console.error('Error deleting item:', error));
        }
    };

    const handleReinsert = async (id: string | undefined) => {
        const selectedItem = eventData.find(item => item.id === id); 

        await handleDelete(id);

        if (selectedItem) {
            selectedItem.id = uuid();

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(selectedItem),
                });

                if (response.ok) {
                    setTimeout(async () => {
                        await fetchEventData();
                    }, 200);
                } else {
                    throw new Error(`Failed to reinsert item. Server returned ${response.status}`);
                }
            } catch (error: any) {
                setError(error);
            }
        }
    };

    return (
        <div>
            <EventList
                data={eventData} 
                error={error}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onReinsert={handleReinsert}
            />
        </div>
    );
}

export default EventPage;
