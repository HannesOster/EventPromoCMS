import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
const theme = createTheme();



export default function App({ Component, pageProps }: AppProps) {
    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>
        )
}
