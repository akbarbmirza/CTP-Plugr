import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HomePage, LoginForm } from 'components';
import { login } from '../../actions/Auth/actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions = () => {
    let winWidth = window.innerWidth; //let winWidth = $(window).width();
    let winHeight = window.innerHeight; //let winHeight = $(window).height();
    this.setState({width: winWidth, height: winHeight});
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    //const styles = require('./Home.scss');
    console.log(" ==== PROPS IN HOME: ", this.props);
    console.log(" ==== STATE IN HOME: ", this.state);
    return (
      <div className="home"> {/*{styles.home}*/}
        <Helmet title="Home" />
        
        <HomePage height={this.state.height} width={this.state.width}/>

        <div className="register-plugr">
          <Link to="/register">
            <span className="plugr-btn">REGISTER WITH PLUGR</span>
          </Link>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
          <LoginForm {...this.props.actions} />
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ login }, dispatch)
});

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);






