import entries from '../models/entries';
import entryValidation from '../helpers/entryValidation';

class entryController {
  static createEntry(req, res) {
    const { userType } = req.user;
    if (userType === 'user') {
      const {
        createdOn, title, type, location, images, videos,
      } = req.body;
      const eId = entries.length + 1;
      const newEntry = entryValidation.validate({
        entryId: eId, createdOn, createdBy: req.user.id, title, type, location, status: 'draft', images, videos,
      });
      if (!newEntry.error) {
        entries.push(newEntry.value);
        return res.status(201).json({
          status: 201,
          data: newEntry,
          message: 'Redflag created successfully',
        });
      }
      const validationError = newEntry.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: validationError,
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Only users are allowed to add entries',
    });
  }

  static viewAll(req, res) {
    if (entries.length > 0) {
      return res.status(200).json({
        status: 200,
        data: entries,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'It seems like there are no entries yet!',
    });
  }

  static viewSpecific(req, res) {
    const { entryId } = req.params;
    const foundEntry = entries.find((entry) => entry.entryId === parseInt(entryId));
    if (foundEntry) {
      return res.status(200).json({
        status: 200,
        data: foundEntry,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Entry not found',
    });
  }

  static updateEntry(req, res) {
    const { userType } = req.user;
    if (userType === 'user') {
      const { entryId } = req.params;
      const foundEntry = entries.find((e) => e.entryId === parseInt(entryId));
      if (foundEntry) {
        if (req.user.id === foundEntry.createdBy) {
          const updatedEntry = {
            entryId: foundEntry.entryId, createdOn: foundEntry.createdOn, createdBy: foundEntry.createdBy, title: foundEntry.title, type: foundEntry.type, location: req.body.location, status: foundEntry.status, images: foundEntry.images, comment: foundEntry.comment,
          };
          entries[entries.indexOf(foundEntry)] = updatedEntry;
          return res.status(200).json({
            status: 200,
            data: updatedEntry,
            message: 'Location updated',
          });
        }
        return res.status(401).json({
          status: 401,
          error: 'Can not update this entry',
        });
      }
      return res.status(403).json({
        status: 403,
        error: 'Entry not found',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Unauthorized access',
    });
  }

  static deleteEntry(req, res) {
    const { entryId } = req.params;
    const foundEntry = entries.find((e) => e.entryId === parseInt(entryId));
    const userId = req.user.id;
    if (foundEntry && foundEntry.createdBy === userId) {
      entries.splice(entries.indexOf(foundEntry));
      return res.status(200).json({
        status: 200,
        message: 'Entry deleted successfully',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Entry not found',
    });
  }
}

export default entryController;
