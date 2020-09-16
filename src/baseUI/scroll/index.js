import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Scroll = forwardRef((props, ref) => {
  // better-scroll instance
  const [bScroll, setBScroll] = useState();
  // current ref
  const scrollContainerRef = useRef();

  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  // To create a better-scroll instance
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, []);

  // Refresh instance after re-rendering
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  }, [refresh, bScroll]);

  // Add `scroll` event to instance
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off('scroll');
    };
  }, [onScroll, bScroll]);

  // Expose ref method
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  return (
    <ScrollContainer ref={scrollContainerRef}>{props.children}</ScrollContainer>
  );
});

Scroll.propTypes = {
  // Scroll direction
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  // Clickable
  click: PropTypes.bool,
  // Should refresh content
  refresh: PropTypes.bool,
  // Callback function on scrolling
  onScroll: PropTypes.func,
  // Callback function on pulling up
  pullUp: PropTypes.func,
  // Callback function on pulling down
  pullDown: PropTypes.func,
  // Should show pull up animation
  pullUpLoading: PropTypes.bool,
  // Should show pull down animation
  pullDownLoading: PropTypes.bool,
  // Should support bounce top action
  bounceTop: PropTypes.bool,
  // Should support bounce bottom action
  bounceBottom: PropTypes.bool,
};

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
};

export default Scroll;
