const findToUpdate = `select incidentid, title, body, type, location, status, images, videos,
                    comment, createdOn, createdBy from incidents where incidentid=($1)`;

const findSpecific = `select incidentid, title, body, type, location, status, images, videos,
                    comment, createdOn, createdBy from incidents where incidentid=($1)`;
const reject = `update incidents set status=($1) 
                where incidentid=($2) RETURNING*`;

const accept = `update incidents set status=($1) 
                where incidentid=($2) RETURNING*`;

export default {
  findToUpdate,
  findSpecific,
  reject,
  accept,
};
