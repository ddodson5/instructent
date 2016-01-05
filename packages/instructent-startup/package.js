Package.describe({
    name: 'ddodson5:instructent-startup',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');
    api.use(['alanning:roles']);

    //All the Instructent namespace guff:
    api.addFiles("both/namespace_both.js", ['client', 'server']);
    api.addFiles("client/namespace_client.js", 'client');
    api.addFiles("server/namespace_server.js", 'server');
    api.export('Instructent', ['client', 'server']);

    //And now the remaining startup stuff:
    api.addFiles('both/_rolesAndGroups.js', ['server', 'client']);
    api.addFiles('both/startup_both.js', ['server', 'client']);

    api.addFiles('client/startup_client.js', ['client']);

    api.addFiles('server/fixtures_server.js', ['server']);
    api.addFiles('server/startup_server.js', ['server']);

});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('ddodson5:instructent-startup');
    api.addFiles('fixtures-tests.js');
});
