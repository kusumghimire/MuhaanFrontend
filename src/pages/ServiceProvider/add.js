import React, { useState } from "react";
import ServiceProviderApi from "../../services/ServiceProviderApi";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import validation from "../../validation/validation";
const AddServiceProvider = (props) => {
  const initialTutorialState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    proflie_pic: "",
    address: "",
    office_name: "",
    office_address: "",
    pan: "",
    citizenship: "",
    document: "",
    password: "",

    confirm_password: "",
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  // const handleImageChange = (event) => {
  //   setTutorial({ ...tutorial, image: event.target.files[0] });
  //   console.log(event.target.files);
  // };

  const saveTutorial = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("first_name", tutorial.first_name); //append the values with key, value pair
    formData.append("last_name", tutorial.last_name);
    formData.append("email", tutorial.email);
    formData.append("phone_no", tutorial.phone_no);
    formData.append("profile_pic", tutorial.proflie_pic);
    formData.append("address", tutorial.address);
    formData.append("citizenship", tutorial.citizenship);
    formData.append("document", tutorial.document);
    formData.append("office_name", tutorial.office_name);
    formData.append("office_address", tutorial.office_address);
    formData.append("pan", tutorial.pan);
    formData.append("password", tutorial.password);
    formData.append("confirm_password", tutorial.confirm_password);
    let finalData = { ...tutorial };
    ServiceProviderApi.create(formData)
      .then((response) => {
        setTutorial(finalData);

        props.history.push("/service-provider");
      })
      .catch((e) => {
        console.log(e);
      });
    setErrors(validation(tutorial));
    setDataIsCorrect(true);
    // setSubmitted(true);
    // console.log(finalData);
  };

  // const newTutorial = () => {
  //   setTutorial(initialTutorialState);
  //   setSubmitted(false);
  // };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success">Add</button>
        </div>
      ) : (
        <div>
          <Grid container>
            <Grid item md={8}>
              <Grid item>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ marginRight: "1rem" }}
                >
                  Service Provider
                </Typography>
              </Grid>
              <form>
                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
          
                    value={tutorial.first_name}
                    onChange={handleInputChange}
                    name="first_name"
                  />
                </div>

                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                 
                    value={tutorial.last_name}
                    onChange={handleInputChange}
                    name="last_name"
                  />
                </div>

                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    
                    value={tutorial.email}
                    onChange={handleInputChange}
                    name="email"
                  />
                  {errors.email && <p className='error' style={{color:"red"}}>{errors.email}</p>}
                </div>

                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="phone_no">Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone_no"
                   
                    value={tutorial.phone_no}
                    onChange={handleInputChange}
                    name="phone_no"
                  />
                  {errors.phone && <p className='error' style={{color:"red"}}>{errors.phone}</p>}
                </div>

                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="profile_pic">Profile Pic</label>
                  <input
                    type="file"
                    className="form-control"
                    id="profile_pic"
                    onChange={(event) => {
                      setTutorial({
                        ...tutorial,
                        profile_pic: event.target.files[0],
                      });
                    }}
                    name="profile_pic"
                  />
                </div>
                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={tutorial.address}
                    onChange={handleInputChange}
                    name="address"
                  />
                </div>

                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="office_name">Office Name </label>
                  <input
                    type="text"
                    className="form-control"
                    id="office_name"
                    value={tutorial.office_name}
                    onChange={handleInputChange}
                    name="office_name"
                  />
                </div>

                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="office_address">Office Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="office_address"
                    value={tutorial.office_address}
                    onChange={handleInputChange}
                    name="office_address"
                  />
                </div>

                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="pan">PAN/VAT</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pan"
                    onChange={handleInputChange}
                    name="pan"
                  />
                </div>
                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="citizenship">Citizenship</label>
                  <input
                    type="file"
                    className="form-control"
                    id="citizenship"
                    onChange={(event) => {
                      setTutorial({
                        ...tutorial,
                        citizenship: event.target.files[0],
                      });
                    }}
                    name="citizenship"
                  />
                </div>

                <div className="form-group  mt-3 mb-3">
                  <label htmlFor="document">Document</label>
                  <input
                    type="file"
                    className="form-control"
                    id="document"
                    onChange={(event) => {
                      setTutorial({
                        ...tutorial,
                        document: event.target.files[0],
                      });
                    }}
                    name="document"
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                
                    value={tutorial.password}
                    name="password"
                    onChange={handleInputChange}
                  />
                  {errors.password && <p className='error' style={{color:"red"}}>{errors.password}</p>}
                </div>

                <div className="form-group mt-3 mb-3">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm_password"
                   
                    value={tutorial.confirm_password}
                    name="confirm_password"
                    onChange={handleInputChange}
                  />
                  {errors.confirm_password && <p className='error' style={{color:"red"}}>{errors.confirm_password}</p>}
                </div>

                <button onClick={saveTutorial} className="btn btn-success">
                  Submit
                </button>
              </form>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AddServiceProvider;
