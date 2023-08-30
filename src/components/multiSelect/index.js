import React from 'react';
import { Select } from 'antd';



function MultiSelect({ handleChange, options }) {

    return (
            <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      // defaultValue={['a10', 'c12']}
      onChange={handleChange}
    >
      {options}
    </Select>
    )
}
export default MultiSelect
  