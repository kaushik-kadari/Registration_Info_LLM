# Registration Info Frontend

## Overview

This is the frontend application for the Registration Info system, built using Vite and React. It connects to a Flask-based backend server using Axios to retrieve registration information through a query interface.

## Features

- User-friendly interface for querying registration information.
- Real-time response display.
- Built with modern web technologies: Vite and React.
- Axios for seamless HTTP requests to the backend.

## Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kaushik0126/Registration_Info_LLM.git
   cd Registration_Info_LLM
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

### Running the Application

1. **Start the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Using yarn:
   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

### Building for Production

1. **Build the project:**

   Using npm:
   ```bash
   npm run build
   ```

   Using yarn:
   ```bash
   yarn build
   ```

   The production-ready files will be generated in the `dist` directory.

## Usage

### Connecting to the Backend

The application uses Axios to send requests to the backend server. Ensure the backend server is running and accessible. By default, the backend server URL is configured in the Axios instance.

To change the backend server URL, update the base URL in the Axios instance configuration:

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Update this to your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
```

### Querying Registration Information

1. Enter your query in the input field.
2. Click the "Submit" button to send the query to the backend.
3. The response will be displayed on the screen.

## Live Demo

You can view a live demo of the application [here](https://reginfollm.netlify.app).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Acknowledgements

This project was created using Vite and React, with Axios for HTTP requests. Special thanks to the open-source community for their contributions and support.
