import { ATTENDANT, SEMINARS } from "../ds/conn";
import { save_image } from "./utils";

const seminars = (req, res) => {
  let { limit, skip, query } = req.body;

  res.json({
    ok: true,
    data: SEMINARS.read(query, { limit, skip }),
  });
};

const new_seminar = (req, res) => {
  let seminar = req.body;

  seminar.images = seminar.images.map((img) => {
    img.url = save_image(img.url);

    return img;
  });

  let result = SEMINARS.write(seminar);
  seminar._id = result._id;
  seminar.created = result.created;

  res.json({
    ok: true,
    message: "seminar created",
    data: seminar,
  });
};

const update_seminar = (req, res) => {
  let seminar = req.body;

  seminar.images = seminar.images.map((img) => {
    img.url = save_image(img.url);

    return img;
  });

  SEMINARS.update(seminar._id, { ...seminar });

  res.json({
    ok: true,
    message: "seminar updated",
    data: seminar,
  });
};

const remove_seminar = (req, res) => {
  let { seminar } = req.params;

  SEMINARS.remove(seminar);
  ATTENDANT.remove({ seminar });

  res.end();
};

const register_attendance = (req, res) => {
  let { user, seminar } = req.body;

  ATTENDANT.write({ user, seminar });
  SEMINARS.update(seminar, { attendees: { $inc: 1 } });

  res.end();
};

const in_attendance = (req, res) => {
  let { user, seminar } = req.body;

  res.json({ ok: true, data: ATTENDANT.readone({ user, seminar }) });
};

export {
  seminars,
  new_seminar,
  update_seminar,
  remove_seminar,
  in_attendance,
  register_attendance,
};
