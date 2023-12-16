import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import type { Product } from '@/pages/Product'

interface ProductListProps {
    data: Product[];
    error?: Error | null;
    onCreate: (item: Product ) => void;
    onUpdate: (updatedItem: Product ) => void;
    onDelete: (id: number) => void;
}

function PizzaList({  data, onCreate, onUpdate, onDelete, error }: ProductListProps) {
    const [formData, setFormData] = useState<Partial<Product>>({});
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
            onUpdate(formData as Product);
        } else {
            onCreate(formData as Product);
        }

        setFormData({ });
        setEditingId(null);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleCancel = () => {
        setFormData({});
        setEditingId(null);
    };

    const handleDelete = (id: number ) => {
        onDelete(id);
    };

    return (
        <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Product insertion</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleFormChange} />
                <TextField label="Price" name="price" value={formData.price} onChange={handleFormChange} />
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
                        <ListItemText primary={item.name} secondary={item.price} />
                    </ListItem>
                ))}
            </List>
            {error && error.message && <p>{error.message}</p>}
        </Box>
    );
}

export default PizzaList;
