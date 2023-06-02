import { CONFERENCES, GLOBALS, SEMINARS, TEAM_MEMBER } from "../ds/conn";
import { remove_image, save_image, save_video } from "./utils";

const GLOBALS_mission_statement = "mission_statement",
  GLOBALS_vision_statement = "vision_statement",
  GLOBALS_about_statement = "about_statement";

const mission_vision_statement = (req, res) => {
  let vision = GLOBALS.readone({ global: GLOBALS_vision_statement }),
    mission = GLOBALS.readone({ global: GLOBALS_mission_statement });

  res.json({ ok: true, data: { vision, mission } });
};

const update_mission = (req, res) => {
  let { mission_statement, mission_title, mission, mission_file_hash } =
    req.body;

  if (!mission || !mission_file_hash || !mission_statement) return res.end();

  mission = save_image(mission);

  GLOBALS.update(
    { global: GLOBALS_mission_statement },
    { mission_statement, mission_title, mission, mission_file_hash }
  );

  res.json({
    ok: true,
    data: { mission },
  });
};

const update_vision = (req, res) => {
  let { vision_statement, vision_title, vision, vision_file_hash } = req.body;

  if (!vision || !vision_file_hash || !vision_statement) return res.end();

  vision = save_image(vision);

  GLOBALS.update(
    { global: GLOBALS_vision_statement },
    { vision_statement, vision_title, vision, vision_file_hash }
  );

  res.json({
    ok: true,
    data: { vision },
  });
};

const update_about_statement = (req, res) => {
  let { about_statement, bullets, more_details, image, image_file_hash } =
    req.body;

  if (!image || !image_file_hash || !about_statement) return res.end();

  image = save_image(image);

  GLOBALS.update(
    { global: GLOBALS_about_statement },
    { about_statement, image, bullets, more_details, image_file_hash }
  );

  res.json({
    ok: true,
    data: { image },
  });
};

const about_statement = (req, res) => {
  res.json({
    ok: true,
    data: GLOBALS.readone({ global: GLOBALS_about_statement }),
  });
};

const entry = (req, res) => {
  res.json({
    ok: true,
    data: {
      about: GLOBALS.readone({ global: GLOBALS_about_statement }),
      vision: GLOBALS.readone({ global: GLOBALS_vision_statement }),
      mission: GLOBALS.readone({ global: GLOBALS_mission_statement }),
      banners: GLOBALS.read({ global: GLOBAL_banner_stuff }),
      logo: GLOBALS.readone({ global: GLOBAL_logo }),
    },
  });
};

const update_event_highlight = (req, res) => {
  let { event, images, video } = req.body;

  images = images.map((img) => {
    img.url = save_image(img.url);

    return img;
  });

  let Folder = event.startsWith("seminar") ? SEMINARS : CONFERENCES;
  Folder.update(event, { highlights: { images, video } });

  res.json({ ok: true, data: { _id: event, images } });
};

const GLOBAL_live_training = "live_training";

const update_live_training = (req, res) => {
  let { title, description, video, thumbnail, thumbnail_hash } = req.body;

  video = save_video(video);
  thumbnail = save_image(thumbnail);

  GLOBALS.update(
    { global: GLOBAL_live_training },
    { title, description, video, thumbnail, thumbnail_hash }
  );

  res.json({
    ok: true,
    data: { video, thumbnail },
  });
};

const live_training = (req, res) => {
  res.json({
    ok: true,
    data: GLOBALS.readone({ global: GLOBAL_live_training }),
  });
};

const GLOBAL_donation_section = "donation_section";

const donation_section = (req, res) => {
  res.json({
    ok: true,
    data: GLOBALS.readone({ global: GLOBAL_donation_section }),
  });
};

const update_donation_section = (req, res) => {
  let { title, text, image, image_file_hash } = req.body;

  image = save_image(image);

  GLOBALS.update(
    { global: GLOBAL_donation_section },
    { title, text, image, image_file_hash }
  );

  res.json({
    ok: true,
    data: { image },
  });
};

const GLOBAL_mentorship = "mentorship";

const mentorship = (req, res) => {
  res.json({
    ok: true,
    data: GLOBALS.readone({ global: GLOBAL_mentorship }),
  });
};

const update_mentorship = (req, res) => {
  let { sections, title, image, image_file_hash } = req.body;

  image = save_image(image);

  let result = GLOBALS.update(
    { global: GLOBAL_mentorship },
    { title, sections, image, image_file_hash }
  );

  res.json({
    ok: true,
    data: { image, message: !result ? "Something went wrong!" : null },
  });
};

const GLOBAL_internship = "internship";

const internship = (req, res) => {
  res.json({
    ok: true,
    data: GLOBALS.readone({ global: GLOBAL_internship }),
  });
};

const update_internship = (req, res) => {
  let { sections, title, image, image_file_hash } = req.body;

  image = save_image(image);

  let result = GLOBALS.update(
    { global: GLOBAL_internship },
    { title, sections, image, image_file_hash }
  );

  res.json({
    ok: true,
    data: { image, message: !result ? "Something went wrong!" : null },
  });
};

const GLOBAL_sponsors = "sponsors";

const sponsors_page = (req, res) => {
  res.json({
    ok: true,
    data: GLOBALS.readone({ global: GLOBAL_sponsors }),
  });
};

const update_sponsors = (req, res) => {
  let { sections, title, image, image_file_hash } = req.body;

  image = save_image(image);

  let result = GLOBALS.update(
    { global: GLOBAL_sponsors },
    { title, sections, image, image_file_hash }
  );

  res.json({
    ok: true,
    data: { image, message: !result ? "Something went wrong!" : null },
  });
};

const GLOBAL_speakers = "speakers";

const speakers_page = (req, res) => {
  res.json({
    ok: true,
    data: GLOBALS.readone({ global: GLOBAL_speakers }),
  });
};

const update_speakers = (req, res) => {
  let { sections, title, image, image_file_hash } = req.body;

  image = save_image(image);

  let result = GLOBALS.update(
    { global: GLOBAL_speakers },
    { title, sections, image, image_file_hash }
  );

  res.json({
    ok: true,
    data: { image, message: !result ? "Something went wrong!" : null },
  });
};

const GLOBAL_banner_stuff = "banner_stuff";

const add_banner = (req, res) => {
  let { image, title, sub_text } = req.body;
  image = save_image(image);

  let result = GLOBALS.write({
    global: GLOBAL_banner_stuff,
    image,
    title,
    sub_text,
  });

  res.json({
    ok: true,
    data: { _id: result._id, image, created: result.created },
  });
};

const update_banner = (req, res) => {
  let { image, title, _id, sub_text } = req.body;
  image = save_image(image);

  let result = GLOBALS.update(
    { _id, global: GLOBAL_banner_stuff },
    { image, title, sub_text }
  );

  res.json({
    ok: true,
    data: { _id: result._id, image, created: result.created },
  });
};

const remove_banner = (req, res) => {
  let { banner } = req.params;

  console.log(banner);
  GLOBALS.remove({ global: GLOBAL_banner_stuff, _id: banner });

  res.end();
};

const GLOBAL_logo = "logo";

const logo_update = (req, res) => {
  let { logo } = req.body;

  if (logo && logo.startsWith("data")) {
    let prev_logo = GLOBALS.readone({ global: GLOBAL_logo });
    remove_image(prev_logo.logo);
  }

  logo = save_image(logo);

  GLOBALS.update({ global: GLOBAL_logo }, { logo });

  res.json({ ok: true, data: { logo } });
};

const banners_et_logo = (req, res) => {
  res.json({
    ok: true,
    data: {
      banners: GLOBALS.read({ global: GLOBAL_banner_stuff }),
      logo: GLOBALS.readone({ global: GLOBAL_logo }),
    },
  });
};

export {
  GLOBAL_sponsors,
  GLOBAL_speakers,
  GLOBAL_banner_stuff,
  add_banner,
  banners_et_logo,
  update_banner,
  GLOBAL_internship,
  GLOBAL_logo,
  logo_update,
  remove_banner,
  internship,
  sponsors_page,
  speakers_page,
  update_speakers,
  update_sponsors,
  update_internship,
  GLOBALS_mission_statement,
  GLOBALS_vision_statement,
  donation_section,
  update_donation_section,
  GLOBAL_donation_section,
  update_live_training,
  live_training,
  GLOBAL_live_training,
  update_mission,
  update_mentorship,
  mentorship,
  GLOBAL_mentorship,
  update_vision,
  mission_vision_statement,
  update_about_statement,
  about_statement,
  GLOBALS_about_statement,
  update_event_highlight,
  entry,
};
