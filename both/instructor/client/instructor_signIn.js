
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 9/28/2015
 *   Notes:
 */

/* -------- Route --------- */

var instructorSignIn_route = Instructent.Client.Router.Routes.instructorSignIn = {name: "instructor_signIn", path: "/instructor/sign-in"};
Router.route(instructorSignIn_route.path, {name: instructorSignIn_route.name, template: instructorSignIn_route.name});



/* -------- Template ----------- */

Template.instructor_signIn.onCreated(
    function ()
    {
        Instructent.Both.Errors.signInErrorMessage = new ReactiveVar("");
    }
);


Template.instructor_signIn.helpers({

    signInErrorMessage : function ()
    {
        return Instructent.Both.Errors.signInErrorMessage.get();
    }

});

Template.instructor_signIn.events({

    'submit form': function (event)
    {
        event.preventDefault();

        var username = event.target.username.value;
        var password = event.target.password.value;

        //Try to log in with the presented credentials
        Meteor.loginWithPassword(username, password, function (error)
        {
            if(error)
            {
                //Set the errors to display to the user
                Instructent.Both.Errors.signInErrorMessage.set(error.reason);
            }
            else
            {
                //Wipe the errors and go
                Instructent.Both.Errors.signInErrorMessage.set("");
                Router.go("instructor_dashboard");

            }
        });


    }

});