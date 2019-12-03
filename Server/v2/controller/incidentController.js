import conn from '../config/databaseConfig';
import incidentQuery from '../models/incidentQuery';

class incidentController {
  static async createIncident(req, res) {
    const {
      title,
      body,
      type,
      location,
      status,
      images,
      videos,
      comment,
    } = req.body;
    const createdBy = req.user.userid;
    const userType = req.user.type;
    if (userType === 'User') {
      const addIncident = await conn.query(incidentQuery.createIncident, [
        title,
        body,
        type,
        location,
        status,
        images,
        videos,
        comment,
        createdBy,
      ]);

      if (addIncident.rowCount === 1) {
        const disp = await conn.query(incidentQuery.findSpecific, [
          addIncident.rows[0].incidentid,
        ]);
        const creator = await conn.query(incidentQuery.findCreator, [createdBy]);
        return res.status(201).json({
          status: 201,
          data: disp.rows[0],
          creator: creator.rows[0].firstname,
        });
      }
    }
    return res.status(401).json({
      status: 401,
      error: 'Only users are allowed to creat incidents',
    });
  }
}
export default incidentController;
