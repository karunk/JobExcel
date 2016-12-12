'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  http = require('http'),
  Skill = mongoose.model('Skill');

//SKILL HANDLING
/**
* Add skill to job
*/
exports.add_skill = function (req, res) {
  var article = req.article;
  console.log(article);

  //if already exists remove otherwise add

  var found = false;
  var index = -1;
  for(var i = 0; i < article.skills.length; i++) {
      if (article.skills[i]._id == req.body.skillId) {
          found = true;
          index = i;
          break;
      }
  }
    
  if (found == true) {
      article.skills.splice(index, 1);
  }
  else{
    article.skills.push(req.body.skillId);
  }
  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(article);
  });
};

/**
 * Create a skill
 */
exports.create_skill = function (req, res) {
  var skill = new Skill(req.body);

  skill.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skill);
    }
  });
};
/**
 * List of skills
 */
exports.list_skills = function (req, res) {
  Skill.find().exec(function (err, skills) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skills);
    }
  });
};
/**
 * Update a skill
 */
exports.update_skill = function (req, res) {

  if (!mongoose.Types.ObjectId.isValid(req.body.skillId)) {
    return res.status(400).send({
      message: 'Skill id is invalid'
    });
  }

  Skill.findById(req.body.skillId).exec(function (err, skill) {
    if (err) {
      return next(err);
    } else if (!skill) {
      return res.status(404).send({
        message: 'No skill with that identifier has been found'
      });
    }
    var upd_skill = skill;
    upd_skill.title = req.body.title;
    upd_skill.have = req.body.have;
    upd_skill.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(upd_skill);
      }
    });
  });
};
/**
 * Delete an skill
 */
exports.delete_skill = function (req, res) {

  if (!mongoose.Types.ObjectId.isValid(req.body.skillId)) {
    return res.status(400).send({
      message: 'Skill id is invalid'
    });
  }

  Skill.findById(req.body.skillId).exec(function (err, skill) {
    if (err) {
      return next(err);
    } else if (!skill) {
      return res.status(404).send({
        message: 'No skill with that identifier has been found'
      });
    }
    var rem_skill = skill;
    rem_skill.remove(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(rem_skill);
      }
    });
    
  });
};
/**
* Get skill logo from wikimedia
*/ 
exports.skill_logo = function (req, res) {
  var skill = req.body.title;
  var url = "http://en.wikipedia.org/w/api.php?action=query&titles="+skill+"&prop=pageimages&format=json&pithumbsize=100"
  console.log(url);
  /*http.get(url, function(response){
      var body = '';
      response.on('data', function(chunk){
          body += chunk;
      });
      response.on('end', function(){
          var jsonres = JSON.parse(body);
          //console.log("Got a response: ", fbResponse.picture);
          res.json({
            success: 'true',
            data: jsonres
          });
      });
  }).on('error', function(e){
          res.json({
            success: 'false',
            data: e
          });
  });*/
};





/////////
/**
* Glassdoor API handling
*/
exports.glassdoor = function(req, res) {


  var companyname = 'samsung';
  var location = 'india';

  var url = 'http://api.glassdoor.com/api/api.htm?t.p=100948&t.k=j3KFMERLtnS&userip=0.0.0.0&useragent=&format=json&v=1&action=employers';
  url+='&';
  url+='q=';
  url+=req.body.companyname;
  //url+='l=';
  //url+=location;

  http.get(url, function(response){
      var body = '';
      response.on('data', function(chunk){
          body += chunk;
      });
      response.on('end', function(){
          var jsonres = JSON.parse(body);
          //console.log("Got a response: ", fbResponse.picture);
          res.json({
            success: 'true',
            data: jsonres
          });
      });
  }).on('error', function(e){
          res.json({
            success: 'false',
            data: e
          });
  });


}

/**
 * Create a article
 */
exports.create = function (req, res) {
  var article = new Article(req.body);
  article.user = req.user;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
  var article = req.article;
  console.log(req.article);
  article.jobtitle = req.body.jobtitle;
  article.company = req.body.company;
  article.deadline = req.body.deadline;
  article.notes = req.body.notes;
  article.reff = req.body.reff;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
* Apply for company
*/
exports.apply = function(req, res) {
  var article = req.article;
  article.applied = true;
  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};



/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles by user
 */
exports.list = function (req, res) {
  console.log(req.model);
  Article.find({'user': req.model._id}).sort('-created').populate('skills', 'title').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').populate('skills', 'title').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};
