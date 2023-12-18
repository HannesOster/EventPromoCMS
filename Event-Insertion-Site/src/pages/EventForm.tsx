import React, { useState, useEffect,useRef, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import type { Event } from '@/pages/Event';

interface EventListProps {
    data: Event[];
    error?: Error | null;
    onCreate: (item: Event) => void;
    onUpdate: (updatedItem: Event) => void;
    onDelete: (id: string | undefined) => void; 
    onReinsert: (id: string | undefined) => void; 
}


function EventList({ data, onCreate, onUpdate, onDelete, onReinsert, error }: EventListProps) {
    const [formData, setFormData] = useState<Partial<Event>>({});
    const [editingId, setEditingId] = useState<string | null | undefined>(null); 
    const formRef = useRef<HTMLFormElement | null>(null);

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
        if (formRef.current) {
            formRef.current.reset(); 
        }
        setFormData({});
        setEditingId(null);
    };

    const handleEdit = (id: string | undefined) => { 
        setEditingId(id);
    };

    const handleCancel = () => {
        setFormData({});
        setEditingId(null);
    };

    const handleDelete = (id: string | undefined) => { 
        onDelete(id);
    };

    return (
        <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Event Insertion</h2>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', width: '40%', minWidth:'380px', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleFormChange} required sx={{ width: '100%' }} />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleFormChange}
                    multiline
                    rows={5}
                    required
                    sx={{ width: '100%' }}
                />
                <TextField
                    label="SubDescription"
                    name="subDescription"
                    value={formData.subDescription || ''}  
                    onChange={handleFormChange}
                    multiline
                    rows={5}
                    sx={{ width: '100%' }}
                />
                <TextField label="Price" name="price" value={formData.price} onChange={handleFormChange} required type="number" sx={{ width: '100%' }} />
                <TextField label="ImageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleFormChange} required sx={{ width: '100%' }} />
                <Button sx={{ mt: 2, width: '100%' }} variant="contained" type="submit">
                    {editingId === null ? 'Create' : 'Update'}
                </Button>
                {editingId !== null && (
                    <Button sx={{ mt: 1, width: '100%' }} variant="contained" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                )}
            </form>
            <List sx={{ width: '100%', maxWidth: 360, mt: 2 }}>
                {data.map((item, index) => (
                    <ListItem
                        key={item.id}
                        secondaryAction={
                            index === data.length - 1 ? (
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => onReinsert(item.id)}>Reinsert</Button>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            )
                        }
                    >
                        <ListItemText primary={item.name} secondary={item.description} />
                    </ListItem>
                ))}
            </List>
            {error && error.message && <p>{error.message}</p>}
        </Box>
    );
}

export default EventList;