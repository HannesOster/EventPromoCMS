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
    image: string;
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

    const { name, description, image, subDescription, price } = eventData[1];

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Card style={{ marginTop: '16px' }}>
                    <CardContent>
                        <Typography variant="h4">{name}</Typography>
                        <Typography variant="body1">{description}</Typography>
                        <CardMedia component="img" src={image} alt="Event Image" style={{ width: '100%', marginBottom: '16px' }} />
                        <Typography variant="body1">{subDescription}</Typography>
                        <Typography variant="h6">{`Price: $${price}`}</Typography>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
}

export default App;
