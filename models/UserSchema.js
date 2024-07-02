import mongoose from "mongoose";

var UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "anonymous" },
    lastName: { type: String, default: "user" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("User", UserSchema);
