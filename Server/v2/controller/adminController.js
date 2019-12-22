import conn from '../config/databaseConfig';
import adminQuery from '../models/adminQuery';

class adminController {
  static async acceptFlag(req, res) {
    const {
      status,
    } = req.body;
    const incidentId = parseInt(req.params.incidentid);
    const userType = req.user.type;
    if (userType === 'Admin') {
      const findIncident = await conn.query(adminQuery.findToUpdate, [incidentId]);
      if (findIncident.rowCount > 0) {
        await conn.query(adminQuery.accept, [status, incidentId]);
        const show = await conn.query(adminQuery.findSpecific, [incidentId]);
        return res.status(200).json({
          status: 200,
          message: 'Incident status changed',
          data: show.rows[0],
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Sorry, Incident not found',
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Forbidden route',
    });
  }

  static async rejectFlag(req, res) {
    const {
      status,
    } = req.body;
    const incidentId = parseInt(req.params.incidentid);
    const userType = req.user.type;
    if (userType === 'Admin') {
      const findIncident = await conn.query(adminQuery.findToUpdate, [incidentId]);
      if (findIncident.rowCount > 0) {
        await conn.query(adminQuery.reject, [status, incidentId]);
        const show = await conn.query(adminQuery.findSpecific, [incidentId]);
        return res.status(200).json({
          status: 200,
          message: 'Incident is rejected',
          data: show.rows[0],
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Sorry, Incident not found',
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Forbidden route',
    });
  }
}

export default adminController;
