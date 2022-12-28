
const roles = require('../roles');
const fanPolicies = require('./fan');
const adminPolicies = require('./admin');
const managerPolicies = require('./manager');

/* ============== <-- Match Between Roles & There EndPoints --> ============== */
const opts = {
  [roles.MANAGER]: {
    can: managerPolicies,
  },
  [roles.ADMIN]: {
    can: adminPolicies,
  },
  [roles.FAN]: {
    can: fanPolicies,
  },
};

module.exports = opts;
