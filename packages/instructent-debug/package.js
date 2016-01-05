Package.describe({
    name: 'ddodson5:instructent-debug',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'A place for debug-only stuff for the Instructent app',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md',

    debugOnly:true
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.2');
    api.use(['ecmascript', 'underscore', 'templating']);
    api.addFiles('client/debug_helpers.js', ['client']);
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.addFiles('test/instructent-debug-tests.js');
});
