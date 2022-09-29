import { Typography, Container } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
    const theme = useTheme()

    const styles = {
        banner: {
            backgroundColor: theme.palette.background.default,
        },
        bannerContent: {
            height: 400,
            display: "flex",
            flexDirection: "column",
            paddingTop: 10,
            justifyContent: "space-around",
        },
        tagline: {
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        },
    };
    return (
        <div style={styles.banner}>
            <Container sx={styles.bannerContent}>
                <div style={styles.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Crypto Hunter
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner