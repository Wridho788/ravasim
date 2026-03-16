# RavaSIM

**Modern eSIM Management Platform built with Next.js**

RavaSIM is a frontend-first SaaS dashboard designed to simulate a modern eSIM marketplace and management platform. The project demonstrates how a scalable frontend architecture can power a digital connectivity product, including package browsing, checkout flow, device management, and usage tracking.

This project is part of the **Ravatech product lab**, built as a portfolio-grade application showcasing production-ready frontend patterns.

---

# Overview

RavaSIM replicates the core experience of an eSIM platform where users can:

* browse available eSIM packages
* purchase data plans
* manage installed eSIM profiles
* register compatible devices
* track usage and transactions

The system is designed with a **fully frontend architecture**, where all business logic, state management, and mock services are implemented on the client side. The application is structured so that real APIs can be integrated later without major refactoring.

---

# Key Features

### Authentication

* User login and registration
* Session persistence
* Protected routes

### eSIM Marketplace

* Browse available eSIM packages
* Package detail view
* Search and catalog interface

### Checkout & Transactions

* Checkout flow
* Payment method simulation
* Transaction history

### My eSIM Management

* Installed eSIM list
* Activation simulation
* QR activation modal
* Data usage tracking

### Device Management

* Register new devices
* eSIM compatibility check
* Device overview

### Dashboard

* SaaS dashboard layout
* Account overview
* Data usage indicators

---

# Tech Stack

Frontend Framework

* Next.js (App Router)

UI Framework

* Mantine UI

State Management

* Zustand

Data Fetching

* React Query (TanStack Query)

Validation

* Yup

Storage

* LocalStorage (session persistence)

Architecture

* Feature-based modular structure
* Service layer abstraction
* Mock API simulation

---

# Project Structure

```text
app
 ├ dashboard
 ├ packages
 ├ checkout
 ├ devices
 ├ transactions
 └ my-packages

components
 ├ layout
 └ auth

modules
 ├ auth
 ├ packages
 ├ orders
 ├ esim
 └ devices

store
```

The architecture follows a **feature-based modular approach** to ensure scalability and maintainability.

---

# Design Goals

This project focuses on building a **production-like frontend architecture** rather than a simple UI prototype.

Key goals:

* demonstrate scalable frontend structure
* simulate real SaaS product workflows
* showcase modern React ecosystem practices
* enable easy backend API integration

---

# Use Cases

RavaSIM can serve as:

* a **portfolio project for frontend engineers**
* a **reference architecture for SaaS dashboards**
* a **UI prototype for eSIM platforms**
* a **base template for connectivity services**

---

# Future Improvements

Possible next features:

* usage analytics dashboard
* device compatibility database
* real payment gateway integration
* real telecom API integration
* PWA support
* notification system

---

# Author

Developed as part of the **Ravatech product ecosystem**.

---