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
import {
  about_statement,
  entry,
  mission_vision_statement,
  update_about_statement,
  update_mission,
  update_vision,
} from "./handlers/settings";
import {
  add_team_member,
  remove_team_member,
  team_members,
  update_team_member,
} from "./handlers/team_members";
import {
  add_speaker,
  approve_talk,
  decline_talk,
  pending_talks,
  remove_speaker,
  speakers,
  submit_a_talk,
  update_speaker,
} from "./handlers/speakers";
import {
  add_article_category,
  article,
  articles,
  article_categories,
  article_viewed,
  comments,
  comment_dislike,
  comment_heart,
  comment_like,
  comment_rating,
  get_replies,
  new_article,
  new_comment,
  new_reply,
  remove_article,
  remove_article_category,
  remove_trending_article,
  search_articles,
  trending_articles,
  update_article,
  update_article_category,
} from "./handlers/articles";
import {
  alumni_overview,
  approve_review,
  new_review,
  remove_review,
  reviews,
  update_alumni_overview,
} from "./handlers/reviews";
import {
  conference_attended,
  conference_attendees,
  in_conference_attendance,
  register_conference_attendance,
  remove_conference,
  update_conference,
  conferences,
  new_conference,
} from "./handlers/conference";
import {
  event_sponsors,
  new_sponsor,
  remove_sponsor,
  sponsors,
  update_event_sponsors,
  update_sponsor,
} from "./handlers/sponsors";

const router = (app) => {
  app.get("/user/:user_id", user);
  app.get("/get_admins", get_admins);
  app.get("/stats", stats);
  app.get("/about_statement", about_statement);
  app.get("/mission_vision_statement", mission_vision_statement);
  app.get("/seminar/:seminar_id", seminar);
  app.get("/team_members", team_members);
  app.get("/speakers", speakers);
  app.get("/entry", entry);
  app.get("/trending_articles/:limit", trending_articles);
  app.get("/article/:article", article);
  app.get("/comments/:article/:skip", comments);
  app.get("/article_categories", article_categories);
  app.get("/article_categories", article_categories);
  app.get("/testimonials", alumni_overview);
  app.get("/sponsors", sponsors);
  app.get("/event_sponsors/:event", event_sponsors);

  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/users", users);
  app.post("/user_by_email", user_by_email);
  app.post("/create_admin", create_admin);
  app.post("/update_user/:user", update_user);
  app.post("/verify_email", verify_email);
  app.post("/admin_login", admin_login);
  app.post("/new_seminar", new_seminar);
  app.post("/new_conference", new_conference);
  app.post("/seminars", seminars);
  app.post("/conferences", conferences);
  app.post("/update_seminar", update_seminar);
  app.post("/update_conference", update_conference);
  app.post("/remove_seminar/:seminar", remove_seminar);
  app.post("/remove_conference/:conference", remove_conference);
  app.post("/register_attendance", register_attendance);
  app.post("/register_conference_attendance", register_conference_attendance);
  app.post("/in_attendance", in_attendance);
  app.post("/in_conference_attendance", in_conference_attendance);
  app.post("/attendees", attendees);
  app.post("/conference_attendees", conference_attendees);
  app.post("/attended", attended);
  app.post("/conference_attended", conference_attended);
  app.post("/remove_trending_article/:trending", remove_trending_article);
  app.post("/articles", articles);
  app.post("/update_testimonial_overview", update_alumni_overview);
  app.post("/user_seminars", user_seminars);
  app.post("/pending_talks", pending_talks);
  app.post("/approve_talk/:talk", approve_talk);
  app.post("/decline_talk/:talk", decline_talk);
  app.post("/submit_a_talk", submit_a_talk);
  app.post("/new_reply", new_reply);
  app.post("/new_comment", new_comment);
  app.post("/article_viewed/:article", article_viewed);
  app.post("/search_articles", search_articles);
  app.post("/get_replies", get_replies);
  app.post("/new_article", new_article);
  app.post("/approve_review/:review", approve_review);
  app.post("/new_review", new_review);
  app.post("/remove_review/:review", remove_review);
  app.post("/remove_article_category/:category", remove_article_category);
  app.post("/add_article_category", add_article_category);
  app.post("/update_article_category", update_article_category);
  app.post("/update_article", update_article);
  app.post("/remove_article/:article", remove_article);
  app.post("/reviews", reviews);
  app.post("/comment_like", comment_like);
  app.post("/comment_dislike", comment_dislike);
  app.post("/comment_heart", comment_heart);
  app.post("/comment_rating", comment_rating);
  app.post("/new_sponsor", new_sponsor);
  app.post("/update_sponsor", update_sponsor);
  app.post("/remove_sponsor/:sponsor", remove_sponsor);
  app.post("/update_event_sponsors", update_event_sponsors);

  app.post("/add_speaker", add_speaker);
  app.post("/update_speaker", update_speaker);
  app.post("/remove_speaker/:speaker", remove_speaker);
  app.post("/add_team_member", add_team_member);
  app.post("/update_team_member", update_team_member);
  app.post("/remove_team_member/:member", remove_team_member);
  app.post("/update_vision", update_vision);
  app.post("/update_mission", update_mission);
  app.post("/update_about_statement", update_about_statement);
};

export default router;
