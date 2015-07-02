// es6 runtime requirements
require('babel/polyfill');
import request from 'request';
import htmlparser from 'htmlparser';
import soupselect from 'soupselect';

export default function index({
  _package_ = null
}) {
  if(_package_ == null)
    throw new Error("Package name cannot be null!");

  if(!/([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(_package_))
    throw new Error("Invalid package name!");
  
  let url = "https://play.google.com/store/apps/details";
  let qs  = {id:_package_}
  let select = soupselect.select;
   
  return new Promise((resolve, reject) => {
    request.get({url:url, qs:qs}, (err, response, body) => {
      if(err) reject(error);
      if(response.statusCode != 200) reject(body);
      let handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error) reject(error);
        else {
          let info = {};
          let containers = select(dom, 'div.info-container');
          if(!containers.length) reject(new Error("Information container not found"));

          let container = containers[0];
          let title = select(container, 'div.document-title');
          if(!title.length) reject(new Error("Application title not found"));

          info = title[0];
          resolve(info);
        }
      });
      let parser = new htmlparser.Parser(handler);
      parser.parseComplete(body);
    });
  });
}
