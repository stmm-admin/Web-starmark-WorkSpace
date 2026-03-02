import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'images.unsplash.com',
            'res.cloudinary.com',
            'localhost:1337',
            '127.0.0.1:1337',
            '*',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'images.unsplash.com',
            'res.cloudinary.com',
            'localhost:1337',
            '127.0.0.1:1337',
            '*',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
