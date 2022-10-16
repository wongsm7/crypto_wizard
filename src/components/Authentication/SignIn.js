import React, { useState } from 'react'
import { Box, TextField, Button, useTheme, Typography } from '@mui/material'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from '../../CryptoContext'

const SignIn = ({ handleClose }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setAlerts } = CryptoState()

    const theme = useTheme()

    const handleSubmit = async () => {
        if (!email || !password) {
            setAlerts({
                open: true,
                message: "Please fill up all the fields",
                type: "error"
            })
        } else {
            try {
                const response = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                setAlerts({
                    open: true,
                    message: `Signed in successfully. Welcome ${response.user.email}`,
                    type: "success",
                });
            } catch (e) {
                setAlerts({
                    open: true,
                    message: e.message,
                    type: "error",
                });
            }
        }
    }

    const styles = {
        box: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "30px",
        },
        button: {
            backgroundColor: theme.palette.action.active,
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            height: '50px',
            textTransform: 'none'
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
            <Button
                variant="contained"
                size="large"
                sx={styles.button}
                onClick={handleSubmit}
            >
                <Typography variant="body1">
                    Sign In
                </Typography>
            </Button>
        </Box>
    )
}

export default SignIn