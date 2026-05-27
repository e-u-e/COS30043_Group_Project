# COS30043 - Project - NovaStore Electronics

## Team Information:
**Group:** 
- Eddie Zheng (104454546)
- Sowatanak Som (104672571)
- John Javapro ()
- Ali Afzali (106092469)

## Tech Info
- **Frontend:** 
    Vue3
    Vite
    Bootstrap
    vuejs-paginate-next
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
TODO: Don't worry about step 4 yet, when we start building the backend this will be relevant
4. Import the `.sql` file found in `resources/`

TODO: Also ignore this for now, will be relevant when backend is built
### Backend Setup
Open `resources/apis.php` and update credentials for your local MySQL setup:
**By default, XAMPP will use username: root and no password, this line should work for everyone with no changes***
```php
$conn = mysqli_connect('localhost', 'root', '', 'onlinestore');
```
## Task Distribution
Self Assign here please

### Member 1 - Core Layout and Routing
**Assigned to:** John Javapro

- App shell (App.vue, main.js)
- Navbar and Footer components
- Vue Router setup with all routes defined
- Home page (HomeView.vue)
- About page (AboutView.vue)
- Responsive layout using Bootstrap across 3 device sizes

---

### Member 2 - Products and Search
**Assigned to:** Sowatanak Som

- Product listing page with pagination (ProductListView.vue)
- Product detail page (ProductDetailView.vue)
- Search and sort functionality
- Reusable ProductCard component
- PHP API and SQL table for products (resources/products.php)

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
- Cart or wishlist page (CartView.vue)
- PHP API and SQL table for reviews/likes (resources/reviews.php)

---

## Advanced Features (Individual)

Each member must independently implement one advanced Vue.js 
feature not covered in class. Add yours here once decided:
