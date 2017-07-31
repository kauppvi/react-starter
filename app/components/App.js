var React = require('react');
var Jobs = require('./Jobs');

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Jobs />
      </div>
    )
  }
}

module.exports = App;
