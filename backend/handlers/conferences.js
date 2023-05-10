import { CONFERENCES } from "../ds/conn";

const conferences = (req, res) => {
  let { limit, skip, total_conferences } = req.body;

  let conferences_ = CONFERENCES.read(null, { limit: Number(limit), skip });
  if (total_conferences)
    conferences_ = {
      conferences: conferences_,
      total_conferences: CONFERENCES.config.total_entries,
    };

  res.json({ ok: true, message: "conferences fetched", data: conferences_ });
};

export { conferences };
