import users from '../models/users';
import entries from '../models/entries';

class adminController {
  static viewUsers(req, res) {
    if (req.user.userType === 'admin') {
      return res.status(200).json({
        status: 200,
        data: users,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Unauthorized route',
    });
  }

  static viewEntries(req, res) {
    if (req.user.userType === 'admin') {
      return res.status(200).json({
        status: 200,
        data: entries,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Unauthorized route',
    });
  }

  static acceptEntry(req, res) {
    if (req.user.userType === 'admin') {
      const { entryId } = req.params;
      // eslint-disable-next-line radix
      const foundEntry = entries.find((e) => e.entryId === parseInt(entryId));
      if (foundEntry) {
        const upEntry = {
          entryId: foundEntry.entryId, createdOn: foundEntry.createdOn, createdBy: foundEntry.createdBy, title: foundEntry.title, type: foundEntry.type, location: foundEntry.location, status: 'Under Investigation', images: foundEntry.images, comment: foundEntry.comment,
        };
        entries[entries.indexOf(foundEntry)] = upEntry;
        return res.status(200).json({
          status: 200,
          message: 'Entry accepted',
          data: upEntry,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Entry not found',
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized route',
    });
  }

  static rejectEntry(req, res) {
    if (req.user.userType === 'admin') {
      const { entryId } = req.params;
      // eslint-disable-next-line radix
      const foundEntry = entries.find((e) => e.entryId === parseInt(entryId));
      if (foundEntry) {
        const upEntry = {
          entryId: foundEntry.entryId, createdOn: foundEntry.createdOn, createdBy: foundEntry.createdBy, title: foundEntry.title, type: foundEntry.type, location: foundEntry.location, status: 'Rejected', images: foundEntry.images, comment: foundEntry.comment,
        };
        entries[entries.indexOf(foundEntry)] = upEntry;
        return res.status(200).json({
          status: 200,
          message: 'Entry rejected',
          data: upEntry,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Entry not found',
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized route',
    });
  }
}
export default adminController;
