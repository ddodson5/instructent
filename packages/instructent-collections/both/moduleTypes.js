/**
 * Created by Devin Dodson on 9/30/2015.
 */

var moduleTypes = Instructent.Both.Schema.moduleTypes = {

    Categories:
    {
        QUESTIONS : "QUESTIONS",
        INFORMATION : "INFORMATION"
    },

    QuestionTypes:
    {
        MULTIPLE_CHOICE: {value: "MULTIPLE_CHOICE", label: "Multiple Choice"},
        SINGLE_CHOICE: {value: "SINGLE_CHOICE", label: "Single Choice"},
        SHORT_ANSWER: {value: "SHORT_ANSWER", label: "Short Answer"},
        TRUE_OR_FALSE: {value: "TRUE_OR_FALSE", label: "True or False"},
        Q_AND_A: {value: "Q_AND_A", label: "Question and Answer"},
        WORD_SCRAMBLE: {value: "WORD_SCRAMBLE", label: "Word Scramble"},
        WORD_SELECT: {value: "WORD_SELECT", label: "Word Select"}
    },

    InfoTypes:
    {
        INSTRUCTION_MESSAGE : { value: "INSTRUCTION_MESSAGE", label: "Message From Instructor"},
        MESSAGE : { value: "MESSAGE", label: "Message"},
        TEXT : { value: "TEXT", label: "Text"},
        AUDIO : { value: "AUDIO", label: "Audio" },
        VIDEO : { value: "VIDEO", label: "Video"}
    },

    States:
    {
        DISPLAY : "DISPLAY",
        UPDATE : "UPDATE",
        INSERT : "INSERT"
    },

    BASIC_QUESTION_PROMPT : "Enter a question here"
};

//Have to put this out here, otherwise it can't see the contents of the ModuleTypes object
moduleTypes.DEFAULT_MODULE_TYPE = moduleTypes.QuestionTypes.MULTIPLE_CHOICE.value;


