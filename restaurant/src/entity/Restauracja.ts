import { Schema, model } from "mongoose"

interface IRestauracja {
    nazwa: string,
    adres: string,
    telefon: string,
    nip: string,
    email: string,
    www: string
}

const schema = new Schema<IRestauracja>(
  {
    nazwa: {
      type: String,
      required: true,
    },
    adres: {
      type: String,
      required: true,
    },
    telefon: {
      type: String,
      required: true,
    },
    nip: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    www: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Restauracja = model<IRestauracja>("Restauracja", schema)

export default Restauracja