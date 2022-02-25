import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import { login } from "../services/authService";
import { useParams, useNavigate } from "react-router";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState({ username: "", pwd: "" });
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const tmpErrors = validate();
    // console.log("ret", tmpErrors)

    setErrors(tmpErrors || {});
    // console.log("here", errors);
    if (tmpErrors) return;
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      const {data: jwt} = await login(userName, pwd);
      localStorage.setItem("token", jwt);
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
  });

  const validateLogin = (login) => {
    // const result = Joi.assert(login, schema,null, {abortEarly: false});
    // console.log(result)
    return schema.validate(login, { abortEarly: false });
  };

  const validate = () => {
    const login = { username: userName, pwd: pwd };
    const { error } = validateLogin(login);
    if (!error) return null;
    const tmpErrors = {};

    error.details.map((item) => {
      tmpErrors[item.path[0]] = item.message;
    });
    // console.log(tmpErrors)
    return tmpErrors;
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const propertySchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = propertySchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
    // console.log(e.target.id, e.target.value);
    const errorMessage = validateProperty(e.target.id, e.target.value);
    // console.log(errorMessage);
    if (errorMessage) {
      const tmpErrors = { ...errors };
      tmpErrors[e.target.id] = errorMessage;
      setErrors(tmpErrors);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Username"
          value={userName}
          name="username"
          onChange={(e) => handleChange(e)}
          autoFocus={true}
          error={errors.username}
        />
        <Input
          type="password"
          label="Password"
          value={pwd}
          name="pwd"
          onChange={(e) => setPwd(e.target.value)}
          error={errors.pwd}
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
