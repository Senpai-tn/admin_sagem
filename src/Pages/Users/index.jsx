import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Users = () => {
  const [listUsers, setListUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [userSelected, setUserSelected] = useState(null)
  const { control, handleSubmit, setError } = useForm({
    defaultValues: { duree: '' },
  })
  const user = useSelector((state) => state.user)
  const getUsers = () => {
    axios.get(process.env.REACT_APP_URL + '/user/search').then((response) => {
      setListUsers(response.data)
    })
  }
  const bloquerUser = (data) => {
    try {
      const x = parseInt(data.duree)
      if (!isNaN(x))
        axios
          .put(process.env.REACT_APP_URL + '/user', {
            id: userSelected._id,
            blocked: dayjs().add(x, 'days'),
          })
          .then((response) => {
            getUsers()
            setOpen(false)
          })
          .catch(() => {})
      else setError('duree', { message: 'Vous devez taper un entier' })
    } catch (error) {
      setError('duree', { message: 'Vous devez taper un entier' })
    }
  }
  const supprimerUser = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(process.env.REACT_APP_URL + '/user', {
            id: userSelected._id,
            deletedAt: new Date(),
          })
          .then((response) => {
            Swal.fire(
              'Supprimé!',
              "L'utilisateur " + userSelected.firstName + ' a été supprimé',
              'success'
            )
            getUsers()
          })
      }
    })
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div style={{ paddingTop: '60px' }}>
      <Modal open={open}>
        <Stack
          sx={{
            height: '100%',
            flex: 0.1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box p={10} height={200} bgcolor={'white'}>
            <Controller
              control={control}
              name="duree"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  type="number"
                  value={value}
                  onChange={onChange}
                  label="Durée"
                  helperText={error && error.message}
                  error={!!error}
                />
              )}
            />
            <Button
              onClick={handleSubmit(bloquerUser)}
              color="error"
              variant="contained"
            >
              Confirmer
            </Button>
          </Box>
        </Stack>
      </Modal>
      <Typography
        sx={{ fontSize: '25px', textAlign: 'center', fontWeight: 900 }}
      >
        Liste des Utilisateurs
      </Typography>
      {listUsers.length > 1 ? (
        <table width={'100%'}>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th>Nom & Prénom</th>
            <th>Email</th>
            <th>Tel</th>
            <th>CIN</th>
            <th>Rôle</th>
            <th>Bloqué</th>
          </tr>
          <tbody>
            {listUsers.map((u) => (
              <tr>
                <td>{u.lastName + ' ' + u.firstName}</td>
                <td>{u.email}</td>
                <td>{u.tel}</td>
                <td>{u.cin}</td>
                <td>{u.role}</td>
                <td>
                  {u.blocked && dayjs(u.blocked).format('YYYY-MM-DD HH:mm')}
                </td>
                <td>
                  {u._id !== user._id && !u.deletedAt && (
                    <Button
                      color="error"
                      onClick={() => {
                        setUserSelected(u)
                        setOpenDelete(true)
                      }}
                    >
                      Supprimer
                    </Button>
                  )}
                  {u._id !== user._id && !u.blocked && (
                    <Button
                      onClick={() => {
                        setUserSelected(u)
                        setOpen(true)
                      }}
                    >
                      Bloquer
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography>Aucun Utilisateurs</Typography>
      )}
    </div>
  )
}

export default Users
