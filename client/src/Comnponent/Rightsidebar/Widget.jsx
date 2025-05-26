import React from 'react';
import './Rightsidebar.css';
import comment from '../../assets/comment-alt-solid.svg';
import pen from '../../assets/pen-solid.svg';
import blackLogo from '../../assets/blacklogo.svg';
import { useTranslation } from 'react-i18next';

const Widget = () => {
  const { t } = useTranslation();
  return (
    <div className="widget">
      <h4>{t('widget.overflow_blog')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{t('widget.blog_1')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{t('widget.blog_2')}</p>
        </div>
      </div>
      <h4>{t('widget.featured_meta')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={comment} alt="comment" width="18" />
          <p>{t('widget.meta_1')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={comment} alt="comment" width="18" />
          <p>{t('widget.meta_2')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blackLogo} alt="logo" width="18" />
          <p>{t('widget.meta_3')}</p>
        </div>
      </div>
      <h4>{t('widget.hot_meta')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>{t('widget.hot_meta_1')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>{t('widget.hot_meta_2')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>{t('widget.hot_meta_3')}</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;