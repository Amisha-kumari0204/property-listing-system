import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property Listing API',
      version: '1.0.0',
      description: 'API documentation for auth and property routes',
    },
    servers: [
      {
        url: 'https://property-listing-system-1vku.onrender.com/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', format: 'password', example: 'yourPassword123' },
            favorites: {
              type: 'array',
              items: { type: 'string', description: 'Property ObjectId' },
            },
            recommendationsReceived: {
              type: 'array',
              items: { type: 'string', description: 'Property ObjectId' },
            },
          },
        },
        Property: {
          type: 'object',
          required: [
            'id',
            'title',
            'type',
            'price',
            'state',
            'city',
            'areaSqFt',
            'bedrooms',
            'bathrooms',
            'availableFrom',
            'listingType',
          ],
          properties: {
            id: { type: 'string', example: 'PROP123456' },
            title: { type: 'string', example: 'Beautiful Family House' },
            type: { type: 'string', example: 'Apartment' },
            price: { type: 'number', example: 350000 },
            state: { type: 'string', example: 'California' },
            city: { type: 'string', example: 'Los Angeles' },
            areaSqFt: { type: 'number', example: 1800 },
            bedrooms: { type: 'integer', example: 3 },
            bathrooms: { type: 'integer', example: 2 },
            amenities: {
              type: 'array',
              items: { type: 'string' },
              example: ['Pool', 'Garage', 'Gym'],
            },
            furnished: {
              type: 'string',
              enum: ['Furnished', 'Unfurnished', 'Semi-Furnished'],
              example: 'Furnished',
            },
            availableFrom: { type: 'string', format: 'date', example: '2025-06-01' },
            listedBy: { type: 'string', example: 'John Doe' },
            tags: {
              type: 'array',
              items: { type: 'string' },
              example: ['New Listing', 'Pet Friendly'],
            },
            colorTheme: { type: 'string', example: '#ff5733' },
            rating: { type: 'number', minimum: 0, maximum: 5, example: 4.5 },
            isVerified: { type: 'boolean', example: true },
            listingType: {
              type: 'string',
              enum: ['Sale', 'Rent'],
              example: 'Sale',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Adjust paths as needed
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
