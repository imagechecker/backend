/* USAGE:
 * curl -d '{"link":"http://example.com/image.jpg"}' -H "Content-Type: applicaion/json" -X POST http://thisservername:port/link
 * this listener will listen for clients sending url and append the url to a worklist file
 */
var fs = require("fs"); 
var app = require('express')();
var parser = require('body-parser');

class listener{
    constructor(port){
        this.port = port;
        this.setup();
    }

    setup(){
        app.use(parser.json());
        app.use(parser.urlencoded({
            extended: true
        }));
    }

    start(){
        app.post('/link', function (req, res){
            res.send("You asked for " + req.body.link + "\n");
            res.end();

            fs.appendFile('../worklist.txt', req.body.link + "\n", (err) => {
                if (err) throw err;
                console.log(req.body.link + ' has been appended to worklist.txt');
              });
        });

    app.listen(this.port);
    }
}

let x = new listener(8080);
x.start();