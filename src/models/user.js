import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
