
const allEndpoints=require('../..//routes//endpoints.js');

const adminPolicies = [
    allEndpoints.fan,
    allEndpoints.manager,
    allEndpoints.admin
];

module.exports = adminPolicies;
