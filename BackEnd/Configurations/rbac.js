
const Rbac = require('easy-rbac');
const opts = require('./policy/policy');

userRbac = Rbac.create(opts);

module.exports = userRbac;
