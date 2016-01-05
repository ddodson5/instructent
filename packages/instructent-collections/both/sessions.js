/**
 * Created by Devin Dodson on 7/25/2015.
 */


var sessionSchema = Instructent.Both.Schema.sessions = new SimpleSchema({

    //The id of the instructor who created this session
    ownerId: {
        type: String,
        label: "Created by"
    },

    //The name of this session
    name:
    {
        type: String,
        label: "Name",
        max: 200,
        //If the name is not set, set it here
        autoValue: function(){
            if (this.isInsert)
            {
                if(!this.isSet)
                {
                    return "Session " + (Instructent.Both.Collections.sessionsCollection.find({ownerId: Meteor.userId()}).count() + 1);
                }
            }
            else
            {
                this.unset();  // Prevent user from supplying their own value
            }


        }
    },

    //Whether this session is currently visible to students or not
    isLive:
    {
        type: Boolean,
        defaultValue: false
    },

    //For sorting purposes
    index:{
        type: Number,
        //If the index isn't set, set it here
        autoValue: function(){
            if (this.isInsert)
            {
                if(!this.isSet)
                {
                    //Set as the number of existing sessions belonging to this user, plus 1
                    return Instructent.Both.Collections.sessionsCollection.find({ownerId: Meteor.userId()}).count() + 1;
                }
                else
                {
                    this.unset();  // Prevent user from supplying their own value
                }
            }
        }
    },

    createdAt: Instructent.Both.Schema.Helpers.createdAt,

    updatedAt: Instructent.Both.Schema.Helpers.updatedAt

});


//Meteor.publish("currentSession", function (sessionId) {
//    return ClassSessions.find(sessionId);
//});

