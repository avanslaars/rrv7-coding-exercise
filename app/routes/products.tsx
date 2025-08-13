import { z } from 'zod'
import { getProducts } from '~/services/product'
import { productListSchema, type Product } from '~/services/product.types'

const loaderDataSchema = z.object({
	products: productListSchema,
})

// type LoaderData = z.infer<typeof loaderDataSchema>

export const loader = async () => {
	const products = await getProducts()
	return { products }
}

const productsPropsSchema = z.object({
	loaderData: loaderDataSchema,
})

type ProductsProps = z.infer<typeof productsPropsSchema>

export default function Products({ loaderData }: ProductsProps) {
	const { products } = loaderData
	return (
		<div>
			<h2>Products</h2>
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
