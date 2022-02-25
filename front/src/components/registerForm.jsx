import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import { register } from "../services/userService"
import { useParams, useNavigate } from "react-router";


function RegisterForm() {
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const tmpErrors= validate();
    console.log("ret", tmpErrors)

    // setErrors(null);
    setErrors(tmpErrors || {});
    console.log("here", errors);
    console.log("jep")
    console.log(errors)
    if (tmpErrors) return;
    console.log("jep2")
    doSubmit(); 
  };

  const doSubmit = async () => {
    try {
      const response = await register({
          name: firstName,
          username: userName,
          pwd: pwd
        })
      localStorage.setItem('token', response.headers["x-auth-token"])  
      // navigate("/");
      window.location = '/';

    }  
    catch(ex) {
      if(ex.response && ex.response.status === 400)
      console.log(ex.response.data)
      const tmpErrors = {...errors}
      tmpErrors.username = ex.response.data;
      setErrors(tmpErrors)
    }
  }

  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    pwd: Joi.string().required().label("Password"),
    firstname: Joi.string().required().label("Firstname")
  });

  const validateLogin = (login) => {
    // const result = Joi.assert(login, schema,null, {abortEarly: false});
    // console.log(result)
    return schema.validate(login, { abortEarly: false });
  };

  const validate = () => {
    const login = { username: userName, pwd: pwd, firstname: firstName };
    const { error } = validateLogin(login);
    // console.log("f",error)
    if (!error) return null;
    const tmpErrors = {};

    // console.log("j",error)
    error.details.map((item) => {
      tmpErrors[item.path[0]] = item.message;
    });
    // console.log(tmpErrors)
    return tmpErrors;
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const propertySchema = Joi.object({ [name]: Joi.string().required() });
    const { error } = propertySchema.validate(obj);
    // console.log(error.details[0].message)
    return error ? error.details[0].message : null;
  };

  const handleChange = (e) => {
    // console.log(e.target.id, e.target.value);
    const errorMessage = validateProperty(e.target.id, e.target.value);
    // console.log(errorMessage);
    // if (errorMessage) {
      const tmpErrors = { ...errors };
      tmpErrors[e.target.id] = errorMessage;
    //   console.log(tmpErrors)
      setErrors(tmpErrors);
    // }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Username"
          value={userName}
          name="username"
          onChange={(e) => {setUserName(e.target.value);handleChange(e)}}
          autoFocus={true}
          error={errors.username}
        />
        <Input
          type="password"
          label="Password"
          value={pwd}
          name="pwd"
          onChange={(e) => {setPwd(e.target.value);handleChange(e)}}
          error={errors.pwd}
        />
        <Input
          label="Firstname"
          value={firstName}
          name="firstname"
          onChange={(e) => {setFirstName(e.target.value);handleChange(e)}}
          error={errors.firstname}
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
