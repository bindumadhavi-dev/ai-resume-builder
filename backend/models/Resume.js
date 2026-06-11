// Resume Model
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a resume title'],
      trim: true,
      maxlength: 100,
    },
    template: {
      type: String,
      enum: ['modern', 'classic', 'minimal', 'creative'],
      default: 'modern',
    },
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedIn: String,
      github: String,
      portfolio: String,
      profilePhoto: String,
    },
    careerObjective: {
      text: String,
      aiGenerated: { type: Boolean, default: false },
      generatedAt: Date,
    },
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
        gpa: String,
        description: String,
        current: Boolean,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        current: Boolean,
        description: String,
        achievements: [String],
      },
    ],
    internships: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
        skills: [String],
      },
    ],
    skills: {
      technical: [String],
      soft: [String],
      languages: [String],
    },
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        link: String,
        githubLink: String,
        startDate: Date,
        endDate: Date,
        highlights: [String],
        aiImproved: { type: Boolean, default: false },
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: Date,
        expiryDate: Date,
        credentialID: String,
        credentialURL: String,
      },
    ],
    achievements: [
      {
        title: String,
        description: String,
        date: Date,
      },
    ],
    keywords: [String],
    atsScore: {
      score: { type: Number, default: 0 },
      lastChecked: Date,
      issues: [String],
      suggestions: [String],
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    shareToken: {
      type: String,
      unique: true,
      sparse: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
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

// Calculate completion percentage
resumeSchema.methods.calculateCompletion = function () {
  const sections = {
    personalInfo: this.personalInfo && this.personalInfo.fullName ? 15 : 0,
    careerObjective: this.careerObjective && this.careerObjective.text ? 10 : 0,
    education: this.education && this.education.length > 0 ? 15 : 0,
    experience: this.experience && this.experience.length > 0 ? 20 : 0,
    skills: this.skills && (this.skills.technical?.length > 0 || this.skills.soft?.length > 0) ? 15 : 0,
    projects: this.projects && this.projects.length > 0 ? 15 : 0,
    certifications: this.certifications && this.certifications.length > 0 ? 5 : 0,
    achievements: this.achievements && this.achievements.length > 0 ? 5 : 0,
  };

  this.completionPercentage = Object.values(sections).reduce((a, b) => a + b, 0);
  return this.completionPercentage;
};

// Pre-save hook to calculate completion
resumeSchema.pre('save', function (next) {
  this.calculateCompletion();
  next();
});

module.exports = mongoose.model('Resume', resumeSchema);
