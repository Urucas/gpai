import request from 'request';
export default function gpai({id:id}) {
  return new Promise((resolve, reject) => {
    request.get({url:"http://gapi-service.herokuapp.com/", id:id, callback:cb}, (err, response, body) => {
      console.log(response);
    });
  });
}
