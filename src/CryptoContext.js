import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { CryptoListData } from './services/api'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from "./firebase";

const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('usd')
    const [cryptos, setCryptos] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [alerts, setAlerts] = useState({
        open: false,
        message: '',
        type: 'success'
    })
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        if (user) {
          const cryptoRef = doc(db, "watchlist", user?.uid);
          var unsubscribe = onSnapshot(cryptoRef, (crypto) => {
            if (crypto.exists()) {
              console.log(crypto.data().cryptos);
              setWatchlist(crypto.data().cryptos);
            } else {
              console.log("No Items in Watchlist");
            }
          });
    
          return () => {
            unsubscribe();
          };
        }
      }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            user ? setUser(user) : setUser(null)
        })
    }, [])

    const fetchCryptos = async () => {
        setLoading(true)
        const { data } = await axios.get(CryptoListData(currency))
        setCryptos(data)
        setLoading(false)
    }

    return (
        <Crypto.Provider value={{ currency, setCurrency, cryptos, loading, fetchCryptos, alerts, setAlerts, user, watchlist ,setWatchlist }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
}