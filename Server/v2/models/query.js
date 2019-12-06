const userTable = `
    CREATE TABLE IF NOT EXISTS users (
                userId SERIAL PRIMARY KEY,
                firstName text,
                lastName text,
                email text UNIQUE,
                password text,
                gender text,
                phoneNumber text,
                username text,
                type text)`;

const incidentTable = `
                CREATE TABLE IF NOT EXISTS incidents (
                        incidentId SERIAL PRIMARY KEY,
                        title text,
                        body text,
                        type text,
                        location text,
                        status text,
                        images text,
                        videos text,
                        comment text,
                        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        createdBy SERIAL,
                        foreign key(createdBy) REFERENCES users ON DELETE CASCADE)`;

const deleteTable = 'DROP TABLE IF EXISTS users, incidents CASCADE;';

export default {
  userTable, incidentTable, deleteTable,
};
