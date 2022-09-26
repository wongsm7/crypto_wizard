import React, { useState } from 'react'
import { Box, Typography, Toolbar, AppBar, ToggleButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = ({ toggleTheme }) => {
    const theme = useTheme()
    const [toggleState, setToggleState] = useState(false)

    const handleClick = () => {
        setToggleState(!toggleState)
        console.log(toggleState)
        toggleTheme()
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: theme.palette.background.default }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">
                            Top 100 Cryptos
                        </Link>
                    </Typography>
                    <ToggleButton
                        onClick={handleClick}
                        value={toggleState}
                    >
                        {toggleState ? <DarkModeIcon /> : <LightModeIcon />}
                    </ToggleButton>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Header