const createUser = ` insert into users (
    firstname,
    lastname,
    email,
    password,
    gender,
    phonenumber,
    username, 
    type
) VALUES($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING returning *`;

const findOne = `select userid, firstname, lastname, email, gender, 
        phonenumber, username, type from users where email=($1)`;
const findEmail = `select userid, firstname, email, password, 
        phonenumber, username, type from users where email=($1)`;
const findDisplay = `select firstname, lastname, phonenumber, gender,
        username from users where email=($1)`;

export default { createUser, findOne, findEmail, findDisplay };
