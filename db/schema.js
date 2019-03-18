module.exports = {
  createTableQueries: `
    DROP TABLE IF EXISTS pets;
    CREATE TABLE "pets" (
      "id" SERIAL PRIMARY KEY,
      "category" varchar (10),
      "image" varchar,
      "description" varchar(1000),
      "ratings" integer[]
    );
  `,
};