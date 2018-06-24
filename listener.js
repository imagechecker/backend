/* USAGE:
 * curl -d '{"link":"http://example.com/image.jpg"}' -H "Content-Type: applicaion/json" -X POST http://thisservername:port/link
 *
 */
class listener{
    constructor(){
        this.app = require('express')();
        this.parser = require('body-parser');
        this.fs = require('fs');
        setup();
    }

    setup(){
        this.app.use(this.parser.json());
        this.app.use(this.parser.urlencoded({
        extended: true
        }));
    }

    start(){
        this.app.post('/link', function (req, res){
            res.send("You asked for " + req.body.link + "\n");
            console.log(req.body.link);
            res.end();
        });

    this.app.listen(8080);
    }
}

let x = new listener();
x.start();