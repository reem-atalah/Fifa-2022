
const jwt = require('jsonwebtoken');
const userRbac = require('./rbac');

const isAuthorized = (endPoint) => {
  return async (request, response, next) => {
    try {
      data = {
        Auth:request.headers.authorization,
        header:request.headers,
        req:request
      }
      if (request.headers.authorization) {
        const token = request.headers.authorization.split(' ')[1];
        
        // must enter token
        if (token) {
          // the token must be same as signed with it
          const decoded = jwt.verify(token, process.env.KEY);
          // does this token has access to this endpoint
          const isAllowed=await userRbac.can(decoded.role.toString(), endPoint);
          if (isAllowed) {
            request.decoded = decoded; 
            next();
          } else {
            response.status(401).json('Not Authorized');
          }
        } else {
          response.status(401).json('Token is Required');
        }
      } else {
        response.status(401).json('Token is Required');
      }
    } catch (error) {
      response.status(404).json('Error In Is Autorized Function');
    }
  };
};

module.exports = isAuthorized;
