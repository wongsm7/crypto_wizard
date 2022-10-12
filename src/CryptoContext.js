import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { CryptoListData } from './services/api'

const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('usd')
    const [cryptos, setCryptos] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    const fetchCryptos = async () => {
        setLoading(true)
        const { data } = await axios.get(CryptoListData(currency))
        setCryptos(data)
        setLoading(false)
      }

    return (
        <Crypto.Provider value={{currency, setCurrency, cryptos, loading, fetchCryptos}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
}