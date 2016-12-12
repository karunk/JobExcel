'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema - article used inplace of job-listing
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  jobtitle: {
    type: String,
    default: '',
    trim: true,
    required: 'Job Title cannot be blank'
  },
  company: {
    type: String,
    default: '',
    trim: true,
    required: 'Company name cannot be blank'
  },
  deadline: {
    type: Date
  },
  notes: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  skills: [{
    type: Schema.ObjectId,
    ref: 'Skill'
  }],
  reff: {
    type: String,
    default: 'Add information about your refferal sources at this company, if you have any.'
  },
  applied: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Article', ArticleSchema);
