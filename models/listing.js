// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// //listing schema
// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     image: {
//     url: String,
//     filename: String,
//   },
//     price: Number,
//     location: String,
//     country: String,
// });

// //Model
// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review")

//listing schema
// models/listing.js
const listingSchema = new Schema({
    title: String,
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     image: {
//         url: {
//             type: String,
//             default: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" // default image
//         },
//         filename: {
//             type: String,
//             default: "default-image"
//         },
//     },
//     price: Number,
//     location: String,
//     country: String,
//     reviews: [{
//         type: Schema.Types.ObjectId,
//         ref: "Review",
//     }]
// });

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

//Model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;