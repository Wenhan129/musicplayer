import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index';
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';

const List = styled.div`
  display: flex;
  align-content: center;
  height: 30px;
  overflow: hidden;
  > span::first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style['font-size-m']};
  }
`;

const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: 0.8;
  }
`;

function Horizon(props) {
  const { list, currentItem, title } = props;
  const { onClick } = props;

  const categoryRef = useRef(null);

  useEffect(() => {
    let categoryDOM = categoryRef.current;
    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={'horizontal'}>
      <div ref={categoryRef}>
        <List>
          <span>{title}</span>
          {list.map((item) => (
            <ListItem
              key={item.key}
              className={`${currentItem === item.key ? 'selected' : ''}`}
              onClick={() => onClick(item.key)}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </div>
    </Scroll>
  );
}

Horizon.defaultProps = {
  list: [],
  currentItem: '',
  title: '',
  onClick: null,
};

Horizon.propTypes = {
  list: PropTypes.array,
  currentItem: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Horizon);
