import { delay, http, HttpResponse } from 'msw'
import { v4 as uuid } from 'uuid'
import { head } from 'es-toolkit'
import {
	type NewProductPayload,
	type Product,
	type ProductList,
} from './product.types'

const products: ProductList = [
	{
		id: 'f7e6c2b2-8e7a-4e7e-9c2d-2b9e4a1f3d6c',
		name: 'Laptop',
		price: 999.99,
		description: 'A high-performance laptop for all your needs.',
	},
	{
		id: 'a2b4c8e1-3d5f-4e2a-8b7c-1f9e2d6a4b3c',
		name: 'Smartphone',
		price: 499.99,
		description: 'A sleek smartphone with cutting-edge features.',
	},
	{
		id: 'd1f3e7b9-5c2a-4a8e-9b1d-7e2c4f6a8b5d',
		name: 'Tablet',
		price: 299.99,
		description: 'A versatile tablet for work and play.',
	},
	{
		id: 'b3c5d7e9-1f2a-4b6c-8d9e-0a1b2c3d4e5f',
		name: 'Headphones',
		price: 199.99,
		description: 'Noise-cancelling headphones for immersive sound.',
	},
	{
		id: 'e4f6a8b1-2c3d-4e5f-9a0b-1c2d3e4f5a6b',
		name: 'Smartwatch',
		price: 149.99,
		description: 'A stylish smartwatch with health tracking features.',
	},
	{
		id: 'f5a6b7c8-9d0e-1f2a-3b4c-5d6e7f8g9h0i',
		name: 'Wireless Charger',
		price: 49.99,
		description: 'A convenient wireless charger for your devices.',
	},
	{
		id: 'g6h7i8j9-0a1b-2c3d-4e5f-6g7h8i9j0k1l',
		name: 'Bluetooth Speaker',
		price: 89.99,
		description: 'A portable Bluetooth speaker with excellent sound quality.',
	},
	{
		id: 'h7i8j9k0-1a2b-3c4d-5e6f-7g8h9i0j1k2l',
		name: 'Wired Speaker',
		price: 69.99,
		description: 'A reliable wired speaker for high-quality audio.',
	},
	{ id: 'h7i8j9k0-1b2c-3d4e-5f6g-7h8i9j0k1l2m', name: 'USB-C Hub', price: 39.99 },
	{
		id: 'i8j9k0l1-2c3d-4e5f-6g7h-8i9j0k1l2m3n',
		name: 'Portable SSD',
		price: 129.99,
		description: 'A fast and compact portable SSD for data storage.',
	},
	{
		id: 'j9k0l1m2-3d4e-5f6g-7h8i-9j0k1l2m3n4o',
		name: 'Gaming Mouse',
		price: 59.99,
		description: 'A high-precision gaming mouse for ultimate control.',
	},
	{
		id: 'k0l1m2n3-4e5f-6g7h-8i9j-0k1l2m3n4o5p',
		name: 'Mechanical Keyboard',
		price: 89.99,
		description: 'A high-quality mechanical keyboard for gamers and typists.',
	},
	{
		id: 'l1m2n3o4-5f6g-7h8i-9j0k-1l2m3n4o5p6q',
		name: 'Webcam',
		price: 99.99,
		description: 'A high-definition webcam for video calls and streaming.',
	},
	{
		id: 'm2n3o4p5-6g7h-8i9j-0k1l-2m3n4o5p6q7r',
		name: 'Microphone',
		price: 79.99,
		description: 'A studio-quality microphone for clear audio recording.',
	},
	{
		id: 'n3o4p5q6-7h8i-9j0k-1l2m-3n4o5p6q7r8s',
		name: 'Laptop Stand',
		price: 49.99,
		description: 'An adjustable laptop stand for ergonomic comfort.',
	},
	{
		id: 'o4p5q6r7-8i9j-0k1l-2m3n-4o5p6q7r8s9t',
		name: 'Desk Mat',
		price: 29.99,
		description: 'A large desk mat for a clean and organized workspace.',
	},
]

export const productHandlers = [
	http.get<any, any, ProductList>(
		'http://local.dev/products',
		async ({ request }) => {
			const searchParams = new URL(request.url).searchParams
			const search = searchParams.get('search')?.toLowerCase() ?? ''
			const productResult = search
				? products.filter((p) => p.name.toLowerCase().includes(search))
				: products

			await delay()
			return HttpResponse.json(productResult)
		},
	),
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
	http.delete<any, { id: string }, Product>(
		'http://local.dev/products/:id',
		async ({ params }) => {
			const { id } = params
			const productIndex = products.findIndex((p) => p.id === id)

			await delay()

			if (productIndex === -1) {
				return new HttpResponse(null, { status: 404 })
			}

			const deletedProduct = head(products.splice(productIndex, 1))
			return HttpResponse.json(deletedProduct)
		},
	),
]
