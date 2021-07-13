import React, { useState, useRef, useEffect, ReactElement } from 'react';
import './index.less';
// ts
import { PopoverProps } from 'antd/lib/popover';
// comp
import { Popover } from 'antd';

interface IKvString {
  [key: string]: string;
}
const CHECKVALUEMAP: IKvString = {
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};
const INJECTCLASSMAP = {
  injectEllipsis: '_inject-ellipsis'
};
interface IPopoverEllipsis extends PopoverProps {
  children?: React.ReactNode;
  sfeConfig?: {
    injectEllipsis: boolean; // 是否需要注入 ellipsis class
    style: IKvString; // css style
    width: number | string;
  };
}
const PopoverEllipsis: React.FC<IPopoverEllipsis> = props => {
  const { sfeConfig = {} } = props;
  const { injectEllipsis = false, style, width } = sfeConfig;
  const [isPopover, setIsPopover] = useState<boolean>(false);
  const refChild = useRef<HTMLElement>();
  const refOriginChild = useRef<HTMLElement>();
  const genInjectClass = () => {
    const list = [];
    if (sfeConfig && sfeConfig.injectEllipsis) {
      list.push(INJECTCLASSMAP.injectEllipsis);
    }
    return list.join(' ');
  };
  const hasInjectProps = () => {
    const keys = Object.keys(INJECTCLASSMAP);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (sfeConfig[keys[i]]) {
        return true;
      }
    }
    return false;
  };
  /**
   * assign the origin child to refOriginChild
   */
  const cloneOriginChild = child => {
    return React.cloneElement(child, {
      ref: refOriginChild
    });
  };
  /**
   * wrap the child with div, set class and style to div,
   * it's aims to set some inner styles
   * @param child
   */
  const _handleChildren = (child: ReactElement) => {
    const classNames = `${
      isPopover ? 'popover-ellipsis-text-active' : ''
    } popover-ellipsis-text`;
    const finalStyle = {
      ...(style || {})
    };
    if (width) {
      finalStyle.width = width;
    }
    return (
      <div className={`${classNames}`} style={{ ...finalStyle }}>
        {React.isValidElement(props.children) && hasInjectProps()
          ? injectClassToOriginChild()
          : cloneOriginChild(child)}
      </div>
    );
  };
  /**
   * according to props (such as inject**), modify child's classnNames manually
   */
  const injectClassToOriginChild = () => {
    const injectClass = genInjectClass();
    return React.cloneElement(props.children, {
      className: `${props.children.props.className || ''} ${injectClass}`,
      ref: refOriginChild
    });
  };
  /**
   * sometimes we need to change some attr of child, so we need to cloneElement to generate a new one
   * but now ,we just inject the "ref" to child , and we get the dom
   */
  const renderChildren = () => {
    let popoverChild = _handleChildren(props.children);
    hasEllipsisSet();
    return React.cloneElement(popoverChild as ReactElement, {
      ref: refChild
    });
  };
  /**
   * check if a child contains such ellipsis style
   * if the child does not have ellipsis style, throw a warning
   */
  const hasEllipsisSet = () => {
    if (
      isPopover &&
      React.isValidElement(props.children) &&
      !hasInjectProps()
    ) {
      console.log(isPopover, React.isValidElement(props.children));
      const errArr = [];
      const refDom = refOriginChild.current;
      console.log(refDom, 'refDom');
      if (refDom) {
        const totalStylObj = window.getComputedStyle(refDom);
        Object.keys(CHECKVALUEMAP).forEach(key => {
          // @ts-expect-error
          if (totalStylObj[key] !== CHECKVALUEMAP[key]) {
            errArr.push(key);
          }
        });
        if (errArr.length > 0) {
          console.error(
            'please set ellipsis, or pass "injectEllipsis" to PopoverEllipsis '
          );
          return false;
        }
      }
      return true;
    }
  };
  /**
   * valid the content should be ellipsis and popover
   */
  const validShowPopover = () => {
    let res = false;
    const refDom = refChild.current;
    if (refDom) {
      // hasEllipsisSet();
      const cloneNode: HTMLElement = refDom.cloneNode(true) as HTMLElement;
      cloneNode.style.display = 'inline-block';
      cloneNode.style.width = 'auto';
      cloneNode.style.visibility = 'hidden';
      document.body.appendChild(cloneNode);
      if (cloneNode.offsetWidth > refDom.offsetWidth) {
        res = true;
      }
      document.body.removeChild(cloneNode);
      setIsPopover(res);
    }
    return res;
  };
  const contentDom = () => {
    return (
      <div
        style={{
          width: 400,
          maxHeight: 126,
          overflow: 'auto',
          whiteSpace: 'pre-wrap'
        }}
      >
        {props.content}
      </div>
    );
  };
  const renderPopover = () => {
    return (
      <Popover title={props.title} content={contentDom}>
        {renderChildren()}
      </Popover>
    );
  };
  useEffect(() => {
    validShowPopover();
  }, []);
  return <>{isPopover ? renderPopover() : renderChildren()}</>;
};

export default PopoverEllipsis;
