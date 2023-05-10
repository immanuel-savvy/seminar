import { GLOBALS, REVIEWS } from "../ds/conn";
import { remove_image, save_image } from "./utils";

const GLOBALS_verified_reviews = "verified_reviews";

const approve_review = (req, res) => {
  let { review } = req.params;

  let globals = GLOBALS.readone({ global: GLOBALS_verified_reviews });
  if (globals)
    GLOBALS.update(
      { global: GLOBALS_verified_reviews },
      { reviews: { $push: review } }
    );
  else
    GLOBALS.write({
      global: GLOBALS_verified_reviews,
      review: new Array(review),
    });

  REVIEWS.update(review, { verified: true });

  res.end();
};

const reviews = (req, res) => {
  let { limit, verified } = req.body;

  let reviews;
  let verified_reviews = GLOBALS.readone({
    global: GLOBALS_verified_reviews,
  });

  if (!verified_reviews) reviews = new Array();
  else reviews = verified_reviews.reviews;

  reviews = REVIEWS.read(verified ? reviews : null, {
    exclude: verified ? null : reviews,
    limit,
  });

  res.json({ ok: true, message: "reviews fetched", data: reviews });
};

const new_review = (req, res) => {
  let review = req.body;

  review.image = save_image(review.image);

  let result = REVIEWS.write(review);
  review._id = result._id;
  review.created = result.created;

  if (review.verified)
    if (!!GLOBALS.readone({ global: GLOBALS_verified_reviews }))
      GLOBALS.update(
        { global: GLOBALS_verified_reviews },
        { reviews: { $push: review._id } }
      );
    else
      GLOBALS.write({
        global: GLOBALS_verified_reviews,
        reviews: new Array(review._id),
      });

  res.json({ ok: true, message: "review added", data: review });
};

const remove_review = (req, res) => {
  let { review } = req.params;

  let review_ = REVIEWS.readone(review);
  if (!review_) return res.end();

  review_.image && !review_.user && remove_image(review_.image);
  review_.verified &&
    GLOBALS.update(
      { global: GLOBALS_verified_reviews },
      { reviews: { $splice: review } }
    );

  REVIEWS.remove(review);

  res.json({ ok: true, message: "review removed", data: review });
};

export { remove_review, new_review, approve_review, reviews };
