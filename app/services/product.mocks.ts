import { delay, http, HttpResponse } from 'msw'
import { v4 as uuid } from 'uuid'
import {
	type NewProductPayload,
	type Product,
	type ProductList,
} from './product.types'

const products: ProductList = [
	{ id: 'f7e6c2b2-8e7a-4e7e-9c2d-2b9e4a1f3d6c', name: 'Laptop', price: 999.99 },
	{ id: 'a2b4c8e1-3d5f-4e2a-8b7c-1f9e2d6a4b3c', name: 'Smartphone', price: 499.99 },
	{ id: 'd1f3e7b9-5c2a-4a8e-9b1d-7e2c4f6a8b5d', name: 'Tablet', price: 299.99 },
]

export const productHandlers = [
	http.get<any, any, ProductList>('http://local.dev/products', async () => {
		await delay()
		return HttpResponse.json(products)
	}),
	http.get<any, { id: string }, Product>(
		'http://local.dev/products/:id',
		async ({ params }) => {
			const { id } = params
			const product = products.find((p) => p.id === id)
			await delay()
			return product
				? HttpResponse.json(product)
				: new HttpResponse(null, { status: 404 })
		},
	),
	http.post<any, NewProductPayload, Product>(
		'http://local.dev/products',
		async ({ request }) => {
			const productPayload = await request.json()

			await delay()

			//  Submit form with the name field set to "Error" to trigger a 500 response from the mock server
			if (productPayload.name === 'Error') {
				return new HttpResponse(null, { status: 500 })
			}

			if (!productPayload) {
				return new HttpResponse(null, { status: 400 })
			}
			const newId = uuid()
			const newProduct = { id: newId, ...productPayload }
			products.push(newProduct)
			return HttpResponse.json(newProduct, { status: 201 })
		},
	),
]
