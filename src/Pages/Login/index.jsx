import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller, get, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const Login = () => {
  const { control, handleSubmit, setError, getFieldState } = useForm({
    defaultValues: { email: '', password: '' },
  })
  const dispatch = useDispatch()
  const [x, setX] = useState('')

  const login = (data) => {
    const { email, password } = data
    axios
      .get(process.env.REACT_APP_URL + '/user', { params: { email, password } })
      .then((response) => {
        if (response.data.role === 'SUPER_ADMIN') {
          dispatch({ type: 'login', user: response.data })
          localStorage.setItem('user', JSON.stringify(response.data))
        } else {
          setError('email', { message: "Vous n'avez pas le droit d'accés" })
        }
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              setError('email', { message: 'Email incorrecte' })
              break
            case 403:
              setError('password', { message: 'Mot de passe incorrecte' })
              break
            case 402:
              setError('email', { message: 'Votre compte est supprimé' })
              break
            case 401:
              setError('email', {
                message: 'Votre compte est bloqué pour période',
              })
              break
          }
        } else {
          alert(error.message)
        }
      })
  }

  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      spacing={3}
    >
      <Typography
        sx={{ fontSize: '25px', textAlign: 'center', fontWeight: 900 }}
      >
        Se connecter en tant qu'admin {x}
      </Typography>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            value={value}
            onChange={onChange}
            label="Email"
            helperText={error && error.message}
            error={!!error}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            type="password"
            value={value}
            onChange={onChange}
            label="Mot de passe"
            helperText={error && error.message}
            error={!!error}
          />
        )}
      />
      <Button onClick={handleSubmit(login)}>Se Connecter</Button>
    </Stack>
  )
}

export default Login
