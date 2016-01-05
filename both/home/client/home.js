
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 9/23/2015
 *   Notes:
 */

/* -------- Route --------- */
var home_route = Instructent.Client.Router.Routes.home = {name: "home", path: "/"};
Router.route(home_route.path, {name: home_route.name, template: home_route.name});

Template.home.helpers({


});

Template.home.events({


});