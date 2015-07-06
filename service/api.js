import express from 'express';
import gapi from '../lib';

let app = express();

app.get("/*", (req, res) => {
  let pkg = req.query.id
  if(pkg == undefined) res.json({error:"Package id not defined"});
  gapi({_package_:pkg}).then( (info) => {
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

