import connection from '../config/databaseConfig';
import query from './query';

const createTables = async () => {
  const createUserTable = query.userTable;
  const createIncidentTable = query.incidentTable;
  const createCommentTable = query.commentsTable;
  const tables = `${createUserTable}; ${createIncidentTable}; ${createCommentTable}`;

  await connection.query(tables);
};

createTables();

export default createTables;
