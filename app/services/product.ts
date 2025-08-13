import axios from 'axios'
import { newProductPayloadSchema, type NewProductPayload } from './product.types'

export async function getProducts() {
	try {
		const response = await axios.get('http://local.dev/products')
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		throw error
	}
}

export async function getProductById(id: string) {
	try {
		const response = await axios.get(`http://local.dev/products/${id}`)
		return response.data
	} catch (error) {
		console.error('Error fetching product by ID:', error)
		throw error
	}
}

export async function createProduct(productData: NewProductPayload) {
	try {
		const newProduct = newProductPayloadSchema.parse(productData)
		const response = await axios.post('http://local.dev/products', newProduct)
		return response.data
	} catch (error) {
		console.error('Error creating product:', error)
		throw error
	}
}
