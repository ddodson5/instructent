
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 10/17/2015
 *   Notes:
 */

Template.displayModuleContent.helpers({

    //Return true if the context module type is the same as the specified module type
    //moduleIsOfType: function (moduleType)
    //{
    //
    //    return this.module.moduleType === moduleType;
    //},

    /*
     * Get the answers, all combined in whatever order
     * */
    multipleChoiceAnswers: function ()
    {
        var trueAnswers = this.module.answers.multipleChoiceAnswers.trueAnswers;
        var falseAnswers = this.module.answers.multipleChoiceAnswers.falseAnswers;

        /*
        * wrap the answers so they all have true/false flags indicating correctness
        * */
        var wrappedTrueAnswers = trueAnswers.map(function(currentAnswer, index)
                                                 {

                                                     return _.extend({value: currentAnswer},
                                                         {isTrueAnswer: true});

                                                 });

        var wrappedFalseAnswers = falseAnswers.map(function(currentAnswer, index)
                                                   {

                                                       return _.extend({value: currentAnswer},
                                                           {isTrueAnswer: false});

                                                   });

        var allAnswers = wrappedTrueAnswers.concat(wrappedFalseAnswers);
        return allAnswers;
    },

    /*
     * Get the answers, all combined in whatever order
     * */
    singleChoiceAnswers: function ()
    {
        var trueAnswers = this.module.answers.singleChoiceAnswers.trueAnswers;
        var falseAnswers = this.module.answers.singleChoiceAnswers.falseAnswers;

        /*
         * wrap the answers so they all have true/false flags indicating correctness
         * */
        var wrappedTrueAnswers = trueAnswers.map(function(currentAnswer, index)
                                                 {

                                                     return _.extend({value: currentAnswer},
                                                         {isTrueAnswer: true});

                                                 });

        var wrappedFalseAnswers = falseAnswers.map(function(currentAnswer, index)
                                                   {

                                                       return _.extend({value: currentAnswer},
                                                           {isTrueAnswer: false});

                                                   });

        var allAnswers = wrappedTrueAnswers.concat(wrappedFalseAnswers);
        return allAnswers;
    }


});

Template.displayModuleContent.events({


});