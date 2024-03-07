import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
  return (
    <div>
      <Form.Group>
        <Form.Label>{props.lable}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          as={props.as}
          rows={props.rows}
        />
        <Form.Text className="text-muted">{props.error}</Form.Text>
      </Form.Group>
    </div>
  );
}

export default Input;





















/* import React from 'react';
import { Form } from 'react-bootstrap';


const Input = (props) => {

  let input = null;
  switch(props.type){
    case 'select':
      input = <Form.Group>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <select
                  className="form-control form-control-sm"
                  value={props.value}
                  onChange={props.onChange}
                >
                  <option value="">{props.placeholder}</option>
                  {
                    props.options.length > 0 ?
                    props.options.map((option, index) =>
                      <option key={index} value={option.value}>{option.name}</option>
                    ) : null
                  }
                </select>
            </Form.Group>
      break;
    case 'text':
    default:
      input = <Form.Group>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <Form.Control 
                    type={props.type} 
                    placeholder={props.placeholder} 
                    value={props.value}
                    onChange={props.onChange}
                    {...props}
                />
                <Form.Text className="text-muted">
                  {props.errorMessage}
                </Form.Text>
            </Form.Group>
  }


  return input;

 }

export default Input */