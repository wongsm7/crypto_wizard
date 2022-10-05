import React, { useState } from 'react'
import { Container, Typography, Toolbar, AppBar, ToggleButton, useTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Logo from '../../images/wizard.png';

const Header = ({ toggleTheme }) => {
    const theme = useTheme()
    const [toggleState, setToggleState] = useState(true)
    const navigate = useNavigate();

    const handleToggleTheme = () => {
        setToggleState(!toggleState)
        toggleTheme()
    }

    const styles = {
        container: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
            cursor: "pointer",
        },
        button: {
            border: "none"
        },
        image: {
            borderRadius: "20px",
            height: "30px",
            backgroundColor: "white",
            marginRight: "10px"
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="inherit">
                <Container>
                    <Toolbar>
                        <img src={Logo} style={styles.image} alt="logo" />
                        <Typography onClick={() => navigate("/")} variant="h5" component="div" sx={styles.title}>
                            Crypto Wizard
                        </Typography>
                        <ToggleButton
                            onClick={handleToggleTheme}
                            value={toggleState}
                            sx={styles.button}
                        >
                            {toggleState ? < LightModeIcon /> : <DarkModeIcon />}
                        </ToggleButton>
                    </Toolbar>
                </Container >
            </AppBar>
        </ThemeProvider>
    )
}

export default Header