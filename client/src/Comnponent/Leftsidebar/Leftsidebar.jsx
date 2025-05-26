import React from 'react';
import './Leftsidebar.css';
import { NavLink } from 'react-router-dom';
import Globe from '../../assets/Globe.svg';
import { useTranslation } from 'react-i18next';

const Leftsidebar = ({ slidein }) => {
  const { t } = useTranslation();
  const slideinstyle = {
    transform: 'translateX(0%)',
  };
  const slideoutstyle = {
    transform: 'translateX(-100%)',
  };
  return (
    <div className="left-sidebar" style={slidein ? slideinstyle : slideoutstyle}>
      <nav className="side-nav">
        <button className="nav-btnn">
          <NavLink to="/" className="side-nav-links" activeClassName="active">
            <p>{t('leftsidebar.home')}</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>
            <p>{t('leftsidebar.public')}</p>
          </div>
          <button className="nav-btnn">
            <NavLink to="/Question" className="side-nav-links" activeClassName="active">
              <img src={Globe} alt="globe" />
              <p style={{ paddingLeft: '10px' }}>{t('leftsidebar.questions')}</p>
            </NavLink>
          </button>
          <button className="nav-btnn">
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: '40px' }}
            >
              <p>{t('leftsidebar.tags')}</p>
            </NavLink>
          </button>
          <button className="nav-btnn">
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: '40px' }}
            >
              <p>{t('leftsidebar.users')}</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Leftsidebar;