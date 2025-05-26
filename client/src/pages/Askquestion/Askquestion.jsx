import React, { useState } from 'react';
import './Askquestion.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { askquestion } from '../../action/question';
import { useTranslation } from 'react-i18next';

const Askquestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentuserreducer);
  const [questiontitle, setquestiontitle] = useState('');
  const [questionbody, setquestionbody] = useState('');
  const [questiontag, setquestiontags] = useState('');
  const { t } = useTranslation();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (user) {
      if (questionbody && questiontitle && questiontag) {
        dispatch(
          askquestion(
            { questiontitle, questionbody, questiontag, userposted: user.result.name },
            navigate
          )
        );
        alert(t('askquestion.success_alert'));
      } else {
        alert(t('askquestion.fields_alert'));
      }
    } else {
      alert(t('askquestion.login_alert'));
    }
  };

  const handleenter = (e) => {
    if (e.code === 'Enter') {
      setquestionbody(questionbody + '\n');
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>{t('askquestion.title')}</h1>
        <form onSubmit={handlesubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>{t('askquestion.title_label')}</h4>
              <p>{t('askquestion.title_description')}</p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => setquestiontitle(e.target.value)}
                placeholder={t('askquestion.title_placeholder')}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>{t('askquestion.body_label')}</h4>
              <p>{t('askquestion.body_description')}</p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => setquestionbody(e.target.value)}
                cols="30"
                rows="10"
                onKeyDown={handleenter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>{t('askquestion.tags_label')}</h4>
              <p>{t('askquestion.tags_description')}</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => setquestiontags(e.target.value.split(' '))}
                placeholder={t('askquestion.tags_placeholder')}
              />
            </label>
          </div>
          <input
            type="submit"
            value={t('askquestion.submit_button')}
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default Askquestion;