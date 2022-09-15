import { Schema, model } from "mongoose"

interface IStolik {
    nazwa: string,
    iloscOsob: number,
    status: string
}

const schema = new Schema<IStolik>(
  {
    nazwa: {
      type: String,
      required: true,
    },
    iloscOsob: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Wolny", "Zajety", "Niedostepny"],
      default: "Wolny",
    },
  },
  { timestamps: true }
)

const Stolik = model<IStolik>("Stolik", schema)

export default Stolik