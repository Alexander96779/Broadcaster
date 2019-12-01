import connection from '../config/databaseConfig';
import query from './query';

const deleteTables = async () => {
  const { deleteTable } = query;
  const tables = `${deleteTable}`;

  await connection.query(tables);
};

deleteTables();

export default deleteTables;
