'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/articles',
      permissions: '*'
    }, {
      resources: '/api/articles/:articleId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/articles',
      permissions: ['get', 'post']
    }, {
      resources: '/api/articles/:articleId',
      permissions: ['get', 'post']
    }, {
      resources: '/api/glassdoor',
      permissions: ['get', 'post']
    }, {
      resources: '/api/articles/apply/:articleId',
      permissions: ['put']
    }, {
      resources: '/api/skills',
      permissions: ['get', 'post', 'put', 'delete']
    }, {
      resources: '/api/skills/:skillId',
      permissions: ['put']
    }, {
      resources: '/api/skill/logo',
      permissions: ['post']
    }, {
    resources: '/api/article/:userId',
    permissions: ['get']
  }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/articles',
      permissions: ['get']
    }, {
      resources: '/api/articles/:articleId',
      permissions: ['get', 'post']
    }, {
      resources: '/api/glassdoor',
      permissions: ['get', 'post']
    }, {
      resources: '/api/articles/apply/:articleId',
      permissions: ['put']
    }, {
      resources: '/api/skills',
      permissions: ['get', 'post', 'put', 'delete']
    }, {
      resources: '/api/skills/:skillId',
      permissions: ['put']
    }, {
      resources: '/api/skill/logo',
      permissions: ['post']
    }, {
    resources: '/api/article/:userId',
    permissions: ['get']
  }]
  }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an article is being processed and the current user created it then allow any manipulation
  if (req.article && req.user && req.article.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
