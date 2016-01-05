/**
 * Created by Devin Dodson on 10/1/2015.
 */

//App-level namespace for schemas
Instructent.Both.Schema = {};

//Reusable helpers! createdAt() and updatedAt() taken wholesale from the collections2 readme
Instructent.Both.Schema.Helpers = {

    // Force value to be current date (on server) upon insert
    // and prevent updates thereafter.
    createdAt: {
        type: Date,
        autoValue: function ()
        {
            if (this.isInsert)
            {
                return new Date;
            }
            else if (this.isUpsert)
            {
                return {$setOnInsert: new Date};
            }
            else
            {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },

    // Force value to be current date (on server) upon update
    // and don't allow it to be set upon insert.
    updatedAt: {
        type: Date,
        autoValue: function ()
        {
            if (this.isUpdate)
            {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    },


    /*
     * Determine if the specified field is of the same type as the type passed in,
     * and return 'required' to SimpleSchema if it is and the field isn't set
     * */
    determineIfRequiredFieldIsSet: function( context, requiredModuleType )
    {
        var thisModuleType = context.field('moduleType').value;

        //If the module type is the same as this question schema field, and this field isn't set, throw a "required" error
        if (thisModuleType === requiredModuleType
            && !context.isSet
            && (!context.operator || (context.value === null || context.value === "")))
        {
            return "required";
        }
    }
};

