import { ADMINSTRATORS, ADMIN_HASH, USERS, USERS_HASH } from "../ds/conn";

let default_admin = "adminstrators~123seminar~1234567890123",
  default_user = "users~123seminar~1234567890123";

const create_default_admin = () => {
  if (!ADMINSTRATORS.readone(default_admin)) {
    ADMINSTRATORS.write({
      firstname: "Seminar",
      lastname: "Africa",
      image: "logo_single.png",
      email: "admin@seminar.com".toLowerCase(),
      _id: default_admin,
    });
    ADMIN_HASH.write({ admin: default_admin, key: "adminstrator#1" });
  }

  let user_ = USERS.readone(default_user);
  if (!user_) {
    USERS.write({
      _id: default_user,
      firstname: "Seminar",
      lastname: "Africa",
      verified: true,
      email: "seminarafrica@gmail.com",
    });
    USERS_HASH.write({ user: default_user, key: "adminstrator#1" });
  }
};

export { create_default_admin, default_user };
