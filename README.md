# 🛒 Smart Grocery Inventory Manager

A full-stack **MERN inventory management application** designed to help users manage grocery items, monitor stock levels, track product expiry dates, automatically generate shopping lists, receive inventory alerts, analyze inventory data, and export reports.

The project features a clean, responsive dashboard interface and a RESTful backend connected to a local MongoDB database.

> Built as a full-stack project to demonstrate practical skills in React, Node.js, Express.js, MongoDB, REST APIs, data visualization, reporting, and modern dashboard development.

---

## 📌 Project Overview

**Smart Grocery Inventory Manager** provides a centralized system for managing household or small-store grocery inventory.

Instead of manually keeping track of products, quantities, expiry dates, and items that need to be purchased, the application automatically processes inventory data and provides useful insights.

The application allows users to:

- Add, edit, delete, and search grocery items
- Organize groceries by category
- Monitor available quantities
- Identify low-stock products
- Track products nearing expiration
- Automatically generate shopping lists
- Mark shopping items as purchased
- View inventory alerts
- Analyze inventory using charts
- Receive notifications for important inventory conditions
- Configure inventory and notification settings
- Export inventory data to Excel
- Generate PDF inventory reports

---

# ❗ Problem Statement

Managing grocery inventory manually can become difficult, especially when the number of products increases.

Common problems include:

- Forgetting which groceries are available
- Purchasing duplicate items
- Running out of essential products
- Forgetting product expiry dates
- Wasting food because of expired products
- Maintaining shopping lists manually
- Lack of visibility into inventory status
- Difficulty analyzing grocery consumption and stock distribution

The **Smart Grocery Inventory Manager** addresses these problems by providing a centralized digital inventory system with automated stock monitoring, expiry tracking, shopping-list generation, analytics, alerts, and reporting.

---

# ✨ Key Features

## 📊 Dashboard

The dashboard provides a quick overview of the entire grocery inventory.

### Dashboard information includes:

- Total inventory items
- Low-stock item count
- Expiring-soon item count
- Critical item count
- Recent inventory
- Low-stock products
- Expiring products

### Quick Actions

The dashboard also provides quick access to important operations:

- **Add Item**
- **Update Stock**
- **Generate List**
- **View Alerts**

This allows commonly used inventory operations to be accessed directly from the dashboard.

---

## 🛍 Grocery Management

The Grocery List module provides complete CRUD functionality for grocery products.

### Features

- Add grocery items
- Edit existing items
- Delete items
- Search grocery items
- Assign product categories
- Specify quantity and units
- Add expiry dates
- Automatically display inventory status

### Example categories

- Dairy
- Pantry
- Fruit
- Vegetable
- Soft Drink
- General

The system can be extended easily to support additional categories.

---

## 📦 Inventory Management

The Inventory page provides a structured overview of all grocery products.

Users can view:

- Item name
- Category
- Quantity
- Unit
- Inventory status
- Expiry date

### Inventory statuses

Products can be classified as:

- 🟢 **Healthy**
- 🔴 **Low Stock**
- 🟡 **Expiring**

The page also provides summary statistics for the inventory.

---

## 🛒 Smart Shopping List

The Shopping List module helps users manage grocery purchases.

### Features

- Add shopping items manually
- Automatically generate a shopping list from low-stock inventory
- Search shopping-list items
- Mark items as purchased
- Delete shopping-list items
- View total items
- View pending purchases
- View purchased items

### Automatic Shopping List Generation

One of the key features of the application is the ability to generate shopping-list entries from products that require replenishment.

This connects inventory monitoring directly with purchase planning.

---

## 🚨 Alerts Center

The Alerts Center automatically highlights inventory conditions that require attention.

### Low Stock Alerts

Displays products whose quantities have reached low-stock conditions.

Each alert includes information such as:

- Product name
- Current quantity
- Unit

### Expiry Alerts

Displays products that are approaching their expiry date.

Expiry alerts help reduce unnecessary food waste and allow users to prioritize products that should be consumed soon.

---

## 🔔 Notification System

The application includes a notification bell in the header.

The notification system retrieves inventory alerts from the backend and displays:

- Current notification count
- Low-stock products
- Expiring products

Users can quickly inspect inventory problems without navigating away from their current page.

The notification panel is dynamically populated using inventory data returned by the backend.

---

## 📈 Analytics Dashboard

The Analytics module converts inventory data into visual insights.

### Analytics include:

- Total inventory items
- Healthy item count
- Low-stock item count
- Expiring item count
- Inventory Status Pie Chart
- Category Distribution Bar Chart
- Category Analysis Table

The analytics dashboard makes it easier to understand inventory composition and identify stock-related patterns.

---

## ⚙️ Settings

The Settings module allows application-level preferences to be configured.

### General Settings

- Store name
- Owner name
- Email
- Phone number

### Inventory Settings

- Low-stock threshold
- Expiry alert period

### Notification Settings

- Enable/disable low-stock alerts
- Enable/disable expiry alerts

Settings can be saved and reused by the application.

---

## 📄 Reports

The Reports module provides downloadable inventory information.

### Excel Report

Inventory information can be exported into an Excel-compatible format for:

- Record keeping
- Further analysis
- Inventory auditing

### PDF Report

A PDF inventory report can also be generated for:

- Documentation
- Sharing
- Printing
- Inventory summaries

---

## 👤 Profile Interface

The application header includes a user profile interface.

The profile dropdown provides quick access to:

- User profile
- Settings
- Account-related actions

The project currently focuses on inventory-management functionality, while complete authentication and multi-user account management are planned as future enhancements.

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend application |
| Vite | Frontend development/build tool |
| React Router DOM | Client-side routing |
| Tailwind CSS | UI styling |
| Axios | API communication |
| Recharts | Data visualization |
| Heroicons | UI icons |

---

## Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend REST API |
| Mongoose | MongoDB object modeling |
| dotenv | Environment configuration |

---

## Database

| Technology | Purpose |
|---|---|
| MongoDB Community Server | Local database server |
| MongoDB Compass | Visual database management |
| Mongoose | MongoDB schema/model integration |

During local development, the application uses **MongoDB Community Server running locally**.

Default development connection:

```text
mongodb://127.0.0.1:27017/smart_grocery_inventory
```

MongoDB Compass can be used to visually inspect the database, collections, and documents.

> For production/cloud deployment, the local MongoDB database should be replaced with a cloud-hosted MongoDB connection such as MongoDB Atlas.

---

## Reporting & Export

The project also includes libraries/utilities for:

- Excel inventory export
- PDF report generation

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────┐
│          React Frontend         │
│                                 │
│ Dashboard • Grocery • Inventory │
│ Shopping • Alerts • Analytics   │
│ Settings • Reports              │
└───────────────┬─────────────────┘
                │
                │ HTTP / REST API
                ▼
┌─────────────────────────────────┐
│       Node.js + Express.js      │
│                                 │
│ Routes → Controllers → Models   │
└───────────────┬─────────────────┘
                │
                │ Mongoose
                ▼
┌─────────────────────────────────┐
│     MongoDB Community Server    │
│                                 │
│    smart_grocery_inventory      │
└─────────────────────────────────┘
```

### Request Flow

```text
User Interaction
      ↓
React Component
      ↓
Frontend Service
      ↓
Axios HTTP Request
      ↓
Express Route
      ↓
Controller
      ↓
Mongoose Model
      ↓
MongoDB
      ↓
JSON Response
      ↓
React UI Update
```

---

# 📂 Project Folder Structure

```text
Smart-Grocery-Inventory-Manager/
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   │
│   │   │   └── dashboard/
│   │   │       ├── InventoryChart.jsx
│   │   │       └── StatCard.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Alerts/
│   │   │   ├── Analytics/
│   │   │   ├── Dashboard/
│   │   │   ├── GroceryList/
│   │   │   ├── Inventory/
│   │   │   ├── Reports/
│   │   │   ├── Settings/
│   │   │   └── ShoppingList/
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── alertService.js
│   │   │   ├── analyticsService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── exportService.js
│   │   │   ├── groceryService.js
│   │   │   ├── inventoryService.js
│   │   │   ├── notificationService.js
│   │   │   ├── pdfService.js
│   │   │   ├── settingsService.js
│   │   │   └── shoppingService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── analyticsController.js
│   │   ├── dashboardController.js
│   │   ├── exportController.js
│   │   ├── groceryController.js
│   │   ├── notificationController.js
│   │   ├── pdfController.js
│   │   ├── settingsController.js
│   │   └── shoppingController.js
│   │
│   ├── models/
│   │   ├── GroceryItem.js
│   │   ├── Settings.js
│   │   └── ShoppingItem.js
│   │
│   ├── routes/
│   │   ├── analyticsRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── exportRoutes.js
│   │   ├── groceryRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── pdfRoutes.js
│   │   ├── settingsRoutes.js
│   │   └── shoppingRoutes.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── images/
│   ├── 1.png
│   ├── 2.png
│   ├── 3.png
│   ├── 4.png
│   ├── 5.png
│   ├── 6.png
│   ├── 7.png
│   └── 8.png
│
├── .gitignore
└── README.md
```

---

# 🔌 Backend API

The Express backend is organized into separate route modules for each major application feature.

## Grocery API

Handles grocery CRUD operations.

```text
/api/grocery
```

Used for operations including:

- Fetch grocery items
- Create grocery items
- Update grocery items
- Delete grocery items

---

## Dashboard API

```text
/api/dashboard
```

Provides summarized inventory information used by the main dashboard.

---

## Shopping List API

```text
/api/shopping
```

Handles:

- Fetching shopping items
- Adding shopping items
- Updating purchase status
- Deleting shopping items
- Generating shopping-list entries from inventory

---

## Analytics API

```text
/api/analytics
```

Provides processed inventory statistics used by the Analytics dashboard.

---

## Notification API

```text
/api/notifications
```

Provides low-stock and expiry information for the header notification system.

---

## Settings API

```text
/api/settings
```

Handles application and inventory settings.

---

## Export / Reporting API

The backend contains dedicated routes/controllers for:

```text
Export functionality
PDF report generation
```

These are used by the Inventory and Reports modules to generate downloadable reports.

---

# ⚙️ Installation and Local Setup

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- MongoDB Community Server
- MongoDB Compass (recommended)
- VS Code or another code editor

---

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

Then enter the project:

```bash
cd Smart-Grocery-Inventory-Manager
```

---

# 2. Configure MongoDB

Start **MongoDB Community Server** on your computer.

The application uses the following local database by default:

```text
smart_grocery_inventory
```

Connection:

```text
mongodb://127.0.0.1:27017/smart_grocery_inventory
```

You can inspect the database using MongoDB Compass.

Connect Compass using:

```text
mongodb://127.0.0.1:27017
```

After the application creates data, the following database should become visible:

```text
smart_grocery_inventory
```

---

# 3. Backend Setup

Open a terminal from the project root:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory.

You can copy:

```text
server/.env.example
```

and rename the copy to:

```text
.env
```

The local development configuration is:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart_grocery_inventory
```

Start the backend:

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:5000
```

---

# 4. Frontend Setup

Open another terminal from the project root:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:5173
```

---

# 5. Run the Complete Application

You should normally have two terminals open.

### Terminal 1 — Backend

```bash
cd server
npm run dev
```

### Terminal 2 — Frontend

```bash
cd client
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

The real `.env` file should **not be committed to GitHub**.

The repository should contain:

```text
server/.env.example
```

while the developer creates their own:

```text
server/.env
```

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart_grocery_inventory
```

Your `.gitignore` should contain:

```gitignore
.env
.env.*
!.env.example

node_modules/
```

This prevents environment-specific or sensitive configuration from being committed while still providing an example configuration for other developers.

---

# 📸 Application Screenshots

## 1. Dashboard

Centralized inventory overview with statistics, recent inventory, low-stock products, expiring items, and quick actions.

![Dashboard](images/1.png)

---

## 2. Grocery List

Manage grocery products using add, edit, delete, search, quantity, category, and expiry functionality.

![Grocery List](images/2.png)

---

## 3. Inventory Management

Structured inventory table with stock statistics, product status, quantity, unit, and expiry information.

![Inventory](images/3.png)

---

## 4. Shopping List

Manage pending and purchased groceries and automatically generate shopping-list entries from inventory.

![Shopping List](images/4.png)

---

## 5. Alerts Center

Centralized low-stock and expiry monitoring.

![Alerts](images/5.png)

---

## 6. Analytics Dashboard

Visual inventory analysis using status and category charts.

![Analytics](images/6.png)

---

## 7. Settings

Configure application information, inventory thresholds, and notification preferences.

![Settings](images/7.png)

---

## 8. Reports

Generate and download inventory information using Excel and PDF reports.

![Reports](images/8.png)

---

# 🎥 Project Demo

A demonstration video showing the working application is available below:

**Demo Video:**  
<YOUR_DEMO_VIDEO_LINK>

---

# 🧠 Learning Outcomes

Building the Smart Grocery Inventory Manager provided practical experience across the complete MERN development workflow.

## Frontend Development

- React component architecture
- React Hooks
- State management
- Conditional rendering
- React Router navigation
- Responsive UI development
- Tailwind CSS
- Reusable UI components
- Form handling
- Dashboard development

## Backend Development

- Node.js backend development
- Express.js
- REST API design
- Routing
- Controllers
- MVC-style project organization
- Asynchronous operations
- Error handling

## Database Development

- MongoDB Community Server
- MongoDB Compass
- Mongoose schemas and models
- MongoDB documents and collections
- CRUD operations
- Connecting Express with MongoDB

## Full-Stack Development

- Frontend-backend integration
- Axios API requests
- Client-server architecture
- RESTful communication
- Dynamic UI updates from database data
- Environment variable management

## Data Visualization

- Processing inventory statistics
- Pie-chart visualization
- Bar-chart visualization
- Category-based inventory analysis

## Reporting

- Excel data export
- PDF report generation
- Downloadable inventory reports

## Software Engineering

- Modular folder structure
- Reusable components
- Separation of concerns
- Environment configuration
- Git version control
- GitHub project management
- `.gitignore` and `.env.example` usage

---

# 🚀 Future Enhancements

The project can be extended with:

- 🔐 User authentication and authorization
- 👥 Multi-user inventory management
- ☁️ MongoDB Atlas cloud database
- 🌐 Full cloud deployment
- 📱 Mobile-responsive/PWA improvements
- 📷 Barcode and QR-code scanning
- 📧 Email expiry notifications
- 📲 Push notifications
- 🧾 Purchase history
- 💰 Grocery budget tracking
- 📊 Advanced inventory analytics
- 🤖 AI-based demand forecasting
- 🧠 Smart purchase recommendations
- 📉 Consumption pattern prediction
- 🏪 Multiple household/store support

---

# 🔒 Security Notes

Environment variables are stored locally using `.env`.

The actual `.env` file should never be committed to a public GitHub repository.

Only:

```text
.env.example
```

should be committed as a configuration template.

The current project does not implement authentication, so production deployment should include authentication and authorization before supporting multiple users or sensitive information.

---

### Output Video Link:

- https://drive.google.com/file/d/1flStFRYE-WIBmTCb0_uZ6mNPyXu6Nzsg/view?usp=sharing

---

# 👩‍💻 Author

## Jui Ramteke

**GitHub:**  
https://github.com/Jui-Ramteke

**LinkedIn:**  
https://www.linkedin.com/in/jui-ramteke/

**Instagram:**  
https://www.instagram.com/jui_ramteke_/

---

# 🔗 Project Repository

https://github.com/Jui-Ramteke/Smart-Grocery-Inventory-Manager

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

Contributions, suggestions, and feedback are welcome.

---

## 📄 License

This project is intended for educational, portfolio, and learning purposes.

