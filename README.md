# Jewellery Admin Panel (React frontend)

## Run
    npm install
    cp .env.example .env      # set VITE_API_URL to your Express server
    npm run dev               # open http://localhost:5173

Start your backend first (`npm start` in the backend folder). The backend needs MongoDB running
as a replica set (e.g. MongoDB Atlas) because order creation uses a transaction.

## Pages
Login, Dashboard, Products, Orders, Customers. Change the store name in `src/utils.js` (STORE).

## Backend routes used
- POST   /api/auth/login               -> { token, user }  (only role "admin" can enter)
- GET    /api/products                 -> { products }
- POST   /api/products, PUT/DELETE /api/products/:id   (admin)
- GET    /api/orders/admin/all         -> { orders }       (admin)
- PATCH  /api/orders/:id/status        (admin) - see BACKEND_ADDITIONS.md
- GET    /api/admin/customers          -> { customers }    (admin) - see BACKEND_ADDITIONS.md

Dashboard numbers are worked out in the panel from products and orders (fine for a small store).
Customers come from the backend route above.


