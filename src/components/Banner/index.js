import { Typography, Container, useTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
    const theme = useTheme()

    const styles = {
        container: {
            height: 400,
            display: "flex",
            flexDirection: "column",
            paddingTop: 5,
            justifyContent: "space-around",
        },
        title: {
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        },
    };
    return (
        <ThemeProvider theme={theme}>
            <Container sx={styles.container}>
                <div style={styles.title}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: 2,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Crypto Wizard
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: theme.palette.text.secondary,
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Get the latest prices for your favorite Crypto Currencies
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </ThemeProvider>
    )
}

export default Banner