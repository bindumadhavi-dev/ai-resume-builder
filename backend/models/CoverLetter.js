// Cover Letter Model
const mongoose = require('mongoose');

const coverLetterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a cover letter title'],
      trim: true,
      maxlength: 100,
    },
    template: {
      type: String,
      enum: ['professional', 'creative', 'modern', 'traditional'],
      default: 'professional',
    },
    recipientName: String,
    recipientTitle: String,
    companyName: String,
    companyAddress: String,
    jobPosition: String,
    jobLink: String,
    openingParagraph: String,
    bodyParagraph1: String,
    bodyParagraph2: String,
    closingParagraph: String,
    signature: String,
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    generatedAt: Date,
    isDraft: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CoverLetter', coverLetterSchema);
