import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Talento Local API',
      version: '1.0.0',
      description: 'API REST para gestión de perfiles, habilidades y talento local',
      contact: {
        name: 'Equipo de Desarrollo',
        email: 'admin@talentolocal.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desarrollo',
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
          properties: {
            id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            role: { type: 'string', enum: ['CITIZEN', 'COMPANY', 'INSTITUTION'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CitizenProfile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_SAY'] },
            city: { type: 'string' },
            department: { type: 'string' },
            zoneType: { type: 'string', enum: ['URBAN', 'RURAL'] },
            bio: { type: 'string' },
            jobStatus: { type: 'string', enum: ['EMPLOYED', 'SEEKING', 'OPEN_TO_OFFERS', 'NOT_SEEKING'] },
          },
        },
        Skill: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            category: { type: 'string', enum: ['TECHNICAL', 'SOFT_SKILLS', 'LANGUAGE', 'TOOLS', 'INDUSTRY'] },
            description: { type: 'string' },
          },
        },
        Education: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            level: { type: 'string', enum: ['PRIMARY', 'SECONDARY', 'TECHNICAL', 'UNIVERSITY', 'POSTGRADUATE', 'DOCTORATE'] },
            institution: { type: 'string' },
            fieldOfStudy: { type: 'string' },
            degree: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            current: { type: 'boolean' },
          },
        },
        Experience: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company: { type: 'string' },
            position: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            current: { type: 'boolean' },
            description: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/app/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
