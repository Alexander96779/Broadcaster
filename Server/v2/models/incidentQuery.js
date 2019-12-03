const createIncident = ` insert into incidents (
    title,
    body,
    type,
    location,
    status,
    images,
    videos,
    comment,
    createdBy
) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING returning *`;

const findSpecific = `select incidentid, title, body, type, location, status, images, videos,
                comment, createdOn, createdBy from incidents where incidentid=($1)`;
const findAll = 'select * from incidents order by createdon desc';
const findOneToUpdate = `select incidentid, title, body, type, location, status, images, videos,
                comment, createdOn, createdBy from incidents where incidentid=($1)`;
const findCreator = `select userid, firstname, lastname, email, password, 
                    phonenumber, username, type from users where userid=($1)`;
const updateLocation = `update incidents set location=($1)
                        where incidentid=($2) RETURNING *`;
const updateComment = `update incidents set comment=($1)
                        where incidentid=($2) RETURNING *`;
const findOneToDelete = `select incidentid, title, body, type, location, status, images, videos,
                comment, createdOn, createdBy from incidents where incidentid=($1)`;
const deleteIncident = 'delete from incidents where incidentid = ($1)';

export default {
  createIncident,
  findSpecific,
  findAll,
  findOneToUpdate,
  findCreator,
  updateLocation,
  updateComment,
  findOneToDelete,
  deleteIncident,
};
