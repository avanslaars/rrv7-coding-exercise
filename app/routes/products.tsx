import { useEffect, useRef } from 'react'
import { data, Form } from 'react-router'
import { z } from 'zod'
import { createProduct, getProducts } from '~/services/product'
import { productListSchema, type Product } from '~/services/product.types'

export const ErrorBoundary = ({ error }: { error: Error }) => {
	return (
		<div>
			<h2>Error</h2>
			<p>{error.message}</p>
		</div>
	)
}

const loaderDataSchema = z.object({
	products: productListSchema,
})

export const loader = async () => {
	const productResponse = await getProducts()

	return { products: productResponse.data }
}

// TODO: Convert this to a placeholder for dev to populate
const actionDataSchema = z.object({
	success: z.boolean(),
	error: z.string().optional(),
})

// TODO: Convert this to a placeholder for dev to populate
export const action = async ({ request }: { request: Request }) => {
	// Read the form data
	const formData = await request.formData()
	const name = formData.get('name')
	const price = formData.get('price')

	// Validate the form data

	if (
		typeof name !== 'string' ||
		typeof price !== 'string' ||
		name.trim() === '' ||
		isNaN(parseFloat(price))
	) {
		return { error: 'Invalid form data' }
	}

	console.log('Adding product:', { name, price: parseFloat(price) })

	try {
		const updateResponse = await createProduct({ name, price: parseFloat(price) })
		if (updateResponse.status === 201) {
			return { success: true }
		}
		return { success: false }
	} catch (error) {
		console.error('Error adding product:', error)
		return { error: 'Failed to add product' }
	}
}

const productsPropsSchema = z.object({
	loaderData: loaderDataSchema,
	actionData: actionDataSchema.nullable(),
})

type ProductsProps = z.infer<typeof productsPropsSchema>

export default function Products({ loaderData, actionData }: ProductsProps) {
	const { products } = loaderData
	const formRef = useRef<HTMLFormElement>(null)
	useEffect(() => {
		if (actionData?.success) {
			formRef.current?.reset()
		}
	}, [actionData])

	return (
		<div>
			<h2>Products</h2>
			<Form method="post" ref={formRef}>
				<input type="text" name="name" placeholder="Product Name" />
				<input type="text" name="price" placeholder="Product Price" />
				<button type="submit">Add Product</button>
			</Form>
			{actionData?.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.name}</td>
							<td>{product.price}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
