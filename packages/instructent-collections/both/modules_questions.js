/*
 * Make sure to load this before the main 'modules' schema!
 * */



var questionSchema = Instructent.Both.Schema.questions = new SimpleSchema({
    
    multipleChoiceQuestion: {
        type: String,
        optional: true,
        //instructions: "Enter a new multiple choice question here...",
        //label: "Multiple Choice",
        custom: function()
        {
            return Instructent.Both.Schema.Helpers.determineIfRequiredFieldIsSet(this, Instructent.Both.Schema.moduleTypes.QuestionTypes.MULTIPLE_CHOICE.value);
        }
    },

    singleChoiceQuestion: {
        type: String,
        optional: true,
        //instructions: "Enter a new single choice question here...",
        //label: "Single Choice",
        custom: function ()
        {
            return Instructent.Both.Schema.Helpers.determineIfRequiredFieldIsSet(this, Instructent.Both.Schema.moduleTypes.QuestionTypes.SINGLE_CHOICE.value);
        }
    },

    wordScrambleQuestion: {
        type: [String],
        optional: true,
        //instructions: "Enter a new word scramble question here...",
        //label: "Word Scramble",
        custom: function ()
        {
            return Instructent.Both.Schema.Helpers.determineIfRequiredFieldIsSet(this, Instructent.Both.Schema.moduleTypes.QuestionTypes.WORD_SCRAMBLE.value);
        }
    },

    message: {
        type: String,
        optional: true,
        //instructions: "Enter a message...",
        //label: "Multiple Choice",
        custom: function ()
        {
            return Instructent.Both.Schema.Helpers.determineIfRequiredFieldIsSet(this, Instructent.Both.Schema.moduleTypes.InfoTypes.MESSAGE.value);
        }
    }
});