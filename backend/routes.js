import {
  login,
  signup,
  update_user,
  user,
  users,
  user_by_email,
  verify_email,
} from "./handlers/users";

import { admin_login, create_admin, get_admins, stats } from "./handlers/admin";
import {
  attended,
  attendees,
  in_attendance,
  new_seminar,
  register_attendance,
  remove_seminar,
  seminars,
  update_seminar,
  user_seminars,
  seminar,
} from "./handlers/seminar";

const router = (app) => {
  app.get("/user/:user_id", user);
  app.get("/get_admins", get_admins);
  app.get("/stats", stats);
  app.get("/seminar/:seminar_id", seminar);

  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/users", users);
  app.post("/user_by_email", user_by_email);
  app.post("/create_admin", create_admin);
  app.post("/update_user/:user", update_user);
  app.post("/verify_email", verify_email);
  app.post("/admin_login", admin_login);
  app.post("/new_seminar", new_seminar);
  app.post("/seminars", seminars);
  app.post("/update_seminar", update_seminar);
  app.post("/remove_seminar/:seminar", remove_seminar);
  app.post("/register_attendance", register_attendance);
  app.post("/in_attendance", in_attendance);
  app.post("/attendees", attendees);
  app.post("/attended", attended);
  app.post("/user_seminars", user_seminars);
};

export default router;
