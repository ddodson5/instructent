Package.describe({
    name: 'ddodson5:instructent-permissions',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Home to the permissions and authorization objects of the Instructent app',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');
    api.use(['ddodson5:instructent-startup', 'accounts-base', 'alanning:roles']);

    //LOAD ORDER: errors/permission namespace -> permissions
    //api.addFiles('both/roles.js', ['server', 'client']);
    api.addFiles('both/errors.js', ['server', 'client']);
    api.addFiles('server/permissions.js', ['server']);
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ddodson5:instructent-permissions');
    api.addFiles('instructent-permissions-tests.js');
});
