// es6 runtime requirements
require('babel/polyfill');
import gpai from '../lib/';

describe("Google Play API instance test", () => {
  
  it("Test response", (done) => {
    var response = { 
      url: 'https://play.google.com/store/apps/details?id=com.urucas.wifime',
      pkg: 'com.urucas.wifime',
      name: 'Wifime',
      company: 'Urucas',
      stars: '3,0',
      stars_count: '9',
      logo: 'https://lh6.ggpht.com/_b62klCs1JpdxBjt4nN3MOmHfVSaiHOPFKqVdB9Efgybe1FarmZn9Q92qLDdxGMjOg=w300' 
    }
    var api = gpai({id:"com.urucas.wifim"});
    api.then((info) => {
      if(info.pkg != "com.urucas.wifime") throw new Error("Error setting package");
      if(info.url != response.url) throw new Error("Error setting package url");
      if(!/\d[\,\.]\d/.test(info.stars)) throw new Error("Error setting package stars");
      if(!/\d+/.test(info.stars_count)) throw new Error("Error setting package stars");
      done();
    }, (err) => { 
      console.log("Fails to load info");
      done();
    });
  });
});
