/**
 * Created by Devin Dodson on 10/1/2015.
 */



/*
 * USER CREATION CONTROLS:
 *
 *   For now, let's limit client-side user creation to the logged-in admin
 *
 * */
Meteor.startup(function ()
               {
                   Accounts.validateNewUser(function (user)
                                            {
                                                var loggedInUser = Meteor.user();

                                                //If there is a logged in admin attempting the creation, allow it
                                                if(Roles.userIsInRole(loggedInUser, [Instructent.Both.Permissions.Roles.admin]))
                                                {
                                                    return true;
                                                }

                                                //    Otherwise, throw an error
                                                var instructErr = Instructent.Both.Errors.onlyAdminCanCreate;
                                                throw new Meteor.Error(instructErr.title, instructErr.message);
                                            });
               }
);

/*
 * USER LOGIN CONTROLS:
 *
 *
 *
 *
 * */

Meteor.startup(
    function ()
    {
        //From what I understand, all login attempts go through this function, then to the rest of the login validation
        Accounts.validateLoginAttempt(

            //Note that the wrappedUser parameter is a user object wrapped with some other validation-related info
            function (wrappedUser)
            {
                //If a user is already logged in, don't allow a login

                var loggedInUser = Meteor.user();

                var loggedInErr = Instructent.Both.Errors.userAlreadyLoggedIn;
                if(loggedInUser) throw new Meteor.Error(loggedInErr.title, loggedInErr.message);

                //If a user is a student, don't allow a password-based instructor login

                //var groups = Roles.getGroupsForUser(wrappedUser.user);
                //if(groups)
                //{
                //    _.each(groups, function(group){
                //        if( group === Instructent.Both.Permissions.Groups.student)
                //        {
                //            throw new Meteor.Error("Must be instructor", "You must be an instructor to log in here");
                //        }
                //    });
                //}

                return true;
            }
        );
    }
);