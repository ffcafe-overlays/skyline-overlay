import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { updateZoom, updateLang } from '@/store/slices/settings';
import { SInputNumber, SSelect } from '@/components';

import rawLang from '@/lang';
const langs = Object.keys(rawLang).map((key) => [key, rawLang[key].translation.LANG]);

function SettingsLayout() {
  const { t } = useTranslation(); // i18n support
  const dispatch = useDispatch();

  // datas
  const lang = useSelector((state) => state.settings.lang);
  const zoom = useSelector((state) => state.settings.zoom);
  /**
   * @param {number} value
   */
  function handleChangeLang(value) {
    dispatch(updateLang({ value }));
  }
  /**
   * @param {number} value
   */
  function handleChangeZoom(value) {
    dispatch(updateZoom({ value }));
  }

  return (
    <div className='settings-layout'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Language')}</span>
        <SSelect value={lang} onChange={handleChangeLang} kvPairs={langs} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('UI Scale')}</span>
        <SInputNumber
          value={zoom}
          onChange={handleChangeZoom}
          min={0.5}
          max={4}
          step={0.25}
          accuracy={2}
        />
      </div>
    </div>
  );
}

export default SettingsLayout;
