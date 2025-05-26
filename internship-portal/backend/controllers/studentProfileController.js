import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { StudentProfile } from "../models/studentProfileSchema.js";

export const createStudentProfile = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Job Seeker") {
    return next(
      new ErrorHandler("Only Job Seekers can create student profiles.", 400)
    );
  }

  // Check if profile already exists
  const existingProfile = await StudentProfile.findOne({ user: req.user._id });
  if (existingProfile) {
    return next(
      new ErrorHandler("Student profile already exists. Please update instead.", 400)
    );
  }

  const { cgpa, skills, educationQualification } = req.body;

  if (!cgpa || !skills || !educationQualification) {
    return next(new ErrorHandler("Please provide all required fields.", 400));
  }

  const profile = await StudentProfile.create({
    user: req.user._id,
    cgpa,
    skills,
    educationQualification,
  });

  res.status(201).json({
    success: true,
    message: "Student profile created successfully!",
    profile,
  });
});

export const updateStudentProfile = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Job Seeker") {
    return next(
      new ErrorHandler("Only Job Seekers can update student profiles.", 400)
    );
  }

  let profile = await StudentProfile.findOne({ user: req.user._id });
  if (!profile) {
    return next(new ErrorHandler("Student profile not found.", 404));
  }

  profile = await StudentProfile.findOneAndUpdate(
    { user: req.user._id },
    {
      ...req.body,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Student profile updated successfully!",
    profile,
  });
});

export const getMyStudentProfile = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Job Seeker") {
    return next(
      new ErrorHandler("Only Job Seekers can access student profiles.", 400)
    );
  }

  const profile = await StudentProfile.findOne({ user: req.user._id });
  if (!profile) {
    return next(new ErrorHandler("Student profile not found.", 404));
  }

  res.status(200).json({
    success: true,
    profile,
  });
}); 