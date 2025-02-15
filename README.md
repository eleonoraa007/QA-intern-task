# QA-intern-task
## E-Commerce Test
This repository contains automated tests for an e-commerce platform using Cypress, covering both API and E2E test layers.

## Test Scenarios

### Login Tests

**Positive Case**
  - Successful login with valid credentials

**Negative Cases**
  - Invalid email format
  - Invalid password format
  - Non-existent email



### Register Tests

**Positive Case**
  - Successful user registration with valid data

**Negative Case**
  - Invalid email format
  - Already registered email



### API Tests
- GET all products
- GET products filtered by category
- GET products filtered by search
- Add product into cart (POST)
- Removes all the products from the cart


### E2E Tests

**Complete shopping flow**
  - Login (user logs in)
  - Search 
  - Filter(category) 
  - Add to cart

### Shopping Flow with Checkout
- Adds product into cart
- Handles checkout



### Setup and Installation

1. Install dependencies:
  *npm install*

2. Install Cypress:
  *npx cypress install*

### Running Tests

1. Open Cypress Test Runner:
  *npx cypress open*



  







