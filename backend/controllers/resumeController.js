// Resume Controller
const Resume = require('../models/Resume');
const crypto = require('crypto');
const User = require('../models/User');

// Create Resume
exports.createResume = async (req, res, next) => {
  try {
    const { title, template } = req.body;

    const resume = await Resume.create({
      userId: req.userId,
      title: title || 'My Resume',
      template: template || 'modern',
    });

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Resumes
exports.getAllResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Resume
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (resume.userId.toString() !== req.userId && !resume.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resume',
      });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// Update Resume
exports.updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (resume.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resume',
      });
    }

    Object.assign(resume, req.body);
    resume.updatedAt = new Date();
    resume = await resume.save();

    res.json({
      success: true,
      message: 'Resume updated successfully',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Resume
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (resume.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resume',
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Duplicate Resume
exports.duplicateResume = async (req, res, next) => {
  try {
    const originalResume = await Resume.findById(req.params.id);

    if (!originalResume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (originalResume.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to duplicate this resume',
      });
    }

    const resumeData = originalResume.toObject();
    delete resumeData._id;
    delete resumeData.shareToken;
    resumeData.title = `${resumeData.title} (Copy)`;
    resumeData.isDraft = true;
    resumeData.createdAt = new Date();
    resumeData.updatedAt = new Date();

    const newResume = await Resume.create(resumeData);

    res.status(201).json({
      success: true,
      message: 'Resume duplicated successfully',
      resume: newResume,
    });
  } catch (error) {
    next(error);
  }
};

// Generate Share Token
exports.generateShareToken = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

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

    const shareToken = crypto.randomBytes(20).toString('hex');
    resume.shareToken = shareToken;
    resume.isPublic = true;
    await resume.save();

    const shareUrl = `${process.env.FRONTEND_URL}/share/${shareToken}`;

    res.json({
      success: true,
      message: 'Share link generated successfully',
      shareToken,
      shareUrl,
    });
  } catch (error) {
    next(error);
  }
};

// Get Resume by Share Token
exports.getResumeByShareToken = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ shareToken: req.params.token });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    resume.views = (resume.views || 0) + 1;
    await resume.save();

    const user = await User.findById(resume.userId);

    res.json({
      success: true,
      resume,
      user: {
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    next(error);
  }
};
