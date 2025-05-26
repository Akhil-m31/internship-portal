import mongoose from "mongoose";

const jobRequirementsSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  minimumCGPA: {
    type: Number,
    required: [true, "Please provide minimum CGPA requirement"],
    min: [0, "CGPA cannot be less than 0"],
    max: [10, "CGPA cannot be more than 10"],
  },
  requiredSkills: {
    type: [String],
    required: [true, "Please provide at least one required skill"],
    validate: {
      validator: function(skills) {
        return skills.length > 0;
      },
      message: "Please provide at least one required skill"
    }
  },
  educationRequirement: {
    minDegree: {
      type: String,
      required: [true, "Please provide minimum degree requirement"],
      enum: ["High School", "Bachelor's", "Master's", "PhD", "Diploma", "Certificate", "Other"],
    },
    preferredFields: {
      type: [String],
      required: [true, "Please provide at least one preferred field"],
      validate: {
        validator: function(fields) {
          return fields.length > 0;
        },
        message: "Please provide at least one preferred field"
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export const JobRequirements = mongoose.model("JobRequirements", jobRequirementsSchema); 