import express from 'express';
import gapi from '../lib';

let app = express();

app.get("/*", (req, res) => {
  let id = req.query.id
  if(id == undefined) { 
    res.json({error:"Package id not defined"});
    return;
  }
  gapi({id:id}).then( (info) => {
    res.json(info);
  });
});

let server = app.listen(process.env.PORT || 5000, (err) => {
  console.log("Service running");
  if(err) {
    console.log(err);
    process.exit(1);
  }
});

