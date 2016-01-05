/**
 * Created by Devin Dodson on 9/7/2015.
 */

//A custom message
SimpleSchema.messages({
    "minCount trueAnswers": "You must mark at least one answer as correct"
});

/*Answer Schema*/

var multipleChoiceAnswerSchema = new SimpleSchema({

    trueAnswers: {
        type: [String],
        minCount: 1
    },

    falseAnswers: {
        type: [String],
        optional: true
    }

});

var singleChoiceAnswerSchema = new SimpleSchema({

    trueAnswers: {
        type: [String],
        minCount: 1,
        maxCount: 1
    },

    falseAnswers: {
        type: [String],
        optional: true
    }

});

var wordScrambleAnswerSchema = new SimpleSchema({
    content:{
        type: [String]
    }
});

Instructent.Both.Schema.answers = new SimpleSchema({

    multipleChoiceAnswers: {
        type: multipleChoiceAnswerSchema,
        optional: true,
        custom: function()
        {
            return Instructent.Both.Schema.Helpers.determineIfRequiredFieldIsSet(this, Instructent.Both.Schema.moduleTypes.QuestionTypes.MULTIPLE_CHOICE.value);
        }
    },

    singleChoiceAnswers: {
        type: singleChoiceAnswerSchema,
        optional: true,
        custom: function()
        {
            return Instructent.Both.Schema.Helpers.determineIfRequiredFieldIsSet(this, Instructent.Both.Schema.moduleTypes.QuestionTypes.SINGLE_CHOICE.value);
        }
    },

    wordScrambleAnswers: {
        type: wordScrambleAnswerSchema,
        optional: true,
        custom: function()
        {
            return Instructent.Both.Schema.Helpers.determineIfRequiredFieldIsSet(this, Instructent.Both.Schema.moduleTypes.QuestionTypes.WORD_SCRAMBLE.value);
        }
    }

});