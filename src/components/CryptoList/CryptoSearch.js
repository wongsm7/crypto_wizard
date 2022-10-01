import React, { useState } from 'react'
import { TextField } from '@mui/material'

const CryptoSearch = ({setSearch}) => {
  const styles = {
    textField: {
      marginBottom: 2, width: '100%' 
    }
  }

  return (
    <>
      <TextField
        label="Search for your cryptocurrency..."
        variant='outlined'
        sx={styles.textField}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  )
}

export default CryptoSearch