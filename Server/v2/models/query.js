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
                        images text,
                        videos text,
                        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        createdBy SERIAL,
                        foreign key(createdBy) REFERENCES users ON DELETE CASCADE)`;

const commentsTable = `
                CREATE TABLE IF NOT EXISTS comments (
                                commentId SERIAL PRIMARY KEY,
                                comment text,
                                commentedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                commentedBy SERIAL,
                                incidentCommented SERIAL,
                                foreign key(commentedBy) REFERENCES users,
                                foreign key(incidentCommented) REFERENCES incidents ON DELETE CASCADE)`;

const deleteTable = 'DROP TABLE IF EXISTS users, incidents, comments CASCADE;';

export default {
  userTable, incidentTable, commentsTable, deleteTable,
};
