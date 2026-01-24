const mongoose = require('mongoose');
//points added
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    points: {
      type: Number, //every user has points starting at 0
      default: 0,
    },
  },
  { timestamps: true }
);


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

const User = mongoose.model('User', userSchema);
//add points from the transaction controller
module.exports = User;