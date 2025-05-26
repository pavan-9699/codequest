import React from 'react';
import './Homemainbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Questionlist from './Questionlist';

function Homemainbar() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.currentuserreducer);
  const location = useLocation();
  const navigate = useNavigate();
  const questionlist = useSelector((state) => state.questionreducer);

  const checkauth = () => {
    if (user === null) {
      alert(t('homemainbar.login_prompt'));
      navigate('/Auth');
    } else {
      navigate('/Askquestion');
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === '/' ? (
          <h1>{t('homemainbar.top_questions')}</h1>
        ) : (
          <h1>{t('homemainbar.all_questions')}</h1>
        )}
        <button className="ask-btn" onClick={checkauth}>
          {t('homemainbar.ask_question')}
        </button>
      </div>
      <div>
        {questionlist.data === null ? (
          <h1>{t('homemainbar.loading')}</h1>
        ) : (
          <>
            <p>
              {questionlist.data.length} {t('homemainbar.questions_count')}
            </p>
            <Questionlist questionlist={questionlist.data} />
          </>
        )}
      </div>
    </div>
  );
}

export default Homemainbar;