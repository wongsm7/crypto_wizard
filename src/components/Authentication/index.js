import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme, ThemeProvider, styled, AppBar, Tab, Tabs } from '@mui/material'
import SignIn from './SignIn'
import SignUp from './SignUp'
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase'

const AuthModal = () => {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { setAlerts } = CryptoState()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then(res => {
            setAlerts({
                open: true,
                message: `Signed up successfully. Welcome ${res.user.email}`,
                type: 'success'
            })
            handleClose()
        }).catch((e) => {
            setAlerts({
                open: true,
                message: e.message,
                type: 'error'
            })
        })
    }

    const styles = {
        box: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
        button: {
            width: '85px',
            height: '40px',
            backgroundColor: theme.palette.action.active,
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        tabs: {
            borderRadius: 10,
            indicatorColor: 'red'
        },
        google: {
            paddingTop: '20px',
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: '20px',
            fontSize: '20px',
            height: '50%'
        },
        googlebutton: {
            width: "100%",
            outline: "none"
        },
        or: {
            fontSize: '12px',
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={styles.button}
            >
                Login
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={styles.modal}
            >
                <Box sx={styles.box}>
                    <AppBar position="static" color="inherit">
                        <Tabs value={value}
                            onChange={handleChange}
                            sx={styles.tabs}
                            variant="fullWidth"
                            textColor={theme.palette.text.primary}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: theme.palette.text.primary
                                }
                            }}
                        >
                            <Tab label="Sign In" />
                            <Tab label="Sign Up" />
                        </Tabs>
                    </AppBar>
                    {value === 0 ?
                        <SignIn handleClose={handleClose} />
                        : <SignUp handleClose={handleClose} />
                    }
                    <Box sx={styles.google}>
                        <span style={styles.or}>
                            or
                        </span>
                        <GoogleButton
                            style={styles.googlebutton}
                            onClick={signInWithGoogle}
                        />
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}

export default AuthModal