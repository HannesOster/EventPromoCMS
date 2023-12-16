import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
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
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Hier den Server-Endpoint für die Veranstaltungsdaten ersetzen
        fetch('https://localhost:5000/events')
            .then((response) => response.json())
            .then((data: EventData) => setEventData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!eventData) {
        return <div>Loading...</div>;
    }

    const { name, description, image, subDescription, price } = eventData;

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src="/vite.svg" style={{ width: '100px', height: '100px', marginRight: '8px' }} alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src="/react.svg" style={{ width: '100px', height: '100px', marginRight: '8px' }} alt="React logo" />
                    </a>
                </div>
                <Typography variant="h1">Vite + React</Typography>
                <Card style={{ marginTop: '16px' }}>
                    <CardContent>
                        <Typography variant="h4">{name}</Typography>
                        <Typography variant="body1">{description}</Typography>
                        <CardMedia component="img" src={image} alt="Event Image" style={{ width: '100%', marginBottom: '16px' }} />
                        <Typography variant="body1">{subDescription}</Typography>
                        <Typography variant="h6">{`Price: $${price}`}</Typography>
                        <Button onClick={() => setCount((count) => count + 1)}>
                            Count is {count}
                        </Button>
                        <Typography variant="body2">
                            Edit <code>src/App.tsx</code> and save to test HMR
                        </Typography>
                    </CardContent>
                </Card>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    Click on the Vite and React logos to learn more
                </Typography>
            </Container>
        </ThemeProvider>
    );
}

export default App;
