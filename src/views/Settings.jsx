import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './Settings.scss';

import SettingsAbout from './SettingsAbout';
import SettingsData from './SettingsData';
import SettingsLayout from './SettingsLayout';

function Settings() {
  const { t } = useTranslation(); // i18n support

  const Components = [
    { title: t('About'), component: <SettingsAbout /> },
    { title: t('Data'), component: <SettingsData /> },
    { title: t('General'), component: <SettingsLayout /> },
  ];

  const transRef = useRef(); // ref for react-transition-group
  const [activeTab, setActiveTab] = useState(0);

  // settings data
  const showSettings = useSelector((state) => state.settings.showSettings);

  return (
    <CSSTransition
      classNames='fade'
      in={showSettings}
      timeout={150}
      unmountOnExit
      nodeRef={transRef}
    >
      <div className='settings' ref={transRef}>
        <div className='settings-tab'>
          {Components.map((val, index) => (
            <div
              className={classNames('settings-tabitem', { active: index === activeTab })}
              key={`tab-${val.title}`}
              onClick={() => setActiveTab(index)}
            >
              {val.title}
            </div>
          ))}
        </div>
        <div className='settings-content'>{Components[activeTab].component}</div>
      </div>
    </CSSTransition>
  );
}

export default Settings;
