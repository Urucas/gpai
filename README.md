# gpai (Google Play App Info)
[![Build Status](https://travis-ci.org/Urucas/googleplay-app-info-api.svg)](https://travis-ci.org/Urucas/googleplay-app-info-api)

A simple nodejs API to get Google Play App Info

#API
```javascript
var gpai = require('gpai');
gpai({id:"com.urucas.wifime"}).then(function(info){
  console.log(info);
  // 
  // { url: 'https://play.google.com/store/apps/details?id=com.urucas.wifime',
  //   pkg: 'com.urucas.wifime',
  //   name: 'Wifime',
  //   company: 'Urucas',
  //   stars: '3,0',
  //   stars_count: '9 ',
  //   logo: 'https://lh6.ggpht.com/_b62klCs1JpdxBjt4nN3MOmHfVSaiHOPFKqVdB9Efgybe1FarmZn9Q92qLDdxGMjOg=w300' }
});
```

#Service
[http://gpai-service.herokuapp.com/?id=com.urucas.wifime](http://gpai-service.herokuapp.com/?id=com.urucas.wifime)

![Heroku](https://heroku-badge.herokuapp.com/?app=gpai-service)

**In your browser**
```html
<script src="gpai.js"></script>
<script>
var gpai = require('gpai');
    gpai({id:"com.urucas.wifime"}).then(function(info){
      console.log(info);
    });
</script>
```

