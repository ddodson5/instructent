/*
 * Make sure to load this before the main 'modules' schema!
 * */

//SimpleSchema.messages({
//    "needsTrueAnswer": "You must mark at least one answer as correct"
//});


var questionTypes = _.keys(Instructent.Both.Schema.moduleTypes.QuestionTypes);
var infoTypes = _.keys(Instructent.Both.Schema.moduleTypes.InfoTypes);

var allModuleTypes = questionTypes.concat(infoTypes);

//console.log("Module Types: ", allModuleTypes);


var moduleSchema = Instructent.Both.Schema.modules =  new SimpleSchema({

    //The question content
    question:
    {
        type: Instructent.Both.Schema.questions
    },

    //The answer/answers
    answers:
    {
        type: Instructent.Both.Schema.answers,
        optional: true,

        //Answer should be required for any question-type module
        custom: function ()
        {
            var thisModuleType = this.field('moduleType').value;

            //If the module is a 'question' type and this answer field isn't set, throw a 'required' error.
            if ( (questionTypes.indexOf(thisModuleType) > -1)
                && !this.isSet
                && (!this.operator || (this.value === null || this.value === "")))
            {
                return "required";
            }
        }
    },

    //The id of the session to which the module belongs
    sessionId:{
        type: String
    },

    //The module type
    moduleType:{
        type: String,
        allowedValues: allModuleTypes
    },

    //Is this module live?
    isLive:{
        type: Boolean
    },

    //For sorting purposes
    index:{
        type: Number,
        //If the index isn't set, set it here
        autoValue: function(){
            if(this.isInsert)
            {
                if(!this.isSet)
                {
                    //Set as the number of existing modules belonging to this session, plus 1
                    return Instructent.Both.Collections.sessionsCollection.find({sessionId: Instructent.Both.Instructor.currentSessionId.get()}).count() + 1;
                }
            }
            else
            {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    }

});

