(function () {
    'use strict';

    var app_root = __dirname,
        express = require( 'express' ),
        path = require( 'path' ),
        mongoose = require( 'mongoose' ),
        port = 8080,
        app = express();

//
// Server Configuration --------------------------------------------------------------------------
    app.configure(function () {
        app.use( express.bodyParser() );
        app.use( express.methodOverride() );
        app.use( app.router );
        app.use( express.static( path.join( app_root, '' ) ) );
        app.use(
            express.errorHandler({
                dumpExeptions: true,
                showStack: true
            })
        );
    });

//
// Mongoose DB Connect ----------------------------------------------------------------------------
    mongoose.connect( 'mongodb://localhost/library_database' );
    var Post = new mongoose.Schema({
            title:  String,
            author: String,
            body:   String,
            date:   {
                type: Date,
                default: Date.now
            },
            hidden: Boolean
        }),
        PostModel = mongoose.model('Post', Post);

//
// Server API -------------------------------------------------------------------------------------

// GET requests
    app.get( '/api', function (request, response) {
        response.send( 'Library API is running!' );
    });
    app.get( '/api/posts', function (request, response) {
        return PostModel.find(function (err, posts) {
            if (!err) return response.send( posts );
            else return console.log( err );
        });
    });
    app.get( '/api/posts/:id', function (request, response) {
        return PostModel.findById( request.params.id, function (err, post) {
            if (!err) return response.send(post);
            else return console.log( err );
        });
    });

// POST Requests
    app.post( '/api/posts', function (request, response) {
        var post = new PostModel({
            title: request.body.title || 'Blog Post Title',
            author: request.body.author || 'admin',
            body: request.body.body || '',
            date: request.body.date,
            hidden: request.body.hidden
        });

        post.save(function (err) {
            if (!err) return console.log('Post created!');
            else return console.log( err );
        });

        return response.send( post );
    });

// PUT requests
    app.put( '/api/posts/:id', function (request, response) {
        console.log('Updating post ' + request.body.title + '...');

        return PostModel.findById( request.params.id, function (err, post) {
            post.title  = request.body.title || 'Blog Post Title';
            post.author = request.body.author || 'admin';
            post.body   = request.body.body || '';
            post.date   = request.body.date;
            post.hidden = request.body.hidden;

            return post.save(function (err) {
                if (!err) console.log('Post updated!');
                else console.log(err);

                return response.send(post);
            });
        });
    });

// DELETE requests
    app.delete( '/api/posts/:id', function (request, response) {
        console.log('Deleting post with ID ' + request.body.id);

        return PostModel.findById(request.params.id, function (err, post) {
            return post.remove(function (err) {
                if (!err) {
                    console.log('Post removed!');
                    return response.send('');
                } else {
                    console.log( err );
                }
            });
        });
    });


//
// Server Startup ---------------------------------------------------------------------------------
    app.listen( port, function () {
        console.log( 'Express Server listening on port %d in %s mode', port, app.settings.env );
    });
}());