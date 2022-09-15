import { Schema, model } from "mongoose"

interface IProdukt {
    nazwa: string,
    cena: number,
    ilosc: number,
    jednostkaMiary: string
}

const schema = new Schema<IProdukt>(
  {
    nazwa: {
      type: String,
      required: true,
    },
    cena: {
      type: Number,
      required: true,
    },
    ilosc: {
      type: Number,
      required: true,
    },
    jednostkaMiary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Produkt = model<IProdukt>("Produkt", schema)

export default Produkt