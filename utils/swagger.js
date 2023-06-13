const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../package.json');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rest API docs',
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './routes/*.js',
    './models/*.js',
    './controllers/*.js'
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const initSwaggerDocs = (app, port) => {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Json docs
  app.get('docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
};

module.exports = {
  initSwaggerDocs,
};
