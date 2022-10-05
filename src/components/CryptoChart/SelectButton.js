import React from 'react'
import { useTheme } from '@mui/material'

const SelectButton = ({ children, selected, onClick }) => {
  const theme = useTheme()
  const styles = {
    button: {
      border: "1px solid " + theme.palette.text.primary,
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? theme.palette.text.primary : "",
      color: selected ? theme.palette.background.default : "",
      fontWeight: selected ? 700 : 500,
      width: "22%",
      textAlign: "center"
      //   margin: 5,
    }
  }

  return (
    <span onClick={onClick} style={styles.button}>
      {children}
    </span>
  )
}

export default SelectButton