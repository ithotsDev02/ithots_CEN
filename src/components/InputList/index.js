import React, { useState } from "react";
// import Button from "components/Button";
// import Input from "components/Form/Input";
import PlusIcon from "../Icons/PlusIcon";
// import Flex from "components/Flex";
import { Row, Col, Icon, Divider } from "antd";
import styled from "styled-components";
import { Input, Button } from "antd";
// import { COLORS } from "theme";

// const CircleButton = styled(Button.Circle)`
//   margin: 43px 8px;
// `;
// const Wrapper = styled(Flex)`
//   border-bottom: 1px solid ${COLORS.GREY_T_92};
// `;
// const TextWrapper = styled.div`
//   padding: 10px 10px;
//   word-break: break-all;
// `;
// const IconWrapper = styled.div`
//   padding: 10px 10px;
//   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
// `;
// const Split = styled(Divider)`
//   margin: 0px;
// `;

const TodoList = (
  {
    //   getFieldDecorator,
    //   maxLength,
    //   name,
    //   rules,
    //   handleClose,
    //   handleInputConfirm,
    //   list,
    //   initialValue,
    //   setInitialValue,
    //   placeholder,
    //   label,
    //   disabled,
  }
) => {
  const [initialValue, setInitialValue] = useState("");
  const handleInputChange = (e) => {
    setInitialValue(e.target.value);
  };

  return (
    <div>
      <Row>
        <Col span={21}>
          <Input
            // disabled={disabled}
            // getFieldDecorator={getFieldDecorator}
            // maxLength={maxLength}
            // name={name}
            // rules={rules}
            initialValue={initialValue || ""}
            autoComplete="off"
            onChange={handleInputChange}
            // placeholder={placeholder}
            // label={label}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <PlusIcon />
          {/* <CircleButton
            onClick={handleInputConfirm}
            icon={<PlusIcon />}
            disabled={disabled}
          /> */}
        </Col>
      </Row>
      {/* {list.length !== 0 && <Split />} */}
      {list.map((text, idx) => {
        return (
          //   <Wrapper spaceBetween key={idx}>
          // <TextWrapper>
          { text }
          // </TextWrapper>
          // <IconWrapper
          //   onClick={() => {
          //     handleClose(text);
          //   }}
          //   disabled={disabled}
          // >
          //   <Icon type="close" />
          // </IconWrapper>
          //   </Wrapper>
        );
      })}
    </div>
  );
};

export default TodoList;
