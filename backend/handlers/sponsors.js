import { EVENT_SPONSORS, SPONSORS } from "../ds/conn";
import { remove_image, save_image } from "./utils";

const new_sponsor = (req, res) => {
  let sponsor = req.body;

  sponsor.logo = save_image(sponsor.logo);
  let result = SPONSORS.write(sponsor);

  res.json({
    ok: true,
    data: { _id: result._id, logo: sponsor.logo, created: result.created },
  });
};

const update_sponsor = (req, res) => {
  let sponsor = req.body;

  sponsor.logo = save_image(sponsor.logo);
  SPONSORS.update(sponsor._id, { ...sponsor });

  res.json({
    ok: true,
    data: { logo: sponsor.logo, _id: sponsor._id, created: sponsor.created },
  });
};

const event_sponsors = (req, res) => {
  let { event } = req.params;

  let sponsors = EVENT_SPONSORS.readone({ event });

  if (!sponsors) sponsors = new Array();
  else sponsors = SPONSORS.read(sponsors.sponsors);

  res.json({ ok: true, data: sponsors });
};

const sponsors = (req, res) => {
  res.json({ ok: true, data: SPONSORS.read() });
};

const update_event_sponsors = (req, res) => {
  let { event, sponsors } = req.body;

  let e_sponsor = EVENT_SPONSORS.readone({ event, sponsors });

  if (e_sponsor) {
    EVENT_SPONSORS.update({ event, _id: e_sponsor._id }, { sponsors });
  } else EVENT_SPONSORS.write({ event, sponsors });

  res.end();
};

const remove_sponsor = (req, res) => {
  let { sponsor } = req.params;

  let result = SPONSORS.remove(sponsor);
  result && remove_image(sponsor.logo);

  res.end();
};

export {
  new_sponsor,
  update_sponsor,
  remove_sponsor,
  event_sponsors,
  sponsors,
  update_event_sponsors,
};
