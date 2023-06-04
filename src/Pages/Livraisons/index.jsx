import { Button, Typography } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

const Livraisons = () => {
  const [listProducts, setListProducts] = useState([])

  const getProducts = () => {
    axios.get(process.env.REACT_APP_URL + '/livraison/all').then((response) => {
      setListProducts(response.data)
    })
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div style={{ paddingTop: '60px' }}>
      <Typography
        sx={{ fontSize: '25px', textAlign: 'center', fontWeight: 900 }}
      >
        Liste des Camions
      </Typography>
      {listProducts.length > 1 ? (
        <table width={'100%'}>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th>Date</th>
            <th>Camion</th>
            <th>Chauffeur</th>
            <th>Fournisseur</th>
          </tr>
          <tbody>
            {listProducts.map((product) => (
              <tr>
                <td>{dayjs(product.date).format('YYYY-MM-DD HH:mm')}</td>
                <td>
                  {product.camion &&
                    product.camion.model + ' - ' + product.camion.serieNumber}
                </td>
                <td>
                  {product.chauffeur &&
                    product.chauffeur.firstName +
                      ' ' +
                      product.chauffeur.lastName}
                </td>
                <td>
                  {product.fournisseur &&
                    product.fournisseur.firstName +
                      ' ' +
                      product.fournisseur.lastName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography>Aucune Livraison</Typography>
      )}
    </div>
  )
}

export default Livraisons
