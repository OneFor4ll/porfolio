"use client"

import React, { useState } from "react"
import { Button, Typography, Container, Paper, TextField } from "@mui/material"

// 1. Interfaces para tipagem de props e estados
interface User {
  id: number
  name: string
  email: string
}

interface Product<T = string> {
  id: T // Generic para permitir diferentes tipos de ID
  name: string
  price: number
}

// 2. Exemplo de Generics em um componente reutilizável
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// 3. Type Guards
const isUser = (item: User | Product): item is User => {
  return (item as User).email !== undefined
}

// 4. Exemplo de uso de `typeof` e `keyof`
const printProperty = <T,>(obj: T, key: keyof T) => {
  console.log(`Valor da propriedade "${String(key)}":`, obj[key])
}

// 5. Componente principal
const AdvancedTypes = () => {
  // Estado tipado com interface
  const [user, setUser] = useState<User>({
    id: 1,
    name: "João",
    email: "joao@example.com",
  })

  // Estado tipado com Generic (usando string para o ID)
  const [product, setProduct] = useState<Product>({
    id: "101", // Agora o ID é uma string
    name: "Notebook",
    price: 2500,
  })

  // Lista de itens (User ou Product)
  const items: (User | Product)[] = [
    user,
    product,
    { id: 2, name: "Maria", email: "maria@example.com" },
    { id: "102", name: "Smartphone", price: 1500 }, // ID como string
  ]

  // Função com type guard
  const handleItemClick = (item: User | Product) => {
    if (isUser(item)) {
      alert(`User clicado: ${item.name} (${item.email})`)
    } else {
      alert(`Produto clicado: ${item.name} - R$ ${item.price}`)
    }
  }

  // Exemplo de uso de `typeof` e `keyof`
  const logUserProperty = (key: keyof User) => {
    printProperty(user, key)
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Exemplos Avançados de TypeScript no React
        </Typography>

        {/* 1. Estado tipado com interface */}
        <Typography variant="h6">Estado Tipado (User)</Typography>
        <TextField
          label="Nome"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Typography>
          User: {user.name} ({user.email})
        </Typography>

        {/* 2. Estado tipado com Generic */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Estado Tipado com Generic (Product)
        </Typography>
        <TextField
          label="Nome do Produto"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Preço"
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          fullWidth
          margin="normal"
        />
        <Typography>
          Produto: {product.name} - $ {product.price}
        </Typography>

        {/* 3. Lista com Generics */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Lista com Generics
        </Typography>
        <List
          items={items}
          renderItem={(item) => (
            <Button onClick={() => handleItemClick(item)}>
              {isUser(item) ? `Usuário: ${item.name}` : `Produto: ${item.name}`}
            </Button>
          )}
        />

        {/* 4. Exemplo de `typeof` e `keyof` */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Exemplo de `typeof` e `keyof`
        </Typography>
        <Button variant="contained" onClick={() => logUserProperty("name")}>
          Log Nome do Usuário
        </Button>
        <Button variant="contained" onClick={() => logUserProperty("email")} style={{ marginLeft: "10px" }}>
          Log Email do Usuário
        </Button>
      </Paper>
    </Container>
  )
}

export default AdvancedTypes