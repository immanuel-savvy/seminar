import { GLOBALS, PENDING_TALKS, SPEAKERS } from "../ds/conn";
import { remove_image, save_image } from "./utils";

const add_speaker = (req, res) => {
  let data = req.body;

  data.image = save_image(data.image);

  let result = SPEAKERS.write(data);

  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created,
    },
  });
};

const update_speaker = (req, res) => {
  let data = req.body;

  data.image = save_image(data.image);

  let result = SPEAKERS.update(data._id, { ...data });

  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created,
    },
  });
};

const speakers = (req, res) => {
  res.json({ ok: true, data: SPEAKERS.read() });
};

const remove_speaker = (req, res) => {
  let { speaker } = req.params;

  let result = SPEAKERS.remove(speaker);
  result && remove_image(result.image);

  res.end();
};

const GLOBAL_pending_talks = "pending_talks";

const submit_a_talk = (req, res) => {
  let { title, category, description, user } = req.body;

  let result = PENDING_TALKS.write({ title, category, description, user });

  result &&
    GLOBALS.update(
      { global: GLOBAL_pending_talks },
      { talks: { $push: result._id } }
    );

  res.end();
};

const approve_talk = (req, res) => {
  let { talk } = req.params;

  PENDING_TALKS.update(talk, { approved: true });
  GLOBALS.update(
    { global: GLOBAL_pending_talks },
    { talks: { $splice: talk } }
  );

  res.end();
};

const decline_talk = (req, res) => {
  let { talk } = req.params;

  PENDING_TALKS.update(talk, { declined: true });
  GLOBALS.update(
    {
      global: GLOBAL_pending_talks,
    },
    { talks: { $splice: talk } }
  );

  res.end();
};

const pending_talks = (req, res) => {
  res.json({
    ok: true,
    data: PENDING_TALKS.read(
      GLOBALS.readone({ global: GLOBAL_pending_talks }).talks
    ),
  });
};

export {
  add_speaker,
  update_speaker,
  speakers,
  remove_speaker,
  submit_a_talk,
  approve_talk,
  pending_talks,
  GLOBAL_pending_talks,
  decline_talk,
};
