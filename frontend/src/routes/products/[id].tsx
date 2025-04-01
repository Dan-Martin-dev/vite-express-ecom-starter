import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from '../__root'
import ProductDetail from '../../components/Products/ProductDetail'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/products/$id',
  component: () => {
    const { id } = Route.useParams()
    return <ProductDetail id={id} />
  },
})