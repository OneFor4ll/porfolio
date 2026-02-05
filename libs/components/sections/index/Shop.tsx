// app/shop/page.tsx
"use client"

import { Container, Grid, Card, CardMedia, Typography, IconButton, Box, Stack, Badge, Modal, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ProductItem {
  id: number
  price: number
  quantity: number
  name: string
}

const initialProducts: ProductItem[] = [
  { id: 1, price: 19.99, quantity: 0, name: "Product 1" },
  { id: 2, price: 24.99, quantity: 0, name: "Product 2" },
  { id: 3, price: 14.99, quantity: 0, name: "Product 3" },
  { id: 4, price: 29.99, quantity: 0, name: "Product 4" },
]

export default function Shop() {
  const router = useRouter()
  const [products, setProducts] = useState<ProductItem[]>(initialProducts)
  const [cartOpen, setCartOpen] = useState(false)

  // Load cart data from sessionStorage on component mount
  useEffect(() => {
    const savedCartData = sessionStorage.getItem('cartData')
    if (savedCartData) {
      const cartData = JSON.parse(savedCartData)
      // Update products with saved quantities
      setProducts(prevProducts => 
        prevProducts.map(product => {
          const cartItem = cartData.items.find((item: ProductItem) => item.id === product.id)
          return cartItem ? { ...product, quantity: cartItem.quantity } : product
        })
      )
    }
  }, [])

  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0)
  const cartItems = products.filter(product => product.quantity > 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleIncrement = (id: number) => {
    setProducts(products.map(product =>
      product.id === id && product.quantity < 99 
        ? { ...product, quantity: product.quantity + 1 }
        : product
    ))
  }

  const handleDecrement = (id: number) => {
    setProducts(products.map(product =>
      product.id === id && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    ))
  }

  const handleCartIncrement = (id: number) => {
    handleIncrement(id)
  }

  const handleCartDecrement = (id: number) => {
    const product = products.find(p => p.id === id)
    if (product && product.quantity === 1) {
      setProducts(products.map(p => 
        p.id === id ? { ...p, quantity: 0 } : p
      ))
    } else {
      handleDecrement(id)
    }
  }

  // Save cart data whenever products change
  useEffect(() => {
    const cartData = {
      items: products.filter(p => p.quantity > 0),
      totalItems,
      totalPrice
    }
    sessionStorage.setItem('cartData', JSON.stringify(cartData))
  }, [products, totalItems, totalPrice])

  const handlePay = () => {
    router.push('/pay-page')
    setCartOpen(false)
  }

  return (
    <>
      <IconButton
        onClick={() => setCartOpen(true)}
        sx={{
          position: 'fixed',
          left: 10,
          top: 70,
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: 'grey.100',
          }
        }}
      >
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Modal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Shopping Cart
            </Typography>
            <IconButton onClick={() => setCartOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {cartItems.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              Your cart is empty
            </Typography>
          ) : (
            <>
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)} each
                      </Typography>
                    </Box>
                    
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ ml: 2 }}
                    >
                      <IconButton
                        onClick={() => handleCartDecrement(item.id)}
                        size="small"
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          width: 30,
                          height: 30
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography variant="body1" sx={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>

                      <IconButton
                        onClick={() => handleCartIncrement(item.id)}
                        size="small"
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          width: 30,
                          height: 30
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Item total:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Total Items:</Typography>
                  <Typography>{totalItems}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Total Price:</Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handlePay}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Pay Now
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Container sx={{ py: 15 }}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%'
              }}>

                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  ${product.price.toFixed(2)}
                </Typography>

                <CardMedia
                  component="div"
                  sx={{
                    width: '100%',
                    height: 200,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    borderRadius: 1
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Image Placeholder
                  </Typography>
                </CardMedia>

                <Box sx={{ width: '100%', mt: 'auto' }}>
                  <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
                    Quantity
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconButton
                      onClick={() => handleDecrement(product.id)}
                      disabled={product.quantity === 0}
                      size="small"
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                      {product.quantity}
                    </Typography>

                    <IconButton
                      onClick={() => handleIncrement(product.id)}
                      size="small"
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}