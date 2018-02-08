import { request } from 'http';


https://github.com/hapijs/wreck/blob/v12.5.1/README.md

// Basic -------------------------------------------------
const Wreck = require('wreck');

Wreck.get('https://google.com/', (err, res, payload) => {
    /* do stuff */
});
const Wreck = require('wreck');

Wreck.post('https://posttestserver.com/post.php', { payload: { hello: 'post' } }, (err, res, payload) => {
    /* do stuff */
});

// -------------------------------------------------------
// With Async/Await
const Wreck = require('wreck');

async function example () {
  const { req, res, payload } = await Wreck.get('http://example.com');
  console.log(payload.toString());
}

try {
  example();
} catch (ex) {
  console.error(ex);
}


// Advanced ---------------------------------------------------------
const Wreck = require('wreck');

const method = 'GET'; // GET, POST, PUT, DELETE
const uri = '/';
const readableStream = Wreck.toReadableStream('foo=bar');

const wreck = Wreck.defaults({
    headers: { 'x-foo-bar': 123 },
    agents: {
        https: new Https.Agent({ maxSockets: 100 }),
        http: new Http.Agent({ maxSockets: 1000 }),
        httpsAllowUnauthorized: new Https.Agent({ maxSockets: 100, rejectUnauthorized: false })
    }
});

// cascading example -- does not alter `wreck`
// inherits `headers` and `agents` specified above
const wreckWithTimeout = wreck.defaults({
    timeout: 5
});

// all attributes are optional
const options = {
    baseUrl: 'https://www.example.com',
    payload: readableStream || 'foo=bar' || new Buffer('foo=bar'),
    headers: { /* http headers */ },
    redirects: 3,
    beforeRedirect: function (redirectMethod, statusCode, location, resHeaders, redirectOptions, next) { return next() },
    redirected: function (statusCode, location, req) {},
    timeout: 1000,    // 1 second, default: unlimited
    maxBytes: 1048576, // 1 MB, default: unlimited
    rejectUnauthorized: true || false,
    downstreamRes: null,
    agent: null,         // Node Core http.Agent
    secureProtocol: 'SSLv3_method', // The SSL method to use
    ciphers: 'DES-CBC3-SHA' // The TLS ciphers to support
};

const optionalCallback = (err, res) => {

    /* handle err if it exists, in which case res will be undefined */

    // buffer the response stream
    Wreck.read(res, null, (err, body) => {
        /* do stuff */
    });
};

const req = wreck.request(method, uri, options, optionalCallback);

// ---------------------------------------------------------------
方法：12.5.1
    defaults(options)
    get(uri, [options, [callback]])
        callback :
            err
            response 
            payload 
    post(uri, [options, [callback]])
    ...
    request(method, uri, [options, [callback]])
        options : (request)
            baseUrl         // https://example.com/api/
                有这个时， url 可以用banner/1 ,函数会自动生成 baseUrl+uri
            socketPath 
            payload         // The request body as a string, Buffer, Readable Stream, or an object that can be serialized using JSON.stringify().
            headers         // object 
            onRequest       // function 
            redirects 
            redirect303 
            beforeRedirect 
            redirected 
            timeout         // Defaults to unlimited.  (ms)
            maxBytes        // Defaults to unlimited.
            rejectUnauthorized 
            downstreamRes
            agent           // Node Core http.Agent.
            secureProtocol 
            ciphers
        callback :
            err
            response  //The HTTP Incoming Message object, which is also a readable stream. 
    
    read(response, options, callback)
        response    // An HTTP Incoming Message object.
        options :
            timeout 
            json        // 指默认为undefined，意思是没有解析逻辑。
                true    // 尝试- 'smart' - only try JSON.parse if the response indicates a JSON content-type.
                strict  // 严格- as 'smart', except returns an error for non-JSON content-type.
                force   // 强制- try JSON.parse regardless of the content-type header.
            gunzip 
            maxBytes 
        callback 
            err 
            payload     // The payload in the form of a Buffer 
                        //or (optionally) parsed JavaScript object (JSON).当上面的json为true