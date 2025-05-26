import React from 'react';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import Taglist from './Taglist';
import './Tags.css';
import { useTranslation } from 'react-i18next';

const Tags = ({ slidein }) => {
  const { t } = useTranslation();

  const tagsList = [
    {
      tagName: t('tagsList.javascript.tagName'),
      tagDesc: t('tagsList.javascript.tagDesc'),
    },
    {
      tagName: t('tagsList.python.tagName'),
      tagDesc: t('tagsList.python.tagDesc'),
    },
    {
      tagName: t('tagsList.csharp.tagName'),
      tagDesc: t('tagsList.csharp.tagDesc'),
    },
    {
      tagName: t('tagsList.java.tagName'),
      tagDesc: t('tagsList.java.tagDesc'),
    },
    {
      tagName: t('tagsList.php.tagName'),
      tagDesc: t('tagsList.php.tagDesc'),
    },
    {
      tagName: t('tagsList.html.tagName'),
      tagDesc: t('tagsList.html.tagDesc'),
    },
    {
      tagName: t('tagsList.android.tagName'),
      tagDesc: t('tagsList.android.tagDesc'),
    },
    {
      tagName: t('tagsList.css.tagName'),
      tagDesc: t('tagsList.css.tagDesc'),
    },
    {
      tagName: t('tagsList.reactjs.tagName'),
      tagDesc: t('tagsList.reactjs.tagDesc'),
    },
    {
      tagName: t('tagsList.nodejs.tagName'),
      tagDesc: t('tagsList.nodejs.tagDesc'),
    },
  ];

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        <h1 className="tags-h1">{t('tags.title')}</h1>
        <p className="tags-p">{t('tags.description1')}</p>
        <p className="tags-p">{t('tags.description2')}</p>
        <div className="tags-list-container">
          {tagsList.map((tag, index) => (
            <Taglist tag={tag} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;