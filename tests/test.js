// es6 runtime requirements
require('babel/polyfill');
import gplayinfo from '../lib/';

describe("Google Play API instance test", () => {
  
  it("Test response", (done) => {
    var api = gplayinfo({_package_:"com.urucas.wifime"});
    api.then((info) => {
      console.log(info);
      done();
    });
  });
});
