import mongoose, { Document, Schema } from "mongoose";

export interface ISensorReading extends Document {
  equipmentId: string;
  timestamp: Date;
  value: number;
}

const SensorReadingSchema: Schema = new Schema({
  equipmentId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  value: { type: Number, required: true },
});

export type SensorAverage = Omit<ISensorReading, "timestemp">;

export default mongoose.model<ISensorReading>(
  "SensorReading",
  SensorReadingSchema
);
