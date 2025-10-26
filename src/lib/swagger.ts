export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Talento Local API',
    version: '1.0.0',
    description: 'API REST para gestión de perfiles, habilidades y talento local',
    contact: {
      name: 'Equipo de Desarrollo',
      email: 'cagomezb@unimagdalena.edu.co',
    },
  },
  servers: [
    {
      url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      description: 'API Server',
    },
  ],
  tags: [
    { name: 'Profiles', description: 'Gestión de perfiles de ciudadanos' },
    { name: 'Skills', description: 'Gestión de habilidades' },
    { name: 'Users', description: 'Gestión de usuarios' },
  ],
  paths: {
    '/api/profiles/{userId}': {
      get: {
        tags: ['Profiles'],
        summary: 'Obtener perfil completo de un ciudadano',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Perfil encontrado' },
          404: { description: 'Perfil no encontrado' },
        },
      },
    },
    '/api/profiles/search': {
      get: {
        tags: ['Profiles'],
        summary: 'Buscar perfiles de ciudadanos por habilidad, ciudad, etc.',
        parameters: [
          {
            name: 'skill',
            in: 'query',
            schema: { type: 'string' },
          },
          {
            name: 'city',
            in: 'query',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Lista de perfiles' },
        },
      },
    },
    '/api/skills': {
      get: {
        tags: ['Skills'],
        summary: 'Obtener todas las habilidades disponibles',
        responses: {
          200: {
            description: 'Lista de habilidades',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Skill' },
                },
              },
            },
          },
        },
      },
    },
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'Obtener todos los usuarios',
        responses: {
          200: {
            description: 'Lista de usuarios',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
      },
    },
  },
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
          category: { type: 'string', enum: ['TECHNICAL', 'SOFT', 'LANGUAGE', 'BUSINESS'] },
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
};
