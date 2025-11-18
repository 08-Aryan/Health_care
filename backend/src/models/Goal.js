import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Daily step goal
    steps: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Water intake in liters
    waterIntake: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Sleep hours goal
    sleepHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Auto-calc compliance (optional)
    isMet: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Auto compute "isMet"
GoalSchema.pre("save", function (next) {
  const hasGoal =
    (this.steps && this.steps > 0) ||
    (this.waterIntake && this.waterIntake > 0) ||
    (this.sleepHours && this.sleepHours > 0);

  if (hasGoal) {
    this.isMet = true;
  }

  next();
});

export default mongoose.model("Goal", GoalSchema);
