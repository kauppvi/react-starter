var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectField (props) {
  var fields = ['kaikki', 'Hallinto', 'Opetusala'];
  return (
      <nav className="nav-extended">
        <div className="nav-content">
          <ul className="fields tabs tabs-transparent">
              {fields.map(function (fld) {
                return (
                    <li 
                        className="tab"
                        onClick={props.onSelect.bind(null, fld)}
                        key={fld}>
                        <a 
                            href="#"
                            className={fld === props.selectedFields ? "active" : null}> 
                          {fld}
                        </a>
                    </li>
                )
              })}
          </ul>
        </div>
      </nav>
  )
}

function OpeningGrid (props) {
  return (
    <ul className='openings-list'>
      {props.Openings.map(function (opening, index) {
        return (
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">{opening.tyotehtava}</span>
                  <ul>
                    <li>{opening.organisaatio}</li>
                    <li>{opening.osoite}</li>
                  </ul>
                </div>
                <div className="card-action">
                  <a href={opening.linkki}>Hae nyt!</a>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </ul>
  )
}

OpeningGrid.propTypes = {
  Openings: PropTypes.array.isRequired,
}

SelectField.propTypes = {
  selectedFields: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Jobs extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedFields: 'kaikki',
      Openings: null,
    };

    this.updateFields = this.updateFields.bind(this);
  }
  componentDidMount() {
    this.updateFields(this.state.selectedFields)
  }
  updateFields(fld) {
    this.setState(function () {
      return {
        selectedFields: fld,
        Openings: null
      }
    });

    api.fetchJobOpenings(fld)
      .then(function (Openings) {
        this.setState(function () {
          return {
            Openings: Openings
          }
        });
      }.bind(this));
  }
  render() {
    return (
      <div>
        <SelectField
          selectedFields={this.state.selectedFields}
          onSelect={this.updateFields} />
        {!this.state.Openings
          ? <p>LOADING!</p>
          : <OpeningGrid Openings={this.state.Openings} />}
      </div>
    )
  }
}

module.exports = Jobs;
