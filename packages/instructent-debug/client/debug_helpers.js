/**
 * Created by Devin Dodson on 10/17/2015.
 */
/****************************************************************
 *
 *
 *              Site-wide debug helpers go here
 *
 *
 * **************************************************************/

var helpers = {

    print: function (context)
    {
        console.log("[PRINT] : ", context);
    }


};

_.each(helpers, function (value, key)
       {
           Template.registerHelper(key, value);
       }
);
