# COS30043 - Project - Online Store(???)

## Team Information:
**Group:** 
- Eddie Zheng (104454546)
- Sowatanak Som (104672571)
- John Javapro ()
- 

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