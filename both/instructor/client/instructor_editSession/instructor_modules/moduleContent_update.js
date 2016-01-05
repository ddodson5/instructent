
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 10/17/2015
 *   Notes:
 */

Template.updateModuleContent.helpers({

    isMultipleChoice: function ()
    {
        return this.module.moduleType === Instructent.Both.Schema.moduleTypes.QuestionTypes.MULTIPLE_CHOICE.value;
    },

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
    }
});

Template.displayModuleContent.events({


});