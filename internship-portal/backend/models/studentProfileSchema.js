import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cgpa: {
    type: Number,
    required: [true, "Please provide your CGPA"],
    min: [0, "CGPA cannot be less than 0"],
    max: [10, "CGPA cannot be more than 10"],
  },
  skills: {
    type: [String],
    required: [true, "Please provide at least one skill"],
    validate: {
      validator: function(skills) {
        return skills.length > 0;
      },
      message: "Please provide at least one skill"
    }
  },
  educationQualification: {
    degree: {
      type: String,
      required: [true, "Please provide your degree"],
      enum: ["High School", "Bachelor's", "Master's", "PhD", "Diploma", "Certificate", "Other"],
    },
    field: {
      type: String,
      required: [true, "Please provide your field of study"],
    },
    institution: {
      type: String,
      required: [true, "Please provide your institution name"],
    },
    yearOfCompletion: {
      type: Number,
      required: [true, "Please provide your year of completion"],
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

export const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema); 