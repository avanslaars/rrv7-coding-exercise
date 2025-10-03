import axios, { type AxiosResponse } from 'axios'
import {
	type NewProductPayload,
	type Product,
	type ProductList,
	newProductPayloadSchema,
} from './product.types'

export async function getProducts(search?: string) {
	try {
		const response = await axios.get<ProductList>(
			`http://local.dev/products${search ? `?search=${search}` : ''}`,
		)
		return response
	} catch (error) {
		console.error('Error fetching products:', error)
		throw error
	}
}

export async function getProductById(id: string) {
	try {
		const response = await axios.get<Product>(`http://local.dev/products/${id}`)
		return response
	} catch (error) {
		console.error('Error fetching product by ID:', error)
		throw error
	}
}

export async function createProduct(productData: NewProductPayload) {
	try {
		const newProduct = newProductPayloadSchema.parse(productData)
		const response = await axios.post<NewProductPayload, AxiosResponse<Product>>(
			'http://local.dev/products',
			newProduct,
		)
		return response
	} catch (error) {
		console.error('Error creating product:', error)
		throw error
	}
}

export async function deleteProduct(id: string) {
	try {
		const response = await axios.delete<AxiosResponse<Product>>(
			`http://local.dev/products/${id}`,
		)
		return response
	} catch (error) {
		console.error('Error deleting product:', error)
		throw error
	}
}
