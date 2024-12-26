# FLIERLY ERP Application (PERN Stack)

## Overview
This is a comprehensive ERP (Enterprise Resource Planning) application built using the PERN stack (PostgreSQL, Express, React, Node.js). The application is designed to streamline business processes by integrating various functional modules, including user management, inventory management, and procurement workflows.

## Current Status
- **Completed Modules:**
  - IAM (Identity and Access Management):
    - Roles management
    - Privileges management
    - User management
- **In Progress:**
  - Products module
- **Planned Modules:**
  - Accounts
  - Inventory
  - Quotations
  - Purchase Orders
  - Billing and Invoicing
  - Customer Relationship Management (CRM) with ticket handling

## Technology Stack
- **Frontend:** React.js
- **Backend:** Node.js (Express.js framework)
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JSON Web Tokens (JWT)
- **State Management:** Redux or Context API (depending on the complexity of state handling)

## Features
### Completed Features
1. **Identity and Access Management (IAM):**
   - Role-based access control (RBAC) with dynamic privileges.
   - User creation, updating, and assignment of roles.
   - Secure authentication using JWT.

2. **User Management:**
   - Creation, updating, and deletion of users.
   - Validation of user data with strict rules.
   - Real-time feedback on username availability.

### Upcoming Features
1. **Products Module:**
   - Product catalog with categories and subcategories.
   - Unit of Measure (UOM) and conversions.
   - Stock and inventory integration.

2. **Accounts Module:**
   - Customer and vendor management.
   - Invoicing and payment tracking.

3. **Inventory Management:**
   - Stock tracking and adjustments.
   - Reorder level notifications.

4. **Quotations:**
   - Drafting and managing sales quotations.
   - Converting quotations into purchase orders.

5. **Purchase Orders:**
   - Vendor purchase order generation.
   - Tracking and receiving goods.

6. **Billing and Invoicing:**
   - Automated invoice generation.
   - Tax calculations and payment reminders.
   - Integration with payment gateways.

7. **Customer Relationship Management (CRM):**
   - Ticket handling for customer support.
   - Tracking and resolving customer issues.
   - Managing customer interactions and feedback.

## Installation
### Prerequisites
- Node.js (v16.x or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repository/erp-application.git
   cd erp-application
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/erp_db
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. **Run Database Migrations:**
   ```bash
   npm run migrate
   # or
   yarn migrate
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

## Folder Structure
```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   └── utils
├── migrations
└── README.md
```

## Roadmap
1. **Q4 2024:**
   - Complete the Products module.
   - Begin work on Accounts and Inventory modules.
2. **Q1 2025:**
   - Implement Quotations and Purchase Orders.
   - Add Billing and Invoicing features.
   - Start Customer Relationship Management (CRM) module.
   - Conduct extensive testing and optimize performance.
3. **Q2 2025:**
   - Deploy a stable version for production.
   - Add advanced reporting and analytics.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For inquiries, please contact [your-email@example.com].

