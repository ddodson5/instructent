/**
 * Created by Devin Dodson on 10/1/2015.
 */

/*
 * A session is a wrapper for a collection of modules. It belongs to the instructor who created it.
 * */

var sessionsCollection = Instructent.Both.Collections.sessionsCollection = new Mongo.Collection('sessionsCollection');

sessionsCollection.attachSchema(Instructent.Both.Schema.sessions);

/**
 * A module represents either a question or a chunk of information chosen by the instructor(message, audio/video, etc).
 * Questions require answers, while information is just for display.
 */

var modulesCollection = Instructent.Both.Collections.modulesCollection =  new Mongo.Collection("modulesCollection");

modulesCollection.attachSchema(Instructent.Both.Schema.modules);
