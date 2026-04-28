# CleanFlow - Dry Cleaning Order Management System

A lightweight, aesthetically pleasing Dry Cleaning Order Management System built with the MERN stack (MongoDB, Express, React, Node.js). Designed for managing daily orders with a modern UI and dynamic data loading.

## 🔹 Setup Instructions



##env varibales
port = 5000
mongodb uri = 
### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally on port 27017, or update the connection string)

### Backend Setup
1. Open a terminal and navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Update the `.env` file with your `MONGODB_URI` if you are not using a local database.
4. Seed the database with dummy data to get started quickly:
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or a similar port specified by Vite).

---

## 🔹 Features Implemented

- **Create Order**: Form with dynamic garment list (type, quantity, price) to calculate the total bill amount and generate a unique order ID.
- **Order Status Management**: Interactive dropdown to update an order's status (`RECEIVED`, `PROCESSING`, `READY`, `DELIVERED`).
- **View Orders**: Data table listing all orders.
- **Search & Filtering**: Filter orders by status and search by customer name, phone, or order ID.
- **Basic Dashboard**: Visual cards displaying total orders, total revenue, and order status breakdown.
- **Authentication**: JWT-based secure login screen with hardcoded admin credentials.
- **Loading State**: Visual spinner during data fetching.
- **Modern Aesthetic**: Glassmorphism UI elements, dark mode default, subtle animations, and SCSS styling for maintainability.
- **Dummy Data Seeding**: `npm run seed` instantly populates the DB for testing.

---

## 🔹 AI Usage Report

### Which tools you used
- Google Gemini 3.1 Pro (Agentic AI coding assistant)
-chatgpt(for refrence )
-github copilot (for refrence )
-github chatbot (for refrence )
-claude ai for terminal error solving 

### Sample prompts
> "Make this as the project with proper MERN stack and mongoose with react as frontend and styling with SCSS with proper aesthetic layout format differing from backend and project with dummy data to show on the website with loading functionality."

> "Use javascript and nodejs as the backend."

### What AI got wrong
- The AI initially struggled with the project initialization sequence, attempting to write React component files (`App.jsx`) before the fundamental frontend file structure and dependencies were fully set up.
- AI-generated frontend code resulted in misconfigured API endpoints, causing immediate `ERR_CONNECTION_REFUSED` errors when the frontend tried to communicate with the backend.
- The AI suggested using complex frameworks like `Next.js`, which was over-engineered for a straightforward dashboard requirement.

### What you improved
- **Solved Complex Connection Errors:** The most significant manual improvement was debugging and resolving persistent `ERR_CONNECTION_REFUSED` errors between the Vite frontend and Express backend. I had to manually configure the CORS policies in the backend and correctly set up API proxying to ensure seamless data flow.
- **Stabilized MongoDB Connectivity:** I improved the database connection logic by implementing proper error handling and ensuring the server only accepted requests after establishing a stable connection to MongoDB, preventing silent crashes.
- **Refined Architecture:** I overrode the AI's complex suggestions and opted for a simple, robust React+Vite structure, making the project much easier to maintain and run locally.
- **Enhanced Code Quality:** While the AI generated the base structure, I manually refined the code, routing, and state management to ensure a polished, professional, and reliable application.

---

## 🔹 Tradeoffs

### What We Skipped
- **Complex Validation**: Only basic HTML5 required fields and Mongoose schema validations are present.
- **Pagination**: We load all orders at once. For a real production app with thousands of orders, pagination would be necessary.

### What We'd Improve With More Time
- **Deployment**: Deploy the frontend to Vercel and the backend to Render/Railway.
- **Receipt Printing**: Generate a PDF receipt for the customer upon order creation.
- **SMS Integration**: Integrate Twilio to send automated SMS updates when order status changes to "READY".
