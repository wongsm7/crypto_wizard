import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar, useTheme, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase";
import { AiFillDelete } from "react-icons/ai";
import { numbersWithCommas } from '../../helpers/string'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'

export default function UserSidebar() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const theme = useTheme()
    const { user, setAlerts, watchlist, cryptos } = CryptoState()

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const signOutofAccount = () => {
        signOut(auth)
        setAlerts({
            open: true,
            type: 'success',
            message: "Signed out successfully"
        })
        toggleDrawer()
    }

    const removeFromWatchlist = async (crypto) => {
        const cryptoRef = doc(db, "watchlist", user.uid)

        try {
            await setDoc(
                cryptoRef,
                { cryptos: watchlist.filter((wish) => wish !== crypto?.id) },
                { merge: true }
            );
            setAlerts({
                open: true,
                message: `${crypto.name} Removed from the Watchlist !`,
                type: "success",
            });
        } catch (e) {
            setAlerts({
                open: true,
                message: e.message,
                type: "error",
            })
        }
    }

    const styles = {
        avatarheader: {
            height: 38,
            width: 38,
            cursor: "pointer",
            "&:hover": {
                opacity: 0.5
            },
        },
        container: {
            width: 350,
            padding: 25,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
        },
        avatarsidebar: {
            width: 200,
            height: 200,
            cursor: "pointer",
            objectFit: "contain",
        },
        profile: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            height: "92%",
        },
        logoutbutton: {
            height: "8%",
            width: "100%",
            marginTop: 20,
            backgroundColor: theme.palette.action.active,
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        watchlist: {
            flex: 1,
            width: "100%",
            backgroundColor: theme.palette.divider,
            borderRadius: 10,
            padding: 15,
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            overflowY: "auto",
        },
        watchlistitem: {
            padding: 10,
            borderRadius: 5,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.palette.action.disabled,
        }
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        sx={styles.avatarheader}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div style={styles.container}>
                            <div style={styles.profile}>
                                <Avatar
                                    onClick={toggleDrawer(anchor, true)}
                                    sx={styles.avatarsidebar}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span>
                                    {user.displayName || user.email}
                                </span>
                            </div>
                            <div style={styles.watchlist}>
                                <Typography variant='h6' sx={{ textDecoration: 'underline' }}>
                                    Watchlist
                                </Typography>
                                {
                                    cryptos.map((crypto) => {
                                        if (watchlist.includes(crypto.id))
                                            return (
                                                <div style={styles.watchlistitem}>
                                                    <span>{crypto.name}</span>
                                                    <span style={{ display: "flex", gap: 8 }}>
                                                        ${" "}
                                                        {numbersWithCommas(crypto.current_price)}
                                                        <AiFillDelete
                                                            style={{ cursor: "pointer" }}
                                                            fontSize="16"
                                                            onClick={() => removeFromWatchlist(crypto)}
                                                        />
                                                    </span>
                                                </div>
                                            );
                                        else return <></>;
                                    })
                                }
                            </div>
                            <Button
                                onClick={signOutofAccount}
                                variant="contained"
                                sx={styles.logoutbutton}
                            >
                                <Typography variant='h6'>
                                    Sign Out
                                </Typography>
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
