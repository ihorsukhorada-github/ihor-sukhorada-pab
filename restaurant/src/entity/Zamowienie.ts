import { Schema, model, Types } from "mongoose"

interface IZamowienie {
    pracownik: Types.ObjectId,
    pozycje: Types.ObjectId,
    status: string,
    stolik: Types.ObjectId,
    kwota: number
}

const zamowienieSchema = new Schema<IZamowienie>(
  {
    pracownik:{
        type: Schema.Types.ObjectId,
        ref: "Pracownik",
        required: true,
    },
    pozycje: {
        type: Schema.Types.ObjectId,
        ref: "Danie",
        required: true,
    },
    status: {
      type: String,
      enum: ["zlozone", "w realizacji", "zrealizowane", "rachunek"],
      required: true,
    },
    stolik:{
        type: Schema.Types.ObjectId,
        ref: "Stolik",
        required: true,
    },
    kwota: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
)

const Zamowienie = model<IZamowienie>("Zamowienie", zamowienieSchema)

export default Zamowienie
