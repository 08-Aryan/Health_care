import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    endpoint: {
      type: String,
      trim: true,
    },

    method: {
      type: String,
      trim: true,
    },

    ip: {
      type: String,
      trim: true,
    },

    userAgent: {
      type: String,
      trim: true,
    },

    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
