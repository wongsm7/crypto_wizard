import React, { useEffect } from 'react'
import CryptoChart from '../components/CryptoChart';
import CryptoInfo from '../components/CryptoInfo';

const styles = {
  container: {
    height: '100vh',
    flexDirection: 'row',
    display: 'flex'
  },
  left: {
    flex: 3,
    borderRight: '2px solid grey',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  right: {
    flex: 7,
  }
}

const Crypto = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <CryptoInfo />
      </div>
      <div style={styles.right}>
        <CryptoChart />
      </div>
    </div>
  )
}

export default Crypto