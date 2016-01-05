
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 9/23/2015
 *   Notes:
 */

/* -------- Route --------- */
var instructorDashboard_route = Instructent.Client.Router.Routes.instructorDashboard = {name: "instructor_dashboard", path: "/instructor"};
Router.route(instructorDashboard_route.path, {name: instructorDashboard_route.name, template: instructorDashboard_route.name ,
    waitOn: function()
    {
        //console.log("--------instructor subscription running---------- ");

        return [Meteor.subscribe('userSessions')];
    }
});

Template.instructor_dashboard.onRendered(
    function ()
    {
        this.$("#sortableSessions").sortable({
            handle: ".handle",
            //When the order of the sessions is changed, update the collection to make it persistent
            update: function(event, ui) {

                console.log(Blaze.getData(ui.item.get(0)));

                //update the dragged Item's rank
                //Instructent.Both.Collections.sessionsCollection.update({_id: Blaze.getData(element)._id}, {$set: {index: newRank}})

            }
        });

        /*
         Initialize the modal that shows when the user chooses to delete a session
         */
        //$('.modal_confirmDeleteSession').modal(
        //    {
        //
        //    });
    }
);

Template.instructor_dashboard.helpers({

    session: function ()
    {
        return Instructent.Both.Collections.sessionsCollection.find().fetch();
    }
});

Template.instructor_dashboard.events({



    /*
     * Create a new session, and enter into the dashboard for it
     * */
    'click .newSession': function (event)
    {
        //Try to create the new session with a schema-determined name
        Meteor.call(Instructent.Both.MethodNames.session_insertNew, function(error, result){
            if(error) Instructent.Both.Errors.generalErrorMessage.set(error.reason);
        });

    }

});

Template.sessionContent.onRendered(function ()
                                   {
                                       //this.$('tr').draggable();
                                   });

Template.sessionContent.helpers({

    getPrettyDate: function (date)
    {
        var momentDate = moment(date);
        return momentDate.format("M/D/YYYY, h:mm a");
    }
});

Template.sessionContent.events({

    /*
    * Toggle the live/hidden state of the specified session
    * */
    'click .toggleLive': function ()
    {
        console.log(this._id);
        if(this.isLive)
        {
            //If the session is live, hide it
            Meteor.call("session_setHidden", this._id, function(error, result){
                if(error) Instructent.Both.Errors.generalErrorMessage.set(error.reason);
            });
        }
        else
        {
            //If the session is hidden, show it
            Meteor.call("session_setLive",this._id, function(error, result){
                if(error) Instructent.Both.Errors.generalErrorMessage.set(error.reason);
            });
        }
    },


    /*
     * User has chosen to delete a session -- show a confirmation dialog
     * */
    'click .deleteSession': function (event)
    {
        //Show confirmation modal
        $('.modal_confirmDeleteSession').modal('show');

        //Attach the current session id to its content, so it knows what to delete
        Template.modal_confirmDelete_content.currentSessionId = new ReactiveVar(this._id);
    }

});

Template.modal_confirmDelete_content.events({

    /*
     * User has confirmed they want to delete a session, so call the method to do so.
     * */
    'click .approve': function (event)
    {
        Meteor.call('deleteSession', Template.modal_confirmDelete_content.currentSessionId.get(), function(error, result) {
            if (error)
            {
                Instructent.Both.Errors.generalErrorMessage.set(error.reason);
            }
        });
    }
});