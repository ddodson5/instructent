
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 9/24/2015
 *   Notes:
 */

Template.layout_main.onCreated(

    function ()
    {
        //This guy will be used to display errors to the user, if need be
        Instructent.Both.Errors.generalErrorMessage = new ReactiveVar("");
    }
);

Template.mainMenu.helpers({

    /*
     * If the 1st level of the current path is equal to the passed-in path base, then return true
     *
     * Example: "localhost:3000/instructor/thing" matches when selectedPathBase='instructor'
     * and "localhost:3000/" matches when selectedPathBase=''
     * */
    //isActivePath : function (selectedPathBase)
    //{
    //    var pathParts = Router.current().route.path().split("/");
    //
    //    //Since pathParts[1] yields only an empty string
    //    var mainPath = pathParts[1];
    //
    //    return mainPath === selectedPathBase ? "active" : "";
    //}

});

Template.layout_main.helpers({

    /*
     * Return the reactive general error message
     * */
    generalErrorMessage: function ()
    {
        return Instructent.Both.Errors.generalErrorMessage.get();
    }

});

Template.errorMessage.events({

    'click .close': function (event, template)
    {
        //template.$('.message').transition('fade');
        Instructent.Both.Errors.generalErrorMessage.set("");
    },

    'show' : function (event)
    {
        console.log("HEY");
    }
});