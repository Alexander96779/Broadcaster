import entries from '../models/entries';
import entryValidation from '../helpers/entryValidation';

class entryController {
  static createEntry(req, res) {
    if (req.user.userType === 'user') {
      const {
        createdOn, title, type, location, image, video,
      } = req.body;
      const eId = entries.length + 1;
      const newEntry = entryValidation.validate({
        entryId: eId, createdOn, createdBy: req.user.id, title, type, location, status: 'draft', image, video,
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
}

export default entryController;
