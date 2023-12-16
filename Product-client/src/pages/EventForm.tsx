import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import type { Event } from '@/pages/Event'; 

interface EventListProps {
    data: Event[];
    error?: Error | null;
    onCreate: (item: Event) => void;
    onUpdate: (updatedItem: Event) => void;
    onDelete: (id: number) => void;
}

function EventList({ data, onCreate, onUpdate, onDelete, error }: EventListProps) {
    const [formData, setFormData] = useState<Partial<Event>>({});
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        if (editingId === null) {
            setFormData({});
        } else {
            const currentItem = data.find(item => item.id === editingId);
            setFormData(currentItem || {});
        }
    }, [editingId, data]);

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingId !== null) {
            onUpdate(formData as Event);
        } else {
            onCreate(formData as Event);
        }

        setFormData({});
        setEditingId(null);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleCancel = () => {
        setFormData({});
        setEditingId(null);
    };

    const handleDelete = (id: number) => {
        onDelete(id);
    };

    return (
        <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Event Insertion</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleFormChange} />
                <TextField label="Description" name="description" value={formData.description} onChange={handleFormChange} />
                <TextField label="SubDescription" name="subDescription" value={formData.subDescription} onChange={handleFormChange} />
                <TextField label="Price" name="price" value={formData.price} onChange={handleFormChange} />
                <TextField label="ImageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleFormChange} />
                <Button sx={{ mr: 1 }} variant="contained" type="submit">{editingId === null ? 'Create' : 'Update'}</Button>
                {editingId !== null && <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>}
            </form>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {data.map(item => (
                    <ListItem key={item.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                                <Delete />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={item.name} secondary={item.description} />
                    </ListItem>
                ))}
            </List>
            {error && error.message && <p>{error.message}</p>}
        </Box>
    );
}

export default EventList;
