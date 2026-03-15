# Cards & Transactions

This project is a responsive frontend application built with **React**, **TypeScript**, **Vite**, **Ant Design**, and **styled-components**.

It simulates a simple banking-style overview where a user can browse cards, view transactions, and narrow down results with filters.

---

# Overview

The page shows a list of payment cards and a transaction list.

By default, **all transactions are visible**. When a user selects a card, the list is narrowed down to that specific card’s transactions. Selecting the same card again clears the selection and returns to the full list.

The user can filter transactions by:

- **Amount ≥**
- **Transaction type** (`All`, `Credited`, `Debited`)

The amount filter uses a **small debounce** so filtering does not run on every keystroke.

Pagination is applied on the client side after filtering.

The current UI state (selected card, filters, and page) is also **synced with the URL**, which allows the state to persist on refresh and makes it shareable.

---

# Features

- Card selection and unselection
- All transactions visible by default
- Card-specific transaction filtering
- Transaction amount filtering
- Transaction type filtering
- Clear filters action
- Client-side pagination
- URL-synced state
- Accessible labels for interactive elements
- Unit and integration tests with Vitest

---

# Tech Stack

- React
- TypeScript
- Ant Design
- styled-components
- Vitest
- React Testing Library

---

# Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# Running Tests

The project uses **Vitest** with **React Testing Library**.

Run tests using:

```bash
npm run test
```

---

# Assumptions and Tradeoffs

### Default flow is to show all transactions

Current implementation shows all the transactions by default and to view card specific transactions user has to select a card.

### No global state management

The application state is small enough to manage locally with React hooks.  
Introducing Redux or other global state solutions would mean over-engineering a simple solution.

### URL state handled with a custom hook

Instead of adding routing or query-state libraries, a small custom hook (`useTransactionQueryState`) synchronizes UI state with the URL.

This keeps the solution simple while still allowing:

- Refresh persistence
- Shareable URLs

---

# Improvements With More Time

### Fetch a fixed amount in pagination

Currently the app loads all transactions and paginates on the client.  
A more scalable approach would fetch transactions per page from the API.

### Range filter for amount

The filter currently supports only a single amount.  
Adding minimum and maximum values would make the filtering more flexible.

### Utilize design tokens

Using design tokens for spacing, colors, border radius, and typography would help keep the UI consistent and easier to maintain.

### Move logic from `App` into containers

Some orchestration logic still lives inside `App`.  
This could be extracted into feature containers or dedicated hooks for better separation of concerns.

### Introduce Context / Redux / TanStack Query if the app grows

For the current scope, global state management would be unnecessary.  
However, if the application expands to multiple pages or more server data dependencies gets added, introducing a structured state layer would make sense.

### Language switching

Adding internationalization and a language switcher would make the application more flexible.
# dkb-frontend-task
