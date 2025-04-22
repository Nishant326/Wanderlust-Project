const express = require("express");
const router = express.Router();
const listing = require("../routes/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isOwner, validateListing, isLoggedIn } = require("../middleware.js");
const listingController = require("../controller/listing.js")
const multer = require('multer');
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })


//New route
router.get("/new", isLoggedIn, listingController.newRoute);

router
    .route("/")
    .get(
        wrapAsync(listingController.index)
    )
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.addNewListing),
    );
//serach route  
router.get("/search",
    wrapAsync(listingController.searchListing));

router
    .route("/:id")
    .get(
        wrapAsync(listingController.show)
    )
    .put(isLoggedIn, upload.single('listing[image]'), validateListing, isOwner,
        wrapAsync(listingController.updateListing)
    );


//edit..
router.get("/:id/edit", isLoggedIn, isOwner,
    wrapAsync(listingController.editRoute));

//Delete Listing
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));


module.exports = router;