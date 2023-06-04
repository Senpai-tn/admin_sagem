import { Button, Typography } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

const Products = () => {
  const [listProducts, setListProducts] = useState([])

  const getProducts = () => {
    axios.get(process.env.REACT_APP_URL + '/product').then((response) => {
      setListProducts(response.data)
    })
  }

  const supprimerProduit = (truck) => {
    axios
      .put(process.env.REACT_APP_URL + '/product', {
        id: truck._id,
        deletedAt: new Date(),
      })
      .then((response) => {
        getProducts()
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
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Supprimé</th>
          </tr>
          <tbody>
            {listProducts.map((product) => (
              <tr>
                <td>{product.name}</td>
                <td>{product.categorie}</td>
                <td>
                  {product.deletedAt &&
                    dayjs(product.deletedAt).format('YYYY-MM-DD HH:mm')}
                </td>

                <td>
                  {!product.deletedAt && (
                    <Button
                      color="error"
                      onClick={() => {
                        supprimerProduit(product)
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
        <Typography>Aucun Produit</Typography>
      )}
    </div>
  )
}

export default Products
