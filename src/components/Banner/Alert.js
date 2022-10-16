import React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert  from '@mui/material/Alert';
import { CryptoState } from '../../CryptoContext'

const Alert = () => {
    const { alerts, setAlerts } = CryptoState()

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {

        setAlerts({ open: false });
    };

    const styles = {
        snackbar: {
            width: '100%',
            padding: '50px',
            alignItems: 'center',
            '.MuiSnackbar-anchorOriginBottomCenter': {
                alignItems: 'center'
            }
        },
        alert: {
            marginBottom: '100px'
        }
    }

    return (
        <Snackbar
            open={alerts.open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={styles.snackbar}
            key={alerts.message}
        >
            <MuiAlert variant='filled' severity={alerts.type}>{alerts.message}</MuiAlert>
        </Snackbar>
    )
}

export default Alert