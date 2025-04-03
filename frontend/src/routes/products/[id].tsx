import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../__root'
import ProductDetail from '../../components/Products/ProductDetail'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$id',
  component: () => {
    const { id } = Route.useParams()
    return <ProductDetail id={id} />
  },
})