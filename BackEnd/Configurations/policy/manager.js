
const allEndpoints=require('../..//routes//endpoints.js');

const managerPolicies = [
    allEndpoints.userProfile,
    allEndpoints.AuthMatch,
    allEndpoints.reserve,
];

module.exports = managerPolicies;
