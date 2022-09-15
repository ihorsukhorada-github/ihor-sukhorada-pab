import { Schema, model } from "mongoose"

interface IDanie {
    nazwa: string,
    cena: number,
    kategoria: string
}

const schema = new Schema<IDanie>(
  {
    nazwa: {
      type: String,
      required: true
    },
    cena: {
      type: Number,
      required: true
    },
    kategoria: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
)

const danie = model<IDanie>('Danie', schema)

export default danie
