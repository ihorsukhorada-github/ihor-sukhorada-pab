import { Schema, model } from "mongoose"

interface IPracownik {
    imie: string,
    nazwisko: string,
    stanowisko: string
}

let schema = new Schema<IPracownik>(
  {
    imie: {
      type: String,
      required: true,
    },
    nazwisko: {
      type: String,
      required: true,
    },
    stanowisko: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Pracownik = model<IPracownik>("Pracownik", schema)

export default Pracownik