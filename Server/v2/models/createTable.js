import connection from '../config/databaseConfig';
import query from './query';

const createTables = async () => {
  const createUserTable = query.userTable;
  const createIncidentTable = query.incidentTable;
  const tables = `${createUserTable}; ${createIncidentTable}`;

  await connection.query(tables);
};

createTables();

export default createTables;
