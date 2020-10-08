const mongoose = require('mongoose');

//const { Schema } = mongoose;
const Schema = mongoose.Schema;

const imagesSchema = new Schema(
     {
          url: {
               type: String,
          },
          //   img: { data: Buffer, contentType: String },
          urlWaste: {
               type: String,
          },
          description: {
               type: String,
          },
          ort: {
               type: String,
          },
          date: {
               type: String,
          },
          phone: {
               type: String,
          },
          email: {
               type: String,
          },
          name: {
               type: String,
          },
     },
     { timestamps: true },
     { collection: 'image' }
);

const Image = mongoose.model('image', imagesSchema);

module.exports = Image;
