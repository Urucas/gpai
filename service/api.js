import express from 'express';
import gapi from '../lib';

let app = express();

app.get("/*", (req, res) => {
  let id = req.query.id
  if(id == undefined) { 
    res.jsonp({error:"Package id not defined"});
    return;
  }
  gapi({id:id}).then( (info) => {
    res.jsonp(info);
  }, (err) => {
    res.jsonp({error:"Package not found"});
  });
});

let server = app.listen(process.env.PORT || 5000, (err) => {
  console.log("Service running");
  if(err) console.log(err);
});

