// es6 runtime requirements
require('babel/polyfill');
import request from 'request';
import htmlparser from 'htmlparser';
import soupselect from 'soupselect';

export default function gpai({
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
          let info = {
            url : url + "?id="+_package_,
            pkg : _package_
          };
          let containers = select(dom, 'div.info-container');
          if(!containers.length) reject(new Error("Information container not found"));

          let container = containers[0];
          let title = select(container, 'div.document-title');
          if(!title.length) reject(new Error("Application title not found"));
          info.name = title[0].children[1].children[0].raw;

          let links = select(dom, 'a.document-subtitle');
          let company = links[0].attribs.href.replace("/store/apps/developer?id=","");
          info.company = company;
  
          let stars = select(dom, 'div.stars-container');
          stars = stars[0].children[1].attribs['aria-label'];
          stars = stars.match(/\d[\,\.]\d/)[0];
          info.stars = stars;
          
          let count = select(dom, 'div.stars-count');
          count = count[0].children[2].raw.replace(")","");
          info.stars_count = count.trim();

          let img = select(dom, 'div.cover-container');
          img = select(img, 'img.cover-image');
          img = img[0].attribs.src;
          info.logo = img;
          
          /*
          TODO - get package descrption
          let desc = select(dom, 'div.id-app-orig-desc')[0];
          let desc_str = "";
          for(let i=0; i<desc.children.length;i++) {
            let children = desc.children[i];
            desc_str += children.data;
          }
          */
          resolve(info);
        }
      });
      let parser = new htmlparser.Parser(handler);
      parser.parseComplete(body);
    });
  });
}
