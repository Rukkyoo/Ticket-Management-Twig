# TicketFlow - Modern Ticket Management System 

A comprehensive ticket management application built with PHP, Twig templating, and Tailwind CSS. Features a clean, modern interface for creating, managing, and tracking support tickets with real-time API integration.


---

##  Features

-  **Modern UI/UX** - Clean, responsive design with Tailwind CSS
-  **Full CRUD Operations** - Create, Read, Update, Delete tickets
-  **Advanced Search** - Filter tickets by title or ID
-  **Dashboard Analytics** - Overview of ticket statistics
-  **Authentication System** - User login and registration
-  **Mobile Responsive** - Works seamlessly on all devices
-  **Real-time Updates** - Live ticket status and information
-  **API Integration** - Connects to external ticket management APIs

---

##  Prerequisites

Before you begin, ensure you have the following installed:

### 1. **PHP** (>= 8.0)

- **Check if installed:** `php --version`
- **Install:**
  - **Windows:** [Download PHP 8.0+](https://windows.php.net/download/)
  - **Ubuntu/Debian:** `sudo apt update && sudo apt install php php-cli php-mbstring php-curl`
  - **macOS:** `brew install php`

### 2. **Composer** (PHP Dependency Manager)

- **Check if installed:** `composer --version`
- **Install:** [getcomposer.org](https://getcomposer.org/download/)
  ```bash
  # Quick install (Linux/macOS):
  curl -sS https://getcomposer.org/installer | php
  sudo mv composer.phar /usr/local/bin/composer
  ```

### 3. **Node.js & npm** (for Frontend Assets)

- **Check if installed:** `node --version && npm --version`
- **Install:** [nodejs.org](https://nodejs.org/) (LTS version recommended)

---

##  Quick Start

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <(https://github.com/Rukkyoo/Ticket-Management-Twig)>
cd ticketflow

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 2. Build Frontend Assets

```bash
# Build CSS and JavaScript bundles
npm run build:css
npm run build

# Or watch for changes during development
npm run watch:css
npm run dev
```

### 3. Configure API Endpoints

Update your API endpoints in `src/auth.js` and `src/ticket.js`:

```javascript
// src/auth.js
export const authInstance = axios.create({
  baseURL: 'https://your-auth-api.com/api/auth',
  timeout: 8000,
  headers: {'X-Custom-Header': 'your-auth-token'}
});

// src/ticket.js
export const ticketInstance = axios.create({
  baseURL: 'https://your-tickets-api.com/api/tickets',
  timeout: 8000,
  headers: {'Content-Type': 'application/json'}
});
```

### 4. Start the Development Server

```bash
# Start server from the src directory
php -S localhost:8000 -t src
```

### 5. Open in Browser

Visit [http://localhost:8000](http://localhost:8000) 🎉

---

##  Project Structure

```
ticketflow/
├── src/
│   ├── index.php              # Main router & entry point
│   ├── auth.js               # Authentication API configuration
│   ├── ticket.js             # Ticket management API configuration
│   ├── local-server.js       # Alternative Node.js server
│   ├── templates/            # Twig template files
│   │   ├── base.twig        # Base layout template
│   │   ├── landing.twig     # Landing page
│   │   ├── login.twig       # Login page
│   │   ├── signup.twig      # Registration page
│   │   ├── dashboard.twig   # Dashboard overview
│   │   ├── tickets.twig     # Ticket management interface
│   │   └── 404.twig         # Error page
│   ├── styles/              # CSS assets
│   │   ├── tailwind.css     # Tailwind input
│   │   └── out.tailwind.css # Compiled CSS
│   └── public/              # Static assets (images, etc.)
├── dist/                    # Built JavaScript bundles
├── cache/twig/              # Twig template cache
├── vendor/                  # Composer dependencies
├── composer.json            # PHP dependencies
├── package.json             # Node.js dependencies & scripts
├── webpack.config.js        # Webpack configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This file
```

---

##  Key Features Explained

### Authentication System
- User registration and login
- Session management
- API token handling
- Secure password validation

### Ticket Management
- **Create Tickets**: Easy form-based ticket creation
- **View Tickets**: Detailed ticket information with status badges
- **Edit Tickets**: Inline editing with modal forms
- **Delete Tickets**: Confirmation-based deletion
- **Search & Filter**: Real-time ticket filtering
- **Status Tracking**: Open, In Progress, Closed states

### Dashboard Analytics
- Total ticket count
- Open vs resolved tickets
- Recent activity feed
- Priority-based organization

---

##  Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
AUTH_API_URL=https://your-auth-api.com
TICKET_API_URL=https://your-tickets-api.com
API_TIMEOUT=8000

# Application Settings
APP_NAME=TicketFlow
APP_ENV=development
APP_DEBUG=true
```

### Twig Configuration

Located in `src/index.php`:

```php
$twig = new \Twig\Environment($loader, [
    'cache' => __DIR__ . '/../cache/twig',
    'auto_reload' => true,
    'debug' => true,
]);
```

### Webpack Configuration

Modern ES6 module bundling with Babel transpilation:

```javascript
export default {
  mode: 'development',
  entry: {
    auth: './src/auth.js',
    ticket: './src/ticket.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src/dist'),
  }
};
```

---

##  Usage Guide

### Creating Tickets
1. Navigate to `/dashboard/tickets`
2. Fill out the create ticket form at the top
3. Set priority and status
4. Click "Create Ticket"

### Managing Tickets
- **View**: Click the "View" button on any ticket card
- **Edit**: Click the "Edit" button to modify ticket details
- **Delete**: Click the "Delete" button and confirm
- **Search**: Use the search bar to filter tickets

### API Integration
The app integrates with external APIs for:
- User authentication
- Ticket CRUD operations
- Real-time data synchronization

---

##  Technologies Used

- **Backend**: PHP 8.0+ with Twig templating
- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6)
- **Build Tools**: Webpack, Babel, PostCSS
- **API Client**: Axios for HTTP requests
- **Icons**: Heroicons (SVG-based icon system)
- **Styling**: Utility-first CSS framework

---

##  Available Scripts

```bash
# Install dependencies
composer install
npm install

# Build assets
npm run build:css      # Compile Tailwind CSS
npm run build          # Bundle JavaScript
npm run dev           # Watch mode for development

# Start development server
php -S localhost:8000 -t src

# Clean build artifacts
npm run clean
```

---

##  API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Ticket Endpoints
- `GET /api/tickets` - List all tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/:id` - Get ticket details
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket
