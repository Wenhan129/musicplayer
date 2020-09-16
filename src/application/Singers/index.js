import React, { useEffect, useRef, useState } from 'react';
import Horizon from '../../baseUI/horizon-item';
import { alphaTypes, categoryTypes } from '../../api/config';
import { NavContainer } from './style';
function Singers(props) {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
  };

  const handleUpdateCatetory = (val) => {
    setCategory(val);
  };

  return (
    <NavContainer>
      <Horizon
        list={categoryTypes}
        title={'分类 （默认热门):'}
        onClick={handleUpdateCatetory}
        currentItem={category}
      ></Horizon>
      <Horizon
        list={alphaTypes}
        title={'首字母:'}
        onClick={handleUpdateAlpha}
        currentItem={alpha}
      ></Horizon>
    </NavContainer>
  );
}

export default React.memo(Singers);
