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
}
export default adminController;
