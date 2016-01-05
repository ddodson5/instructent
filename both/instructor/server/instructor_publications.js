/**
 * Created by Devin Dodson on 10/6/2015.
 */
//Publications

/*
* Publish a given users' available sessions; shouldn't need to filter for roles, since students just shouldn't have
* any sessions to begin with. If they do, then I still don't see what harm it does to expose them.
* */
Meteor.publish('userSessions', function()
{
    return Instructent.Both.Collections.sessionsCollection.find({'ownerId': this.userId});
});

/*
 * Publish a specific session's info, if it belongs to the logged-in user
 * */
Meteor.publish('currentSession', function(sessionId)
{
    //We don't trust the nasty user data, do weeze?
    check(sessionId, String);

    return Instructent.Both.Collections.sessionsCollection.find({'ownerId': this.userId, '_id': sessionId });
});

/*
 * Publish the modules belonging to a given session, if that session belongs to the logged-in user
 * */
Meteor.publish('sessionModules', function(sessionId)
{
    check(sessionId, String);

    //Check to make sure that the specified session belongs to the logged-in user
    if(Instructent.Both.Collections.sessionsCollection.find({'ownerId': this.userId, _id: sessionId }))
    {
        return Instructent.Both.Collections.modulesCollection.find({'sessionId': sessionId});

    }
    //if(  )
});
