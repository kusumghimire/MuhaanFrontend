import React, { useState, useEffect } from "react";
import ChangePaswordApi from "../../../services/ChangePasswordApi";
import validation from "../../../validation/validation";
const ChangePassword = (props) => {
  const initialState = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };
  const [tutorial, setTutorial] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleSubmit = (e) => {
    let formData = new FormData();
    e.preventDefault();
    formData.append("old_password", tutorial.old_password); //append the values with key, value pair
    formData.append("new_password", tutorial.new_password);
    formData.append("confirm_password1", tutorial.confirm_password1);

    ChangePaswordApi.create(formData)
      .then((response) => {
        setTutorial({
          old_password: response.data.old_password,
          new_password: response.data.new_password,
          confirm_password1: response.data.confirm_password1,
        });
      })
      .catch((e) => {
        console.log(e);
      });
      setErrors(validation(tutorial));
      setDataIsCorrect(true);
  };
  return (
    <div>
      <form >
        <div class="form-group mt-3 mb-3">
          <label for="old_password">Old Password:</label>
          <input
            type="password"
            name="old_password"
            value={tutorial.old_password}
            onChange={handleInputChange}
            class="form-control"
            placeholder="Enter password"
            id="old_password"
          />
{errors.old_password && <p className='error' style={{color:"red"}}>{errors.old_password}</p>}
        </div>

        <div class="form-group mt-3 mb-3">
          <label for="new_password">New Password:</label>
          <input
            type="password"
            name="new_password"
            value={tutorial.new_password}
            onChange={handleInputChange}
            class="form-control"
            placeholder="Enter new password"
            id="new_password"
          />
{errors.new_password && <p className='error' style={{color:"red"}}>{errors.new_password}</p>}
        </div>

        <div class="form-group mt-3 mb-3">
          <label for="confirm_password1">Confirm New Password:</label>
          <input
            type="password"
            name="confirm_password1"
            value={tutorial.confirm_password1}
            onChange={handleInputChange}
            class="form-control"
            placeholder="Enter new password"
            id="confirm_password1"
          />
{errors.confirm_password1 && <p className='error' style={{color:"red"}}>{errors.confirm_password1}</p>}
        </div>

        <button onClick={handleSubmit} className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
