const allEndpoints=require('../..//routes//endpoints.js');

const managerPolicies = [
    allEndpoints.manager,
    allEndpoints.fan
];

module.exports = managerPolicies;
