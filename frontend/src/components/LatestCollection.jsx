import { ShopContext } from '@/context/ShopContext'
import React, { useContext } from 'react'

const LatestCollection = () => {
  const {products} = useContext(ShopContext)
  return (
    <div>LatestCollection</div>
  )
}

export default LatestCollection