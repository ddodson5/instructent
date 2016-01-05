Package.describe({
    name: 'ddodson5:instructent-collections',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'The collections and schemas definitions and setup for the Instructent app',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.use(["underscore", "aldeed:collection2","ddodson5:instructent-startup"]);
    api.versionsFrom('1.1.0.3');

    //LOAD ORDER: Schema -> Collections
    //SCHEMA LOAD ORDER: ModuleTypes -> Answers/Questions -> Modules   ( Sessions whenev )
    api.addFiles(['both/_helpers.js'], ['server', 'client']);
    api.addFiles(['both/moduleTypes.js'],['server', 'client']);
    api.addFiles(['both/modules_answers.js', 'both/modules_questions.js', 'both/modules.js'],['server', 'client']);
    api.addFiles(['both/sessions.js'], ['server', 'client']);

    api.addFiles(['both/_collections_namespace.js'], ['server', 'client']);
    api.addFiles(['both/collections.js'], ['server', 'client']);


});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('ddodson5:instructent-collections');
    api.addFiles('instructent-collections-tests.js');
});
