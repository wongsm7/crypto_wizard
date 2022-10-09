import React, { useState, useEffect } from 'react'
import { CryptoListData } from '../../services/api'
import { Typography, Container, useTheme, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Pagination } from '@mui/material'
import CryptoSearch from './CryptoSearch'
import { numbersWithCommas } from '../../helpers/string'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { CryptoState } from './../../CryptoContext';

const CryptoList = () => {
  const theme = useTheme()
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const { currency } = CryptoState()

  const fetchCryptos = async () => {
    setLoading(true)
    const { data } = await axios.get(CryptoListData(currency))
    setCryptos(data)
    setLoading(false)
  }


  useEffect(() => {
    fetchCryptos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const handleSearch = () => {
    return cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
    )
  }

  const styles = {
    container: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      margin: 5, fontFamily: "Montserrat"
    },
    row: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.action.selected,
      },
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={styles.container}>
        <Typography
          variant='h4'
          sx={styles.title}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <CryptoSearch setSearch={setSearch} />
        <TableContainer>
          {
            loading ? <LinearProgress /> : (
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">24h Change</TableCell>
                    <TableCell align="right">Market Cap</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/crypto/${row.id}`)}
                        key={row.name}
                        sx={styles.row}
                      >
                        <TableCell
                          height="100"
                          sx={{ display: "flex" }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
                          >
                            <Typography
                              sx={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}>
                              {row.symbol}
                            </Typography>
                            <Typography sx={{ color: theme.palette.text.secondary }}>
                              {row.name}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          $
                          {numbersWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <Typography
                            sx={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          $
                          {numbersWithCommas(
                            row.market_cap
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0) || 0}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 15
          }}
          onChange={(e, value) => {
            setPage(value);
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CryptoList