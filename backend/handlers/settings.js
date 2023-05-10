import { GLOBALS, TEAM_MEMBER } from "../ds/conn";
import { save_image } from "./utils";

const GLOBALS_mission_statement = "mission_statement",
  GLOBALS_vision_statement = "vision_statement",
  GLOBALS_about_statement = "about_statement";

const mission_vision_statement = (req, res) => {
  let vision = GLOBALS.readone({ global: GLOBALS_vision_statement }),
    mission = GLOBALS.readone({ global: GLOBALS_mission_statement });

  res.json({ ok: true, data: { vision, mission } });
};

const update_mission = (req, res) => {
  let { mission_statement, mission, mission_file_hash } = req.body;

  if (!mission || !mission_file_hash || !mission_statement) return res.end();

  mission = save_image(mission);

  GLOBALS.update(
    { global: GLOBALS_mission_statement },
    { mission_statement, mission, mission_file_hash }
  );

  res.json({
    ok: true,
    data: { mission },
  });
};

const update_vision = (req, res) => {
  let { vision_statement, vision, vision_file_hash } = req.body;

  if (!vision || !vision_file_hash || !vision_statement) return res.end();

  vision = save_image(vision);

  GLOBALS.update(
    { global: GLOBALS_vision_statement },
    { vision_statement, vision, vision_file_hash }
  );

  res.json({
    ok: true,
    data: { vision },
  });
};

const update_about_statement = (req, res) => {
  let { about_statement, bullets, image, image_file_hash } = req.body;

  if (!image || !image_file_hash || !about_statement) return res.end();

  image = save_image(image);

  GLOBALS.update(
    { global: GLOBALS_about_statement },
    { about_statement, image, bullets, image_file_hash }
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
    },
  });
};

export {
  GLOBALS_mission_statement,
  GLOBALS_vision_statement,
  update_mission,
  update_vision,
  mission_vision_statement,
  update_about_statement,
  about_statement,
  GLOBALS_about_statement,
  entry,
};
