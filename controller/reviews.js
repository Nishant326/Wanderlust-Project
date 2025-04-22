const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.addReviews = async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        console.log(newReview.author);
        req.flash("success", "Reviews created Succcessfully!");
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        res.redirect(`/listings/${listing._id}`);
    };
module.exports.destroyReviews = async (req, res) => {
    const { id, reviewId } = req.params;
    req.flash("success", "reviews deleted Succcessfully!");
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
} 