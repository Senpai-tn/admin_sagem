import { Button, Typography } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

const Trucks = () => {
  const [listTrucks, setListTrucks] = useState([])

  const getTrucks = () => {
    axios.get(process.env.REACT_APP_URL + '/truck').then((response) => {
      setListTrucks(response.data)
    })
  }

  const supprimerTruck = (truck) => {
    axios
      .put(process.env.REACT_APP_URL + '/truck', {
        id: truck._id,
        deletedAt: new Date(),
      })
      .then((response) => {
        getTrucks()
      })
  }

  useEffect(() => {
    getTrucks()
  }, [])
  return (
    <div style={{ paddingTop: '60px' }}>
      <Typography
        sx={{ fontSize: '25px', textAlign: 'center', fontWeight: 900 }}
      >
        Liste des Camions
      </Typography>
      {listTrucks.length > 1 ? (
        <table width={'100%'}>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th>Modèle</th>
            <th>Numéro de série</th>
            <th>Supprimé</th>
          </tr>
          <tbody>
            {listTrucks.map((truck) => (
              <tr>
                <td>{truck.model}</td>
                <td>{truck.serieNumber}</td>
                <td>
                  {truck.deletedAt &&
                    dayjs(truck.deletedAt).format('YYYY-MM-DD HH:mm')}
                </td>

                <td>
                  {!truck.deletedAt && (
                    <Button
                      color="error"
                      onClick={() => {
                        supprimerTruck(truck)
                      }}
                    >
                      Supprimer
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography>Aucun Camion</Typography>
      )}
    </div>
  )
}

export default Trucks
