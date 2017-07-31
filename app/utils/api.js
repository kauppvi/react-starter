var axios = require('axios');

module.exports = {
  fetchJobOpenings: function (field){
    //var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
    var encodedURI = window.encodeURI('http://gis.vantaa.fi/rest/tyopaikat/v1/'+field);

    return axios.get(encodedURI)
      .then(function (response) {
        // return response.data.items;
        return response.data;
      });
  }
}
