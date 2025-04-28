BookStore is a modern, lightweight online bookstore built with React, React Router, and React Bootstrap. It provides a clean and responsive interface for browsing, searching, and purchasing books.

The application allows users to view a catalog of books, add them to a cart, and proceed to checkout. Each book has its own detail page with information like title, price, description, and category. The project also supports basic user authentication (login, register) with credentials saved to localStorage, making it simple to manage sessions without a backend.

Key features:

🛒 Add to Cart and View Cart functionality

🔍 Search, filter, and sort books

📚 Detailed book pages with image, description, price, and category

🧑‍💻 Simple authentication (Login, Register) via localStorage

🔒 Admin panel access for users with admin rights

🌐 Fully responsive design using React Bootstrap

📄 Nice structured pages: Home, Catalog, Book Details, Cart, Checkout, Login, Register

✨ Favicon with a book reader icon

📜 Minimalistic, one-line Footer with useful links

The project is structured with Context API to manage global states for the books and the cart. No backend server is needed; all user and cart data are stored in the browser’s localStorage.

⚙️ How to Add an Admin User Manually (localStorage Setup)
If you want to create an admin manually, you need to insert an admin user object into your browser's localStorage under the "users" key.

Here’s how:

Open your project in the browser.

Press F12 to open DevTools → go to the Console tab.

Paste and run the following JavaScript code in the console:

const users = JSON.parse(localStorage.getItem('users')) || [];

users.push({
  username: 'admin',
  password: 'admin123', // choose your password
  role: 'admin'
});

localStorage.setItem('users', JSON.stringify(users));
Now you can log in with:

Username: admin

Password: admin123

After login, if your app checks the user's role, you will be redirected or given access to the admin panel.