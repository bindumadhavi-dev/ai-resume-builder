// Application Constants

const RESUME_TEMPLATES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  MINIMAL: 'minimal',
  CREATIVE: 'creative',
};

const ATS_KEYWORDS = {
  SKILLS: ['Python', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'SQL', 'AWS', 'Docker', 'Git', 'REST API'],
  ACTIONS: ['developed', 'designed', 'implemented', 'created', 'managed', 'led', 'improved', 'optimized', 'launched', 'coordinated'],
};

const RESUME_SECTIONS = [
  'personalInfo',
  'education',
  'experience',
  'skills',
  'projects',
  'certifications',
  'internships',
  'achievements',
  'languages',
];

const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

const ERRORS = {
  VALIDATION_ERROR: 'Validation Error',
  AUTHENTICATION_ERROR: 'Authentication Error',
  AUTHORIZATION_ERROR: 'Authorization Error',
  NOT_FOUND: 'Not Found',
  SERVER_ERROR: 'Server Error',
};

module.exports = {
  RESUME_TEMPLATES,
  ATS_KEYWORDS,
  RESUME_SECTIONS,
  USER_ROLES,
  ERRORS,
};
