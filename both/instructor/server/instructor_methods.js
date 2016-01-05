
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 9/30/2015
 *   Notes:
 */

Meteor.methods({

    /****************************
     *
     *       SESSIONS
     *
     ******************************/

    /*
     * Insert a new session into the current user's sessionsCollection.
     *
     * session.name is passed in(better at least check that it's a string)
     * session.isLive is... defaulted to false, for now
     * session.ownerId is set to the proper user within the function
     * */
    session_insertNew: function()
    {
        //If there is no user, then we definitely shouldn't be fiddling with this
        if(!this.userId)
        {
            var unauthorizedErr = Instructent.Both.Errors.unauthorized;
            throw new Meteor.Error(unauthorizedErr.title, unauthorizedErr.message);
        }

        //If the name is not a string or number, throw a match error
        //check(sessionName, Match.OneOf(String, Number, undefined));

        //if the user isn't an instructor, they also shouldn't be allowed to do this.
        // Wouldn't be the end of the world I guess, but still seems like bad practice to allow it.

        return Instructent.Both.Collections.sessionsCollection.insert({ownerId: this.userId});
    },

    /*
    * Delete the specified session.
    * Check the id type, as well as checking to ensure that the current user is the owner of the session.
    * */
    deleteSession: function (sessionId)
    {
        check(sessionId, String);

        //Remove the session from this user with the matching id, if it exists
        var session = Instructent.Both.Collections.sessionsCollection.remove({ _id: sessionId, ownerId: Meteor.userId() });

        //If it doesn't exist, throw a fit
        if(!session) throw new Meteor.Error("no such session", "That session can't be deleted, because it doesn't exist.");
    },

    /*
    *   If the specified session is hidden, make it visible
    * */
    session_setLive: function (sessionId)
    {
        check(sessionId, String);

        //Update the session if it has the specified sessionId, and if the current user owns it
        var numSessionsUpdated = Instructent.Both.Collections.sessionsCollection.update({ _id: sessionId, ownerId: Meteor.userId() }, {$set: {isLive: true}});
    },

    /*
     *   If the specified session is visible, hide it
     * */
    session_setHidden: function (sessionId)
    {
        check(sessionId, String);

        //Update the session if it has the specified sessionId, and if the current user owns it
        var numSessionsUpdated = Instructent.Both.Collections.sessionsCollection.update({ _id: sessionId, ownerId: Meteor.userId() }, {$set: {isLive: false}});
    },

    /*************************
    *
    *       MODULES
    *
    ***************************/

    /*
     *   If the specified module is hidden, make it visible
     * */
    module_setLive: function (moduleId)
    {
        check(moduleId, String);

        //Update the module if it has the specified moduleId, and if the current session owns it
        var numSessionsUpdated = Instructent.Both.Collections.modulesCollection.update({ _id: moduleId, ownerId: Meteor.userId() }, {$set: {isLive: true}});
    },

    /*
     *   If the specified module is visible, hide it
     * */
    module_setHidden: function (moduleId)
    {
        check(moduleId, String);

        //Update the module if it has the specified moduleId, and if the current session owns it
        var numSessionsUpdated = Instructent.Both.Collections.modulesCollection.update({ _id: moduleId, ownerId: Meteor.userId() }, {$set: {isLive: false}});
    },



    /*
     * Insert a new module into the current user's modulesCollection.
     *
     * module.ownerId is set to the proper user within the function
     * */
    module_insertNew: function()
    {
        //If there is no user, then we definitely shouldn't be fiddling with this
        if(!this.userId)
        {
            var unauthorizedErr = Instructent.Both.Errors.unauthorized;
            throw new Meteor.Error(unauthorizedErr.title, unauthorizedErr.message);
        }

        //If the name is not a string or number, throw a match error
        //check(moduleName, Match.OneOf(String, Number, undefined));

        //if the user isn't an instructor, they also shouldn't be allowed to do this.
        // Wouldn't be the end of the world I guess, but still seems like bad practice to allow it.

        return Instructent.Both.Collections.modulesCollection.insert({ownerId: this.userId});
    },

    /*
     * Delete the specified module.
     * Check the id type, as well as checking to ensure that the current user is the owner of the module.
     * */
    module_delete: function (moduleId)
    {
        check(moduleId, String);

        //Remove the module from this user with the matching id, if it exists
        var module = Instructent.Both.Collections.modulesCollection.remove({ _id: moduleId, ownerId: Meteor.userId() });

        //If it doesn't exist, throw a fit
        if(!module) throw new Meteor.Error("no such module", "That module can't be deleted, because it doesn't exist.");
    }

});