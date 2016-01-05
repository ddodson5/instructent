
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 9/23/2015
 *   Notes:
 */

/* -------- Route --------- */
var student_route = Instructent.Client.Router.Routes.student = {name: "student", path: "/student"};
Router.route(student_route.path, {name: student_route.name, template: student_route.name});

Template.student.helpers({


});

Template.student.events({

    'submit form' : function (event)
    {
        event.preventDefault();


    }

});