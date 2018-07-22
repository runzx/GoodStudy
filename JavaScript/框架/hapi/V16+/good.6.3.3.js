/**
 example
https://github.com/hapijs/good/blob/v6.6.3/README.md

 
 */

var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ host: 'localhost' });

var options = {
    opsInterval: 1000,
    filter:{
        access_token: 'censor'
    },
    reporters: [{                           // 这是数组！
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './test/fixtures/awesome_log'
    }, {
        reporter: 'good-http',
        events: { error: '*' },
        config: {
            endpoint: 'http://prod.logs:3000',
            wreck: {
                headers: { 'x-api-key' : 12345 }
            }
        }
    }]
};

server.register({
    register: require('good'),
    options: options
}, function (err) {

    if (err) {
        console.error(err);
    }
    else {
        server.start(function () {

            console.info('Server started at ' + server.info.uri);
        });
    }
});

// Log messages are created with tags.
var options = {
    reporters: [{
        reporter: require('good-console'),
        events: { log: ['error', 'medium'] }
    }]
};