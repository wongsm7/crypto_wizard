import React, { useEffect, useState } from 'react'
import { SingleCrypto } from '../../services/api'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Typography, LinearProgress, useTheme } from '@mui/material';
import parse from "html-react-parser";
import { numbersWithCommas } from '../../helpers/string'

const CryptoInfo = () => {
    const theme = useTheme()
    const [cryptoData, setCryptoData] = useState()
    const { id } = useParams()

    const fetchSingleCryptoData = async () => {
        const { data } = await axios.get(SingleCrypto(id))
        setCryptoData(data)
    }

    console.log(cryptoData)

    useEffect(() => {
        fetchSingleCryptoData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log()

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
            fontFamily: "Montserrat"
        },
        data: {

        }
    }

    if (!cryptoData)
        return <LinearProgress sx={{ backgroundColor: theme.palette.text.primary}}/>;

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
                    Current Price: ${numbersWithCommas(cryptoData.market_data.current_price.usd)}
                </Typography>
                <Typography variant='h5'>
                    Market Cap: ${numbersWithCommas(cryptoData.market_data.market_cap.usd)}
                </Typography>
            </div>
        </div>
    )
}

export default CryptoInfo