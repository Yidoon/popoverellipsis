import React from 'react';
import { Table } from 'antd';
import PopoverEllipsis from './component/PopoverEllipsis';

const Test = props => {
  const columns1 = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
      render: text => {
        return (
          <PopoverEllipsis
            title="测试"
            content={text}
            sfeConfig={{ injectEllipsis: true }}
          >
            <div>{text}</div>
            {/* {text} */}
          </PopoverEllipsis>
        );
      }
    },
    {
      title: 'Name',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      render: () => {
        return '操作';
      }
    }
  ];
  const listData1 = [
    {
      name: 'Jack',
      desc: '字比较少，他就不显示 popover',
      id: 1
    },
    {
      name: 'Tom',
      desc:
        '这个字比较多，他就会显示 popover，如果你想让这一行的宽度自动占满表格的剩余宽度，那么你需要在 columns属性中加上 ellipsis属性，不信的话，我再搞长一点，你看它显示不, 不信的话，我再搞长一点，你看它显示不, 不信的话，我再搞长一点，你看它显示不,不信的话，我再搞长一点，你看它显示不',
      id: 2
    },
    {
      name: 'Tom',
      desc: '这个字也挺少的',
      id: 3
    }
  ];

  const columns2 = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
      render: text => {
        return (
          <PopoverEllipsis
            title="测试"
            content={text}
            sfeConfig={{
              width: 300,
              injectEllipsis: true
            }}
          >
            {/* <div></div> */}
            <div className="test123">{text}</div>
          </PopoverEllipsis>
        );
      }
    },
    {
      title: 'Name',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      render: () => {
        return '操作';
      }
    }
  ];
  const listData2 = [
    {
      name: 'Jack',
      desc: '字比较少，他就不显示 popover',
      id: 1
    },
    {
      name: 'Tom',
      desc: '这个单元格，里面的元素设置了宽度，超过了这个宽度也会显示 popover',
      id: 2
    },
    {
      name: 'Tom',
      desc: '这个字也挺少的',
      id: 3
    }
  ];

  return (
    <div className="App">
      <h2>单元格自动适应表格的宽度，需要给 clumn设置 ellipsis属性</h2>
      <Table columns={columns1} dataSource={listData1} rowKey="id" />
      {/* <h2>单独给单元格设置宽度</h2>
      <Table columns={columns2} dataSource={listData2} rowKey="id" /> */}
    </div>
  );
};

export default Test;
