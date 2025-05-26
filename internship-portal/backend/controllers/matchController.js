import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";
import { JobRequirements } from "../models/jobRequirementsSchema.js";
import { StudentProfile } from "../models/studentProfileSchema.js";

// Helper function to calculate degree level score
const getDegreeLevel = (degree) => {
  const levels = {
    "High School": 1,
    "Certificate": 2,
    "Diploma": 3,
    "Bachelor's": 4,
    "Master's": 5,
    "PhD": 6,
    "Other": 1
  };
  return levels[degree] || 1;
};

// Helper function to calculate skill match score
const calculateSkillMatchScore = (studentSkills, requiredSkills) => {
  if (!requiredSkills.length) return 100;
  
  const studentSkillsLower = studentSkills.map(skill => skill.toLowerCase());
  const requiredSkillsLower = requiredSkills.map(skill => skill.toLowerCase());
  
  let matchCount = 0;
  for (const skill of requiredSkillsLower) {
    if (studentSkillsLower.includes(skill)) {
      matchCount++;
    }
  }
  
  return (matchCount / requiredSkillsLower.length) * 100;
};

// Helper function to calculate CGPA match score
const calculateCGPAMatchScore = (studentCGPA, minimumCGPA) => {
  if (studentCGPA < minimumCGPA) return 0;
  
  // Calculate score based on how much the student exceeds the minimum
  const maxPossibleCGPA = 10;
  const exceededBy = studentCGPA - minimumCGPA;
  const maxExceedPossible = maxPossibleCGPA - minimumCGPA;
  
  // Base score of 70 for meeting the minimum + up to 30 for exceeding
  const baseScore = 70;
  const bonusScore = (exceededBy / maxExceedPossible) * 30;
  
  return Math.min(baseScore + bonusScore, 100);
};

// Helper function to calculate education match score
const calculateEducationMatchScore = (studentEducation, jobEducationReq) => {
  // Check if student's degree meets or exceeds the minimum requirement
  const studentDegreeLevel = getDegreeLevel(studentEducation.degree);
  const requiredDegreeLevel = getDegreeLevel(jobEducationReq.minDegree);
  
  if (studentDegreeLevel < requiredDegreeLevel) {
    return 0;
  }
  
  // Base score of 70 for meeting the minimum degree requirement
  let score = 70;
  
  // Add bonus points for exceeding the minimum degree requirement (up to 15 points)
  const levelDifference = studentDegreeLevel - requiredDegreeLevel;
  score += Math.min(levelDifference * 5, 15);
  
  // Add bonus points if field of study matches preferred fields (up to 15 points)
  const preferredFieldsLower = jobEducationReq.preferredFields.map(field => field.toLowerCase());
  if (preferredFieldsLower.includes(studentEducation.field.toLowerCase())) {
    score += 15;
  }
  
  return score;
};

function compareWords(str1, str2) {
    if (!str1 || !str2) return false;
    const words1 = str1.trim().toLowerCase().split(/\s+/);
    const words2 = str2.trim().toLowerCase().split(/\s+/);
    if (words1.length !== words2.length) return false;
    for (let i = 0; i < words1.length; i++) {
        if (words1[i] !== words2[i]) return false;
    }
    return true;
}

function calculateMatchScore(student, job) {
    // CGPA
    let cgpaScore = 0;
    if (job.requiredCGPA) {
        cgpaScore = student.cgpa >= job.requiredCGPA ? 100 : (student.cgpa / job.requiredCGPA) * 100;
    } else {
        cgpaScore = 100;
    }

    // Skills (word-for-word, case-insensitive, 0% if no required skills)
    let skillsScore = 0;
    if (job.requiredSkills && job.requiredSkills.length > 0) {
        let matched = 0;
        job.requiredSkills.forEach(reqSkill => {
            if (student.skills.some(s => compareWords(s, reqSkill))) {
                matched += 1;
            }
        });
        skillsScore = (matched / job.requiredSkills.length) * 100;
    } else {
        skillsScore = 0;
    }

    // Degree (word-for-word)
    let educationScore = 0;
    if (job.requiredDegree) {
        educationScore = compareWords(student.degree, job.requiredDegree) ? 100 : 0;
    } else {
        educationScore = 100;
    }

    // Field of Study (word-for-word)
    let fieldScore = 0;
    if (job.requiredField) {
        fieldScore = compareWords(student.field, job.requiredField) ? 100 : 0;
    } else {
        fieldScore = 100;
    }

    // Weighted sum (adjust weights as needed)
    const overallScore = (cgpaScore * 0.3) + (skillsScore * 0.3) + (educationScore * 0.2) + (fieldScore * 0.2);

    return {
        cgpaScore: Math.round(cgpaScore),
        skillsScore: Math.round(skillsScore),
        educationScore: Math.round(educationScore),
        fieldScore: Math.round(fieldScore),
        overallScore: Math.round(overallScore)
    };
}

// Controller to get matched jobs for a student
export const getMatchedJobs = catchAsyncErrors(async (req, res, next) => {
  const { role, _id } = req.user;
  
  if (role !== "Job Seeker") {
    return next(
      new ErrorHandler("Only Job Seekers can access matched jobs.", 400)
    );
  }
  
  // Get student profile
  const studentProfile = await StudentProfile.findOne({ user: _id });
  if (!studentProfile) {
    return next(
      new ErrorHandler("Please complete your student profile first.", 400)
    );
  }
  
  // Get all active jobs
  const jobs = await Job.find({ expired: false });
  
  // Array to store matched jobs with scores
  const matchedJobs = [];
  
  // For each job, calculate match score if requirements exist
  for (const job of jobs) {
    const jobRequirements = await JobRequirements.findOne({ job: job._id });
    
    // If no requirements specified, consider it a potential match with default score
    if (!jobRequirements) {
      matchedJobs.push({
        job,
        matchScore: {
          overallScore: 100,
          cgpaScore: 100,
          skillsScore: 100,
          educationScore: 100
        }
      });
      continue;
    }
    
    // Calculate match score
    const matchScore = calculateMatchScore(studentProfile, jobRequirements);
    
    // Only include jobs with match score >= 60%
    if (matchScore.overallScore >= 60) {
      matchedJobs.push({
        job,
        matchScore
      });
    }
  }
  
  // Sort by match score (highest first)
  matchedJobs.sort((a, b) => b.matchScore.overallScore - a.matchScore.overallScore);
  
  res.status(200).json({
    success: true,
    count: matchedJobs.length,
    matchedJobs
  });
});