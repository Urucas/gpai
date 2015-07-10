import request from 'request';
import htmlparser from 'htmlparser';
import soupselect from 'soupselect';

export default function gpai({
  id = null
}) {
  if(id == null)
    throw new Error("Package name cannot be null!");

  if(!/([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(id))
    throw new Error("Invalid package name!");
  
  let url = "https://play.google.com/store/apps/details";
  let qs  = {id:id}
  let select = soupselect.select;
   
  return new Promise((resolve, reject) => {
    request.get({url:url, qs:qs}, (err, response, body) => {
      if(err) reject(error);
      if(response.statusCode != 200) reject(body);
      let handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error) reject(error);
        else {
          let info = {
            url : url + "?id="+id,
            pkg : id
          };
          try {
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
          
            resolve(info);
          }catch(e) {
            reject(e);
          }
        }
      });
      let parser = new htmlparser.Parser(handler);
      parser.parseComplete(body);
    });
  });
}
