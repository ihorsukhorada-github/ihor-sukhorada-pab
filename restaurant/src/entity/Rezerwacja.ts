import { Schema, model, Types } from "mongoose"

interface IRezerwacja {
    stolik: Types.ObjectId,
    start: Date,
    koniec: Date,
    klient: string
}

const schema = new Schema<IRezerwacja>(
  {
    stolik: {
        type: Schema.Types.ObjectId,
        ref: "Stolik",
        required: true,
    },  
    start: {
      type: Date,
      required: true,
    },
    koniec: {
      type: Date,
      required: true,
    },
    klient: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Rezerwacja = model<IRezerwacja>("Rezerwacja", schema)

export default Rezerwacja