
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 10/9/2015
 *   Notes:
 */

var sessionId;

/* -------- Route --------- */
var instructorEditSession_route = Instructent.Client.Router.Routes.instructorEditSession = {name: "instructor_editSession", path: "/instructor/session/:_id"};
Router.route(instructorEditSession_route.path,
    {
        name: instructorEditSession_route.name,
        template: instructorEditSession_route.name,
        waitOn: function()
        {
            //console.log("--------instructor subscription running---------- ");
            sessionId = this.params._id;

            return [Meteor.subscribe('currentSession', sessionId), Meteor.subscribe('sessionModules', sessionId)];
        },

        data:function(){

            //This is where we will place all the data to be passed to the dom/events/helpers
            var data = {};

            // If there is no session id specified, bail
            if(!sessionId ) return false;

            var foundSession = Instructent.Both.Collections.sessionsCollection.findOne({_id: sessionId});

            // If the specified session doesn't exist, bail
            if(!foundSession) return false;

            //If it's a legit session, then set it where it can be easily accessed everywhere
            data.currentSession = foundSession;



            /*************************************************************************************
             *
             *   Wrap the modules for this session, if any exist, and pass them on to be displayed
             *
             *************************************************************************************/

            //Get the raw modules
            var unwrappedSessionModules = Instructent.Both.Collections.modulesCollection.find({sessionId: foundSession._id});

            //Wrap 'em in a reactive var, so that the changes made to them will be rendered to the page
            data.wrappedSessionModules = new ReactiveVar( unwrappedSessionModules.map(function(document, index, cursor)
                                                                                      {

                                                                                          //All modules start out being displayed
                                                                                          return _.extend({module: document},
                                                                                              {
                                                                                                  state: Instructent.Both.Schema.moduleTypes.States.DISPLAY
                                                                                              });

                                                                                      })
            );

            /************************************************************
             *
             *      Set up the 'no modules' message
             *
             ****************************************************************/

                //We want to track the number of modules without having to recalculate it every time
            data.numModules = new ReactiveVar(unwrappedSessionModules.count());

            //A flag to change when the user opts to close the 'no modules' message
            data.closeEmptyMessageClicked = new ReactiveVar(false);

            data.displayEmptyMessage = new ReactiveVar(false);


            Tracker.autorun(function ()
                            {
                                //If there are no modules and the user hasn't closed the message, display it
                                if( data.numModules.get() === 0 && data.closeEmptyMessageClicked.get() === false)
                                {data.displayEmptyMessage.set(true)}

                                //If there are modules or the user closed the message, and the message wasn't already
                                //invisible, transition it out and remove it from the dom
                                else
                                {
                                    if(data.displayEmptyMessage.get() !== false)
                                    {
                                        TweenMax.to('#noMessage', .75,
                                            {
                                                opacity:0,
                                                onComplete: function ()
                                                {
                                                    data.displayEmptyMessage.set(false);
                                                }
                                            });
                                    }

                                }

                            }
            );




            return data;
        }
    });

Template.instructor_editSession.helpers({

    wrappedModules: function ()
    {
        return this.wrappedSessionModules.get();
    },

    questionModuleTypes: function ()
    {
        return _.toArray(Instructent.Both.Schema.moduleTypes.QuestionTypes);
    },

    informationModuleTypes: function ()
    {
        return _.toArray(Instructent.Both.Schema.moduleTypes.InfoTypes);
    },

    displayEmptyMessage: function ()
    {
        return this.displayEmptyMessage.get();
        //return this.numModules.get() === 0 && this.closeEmptyMessage.get() === false;
    }

});

Template.instructor_editSession.events({

    'click .newModule': function (event)
    {

        var tempSessions = Template.parentData().wrappedSessionModules.get();

        var wrappedNewModule = {};

        var newModuleType = this.value;
        wrappedNewModule.module = {

            //This stuff should stay the same for all new modules
            sessionId: Template.parentData().currentSession._id,
            index: tempSessions.length + 1,
            isLive: false,
            moduleType: newModuleType

        };

        //While this is dependent on the type of module being added

        //MULTIPLE CHOICE
        if(newModuleType === Instructent.Both.Schema.moduleTypes.QuestionTypes.MULTIPLE_CHOICE.value)
        {
            wrappedNewModule.module.question = {
                multipleChoiceQuestion: ""
            };

            wrappedNewModule.module.answers= {
                multipleChoiceAnswers: {
                    falseAnswers: ["MULTIPLE CHOICE"],
                        trueAnswers: []
                }
            };
        }

        //MESSAGE
        if(newModuleType === Instructent.Both.Schema.moduleTypes.InfoTypes.MESSAGE.value)
        {
            wrappedNewModule.module.question = {
                message: "MESSAGE"
            };

        }

        wrappedNewModule.state = Instructent.Both.Schema.moduleTypes.States.UPDATE;

        tempSessions.push(wrappedNewModule);

        Template.parentData().wrappedSessionModules.set(tempSessions);

        var tempNumModules = Template.parentData().numModules.get();
        Template.parentData().numModules.set(++tempNumModules);

    }

});

///*
//*   The context parameter here has the same scope as that just outside of the 'animate' block that calls it
//* */
//Instructent.Client.TransitionHelpers.noModulesToDisplay = function (context)
//{
//    return context.numModules.get() === 0;
//};
//
//Instructent.Client.TransitionHelpers.alwaysTransition = function (context)
//{
//    return true;
//};
//
//Template.animationBlock.onRendered(function (){
//
//    var self = this;
//
//    //console.log("CONTEXT: ", this);
//
//    //Set dependencies so this will run whenever the conditional function changes values
//    this.autorun(function ()
//                 {
//                     //The JQuery object we will be applying in/out transitions to.
//                     var thingToAnimate = self.$('.animated');
//
//                     //The string name of the conditional function.
//                     var conditionalFunctionName = self.data.conditionalFunction;
//
//                     //The string name of the transition type to be used.
//                     //If none specified, use default for Semantic UI( should be 'fade' )
//                     var transitionType = self.data.transitionType;
//
//
//
//                    /*
//                    * Alright, this is a nasty looking if statement, mostly due to the mix of dot and bracket notation
//                    *
//                    * Since the context for this block is the child of the calling template, pass the parent data to
//                    * the conditional function.
//                    * */
//                     if(Instructent.Client.TransitionHelpers[conditionalFunctionName]( self.parent().data ))
//                     {
//                         //console.log("SHOW");
//
//                         //If the thing to animate isn't already visible, then transition it in
//                         if(!thingToAnimate.transition('is visible'))
//                         {
//                             thingToAnimate.transition(transitionType + ' in')
//                         }
//                     }
//                     else
//                     {
//                         //console.log("HIDE");
//
//                         //If the thing to animate isn't already hidden, then transition it out
//                         if(thingToAnimate.transition('is visible'))
//                         {
//                             thingToAnimate.transition(transitionType + ' out')
//                         }
//                     }
//                 });
//
//});

Template.emptyMessage.events({

    'click .close': function (event, template)
    {
        this.closeEmptyMessageClicked.set(true);
    }
});