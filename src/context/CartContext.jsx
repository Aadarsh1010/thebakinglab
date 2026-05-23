import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CartContext = createContext()
const STORAGE_KEY = 'bakinglab_cart'

export function CartProvider({ children }) {
  const [quantities, setQuantities] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities))
  }, [quantities])

  const inc = useCallback((name) => {
    setQuantities((q) => ({ ...q, [name]: (q[name] || 0) + 1 }))
  }, [])

  const dec = useCallback((name) => {
    setQuantities((q) => ({ ...q, [name]: Math.max(0, (q[name] || 0) - 1) }))
  }, [])

  const clearCart = useCallback(() => {
    setQuantities({})
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const setItemQuantity = useCallback((name, quantity) => {
    if (quantity <= 0) {
      setQuantities((q) => {
        const next = { ...q }
        delete next[name]
        return next
      })
    } else {
      setQuantities((q) => ({ ...q, [name]: quantity }))
    }
  }, [])

  return (
    <CartContext.Provider value={{ quantities, inc, dec, clearCart, setItemQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
