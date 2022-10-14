import React, { useState } from 'react'
import { Container, Typography, Toolbar, AppBar, ToggleButton, useTheme, ThemeProvider, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Logo from '../../images/wizard.png';
import { CryptoState } from '../../CryptoContext'
import AuthModal from '../Authentication';
import UserSidebar from '../Authentication/UserSidebar';

const Header = ({ toggleTheme }) => {
    const theme = useTheme()
    const [toggleState, setToggleState] = useState(true)
    const navigate = useNavigate();
    const { currency, setCurrency, user } = CryptoState()

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
            border: "none",
            marginRight: "15px",
            marginLeft: "15px"
        },
        image: {
            borderRadius: "20px",
            height: "30px",
            backgroundColor: "white",
            marginRight: "10px"
        },
        select: {
            width: 100,
            height: 40,
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
                        <Select 
                            variant='outlined' 
                            sx={styles.select}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="usd">USD</MenuItem>
                            <MenuItem value="sgd">SGD</MenuItem>
                            <MenuItem value="cad">CAD</MenuItem>
                            <MenuItem value="aud">AUD</MenuItem>
                            <MenuItem value="hkd">HKD</MenuItem>
                        </Select>
                        <ToggleButton
                            onClick={handleToggleTheme}
                            value={toggleState}
                            sx={styles.button}
                        >
                            {toggleState ? < LightModeIcon /> : <DarkModeIcon />}
                        </ToggleButton>
                        { user ? <UserSidebar/> : <AuthModal/>}
                    </Toolbar>
                </Container >
            </AppBar>
        </ThemeProvider>
    )
}

export default Header