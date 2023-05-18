import { ATTENDANT, SEMINARS, USER_SEMINARS } from "../ds/conn";
import { save_image } from "./utils";

const seminars = (req, res) => {
  let { limit, skip, query, show_total } = req.body;

  let data = SEMINARS.read(query, { limit, skip });

  if (show_total)
    data = { seminars: data, total: SEMINARS.config.total_entries };

  res.json({
    ok: true,
    data,
  });
};

const new_seminar = (req, res) => {
  let seminar = req.body;

  seminar.images = seminar.images.map((img) => {
    img.url = save_image(img.url);

    return img;
  });
  seminar.attendees = 0;

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

  if (ATTENDANT.readone({ user, seminar })) return res.end();

  ATTENDANT.write({ user, seminar, attended: false });
  SEMINARS.update(seminar, { attendees: { $inc: 1 } });
  USER_SEMINARS.write({ user, seminar });

  res.end();
};

const seminar = (req, res) => {
  let { seminar_id } = req.params;

  res.json({
    ok: true,
    data: SEMINARS.readone(seminar_id),
  });
};

const in_attendance = (req, res) => {
  let { user, seminar } = req.body;

  res.json({ ok: true, data: ATTENDANT.readone({ user, seminar }) });
};

const attended = (req, res) => {
  let { user, seminar } = req.body;

  ATTENDANT.update({ user, seminar }, { attended: true });

  res.end();
};

const attendees = (req, res) => {
  let { seminar, query, limit, skip } = req.body;

  res.json({
    ok: true,
    data: ATTENDANT.read({ seminar, ...query }, { limit, skip }),
  });
};

const user_seminars = (req, res) => {
  let { user, limit, skip } = req.body;

  res.json({
    ok: true,
    data: USER_SEMINARS.read({ user }, { limit, skip }),
  });
};

export {
  seminars,
  new_seminar,
  update_seminar,
  remove_seminar,
  in_attendance,
  attendees,
  user_seminars,
  attended,
  seminar,
  register_attendance,
};
