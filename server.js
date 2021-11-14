const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Successfully connected to DB');
  });

const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'a tour needs a name'], unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'a tour needs a price'] },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The explorer',
  //rating: 4.8,
  price: 455,
});

testTour.save();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
