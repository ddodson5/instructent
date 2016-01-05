/**
 * Created by Devin Dodson on 10/4/2015.
 */

/*
* Here we define the errors to be used in the permissions
* */

var errors = Instructent.Both.Errors = {};

errors.onlyAdminCanCreate = {
    title: "onlyAdminCanCreate",
    message: "Only the administrative user can create users."
};

errors.userAlreadyLoggedIn = {
    title: "userAlreadyLoggedIn",
    message: "Error: A user is already logged in to this client.\n Log out if you wish to switch users."
};

errors.noStudentLogins = {
    title: "noStudentLogins",
    message: "Students cannot log in using the Instructor sign-in page."
};

errors.unauthorized = {
    title: "unauthorized",
    message: "Sorry this is so generic -- but you don't have permission to do that."
};