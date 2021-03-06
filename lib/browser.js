import jsonp from 'jsonp';
export default function gpai(options) {
  return new Promise((resolve, reject) => {
    jsonp("http://gpai-service.herokuapp.com/?id="+options.id, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  });
}
