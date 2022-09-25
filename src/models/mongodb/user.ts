import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true },
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
