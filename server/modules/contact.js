const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    birth: {
      type: Date,
      required: true,
    },
  },
  { timeStamps: true, collection: "contacts" }
);

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;
