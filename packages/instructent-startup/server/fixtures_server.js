
//Create an application-level fixtures object
Instructent.Server.Fixtures = {};


var userFixtures = Instructent.Server.Fixtures.users = [

    {
        username: 'admin',
        email: 'ddodson5@gmail.com',
        password: 'pass123',
        profile: {
            first_name: 'Mister',
            last_name: 'God',
            company: 'Managerial Holdings, LLC'
        },

        groups: [
            {name: Instructent.Both.Permissions.Groups.instructor, roles: [Instructent.Both.Permissions.Roles.admin] },
            {name: Instructent.Both.Permissions.Groups.student, roles: [Instructent.Both.Permissions.Roles.admin] }
        ]
    },

    {
        username: 'instructor',
        email: 'testermctestingshire@gmail.com',
        password: 'pass123',
        profile: {
            first_name: 'Test',
            last_name: 'McNary'
        },

        groups: [
            {name: Instructent.Both.Permissions.Groups.instructor, roles: [Instructent.Both.Permissions.Roles.default] }
        ]
    },

    {
        username: 'student',
        email: 'test@madeUp.com',
        password: 'pass123',
        profile:
        {

        },

        groups: [
            {name: Instructent.Both.Permissions.Groups.student, roles: [Instructent.Both.Permissions.Roles.default] }
        ]
    }
];

Meteor.startup(function () {

    //console.log("USERS: ", Meteor.users.find().fetch());

    //If there's no users, then add the base users defined above
    if ( Meteor.users.find().count() === 0 ) {

        _.each(userFixtures, function (user) {

            var id;

            id = Accounts.createUser({
                username: user.username,
                email: user.email,
                password: user.password,
                profile: user.profile
            });

            //If there are group objects, parse them and assign the groups/roles as appropriate
            if (user.groups.length > 0) {

                //Since 'addUsersToRoles()' doesn't support adding multiple groups at once, we break it up like this
                _.each(user.groups, function (group) {

                    Roles.addUsersToRoles(id, group.roles, group.name);

                });
            }

            //    Also, give 'em some sessions and modules
            for(var i = 1; i <= 5; i++)
            {
                var sessionId = Instructent.Both.Collections.sessionsCollection.insert({
                    //The user who owns this session
                    ownerId: id,

                    //Name
                    name: "Test session " + i,

                    //Whether this session is currently visible to students or not
                    isLive: true,

                    //For sorting purposes
                    index: i
                });

                //Modules to go into the newly created session
                for(var j = 1; j <= 5; j++)
                {
                    var moduleId = Instructent.Both.Collections.modulesCollection.insert({
                        //The question content
                        question: {
                            multipleChoiceQuestion: "This is question number " + j
                        },

                        //The answer/answers
                        answers: {
                            multipleChoiceAnswers:
                            {
                                trueAnswers: ["This is correct", "This is correct, too!"],
                                falseAnswers: ["Sadly, this is not correct", "Neither is this"]
                            }
                        },

                        //The id of the session to which the module belongs
                        sessionId: sessionId,

                        //The module type
                        moduleType: Instructent.Both.Schema.moduleTypes.QuestionTypes.MULTIPLE_CHOICE.value,

                        //Is this module live?
                        isLive: true,

                        //For sorting purposes
                        index: j
                    });

                }
            }



        });

    }


});