# COS30043 - Project - NovaStore Electronics

## Team Information:
**Group:** 
- Eddie Zheng (104454546)
- Sowatanak Som (104672571)
- John Javapro (101233221)
- Ali Afzali (106092469)

## Tech Info
- **Frontend:** 
    Vue3
    Vite
    Bootstrap
- **Backend:** 
    PHP
- **Database:**
    MySQL (XAMPP)

## Setup Information:

### Requirements
1. Node.js
2. XAMPP (Apache + MySQL)

### Initial Project Setup
1. Clone Repo into your XAMPP htdocs folder:
`C:/xampp/htdocs/`
2. Run in terminal from repo folder to install dependencies
```bash
npm install
npm run dev
```
### Database Setup
**Open XAMPP Control Panel first**
1. Start Apache and MySQL
2. In browser, go to: `http://localhost/phpmyadmin`
3. Create a new database called `onlinestore`
4. Import the `.sql` file found in `resources/`

### Backend Setup
Open `resources/products.php` and `resources/users.php` if you want to adjust the PHP endpoints.
The frontend already falls back to local JSON data when the backend is unavailable.
```php
// Example connection settings for a local XAMPP setup
$conn = mysqli_connect('localhost', 'root', '', 'onlinestore');
```
## Task Distribution
### Member 1 - Core Layout and Routing
**Assigned to:** John Javapro

- App shell (App.vue, main.js)
- Navbar and Footer components
- Vue Router setup with all routes defined
- Home page (Home.vue)
- About page (About.vue)
- Responsive layout using Bootstrap across 3 device sizes

---

### Member 2 - Products and Search
**Assigned to:** Sowatanak Som

- Product listing page with pagination (ProductListView.vue)
- Product detail page (ProductDetailView.vue)
- Search and sort functionality
- Reusable ProductCard component
- PHP API and SQL table for products (resources/products.php)
- Favourites page (Favourites.vue)
- Contact (Contact.vue)

---

### Member 3 - User Authentication
**Assigned to:** Eddie Zheng

- Register page with form validation (RegisterView.vue)
- Login page with form validation (LoginView.vue)
- Auth state management (show/hide content based on login)
- User profile page (ProfileView.vue)
- PHP API and SQL table for users (resources/users.php)

---

### Member 4 - Admin and Social Features
**Assigned to:** Ali Afzali

- Admin dashboard for managing products (AdminView.vue)
- Create, edit and delete product forms with validation
- Likes or reviews feature on product pages
- Cart or wishlist page (Cart.vue)
- PHP API and SQL table for reviews/likes (not yet added)

---

## Advanced Features (Individual)

Each member must independently implement one advanced Vue.js 
feature not covered in class. Add yours here once decided:

**Sowatanak Som: Parallaxing with Vue.js**

- Created custom parallax vue directive that interacts with the scroll wheel to play animations based on anchor points
- It supports simple actions such as scaling, rotating, and transforming
- Inspired by systems like GSAP and modern website schemes

