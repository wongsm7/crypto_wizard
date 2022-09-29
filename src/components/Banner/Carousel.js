import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TrendingCoins } from '../../services/api'
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { numbersWithCommas } from '../../helpers/string'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const Carousel = () => {
  const theme = useTheme()

  const styles = {
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center"
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    }
  }

  const [trendingCoins, setTrendingCoins] = useState([])

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins())
    setTrendingCoins(data)
  }

  console.log(trendingCoins)
  useEffect(() => {
    fetchTrendingCoins()
  }, [])

  const items = trendingCoins.map((crypto) => {
    let profit = crypto?.price_change_percentage_24h >= 0;
    return (
      <Link
        style={styles.carouselItem}
        to={`/crypto/${crypto.id}`}
      >
        <img
          src={crypto?.image}
          alt={crypto?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <Typography
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          $
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {crypto?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </Typography>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          ${numbersWithCommas(crypto?.current_price.toFixed(2))}
        </Typography>
      </Link>
    )
  })

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 6,
    },
  };

  return (
    <div style={styles.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>

  )
}

export default Carousel