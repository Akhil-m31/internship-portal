import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { JobRequirements } from "../models/jobRequirementsSchema.js";
import { Job } from "../models/jobSchema.js";

export const createJobRequirements = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Employer") {
    return next(
      new ErrorHandler("Only Employers can create job requirements.", 400)
    );
  }

  const { jobId } = req.params;

  // Check if job exists and belongs to the employer
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to add requirements to this job.", 403)
    );
  }

  // Check if requirements already exist
  const existingRequirements = await JobRequirements.findOne({ job: jobId });
  if (existingRequirements) {
    return next(
      new ErrorHandler("Requirements for this job already exist. Please update instead.", 400)
    );
  }

  const { minimumCGPA, requiredSkills, educationRequirement } = req.body;

  if (!minimumCGPA || !requiredSkills || !educationRequirement) {
    return next(new ErrorHandler("Please provide all required fields.", 400));
  }

  const requirements = await JobRequirements.create({
    job: jobId,
    minimumCGPA,
    requiredSkills,
    educationRequirement,
  });

  res.status(201).json({
    success: true,
    message: "Job requirements created successfully!",
    requirements,
  });
});

export const updateJobRequirements = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Employer") {
    return next(
      new ErrorHandler("Only Employers can update job requirements.", 400)
    );
  }

  const { jobId } = req.params;

  // Check if job exists and belongs to the employer
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to update requirements for this job.", 403)
    );
  }

  let requirements = await JobRequirements.findOne({ job: jobId });
  if (!requirements) {
    return next(new ErrorHandler("Job requirements not found.", 404));
  }

  requirements = await JobRequirements.findOneAndUpdate(
    { job: jobId },
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
    message: "Job requirements updated successfully!",
    requirements,
  });
});

export const getJobRequirements = catchAsyncErrors(async (req, res, next) => {
  const { jobId } = req.params;

  const requirements = await JobRequirements.findOne({ job: jobId });
  if (!requirements) {
    return next(new ErrorHandler("Job requirements not found.", 404));
  }

  res.status(200).json({
    success: true,
    requirements,
  });
}); 