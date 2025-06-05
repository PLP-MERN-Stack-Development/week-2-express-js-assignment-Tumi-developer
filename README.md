[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19713086&assignment_repo_type=AssignmentRepo)
# Product API

A RESTful API built with Express.js for managing products.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```
Then edit the `.env` file with your configuration.

4. Start the server:
```bash
npm start
```

The server will start on http://localhost:3000

## 📚 API Documentation

### Authentication
All product endpoints require an API key to be included in the request headers:
```
X-API-Key: your-api-key
```

### Endpoints

#### Products

- `GET /api/products`
  - List all products
  - Query parameters:
    - `category`: Filter by category
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `search`: Search by product name
  - Example: `GET /api/products?category=electronics&page=1&limit=10&search=laptop`

- `GET /api/products/stats`
  - Get product statistics
  - Returns total products, category counts, and stock status

- `GET /api/products/:id`
  - Get a specific product by ID
  - Example: `GET /api/products/123`

- `POST /api/products`
  - Create a new product
  - Required fields:
    ```json
    {
      "name": "string",
      "description": "string",
      "price": number,
      "category": "string",
      "inStock": boolean
    }
    ```

- `PUT /api/products/:id`
  - Update an existing product
  - Same fields as POST
  - Example: `PUT /api/products/123`

- `DELETE /api/products/:id`
  - Delete a product
  - Example: `DELETE /api/products/123`

### Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message",
  "name": "ErrorType"
}
```

## 🧪 Testing

You can test the API using tools like Postman, Insomnia, or curl. Here's an example using curl:

```bash
# Get all products
curl -H "X-API-Key: your-api-key" http://localhost:3000/api/products

# Create a new product
curl -X POST -H "X-API-Key: your-api-key" -H "Content-Type: application/json" \
  -d '{"name":"New Product","description":"Description","price":99.99,"category":"electronics","inStock":true}' \
  http://localhost:3000/api/products
```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 
