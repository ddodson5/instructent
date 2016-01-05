
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 9/30/2015
 *   Notes:
 */

Instructent.Client.Site =
{
    title : "Instructent : Pretty Alright, I Guess"
};

//Add the main app-level namespace to the spacebars scope:
Helpers.addScope('Instructent', Instructent);

/****************************************************************
*
*
*              Site-wide helpers go here
*
*
* **************************************************************/

var helpers = {
    //Return true if the context module type is the same as the specified module type
    moduleIsOfType: function (moduleType)
    {

        return this.module.moduleType === moduleType;
    }

};

_.each(helpers, function (value, key)
       {
           Template.registerHelper(key, value);
       }
);

/****************************************************************
 *
 *
 *              Site-wide events go here
 *
 *
 * **************************************************************/

Template.layout_main.events({

    'click .logout': function (event)
    {
        event.preventDefault();
        Meteor.logout();
    }
});

/****************************************
*
* Animation CLass Definitions and Logic
*
*****************************************/

var inTransitions =
{
    "slide-fade-in": {
        duration:.5,
        options: {
            opacity: 0,
            x: '+=200'
        }
    }

};

var outTransitions =
{
    "slide-fade-out": {
        duration: 2,
        options: {
            opacity: 0,
            width: 0
        }
    }

};


Template.onRendered(function ()
                    {

                        var self = this;

                        //For each defined transition object, search for all elements containing the transition class
                        //name, and apply that transition to the elements.
                        _.map(inTransitions, function (transition, transitionClassSelector)
                        {
                            //console.log("SEARCHING FOR TRANSITION CLASS: ", transitionClassSelector);

                            //The jquery search requires a dot at the beginning to identify it as a 'class' attribute
                            var transitionClassSelector_searchString = "." + transitionClassSelector;

                            //Grab all matching dom elements in this template AND its subtemplates
                            var $currentTransitionElements = self.$(transitionClassSelector_searchString);

                            //To avoid applying the same transition multiple times, look at each element with this class
                            _.each($currentTransitionElements, function(transitionElement, key)
                                   {
                                       var $transitionElement = $(transitionElement);       //Wrap it in a jquery object

                                       //If the element has the specified selector class
                                       if($(transitionElement).hasClass(transitionClassSelector))
                                       {

                                           //Run the animation
                                           TweenMax.from(transitionElement, transition.duration, transition.options );

                                           //And then remove the specified selector so the animation won't run again on
                                           //the same element.
                                           $(transitionElement).removeClass(transitionClassSelector);

                                       }

                                   }
                            );

                        });
                    });

