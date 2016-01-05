/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 9/30/2015
 *   Notes:
 */

//Make a spot for us to reference these
Instructent.Client.Router.Hooks = {};

/*
* Should return true or false depending on whether the passed in user is a logged in instructor
* */
var isLoggedInInstructor = function (user)
{
    var isLoggedInInstructor = false;

    //If the user is logged in
    if (user)
    {
        //Get the groups for this user
        var groups = Roles.getGroupsForUser(user);
        //console.log("GROUPS: ", groups);
        //
        if (groups)
        {
            _.each(groups, function (group)
                   {
                       //The only condition on which we should continue: User is logged in as instructor/global(which is the admin group)
                       if ((group === Instructent.Both.Permissions.Groups.instructor) || (group === Instructent.Both.Permissions.Groups.global))
                       {
                           isLoggedInInstructor = true;
                       }
                   }
            );

        }
    }

    return isLoggedInInstructor;

};

//Here, we ensure that any attempts to access sensitive pages are met with proper authorization requirements
var mustBeSignedInAsInstructor = Instructent.Client.Router.Hooks.mustBeSignedInAsInstructor = function ()
{
    //TODO: Dynamic layouts for when instructor/student is logged in vs not logged in
    //this.router.layout_siteWide("layout_main");

    if(isLoggedInInstructor(Meteor.user()))
    {
        this.next();
    }
    else
    {
        Router.go('instructor_signIn');
    }

};

//If a logged-in instructor/admin goes to the login page, redirect to the instructor dashboard
var redirectToInstructorDashboard = Instructent.Client.Router.Hooks.redirectToInstructorDashboard= function()
{
    //this.router.layout_siteWide("layout_main");

    if (isLoggedInInstructor(Meteor.user()))
    {
        //console.log("REDIRECTIN'");
        Router.go('instructor_dashboard');
    }
    else
    {
        this.next();
    }
};

Router.onBeforeAction(mustBeSignedInAsInstructor, {only: [Instructent.Client.Router.Routes.instructorDashboard.name, Instructent.Client.Router.Routes.instructorEditSession.name]});

//MAKE SURE THE THING BELOW HERE WORKS
Router.onBeforeAction(redirectToInstructorDashboard, {only: ['instructor_signIn']});