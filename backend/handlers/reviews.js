import { GLOBALS, REVIEWS } from "../ds/conn";
import { remove_image, remove_video, save_image, save_video } from "./utils";

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

const GLOBAL_alumni_overview = "alumni_overview";

const alumni_overview = (req, res) => {
  let alumni_overview_ = GLOBALS.readone({ global: GLOBAL_alumni_overview });

  res.json({ ok: true, message: "alumni overview", data: alumni_overview_ });
};

const update_alumni_overview = (req, res) => {
  let { video, thumbnail, text, title, image_hash } = req.body;

  (video = save_video(video)), (thumbnail = save_image(thumbnail));

  let alumni_overview = GLOBALS.readone({ global: GLOBAL_alumni_overview });
  alumni_overview &&
    (thumbnail.startsWith("data") && remove_image(alumni_overview.thumbnail),
    video.startsWith("data") && remove_video(alumni_overview.video));

  GLOBALS.update(
    { global: GLOBAL_alumni_overview },
    {
      video,
      thumbnail,
      image_hash,
      text,
      title,
    }
  );

  res.json({
    ok: true,
    message: "alumni overview updated",
    data: { video, thumbnail },
  });
};

export {
  update_alumni_overview,
  alumni_overview,
  GLOBAL_alumni_overview,
  remove_review,
  new_review,
  approve_review,
  reviews,
};
