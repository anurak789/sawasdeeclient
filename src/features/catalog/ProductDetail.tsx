//import { useEffect, useState } from "react";
import { useParams } from "react-router";
//import { Product } from "../../app/models/product";
import Grid from "@mui/material/Grid2";
import { Button, Divider, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
//import { Details } from "@mui/icons-material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../Basket/basketApi";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProductDetail() {
  const {id} = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const {data: basket} = useFetchBasketQuery();
  const item = basket?.items.find(x => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);


//   const [product, setProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     fetch(`https://localhost:7037/api/products/${id}`)
//         .then(response => response.json())
//         .then(data => setProduct(data))
//         .catch(error => console.log(error))
//   }, [id])
  
  const {data: product, isLoading} = useFetchProductDetailsQuery(id ? +id : 0)
  
  if(!product || isLoading) return <div>Loading...</div>

  const handleUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity

    if (!item || quantity > item.quantity) {
      addBasketItem({product, quantity: updatedQuantity})
    } else {
      removeBasketItem({productId: product.id, quantity: updatedQuantity})
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    if (value >= 0) setQuantity(value)
  }

  const productDetails = [
    {label: 'Name', value: product.name},
    {label: 'Description', value: product.description},
    {label: 'Type', value: product.type},
    {label: 'Brand', value: product.brand},
    {label: 'Quantity in stock', value: product.quantityInStock}
  ]

  return (
    <div>{product?.name}
      <Grid container spacing={6}  sx={{mx: 'auto'}}>
        <Grid size={6}>
            <img src={product?.pictureUrl} alt={product.name} style={{width: '100%'}} />
        </Grid>
        <Grid size={6}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{mb: 2}}/>
            <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
            <TableContainer>
                <table>
                    <TableBody>
                        {productDetails.map((detail, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                                <TableCell>{detail.value}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>

                        </TableRow>
                    </TableBody>
                </table>
            </TableContainer>
            <Grid container spacing={2} marginTop={3}>
                <Grid size={6}>
                    <TextField
                        variant="outlined" 
                        type="number"
                        label='Quantity in basket'
                        fullWidth
                        value={quantity}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid>
                    <Button
                      onClick={handleUpdateBasket} 
                      disabled={quantity === item?.quantity || !item && quantity === 0}
                      sx={{height: '55px'}} 
                      color="primary" 
                      size="large" 
                      variant="contained" 
                      fullWidth
                    >
                        Add to cart
                    </Button>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </div>
  )
}