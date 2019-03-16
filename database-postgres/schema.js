module.exports = {
  createTableQueries: `
    DROP TABLE IF EXISTS dogs, cats;
    CREATE TABLE "dogs" (
      "id" SERIAL PRIMARY KEY,
      "image" varchar,
      "description" varchar(1000),
      "ratings" integer[]
    );
    
    CREATE TABLE "cats" (
      "id" SERIAL PRIMARY KEY,
      "image" varchar,
      "description" varchar(1000),
      "ratings" integer[]
    );
  `,
};