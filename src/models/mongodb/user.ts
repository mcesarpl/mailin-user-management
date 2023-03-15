import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: String, required: true },
    enable: { type: Boolean, required: true },
    lastChange: { type: Date, required: true },
  },
  {
    strict: true,
    toJSON: {
      transform: (doc, ret): void => {
        delete ret.__v;
        ret._id = doc._id.toString();
        ret.birthDate = doc.birthDate.toISOString();
        ret.lastChange = doc.lastChange.toISOString();
      },
    },
    toObject: {
      transform: (doc, ret): void => {
        delete ret.__v;
        ret._id = doc._id.toString();
        ret.birthDate = doc.birthDate.toISOString();
        ret.lastChange = doc.lastChange.toISOString();
      },
    },
  },
);

userSchema.index({ username: 'text', email: 'text' });

export default userSchema;
