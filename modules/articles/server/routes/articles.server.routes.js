'use strict';

/**
 * Module dependencies.
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller');

module.exports = function (app) {

  //Skills api
  app.route('/api/skills').all(articlesPolicy.isAllowed)
    .post(articles.create_skill)
    .get(articles.list_skills)
    .put(articles.update_skill)
    .delete(articles.delete_skill);

  //Skill logo
  app.route('/api/skill/logo').all(articlesPolicy.isAllowed)
    .post(articles.skill_logo);


  //Glassdoor route
  app.route('/api/glassdoor').all(articlesPolicy.isAllowed)
    .post(articles.glassdoor);

  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .post(articles.create);

  //Get articles by specific user
  app.route('/api/article/:userId')
    .get(articles.list);

  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete)
    .post(articles.add_skill);

  app.route('/api/articles/apply/:articleId').all(articlesPolicy.isAllowed)
     .put(articles.apply);

  // Finish by binding the article middleware
  app.param('articleId', articles.articleByID);
};
