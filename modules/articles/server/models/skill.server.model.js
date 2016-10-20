'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var SkillSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Skill Title cannot be blank'
  },
  jobs: [{
    type: Schema.ObjectId,
    ref: 'Article'
  }]
});

mongoose.model('Skill', SkillSchema);
