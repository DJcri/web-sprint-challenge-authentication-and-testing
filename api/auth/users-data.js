const db = require("../../data/dbConfig");

const getAll = () => {
  return db("users");
};

const getById = (id) => {
  return db("users").where("id", id).first();
};

const getBy = (filter) => {
  return db("users").where(filter).first();
};

const add = async (user) => {
  const [id] = await db("users").insert(user);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  getBy,
  add,
};
