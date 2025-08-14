import { type ActionFunctionArgs, type LoaderFunctionArgs, Link } from 'react-router'
import { z } from 'zod'
import { getProducts } from '~/services'
import { productListSchema } from '~/services/types'

export const ErrorBoundary = ({ error }: { error: Error }) => {
	return (
		<div className="border-2 border-red-300 rounded-lg max-w-72 p-4">
			<h2 className="text-red-500">Error</h2>
			<p>{error.message}</p>
			<Link to="/products" className="underline text-sky-400 font-semibold">
				Try Again
			</Link>
		</div>
	)
}

const loaderDataSchema = z.object({
	products: productListSchema,
})

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const productResponse = await getProducts()

	return { products: productResponse.data }
}

// TODO: Update this and apply it as needed
const actionDataSchema = z.object({})

export const action = async ({ request }: ActionFunctionArgs) => {
	return null
	// TODO: Implement the action logic here
}

const productsPropsSchema = z.object({
	loaderData: loaderDataSchema,
	actionData: actionDataSchema.nullable(),
})

type ProductsProps = z.infer<typeof productsPropsSchema>

export default function Products({ loaderData, actionData }: ProductsProps) {
	const { products } = loaderData

	return (
		<div>
			<h2>Products</h2>
			{/* TODO: Implement the search form here */}
			<table className="divide-y divide-gray-300 border border-sky-200 rounded-lg border-separate border-spacing-0 min-w-96">
				<thead>
					<tr className="divide-x-2">
						<th className="p-1 text-left border-b border-sky-200">Name</th>
						<th className="p-1 text-left border-b border-sky-200">Price</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id} className="divide-x-2 group odd:bg-slate-900">
							<td className="p-1 border-b border-sky-200 group-last:border-b-0 group-last:rounded-bl-lg">
								{product.name}
							</td>
							<td className="p-1 border-b border-sky-200 group-last:border-b-0 group-last:rounded-br-lg">
								{product.price}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<h3 className="mt-4">Add New Product</h3>
			{/* TODO: Implement the add product form here*/}
		</div>
	)
}
