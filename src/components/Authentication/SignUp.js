import React, { useState } from 'react'
import { Box, TextField, Button, useTheme } from '@mui/material'
import { CryptoState } from '../../CryptoContext'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = ({ handleClose }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { setAlerts } = CryptoState()

    const theme = useTheme()

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setAlerts({
                open: true,
                message: "Your passwords do not match",
                type: "error"
            })
        } else {
            try {
                const result = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                );
                setAlerts({
                  open: true,
                  message: `Sign Up Successful. Welcome ${result.user.email}`,
                  type: "success",
                });
          
                handleClose();
              } catch (e) {
                setAlerts({
                  open: true,
                  message: e.message,
                  type: "error",
                });
              }
            };
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
            height: '50px'
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