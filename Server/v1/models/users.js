import bcrypt from 'bcrypt';

const users = [
  {
    id: 1,
    firstName: 'Niyigena',
    lastName: 'Alexandre',
    email: 'niyialexp@gmail.com',
    password: bcrypt.hashSync('alex123', 10),
    gender: 'male',
    phoneNumber: '0784367268',
    username: 'Alexandre',
    userType: 'admin',
  },
  {
    id: 2,
    firstName: 'Nyampinga',
    lastName: 'Espe',
    email: 'espe12@gmail.com',
    password: bcrypt.hashSync('espe123', 10),
    gender: 'female',
    phoneNumber: '0783246121',
    username: 'Esperance',
    userType: 'user',
  },

];
export default users;
