import GDS from "generalised-datastore";

let gds;

let USERS,
  ADMINSTRATORS,
  ADMIN_HASH,
  USERS_HASH,
  USER_SEMINARS,
  GLOBALS,
  ATTENDANT,
  SEMINARS;

const ds_conn = () => {
  gds = new GDS(
    "giit_seminar",
    process.env["PWD"].includes("www")
      ? process.env["PWD"].split("/").slice(0).join("/")
      : null
  ).sync();

  ADMINSTRATORS = gds.folder("adminstrators");
  USERS = gds.folder("users");
  ADMIN_HASH = gds.folder("admin_hash", "admin");
  GLOBALS = gds.folder("globals", "global");
  USER_SEMINARS = gds.folder("user_seminars", "user", "seminar");
  SEMINARS = gds.folder("seminars");
  ATTENDANT = gds.folder("attendant", "seminar", "user");
  USERS_HASH = gds.folder("user_hash", "user");
};

export {
  gds,
  USERS,
  ADMIN_HASH,
  ADMINSTRATORS,
  GLOBALS,
  USER_SEMINARS,
  USERS_HASH,
  SEMINARS,
  ATTENDANT,
};
export default ds_conn;
