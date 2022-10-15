import React, { useEffect, useState } from 'react'
import { SingleCrypto } from '../../services/api'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Typography, LinearProgress, useTheme, Button } from '@mui/material';
import parse from "html-react-parser";
import { numbersWithCommas } from '../../helpers/string'
import { CryptoState } from './../../CryptoContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'

const CryptoInfo = () => {
    const theme = useTheme()
    const [cryptoData, setCryptoData] = useState()
    const { id } = useParams()
    const { currency, user, setAlerts, watchlist } = CryptoState()

    const fetchSingleCryptoData = async () => {
        const { data } = await axios.get(SingleCrypto(id))
        setCryptoData(data)
    }

    useEffect(() => {
        fetchSingleCryptoData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addToWatchlist = async () => {
        const cryptoRef = doc(db, "watchlist", user.uid)

        try {
            await setDoc(cryptoRef,
                { cryptos: watchlist ? [...watchlist, cryptoData?.id] : cryptoData?.id }
            )
            setAlerts({
                open: true,
                message: `${cryptoData.name} Added to the Watchlist !`,
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

    const removeFromWatchlist = async () => {
        const cryptoRef = doc(db, "watchlist", user.uid)

        try {
            await setDoc(
                cryptoRef,
                { cryptos: watchlist.filter((wish) => wish !== cryptoData?.id) },
                { merge: true }
            );
            setAlerts({
                open: true,
                message: `${cryptoData.name} Removed from the Watchlist !`,
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

    const isCoinInWatchlist = watchlist.includes(cryptoData?.id)

    const styles = {
        container: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            height: '100%',
            marginTop: '50px'
        },
        name: {
            fontWeight: 'bold',
            marginBottom: '20px',
            marginTop: '20px',
            fontFamily: "Montserrat"
        },
        description: {
            textAlign: 'justify',
            padding: '25px',
            fontFamily: "Montserrat",
            '& > a': {
                color: theme.palette.text.primary,
                fontWeight: 'bold'
            }
        },
        data: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
        },
        button: {
            backgroundColor: theme.palette.action.active,
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            height: '50px',
        }
    }

    if (!cryptoData)
        return <LinearProgress sx={{ backgroundColor: theme.palette.text.primary }} />;

    return (
        <div style={styles.container}>
            <img
                src={cryptoData?.image.large}
                alt={cryptoData?.name}
                height="200"
            />
            <Typography variant='h3' sx={styles.name}>
                {cryptoData?.name}
            </Typography>
            <Typography variant='subtitle1' sx={styles.description}>
                {parse(cryptoData?.description.en.split(". ")[0])}
            </Typography>
            <div style={styles.data}>
                <Typography variant='h5'>
                    Rank: {cryptoData.market_cap_rank}
                </Typography>
                <Typography variant='h5'>
                    Current Price: ${numbersWithCommas(cryptoData.market_data.current_price[currency])}
                </Typography>
                <Typography variant='h5'>
                    Market Cap: ${numbersWithCommas(cryptoData.market_data.market_cap[currency])}
                </Typography>
            </div>
            {
                user && (
                    <Button
                        variant="contained"
                        size="large"
                        sx={styles.button}
                        onClick={isCoinInWatchlist ? removeFromWatchlist : addToWatchlist}
                    >
                        <Typography variant='h6'>
                            {isCoinInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                        </Typography>
                    </Button>
                )
            }
        </div>
    )
}

export default CryptoInfo