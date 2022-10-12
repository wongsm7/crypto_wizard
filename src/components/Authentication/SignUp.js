import React, { useState } from 'react'
import { Box, TextField, Button, useTheme } from '@mui/material'


const SignUp = ({ handleClose }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const theme = useTheme()

    const handleSubmit = () => {

    }

    const styles = {
        box: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "30px"
        },
        button: {
            backgroundColor: theme.palette.action.active,
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        }
    }
    

    return (
        <Box sx={styles.box}>
            <TextField
                variant="outlined"
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                sx={styles.button}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </Box>
    )
}

export default SignUp