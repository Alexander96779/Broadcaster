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
      error: 'Only users are allowed to create incidents',
    });
  }

  static async viewAll(req, res) {
    if (req.user.type === 'Admin') {
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
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized access',
    });
  }

  static async viewSpecific(req, res) {
    const incidentId = parseInt(req.params.incidentid);
    const userId = req.user.userid;
    const findIncident = await conn.query(incidentQuery.findSpecific, [incidentId]);
    if (findIncident.rowCount > 0) {
      if (findIncident.rows[0].createdby === userId) {
        return res.status(200).json({
          status: 200,
          message: 'Incident found',
          data: findIncident.rows[0],
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized access',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Incident not found',
    });
  }

  static async deleteIncident(req, res) {
    const incidentId = parseInt(req.params.incidentid);
    const userId = req.user.userid;
    const findIncident = await conn.query(incidentQuery.findOneToDelete, [incidentId]);
    if (findIncident.rowCount > 0) {
      if (findIncident.rows[0].createdby === userId) {
        await conn.query(incidentQuery.deleteIncident, [incidentId]);
        return res.status(200).json({
          status: 200,
          message: 'Incident well deleted',
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized access',
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Incident not found',
    });
  }

  static async updateLocation(req, res) {
    const {
      location,
    } = req.body;
    const incidentId = parseInt(req.params.incidentid);
    const userId = req.user.userid;
    const findIncident = await conn.query(incidentQuery.findOneToUpdate, [incidentId]);
    if (findIncident.rowCount > 0) {
      if (findIncident.rows[0].createdby === userId) {
        await conn.query(incidentQuery.updateLocation, [location, incidentId]);
        const show = await conn.query(incidentQuery.findSpecific, [incidentId]);
        return res.status(200).json({
          status: 200,
          message: 'Location well updated',
          data: show.rows[0],
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized access',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Incident not found',
    });
  }

  static async updateComment(req, res) {
    const {
      comment,
    } = req.body;
    const incidentId = parseInt(req.params.incidentid);
    const userId = req.user.userid;
    const findIncident = await conn.query(incidentQuery.findOneToUpdate, [incidentId]);
    if (findIncident.rowCount > 0) {
      if (findIncident.rows[0].createdby === userId) {
        await conn.query(incidentQuery.updateComment, [comment, incidentId]);
        const show = await conn.query(incidentQuery.findSpecific, [incidentId]);
        return res.status(200).json({
          status: 200,
          message: 'Comment well updated',
          data: show.rows[0],
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized access',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Incident not found',
    });
  }
}
export default incidentController;
