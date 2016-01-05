/**
 * Created by Devin Dodson on 9/25/2015.
 */
//Assign a default template
Router.configure({

    layoutTemplate: 'layout_main',

    loadingTemplate: 'loading'

    //notFoundTemplate: 'dataNotFound'
});

//Give the routes a default template based on their path -- ie, "route('/foo') looks for the 'foo' template
Router.setTemplateNameConverter(function (str) { return str; });

//Set the template to render if the 'data' function of a route returns false/undefined
Router.plugin('dataNotFound', {notFoundTemplate: 'dataNotFound'});

//Router.plugin('loading', {})

//Go through the routes we've set up for each view(in their .js files) and make them into bona-fide 'iron:router' routes
//Router.map(function() {
//    _.each(Instructent.Client.Router.Routes, function (route, name)
//    {
//        Router.route(route.path, {'name': name, 'template': name})
//    });
//});
//NOTE: Not using this method currently, in favor of defining the route with Router.route() in each view's .js file

