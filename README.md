# Welcome!

A modern, production-ready template for building full-stack React applications using React Router.

## Key Tech

- 🚀 [React Router](https://reactrouter.com/)
- 🔒 [TypeScript](https://www.typescriptlang.org/)
- 🦹 [Zod](https://zod.dev/)
- 🎉 [TailwindCSS](https://tailwindcss.com/)
- 🌐 Mocks provided by [MSW](https://mswjs.io/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## The Exercise

This exercise is intended to be treated like a pair-programming session with you driving.

You can ask questions, read docs, search the web, even use copilot. We ask that all of these resources are used on screen so we can see your workflow and how you go about figuring things out and solving problems.

This project has a partially defined "Products" route at `app/routes/products.tsx`. The route reads data in the loader using a service function defined in `app/services/product.ts`. Any associated typed and the Zod schemas those are based on are defined in `app/services/product.types.ts` The data it returns is handled via MSW and is all mock data. You shouldn't need to worry about the mocks, but they are defined in `app/services/product.mocks.ts`.

You're being tasked with adding some functionality to this route.

### Search Form

The first task is to create a search form on the page. When submitted, the search form should result in the existing `getProducts` call being called again with the search term being passed along. The mock backend service will apply the search term to the `name` field on each item so you do not need to implement the data portion of the search functionality.

- Create the search form UI
- Handle submisison
- Wire up the relevant code to update the data being fetched
- Prevent searching with an empty search input
- If empty search submit is attempted show a message in the UI that communicates the issue
- Add UI for a "clear search" capability & wire that up to show the full dataset again

### Add New Item Form

The second task is to create a second form on the page to add a new product to the list. It should accept a product name, price, and an optional description. The form should submit via the route's action and call the `createProduct` service function to add the product.

- Create the product form UI
- Handle form submission and related service call (the `createProduct` function and related mock will update the in-memory mocks is successful)
- Ensure the form has a cancel button that will clear the form
- Prevent calling the `createProduct` function with an invalid payload
- If an form is invalid, show a message on the page indicating that the form is invalid

### Add a detail route to show product details

There is a `getProductById` service function that will retrieve a single product using its ID. Leverage this to create a new route that shows the full product details, showing the name, price and description if available.

- Create a new route module
- Load the individual product data based on its ID
- Display the product data on the page
- If the product has no description, show a message instead indicating that
- Link to this new view from each row in the `/products` table
- Include a link on the product detail page to get back to the list
