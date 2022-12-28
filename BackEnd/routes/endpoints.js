
const userProfile = 'userProfile';
const AuthUser = 'Admin:AuthUser';
const AuthMatch= 'AuthMatch';
const reserve = 'reserve';

const endPoints = {
    userProfile,
    AuthUser, // authuser by admin only, to promote/delete users
    AuthMatch, //auth for creating/editing/deleting/show_reserved_seats for match
    reserve, //auth to reserve seats, any authorized user can reserve or cancel reservation
};

module.exports = endPoints;
