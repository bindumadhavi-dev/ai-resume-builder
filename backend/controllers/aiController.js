// AI Controller
const Resume = require('../models/Resume');
const { ATS_KEYWORDS } = require('../config/constants');

// Generate Career Objective
exports.generateCareerObjective = async (req, res, next) => {
  try {
    const { resumeId, skills, field, experience } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (resume.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const skillsList = skills?.join(', ') || 'various technical skills';
    const careerObjective = `Dedicated ${field || 'professional'} with ${experience || 'extensive'} experience in ${skillsList}. Seeking to leverage expertise and skills to drive innovation and deliver exceptional results in a challenging role.`;

    res.json({
      success: true,
      message: 'Career objective generated successfully',
      careerObjective,
    });
  } catch (error) {
    next(error);
  }
};

// Get Skill Suggestions
exports.getSkillSuggestions = async (req, res, next) => {
  try {
    const { field } = req.body;

    const skillDatabase = {
      'Web Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'REST API', 'Git'],
      'Data Science': ['Python', 'Machine Learning', 'SQL', 'Data Analysis', 'TensorFlow', 'Pandas', 'Visualization'],
      'DevOps': ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Linux', 'CI/CD', 'Terraform'],
      'Mobile Development': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'REST API'],
      'Cloud Computing': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Linux'],
    };

    const suggestedSkills = skillDatabase[field] || ATS_KEYWORDS.SKILLS;

    res.json({
      success: true,
      message: 'Skill suggestions retrieved',
      suggestedSkills,
    });
  } catch (error) {
    next(error);
  }
};

// Improve Project Description
exports.improveProjectDescription = async (req, res, next) => {
  try {
    const { description, technologies } = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'Project description is required',
      });
    }

    const improvedDescription = `${description} Implemented using ${technologies?.join(', ') || 'modern technologies'}. Achieved significant improvements in performance, user experience, and code maintainability.`;

    const suggestions = [
      'Add specific metrics (e.g., 30% performance improvement)',
      'Include technologies used',
      'Quantify impact on business or users',
      'Use action verbs (Developed, Implemented, Designed)',
    ];

    res.json({
      success: true,
      message: 'Project description improved',
      improvedDescription,
      suggestions,
    });
  } catch (error) {
    next(error);
  }
};

// Check ATS Compatibility
exports.checkAtsCompatibility = async (req, res, next) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (resume.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    let score = 0;
    const issues = [];
    const suggestions = [];

    if (resume.template && resume.template !== 'minimal') {
      score += 20;
    } else {
      issues.push('Use simple, ATS-friendly template');
    }

    if (resume.personalInfo?.fullName) score += 15;
    else issues.push('Add full name');

    if (resume.personalInfo?.email) score += 15;
    else issues.push('Add email address');

    if (resume.personalInfo?.phone) score += 10;
    else issues.push('Add phone number');

    if (resume.education && resume.education.length > 0) score += 15;
    else suggestions.push('Add education details');

    if (resume.skills && (resume.skills.technical?.length > 0 || resume.skills.soft?.length > 0)) {
      score += 10;
    } else {
      issues.push('Add relevant skills');
    }

    resume.atsScore = {
      score: Math.min(score, 100),
      lastChecked: new Date(),
      issues,
      suggestions,
    };
    await resume.save();

    res.json({
      success: true,
      message: 'ATS compatibility check completed',
      atsScore: resume.atsScore,
    });
  } catch (error) {
    next(error);
  }
};
