import { Button, Stack } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-around'}
      alignItems={'center'}
    >
      <img
        onClick={() => {
          navigate('/')
        }}
        style={{ cursor: 'pointer' }}
        src="logo.png"
        height={'40px'}
        width={'auto'}
      />
      <Stack
        direction={'row'}
        justifyContent={'space-around'}
        width={'80%'}
        alignItems={'center'}
      >
        <Button
          onClick={() => {
            navigate('/')
          }}
        >
          Gestion des Utilisateurs
        </Button>
        <Button
          onClick={() => {
            navigate('/trucks')
          }}
        >
          Gestion des Camions
        </Button>
        <Button
          onClick={() => {
            navigate('/products')
          }}
        >
          Gestion des Produits
        </Button>
        <Button
          onClick={() => {
            navigate('/livraisons')
          }}
        >
          Gestion des Livraisons
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: 'login', user: null })
          }}
          color="error"
          variant="contained"
        >
          Déconnecter
        </Button>
      </Stack>
    </Stack>
  )
}

export default Navbar
