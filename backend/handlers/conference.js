import {
  CONFERENCE_ATTENDANT,
  CONFERENCES,
  USER_CONFERENCES,
} from "../ds/conn";
import { save_image } from "./utils";

const conferences = (req, res) => {
  let { limit, skip, query, show_total } = req.body;

  let data = CONFERENCES.read(query, { limit, skip });

  if (show_total)
    data = { conferences: data, total: CONFERENCES.config.total_entries };

  res.json({
    ok: true,
    data,
  });
};

const new_conference = (req, res) => {
  let conference = req.body;

  conference.images = conference.images.map((img) => {
    img.url = save_image(img.url);

    return img;
  });
  conference.conference_attendees = 0;

  let result = CONFERENCES.write(conference);
  conference._id = result._id;
  conference.created = result.created;

  res.json({
    ok: true,
    message: "conference created",
    data: conference,
  });
};

const update_conference = (req, res) => {
  let conference = req.body;

  conference.images = conference.images.map((img) => {
    img.url = save_image(img.url);

    return img;
  });

  CONFERENCES.update(conference._id, { ...conference });

  res.json({
    ok: true,
    message: "conference updated",
    data: conference,
  });
};

const remove_conference = (req, res) => {
  let { conference } = req.params;

  CONFERENCES.remove(conference);
  CONFERENCE_ATTENDANT.remove({ conference });

  res.end();
};

const register_conference_attendance = (req, res) => {
  let { user, conference } = req.body;

  if (CONFERENCE_ATTENDANT.readone({ user, conference })) return res.end();

  CONFERENCE_ATTENDANT.write({ user, conference, conference_attended: false });
  CONFERENCES.update(conference, { conference_attendees: { $inc: 1 } });
  USER_CONFERENCES.write({ user, conference });

  res.end();
};

const conference = (req, res) => {
  let { conference_id } = req.params;

  res.json({
    ok: true,
    data: CONFERENCES.readone(conference_id),
  });
};

const in_conference_attendance = (req, res) => {
  let { user, conference } = req.body;

  res.json({
    ok: true,
    data: CONFERENCE_ATTENDANT.readone({ user, conference }),
  });
};

const conference_attended = (req, res) => {
  let { user, conference } = req.body;

  CONFERENCE_ATTENDANT.update(
    { user, conference },
    { conference_attended: true }
  );

  res.end();
};

const conference_attendees = (req, res) => {
  let { conference, query, limit, skip } = req.body;

  res.json({
    ok: true,
    data: CONFERENCE_ATTENDANT.read({ conference, ...query }, { limit, skip }),
  });
};

const user_conferences = (req, res) => {
  let { user, limit, skip } = req.body;

  res.json({
    ok: true,
    data: USER_CONFERENCES.read({ user }, { limit, skip }),
  });
};

export {
  conferences,
  new_conference,
  update_conference,
  remove_conference,
  in_conference_attendance,
  conference_attendees,
  user_conferences,
  conference_attended,
  conference,
  register_conference_attendance,
};
