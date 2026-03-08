# Family Finance App - Functional Requirements

## 1. Product Overview

A mobile/web application designed for household financial management.  
The app allows users to record income and expenses, manage accounts and assets, set budgets, and analyze financial data through reports.

Primary users:
- Individuals
- Families managing shared finances

Core goal:
- Help users understand income, spending, and financial health.

---

# 2. MVP Feature List

## 2.1 Transaction Management (Core Feature)

### Add Transaction
Users can create financial records.

Fields:
- amount
- type (expense | income | transfer)
- category
- account
- date
- merchant (optional)
- tags (optional)
- note (optional)

### Edit Transaction
- modify existing transaction

### Delete Transaction
- remove transaction

### Transaction List
- view transaction history
- default sorted by date

### Transaction Search
Filters:
- date range
- category
- account
- transaction type

---

## 2.2 Category Management

### Default Categories
Expense examples:
- Food
- Transport
- Shopping
- Entertainment
- Housing
- Medical

Income examples:
- Salary
- Bonus
- Investment
- Gift

### Custom Categories
Users can:
- create categories
- edit categories
- delete categories

### Category Hierarchy
Support optional:
- parent category
- subcategory

---

## 2.3 Account Management

### Account Types
Supported account types:

- Cash
- Bank Account
- Credit Card
- Digital Wallet
- Other

### Account Features

Users can:
- create account
- edit account
- delete account
- view balance

### Account Transfer

Allow transfers between accounts.

Transfer fields:
- from_account
- to_account
- amount
- date
- note

---

## 2.4 Budget Management

### Monthly Budget

Users can:
- set total monthly budget
- track spending progress

### Category Budget

Users can:
- set budget per category
- monitor category spending

### Budget Alerts

System should notify user when:
- budget usage exceeds threshold (e.g. 80%)
- budget exceeded

---

## 2.5 Reports and Analytics

Provide visual financial insights.

### Expense Breakdown

Display spending by category.

Suggested charts:
- pie chart
- bar chart

### Time-Based Analysis

Reports by:
- day
- week
- month
- year

### Income vs Expense

Display:
- total income
- total expenses
- net balance

---

# 3. Account Book (Ledger) Management

Users can create multiple ledgers.

Examples:
- Personal Ledger
- Family Ledger
- Travel Ledger
- Project Ledger

### Ledger Features

Users can:
- create ledger
- switch ledger
- edit ledger
- delete ledger

Transactions belong to a specific ledger.

---

# 4. Data Management

### Data Export

Supported formats:
- CSV
- Excel

### Data Backup

Options:
- local backup
- cloud sync

### Data Import

Users can import transactions from:
- CSV
- Excel

---

# 5. Optional Advanced Features

## 5.1 Smart Accounting

Possible features:

- automatic bank transaction import
- payment platform integration
- AI category prediction

---

## 5.2 Quick Entry

Support fast recording methods:

- voice input
- receipt photo recognition
- frequently used templates

---

## 5.3 Notifications

Possible reminders:

- budget alerts
- unusual spending alerts
- recurring bill reminders

---

# 6. User System

### Authentication

Support:

- email login
- social login
- password reset

### Security

Features:

- encrypted storage
- biometric unlock (fingerprint / face id)
- privacy protection

---

# 7. Multi-user Collaboration (Family Mode)

Allow multiple users to share a ledger.

Capabilities:

- invite family members
- assign permissions
- view shared transactions
- collaborative accounting

---

# 8. Suggested Database Entities

Core entities:

User  
Ledger  
Account  
Transaction  
Category  
Budget  
Tag  

Relationships:

User -> Ledger  
Ledger -> Account  
Ledger -> Transaction  
Transaction -> Category  
Transaction -> Account  
Category -> Budget

---

# 9. Non-functional Requirements

Performance:
- transaction creation < 200ms

Security:
- encrypted user data

Scalability:
- support multiple ledgers per user

Availability:
- offline recording supported
- sync when network available

---

# 10. Future Expansion

Possible extensions:

- investment tracking
- AI financial analysis
- savings goals
- subscription management
- financial health scoring