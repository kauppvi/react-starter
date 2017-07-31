var axios = require('axios');

module.exports = {
  fetchJobOpenings: function (field){
    var encodedURI = window.encodeURI('https://gis.vantaa.fi/rest/tyopaikat/v1/'+field);

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data;
      });
  }
}
