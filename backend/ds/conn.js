import GDS from "generalised-datastore";

let gds;

let USERS,
  ADMINSTRATORS,
  ADMIN_HASH,
  USERS_HASH,
  USER_SEMINARS,
  GLOBALS,
  TEAM_MEMBER,
  SPEAKERS,
  ATTENDANT,
  PENDING_TALKS,
  SEMINARS,
  ARTICLES,
  ARTICLE_CATEGORIES,
  COMMENTS,
  REVIEWS,
  REPLIES,
  CONFERENCES,
  TRENDING_ARTICLES,
  CONFERENCE_ATTENDANT,
  USER_CONFERENCES;

const ds_conn = () => {
  gds = new GDS(
    "giit_seminar",
    process.env["PWD"].includes("www")
      ? process.env["PWD"].split("/").slice(0).join("/")
      : null
  ).sync();

  REVIEWS = gds.folder("reviews");
  ARTICLES = gds.folder("articles", null, "categories");
  CONFERENCES = gds.folder("conferences");
  ARTICLE_CATEGORIES = gds.folder("article_categories");
  TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
  ADMINSTRATORS = gds.folder("adminstrators");
  USERS = gds.folder("users");
  PENDING_TALKS = gds.folder("pending_talks", null, "user");
  TEAM_MEMBER = gds.folder("team_members");
  SPEAKERS = gds.folder("speakers");
  COMMENTS = gds.folder("comments", "item");
  REPLIES = gds.folder("replies", "comment");
  ADMIN_HASH = gds.folder("admin_hash", "admin");
  GLOBALS = gds.folder("globals", "global");
  USER_SEMINARS = gds.folder("user_seminars", "user", "seminar");
  USER_CONFERENCES = gds.folder("user_conferecnes", "user", "conference");
  SEMINARS = gds.folder("seminars");
  ATTENDANT = gds.folder("attendant", "seminar", "user");
  CONFERENCE_ATTENDANT = gds.folder(
    "conference_attendant",
    "conference",
    "user"
  );
  USERS_HASH = gds.folder("user_hash", "user");
};

export {
  gds,
  USERS,
  ADMIN_HASH,
  ADMINSTRATORS,
  GLOBALS,
  CONFERENCES,
  USER_SEMINARS,
  USERS_HASH,
  PENDING_TALKS,
  TEAM_MEMBER,
  SPEAKERS,
  REVIEWS,
  SEMINARS,
  ARTICLES,
  ARTICLE_CATEGORIES,
  COMMENTS,
  REPLIES,
  TRENDING_ARTICLES,
  CONFERENCE_ATTENDANT,
  USER_CONFERENCES,
  ATTENDANT,
};
export default ds_conn;
