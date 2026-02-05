// app/payment/page.tsx
"use client"

import { Container, Typography, Box, Button, Grid, TextField, IconButton } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartData {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export default function PaymentPage() {
  const router = useRouter()
  const [cartData, setCartData] = useState<CartData | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedData = sessionStorage.getItem('cartData')
    if (storedData) {
      const data = JSON.parse(storedData)
      setCartData(data)
      setCartItems(data.items)
    } else {
      router.push('/shop-page') // Corrected path
    }
  }, [router])

  const handleIncrement = (id: number) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ).filter(item => item.quantity > 0)
    
    setCartItems(updatedItems)
    updateCartData(updatedItems)
  }

  const handleDecrement = (id: number) => {
    const updatedItems = cartItems.map(item =>
      item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0)
    
    setCartItems(updatedItems)
    updateCartData(updatedItems)
  }

  const updateCartData = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    const newCartData = {
      items,
      totalItems,
      totalPrice
    }
    
    setCartData(newCartData)
    sessionStorage.setItem('cartData', JSON.stringify(newCartData))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Payment submitted!')
    sessionStorage.removeItem('cartData')
    router.push('/shop-page') // Corrected path
  }

  const handleBackToShop = () => {
    router.push('/shop-page') // Corrected path
  }

  if (!cartData || cartItems.length === 0) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Your cart is empty</Typography>
        <Button variant="contained" onClick={handleBackToShop}>
          Back to Shop
        </Button>
      </Container>
    )
  }

  const total = cartData.totalPrice + 5 + (cartData.totalPrice * 0.1)

  return (
    <Container maxWidth="md" sx={{ py: 5, minHeight: '100vh' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        {/* Left - Order with quantity controls */}
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #ddd' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ fontWeight: 'medium' }}>{item.name}</Typography>
                  <Typography>${item.price.toFixed(2)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Quantity controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton 
                      onClick={() => handleDecrement(item.id)}
                      size="small"
                      sx={{ 
                        border: '1px solid #ddd',
                        width: 30,
                        height: 30
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    
                    <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    
                    <IconButton 
                      onClick={() => handleIncrement(item.id)}
                      size="small"
                      sx={{ 
                        border: '1px solid #ddd',
                        width: 30,
                        height: 30
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  <Typography sx={{ fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
            
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #ddd' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>${cartData.totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography>$5.00</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax:</Typography>
                <Typography>${(cartData.totalPrice * 0.1).toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontWeight: 'bold' }}>
                <Typography>Total:</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right - Form */}
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Shipping Info</Typography>
            <TextField fullWidth label="Full Name" size="small" required />
            <TextField fullWidth label="Email" type="email" size="small" required />
            <TextField fullWidth label="Phone" size="small" required />
            <TextField fullWidth label="Address" size="small" required />
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Payment Info</Typography>
            <TextField fullWidth label="Card Number" size="small" required />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Expiry" placeholder="MM/YY" size="small" required />
              <TextField fullWidth label="CVV" size="small" required />
            </Box>

            {/* Fixed position buttons */}
            <Box sx={{ 
              position: 'sticky', 
              bottom: 20, 
              mt: 3, 
              bgcolor: 'background.paper', 
              p: 2, 
              borderRadius: 1,
              boxShadow: 2,
              zIndex: 1000
            }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={handleBackToShop}
                >
                  Back to Shop
                </Button>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary"
                  fullWidth
                >
                  Pay ${total.toFixed(2)}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}