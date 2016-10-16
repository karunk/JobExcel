'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
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
  }
});

mongoose.model('Article', ArticleSchema);
