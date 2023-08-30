import React from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Upload,
  Select,
  Checkbox,
  Spin,
} from "antd";

const SkillList = (props) => {
  return props.bookDetails.map((val, idx) => {
    let name = `name-${idx}`;
    const onChange = (e) => {
      document.getElementById(name).value = e.target.value;
    };
    return (
      <Row style={{ marginBlock: "20px" }} key={val.index}>
        <Col lg={18} md={16} sm={16} xs={12} xxl={16} xl={16}>
          <Input
            type="text"
            placeholder="Key Point"
            defaultValue={val.name}
            name="name"
            onChange={onChange}
            data-id={idx}
            id={name}
          />
        </Col>

        <Col
          style={{ marginLeft: "10px" }}
          lg={6}
          md={6}
          xs={10}
          sm={8}
          xxl={6}
          xl={6}
        >
          {idx === 0 ? (
            <Button
              onClick={() => props.add()}
              type="button"
              className="btn btn-primary text-center"
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </Button>
          ) : (
            <>
              <Button
                onClick={() => props.add()}
                type="button"
                className="btn btn-primary text-center"
              >
                <i className="fa fa-plus" aria-hidden="true" />
              </Button>
              &nbsp; &nbsp;
              <Button
                className="btn btn-danger"
                onClick={() => props.delete(val)}
              >
                <i className="fa fa-minus" aria-hidden="true" />
              </Button>
            </>
          )}
        </Col>
      </Row>
    );
  });
};
export default SkillList;
