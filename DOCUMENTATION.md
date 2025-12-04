# Findr - Lost and Found Platform Documentation

## Project Overview

**Findr** is a comprehensive lost and found web application designed to help users report and locate lost or found items within their community. The platform serves as a bridge connecting people who have lost belongings with those who have found items, facilitating the reunion of valuable possessions.

### Mission Statement

To make it easier for people to reunite with their belongings and assist others in finding items they may have lost by fostering a supportive and accessible community platform.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Core Features](#core-features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Key Pages and Functionality](#key-pages-and-functionality)
6. [User Workflows](#user-workflows)
7. [Setup and Installation](#setup-and-installation)
8. [Available Scripts](#available-scripts)
9. [Dependencies](#dependencies)
10. [Architecture](#architecture)
11. [Design and Styling](#design-and-styling)

---

## Core Features

### 1. **Report Lost Items**

Users can report items they have lost by providing:

-   Item name and detailed description
-   Date and location where the item was lost
-   Contact information (WhatsApp number and email)
-   Image upload for visual identification

### 2. **Report Found Items**

Users who have found items can help the community by:

-   Recording details about the found item
-   Uploading photos of the item
-   Providing location and date information
-   Leaving contact details for interested parties

### 3. **Browse Listings**

-   View all reported lost and found items on the platform
-   Search and filter through listings
-   Access detailed information about specific items
-   View contact information to reach out to reporters

### 4. **User Authentication**

-   User registration with secure account creation
-   Login functionality for registered users
-   Account management for tracking reported items

### 5. **Item Details Page**

-   Comprehensive view of individual lost/found items
-   Large image display for clarity
-   Full description and location information
-   Direct contact options via WhatsApp or email

### 6. **Community Support**

-   About page explaining the platform's mission
-   Navbar navigation for easy access to all sections
-   Responsive design for mobile and desktop users

---

## Technology Stack

### Frontend Framework

-   **React 19.2.0** - Modern UI library for building interactive interfaces
-   **React Router 7.9.6** - Client-side routing for seamless navigation

### UI/UX Libraries

-   **React Icons 5.5.0** - Icon library for intuitive visual elements
-   **React Hot Toast 2.6.0** - Toast notifications for user feedback

### Testing & Development

-   **React Scripts 5.0.1** - Build and development tools
-   **@testing-library/react 16.3.0** - Component testing library
-   **@testing-library/jest-dom 6.9.1** - DOM matchers for testing
-   **@testing-library/user-event 13.5.0** - User interaction simulation

### Build & Runtime

-   **Node.js** - JavaScript runtime environment
-   **npm** - Package manager

---

## Project Structure

```
lost-and-found-frontend/
│
├── public/                    # Static public assets
│   ├── index.html            # Main HTML entry point
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # SEO robots file
│
├── src/                       # Source code directory
│   ├── App.js                # Main App component with routing
│   ├── App.test.js           # App component tests
│   ├── index.js              # React entry point
│   ├── utils.js              # Utility functions (API URLs, helpers)
│   ├── reportWebVitals.js    # Performance monitoring
│   ├── setupTests.js         # Test configuration
│   │
│   ├── assets/               # Image and media files
│   │   ├── found.png         # Found items illustration
│   │   └── lost.png          # Lost items illustration
│   │
│   ├── components/           # Reusable React components
│   │   ├── Navbar.jsx        # Navigation bar component
│   │   └── ItemCard.jsx      # Item listing card component
│   │
│   ├── pages/                # Full-page components (routes)
│   │   ├── Home.jsx          # Landing page with hero sections
│   │   ├── Login.jsx         # User login page
│   │   ├── Register.jsx      # User registration page
│   │   ├── ReportItem.jsx    # Form to report lost/found items
│   │   ├── Items.jsx         # Items listing/browsing page
│   │   ├── Item.jsx          # Individual item detail page
│   │   └── About.jsx         # About/Information page
│   │
│   └── styles/               # CSS stylesheets
│       ├── App.css           # Main app styles
│       ├── index.css         # Global styles
│       ├── item.css          # Item detail page styles
│       ├── Login.css         # Authentication page styles
│       └── nav.css           # Navigation bar styles
│
├── package.json              # Project dependencies and scripts
├── README.md                 # Original project readme
└── DOCUMENTATION.md          # This file
```

---

## Key Pages and Functionality

### 1. **Home Page (`/`)**

**File:** `src/pages/Home.jsx`

The landing page features:

-   Hero section with two main call-to-action buttons
-   "Lost Something?" section directing users to report lost items
-   "Found Something?" section for reporting found items
-   Visual illustrations to guide user actions
-   Latest items preview from the database
-   Responsive design with mobile optimization

### 2. **Report Item Page (`/report/lost` or `/report/found`)**

**File:** `src/pages/ReportItem.jsx`

Allows users to:

-   Fill out a comprehensive form with item details
-   Upload images with size validation (max 5MB)
-   Enter contact information (WhatsApp, email)
-   Specify location and date
-   Add detailed descriptions
-   Submit reports to the backend API
-   Receive success/error notifications

### 3. **Items Listing Page (`/items`)**

**File:** `src/pages/Items.jsx`

Features:

-   Display all reported items (both lost and found)
-   Item cards with thumbnail images
-   Quick preview of item information
-   Navigation to individual item details
-   Filtering and search capabilities

### 4. **Item Detail Page (`/item/:id`)**

**File:** `src/pages/Item.jsx`

Provides:

-   Full item information and large image display
-   Complete description and metadata
-   Location and date information
-   Contact details (WhatsApp, email, phone)
-   Quick action buttons to contact the reporter
-   Related items suggestions

### 5. **Authentication Pages**

**Files:** `src/pages/Login.jsx`, `src/pages/Register.jsx`

Include:

-   **Login Page** - User credentials verification
-   **Register Page** - New user account creation
-   Form validation
-   Secure authentication flow
-   Session management

### 6. **About Page (`/about`)**

**File:** `src/pages/About.jsx`

Contains:

-   Platform mission statement
-   Service description
-   Community values
-   Call-to-action to join the platform

### 7. **Navigation Bar**

**File:** `src/components/Navbar.jsx`

Features:

-   Logo and branding
-   Navigation links to all main pages
-   User authentication status display
-   Mobile-responsive menu
-   Quick access to report item buttons

---

## User Workflows

### Workflow 1: Reporting a Lost Item

1. User lands on the home page
2. Clicks "I Lost an Item" button
3. Fills out the lost item report form with:
    - Item name and description
    - Date and location of loss
    - Contact information
    - Item photo
4. Submits the form
5. Item appears in the public listings
6. Other users can contact them if they find the item

### Workflow 2: Reporting a Found Item

1. User navigates to the home page
2. Clicks "I Found an Item" button
3. Completes the found item form with details and photo
4. Submits the report
5. Item becomes visible to others searching for lost items
6. Potential owners can reach out through provided contact

### Workflow 3: Browsing and Finding Items

1. User visits the "Items" page or searches
2. Browses through reported items
3. Identifies a potentially matching item
4. Clicks on the item to view full details
5. Contacts the reporter via WhatsApp or email
6. Coordinates item return

---

## Setup and Installation

### Prerequisites

-   **Node.js** (v14 or higher)
-   **npm** (v6 or higher)
-   **Git** (for version control)

### Installation Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/murtazajoo/lost-and-found-frontend.git
    cd lost-and-found-frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**
   Create a `.env` file in the project root:

    ```
    REACT_APP_BACKEND_URL=your_backend_api_url
    REACT_APP_UPLOAD_PRESET=your_cloudinary_upload_preset
    ```

4. **Start Development Server**
    ```bash
    npm start
    ```
    The app will open at `http://localhost:3000`

---

## Available Scripts

### Development

```bash
npm start
```

-   Runs the app in development mode
-   Opens [http://localhost:3000](http://localhost:3000) in your browser
-   The page reloads automatically when you make changes
-   Displays lint errors in the console

### Testing

```bash
npm test
```

-   Launches the test runner in interactive watch mode
-   Runs all test files matching `*.test.js` pattern
-   Uses Jest as the test framework

### Production Build

```bash
npm run build
```

-   Builds the app for production in the `build/` folder
-   Optimizes and minifies the code
-   Generates hashed filenames for cache busting
-   Ready for deployment

### Eject Configuration

```bash
npm run eject
```

⚠️ **Warning:** One-way operation. Once executed, you cannot revert it.

-   Exposes all configuration files and dependencies
-   Gives full control over webpack, Babel, and ESLint configuration
-   Only use this if you need advanced customization

---

## Dependencies

### Production Dependencies

| Package         | Version | Purpose                              |
| --------------- | ------- | ------------------------------------ |
| react           | ^19.2.0 | UI library for building components   |
| react-dom       | ^19.2.0 | React rendering for web browsers     |
| react-router    | ^7.9.6  | Client-side routing and navigation   |
| react-icons     | ^5.5.0  | Icon library with multiple icon sets |
| react-hot-toast | ^2.6.0  | Toast notifications system           |
| react-scripts   | 5.0.1   | Build and development tools          |
| web-vitals      | ^2.1.4  | Performance monitoring metrics       |

### Development/Testing Dependencies

| Package                     | Version | Purpose                           |
| --------------------------- | ------- | --------------------------------- |
| @testing-library/react      | ^16.3.0 | React component testing utilities |
| @testing-library/jest-dom   | ^6.9.1  | DOM matchers for Jest             |
| @testing-library/user-event | ^13.5.0 | User interaction simulation       |
| @testing-library/dom        | ^10.4.1 | DOM testing utilities             |

---

## Architecture

### Component Hierarchy

```
App.js (Main Router)
├── Navbar
└── Routes
    ├── Home
    │   └── Items (Component)
    ├── Login
    ├── Register
    ├── ReportItem (for both lost and found)
    ├── Items
    │   └── ItemCard (repeated)
    ├── Item
    └── About
```

### Data Flow

1. **Frontend** - React components manage UI state
2. **API Communication** - Components fetch data from backend via fetch API
3. **Image Upload** - Images are uploaded to Cloudinary for storage
4. **Backend** - Node.js/Express server manages database operations
5. **Database** - Stores user accounts, items, and metadata

### Key APIs Used

-   **Backend URL** - Configured via `REACT_APP_BACKEND_URL` environment variable
-   **Cloudinary** - Image storage and hosting service
-   **WhatsApp/Email** - Contact channels for users

---

## Design and Styling

### Styling Approach

-   **CSS Modules** - Scoped styling for components
-   **Global Styles** - `index.css` for application-wide styling
-   **Responsive Design** - Mobile-first approach with media queries

### CSS Files Overview

| File        | Purpose                                |
| ----------- | -------------------------------------- |
| `App.css`   | Main application layout and components |
| `index.css` | Global typography and base styles      |
| `item.css`  | Item detail page and card styling      |
| `Login.css` | Authentication pages styling           |
| `nav.css`   | Navigation bar and menu styling        |

### Design Features

-   Clean and intuitive user interface
-   Mobile-responsive layouts
-   Accessible color schemes
-   Clear visual hierarchy
-   Icon integration for better UX
-   Toast notifications for user feedback

---

## Key Utilities and Helpers

### `src/utils.js`

Contains utility functions and constants:

-   Backend API URL configuration
-   Helper functions for data processing
-   API endpoint definitions

### Image Handling

-   Supports upload to Cloudinary
-   Size validation (max 5MB)
-   Automatic image optimization
-   Fallback images for missing items

---

## Version Information

-   **Project Version:** 0.1.0
-   **React Version:** 19.2.0
-   **React Router Version:** 7.9.6
-   **Node Support:** Latest LTS versions

---

## Browser Compatibility

### Supported Browsers (Production Build)

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)

### Development Browser Support

-   Last 1 Chrome version
-   Last 1 Firefox version
-   Last 1 Safari version

---

## Future Enhancements

Potential features for future development:

-   Advanced search and filtering options
-   Map-based location display
-   User profiles and history
-   Item matching algorithm
-   Notification system
-   Social sharing capabilities
-   Multi-language support
-   Payment integration for rewards/tips
-   Mobile app version

---

## Security Considerations

-   Secure authentication implementation
-   Image upload validation
-   Contact information privacy
-   User data protection
-   API rate limiting (recommended for backend)
-   CORS configuration

---

## Deployment

### Recommended Deployment Platforms

-   **Vercel** - Optimized for React apps
-   **Netlify** - Easy CI/CD integration
-   **AWS S3 + CloudFront** - Scalable solution
-   **GitHub Pages** - Free option for static sites

### Build Before Deployment

```bash
npm run build
```

The `build/` folder contains production-ready files ready for deployment.

---

## Support and Resources

-   **GitHub Repository:** https://github.com/murtazajoo/lost-and-found-frontend
-   **React Documentation:** https://react.dev
-   **React Router Documentation:** https://reactrouter.com
-   **Create React App Docs:** https://create-react-app.dev

---

## License

This project is part of the lost-and-found initiative. Refer to the repository for licensing information.

---

## Contact and Contributions

For questions, bug reports, or feature requests, please create an issue in the GitHub repository or contact the development team.

---

**Last Updated:** December 4, 2025
**Documentation Version:** 1.0
