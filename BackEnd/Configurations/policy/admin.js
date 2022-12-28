
const allEndpoints=require('../..//routes//endpoints.js');

const adminPolicies = [
    allEndpoints.userProfile,
    allEndpoints.AuthMatch,
    allEndpoints.reserve,
    allEndpoints.AuthUser,
];

module.exports = adminPolicies;
