import React from 'react';
import { Select } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
function MoreMenu({  menu }) {

    return (
           <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Click me
                     <DownOutlined />
                </a>
            </Dropdown>
    )
}
export default MoreMenu
  