import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { ChartData } from '../../services/api';
import { useTheme, ThemeProvider, CircularProgress } from '@mui/material'
import { Line } from 'react-chartjs-2';
import {
  Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip
} from "chart.js";
import SelectButton from './SelectButton'
import { CryptoState } from './../../CryptoContext';

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
]

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: '75px',
    padding: 50,
    width: '100%'
  },
  buttons: {
    display: "flex",
    marginTop: 20,
    justifyContent: "space-around",
    width: "100%",
  }
}
Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const CryptoChart = () => {
  const theme = useTheme()
  const { id } = useParams()
  const [chartData, setChartData] = useState()
  const [days, setDays] = useState(2)
  const { currency } = CryptoState()

  const fetchChartData = async () => {
    const { data } = await axios.get(ChartData(id, days, currency))
    setChartData(data.prices)
  }

  useEffect(() => {
    fetchChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency])

  return (
    <ThemeProvider theme={theme}>
      <div style={styles.container}>
        {
          !chartData ? (
            <CircularProgress
              color="inherit"
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: chartData.map((coin) => {
                    let date = new Date(coin[0])
                    let time = date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleString()
                  }),
                  datasets: [
                    {
                      data: chartData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency.toUpperCase()}`,
                      borderColor: theme.palette.text.primary,
                      backgroundColor: theme.palette.text.primary,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      grid: {
                        display: false
                      }
                    },
                    y: {
                      grid: {
                        display: false
                      }
                    }
                  },
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                  interaction: {
                    mode: "index",
                    intersect: false,
                  },
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    },
                    title: {
                      display: true,
                      text: `Price (Past ${days} Days) in ${currency.toUpperCase()}`,
                      color: theme.palette.text.primary
                    },
                    hover: {
                      mode: "nearest",
                      intersect: true,
                    },
                  },
                }}
              />
              <div style={styles.buttons}>
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
            </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CryptoChart