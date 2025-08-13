import { z } from 'zod'

export const productSchema = z.object({
	id: z.uuidv4(),
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),
})

export const productListSchema = z.array(productSchema)

export const newProductPayloadSchema = productSchema.omit({ id: true })

export type Product = z.infer<typeof productSchema>
export type ProductList = z.infer<typeof productListSchema>
export type NewProductPayload = z.infer<typeof newProductPayloadSchema>
