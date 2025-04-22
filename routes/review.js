const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { reviewSchema } = require("../schema.js");
const { validateReview, isLoggedIn,isReviewsAuthor } = require("../middleware.js")
const reviewController = require("../controller/reviews.js");




//Post Route
router.post("/", isLoggedIn,
    validateReview,
    wrapAsync(reviewController.addReviews));

//delete reviews

router.delete("/:reviewId",isLoggedIn,isReviewsAuthor, wrapAsync(reviewController.destroyReviews));

module.exports = router;