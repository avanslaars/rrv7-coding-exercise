import { setupServer } from 'msw/node'
import { productHandlers } from '~/services/product.mocks'

export const server = setupServer(...productHandlers)

