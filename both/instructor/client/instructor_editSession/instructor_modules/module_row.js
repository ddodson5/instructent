
/*
 *   Project Name: Instructent
 *   User: Devin Dodson
 *   Created: 10/17/2015
 *   Notes:
 */


Template.moduleRow.helpers({

    isDisplayRow: function(){
        return this.state === Instructent.Both.Schema.moduleTypes.States.DISPLAY;
    },

    isUpdateRow: function(){
        return this.state === Instructent.Both.Schema.moduleTypes.States.UPDATE;

    },

    isInsertRow: function(){
        return this.state === Instructent.Both.Schema.moduleTypes.States.INSERT;
    },

    getModuleTypeName: function( moduleType )
    {
        //console.log(moduleType);
        var name = ModuleTypes.findOne({content: moduleType}).name;
        return name ? name : "NONE";
    }
});

Template.moduleRow.onRendered(function(){
    var $slider = this.$('.sliding');

    //TweenMax.from($slider, 1.5, { opacity: 0, backgroundColor: 'white', width: '200%', height: '200%'});
});