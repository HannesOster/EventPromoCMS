import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    createTheme,
    ThemeProvider,
} from '@mui/material';

interface EventData {
    name: string;
    description: string;
    imageUrl: string;
    subDescription: string;
    price: number;
}

const theme = createTheme();

function App() {
    const [eventData, setEventData] = useState<EventData[]>([]);


    useEffect(() => {
        // Hier den Server-Endpoint für die Veranstaltungsdaten ersetzen
        fetch('https://localhost:5000/events')
            .then((response) => response.json())
            .then((data: EventData[]) => setEventData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (eventData.length === 0) {
        return <div>Loading...</div>;
    }

    const lastIndex = eventData.length - 1;
    const { name, description, imageUrl, subDescription, price } = eventData[lastIndex];

    return (
        <ThemeProvider theme={theme}>
            <Container style={{ marginTop: '16px', width: '100%' }}>
                <Card style={{ marginTop: '16px', width: '100%' }}>
                    <CardContent>
                        <Typography variant="h4">{name}</Typography>
                        <Typography variant="body1">{description}</Typography>
                        <CardMedia component="img" src={imageUrl} alt="Event Image" style={{ width: '100%', marginBottom: '16px' }} />
                        <Typography variant="body1">{subDescription}</Typography>
                        <Typography variant="h6">{`Price: $${price}`}</Typography>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
}

export default App;
