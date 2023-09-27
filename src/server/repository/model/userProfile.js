const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,

    required: true,
    unique: true,
  },
  addres: [
    {
      city: {
        type: String,
      },

      pincode: {
        type: Number,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
        default: "India",
      },
    },
  ],
});

module.exports = new mongoose.model("profile", profileSchema);
