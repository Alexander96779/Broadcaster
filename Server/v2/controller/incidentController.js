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

  static async viewAll(req, res) {
    const all = await conn.query(incidentQuery.findAll);
    if (all.rowCount > 0) {
      return res.status(200).json({
        status: 200,
        incidents: all.rows,
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Yu do not have any incident records yet',
    });
  }

  static async viewSpecific(req, res) {
    const incidentId = parseInt(req.params.incidentid);
    const findIncident = await conn.query(incidentQuery.findSpecific, [incidentId]);
    if (findIncident.rowCount > 0) {
      return res.status(200).json({
        status: 200,
        message: 'Article found',
        data: findIncident.rows[0],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Incident not found',
    });
  }
}
export default incidentController;
