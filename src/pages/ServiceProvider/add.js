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
    email:"",
    phone_no:"",
    proflie_pic:"",
    address:"",
    number:"",
    office_name:"",
    office_address:"",
    pan:"",
    citizenship:"",
    document:"",
    password:"",
    confirm_password:"",
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleImageChange = (event) => {
    setTutorial({ ...tutorial, image:event.target.files[0] });
    // console.log(event.target.files[0])
  };

  const saveTutorial = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("firstname", tutorial.first_name); //append the values with key, value pair
    formData.append("lastname", tutorial.last_name);
    formData.append("email", tutorial.email);
    formData.append("number", tutorial.phone_no);
    formData.append("profile", tutorial.proflie_pic);
    formData.append("address", tutorial.address);
    formData.append("citizenship", tutorial.citizenship);
    formData.append("document", tutorial.document);
    formData.append("officename",tutorial.office_name);
    formData.append("officeaddress", tutorial.office_address);
    formData.append("pan", tutorial.pan);
    formData.append("password", tutorial.password);
    formData.append("confirmpassword", tutorial.confirm_password);

    ServiceProviderApi.create(formData)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          firstname: response.data.first_name,
          lastname: response.data.last_name,
          email: response.data.email,
          number: response.data.phone_no,
          profile: response.data.profile_pic,
          address: response.data.address,
          citizenship: response.data.citizenship,
          document: response.data.document,
          officename: response.data.office_name,
          officeaddress:response.data.office_address,
          pan: response.data.pan,
          password: response.data.password,
          confirmpassword: response.data.confirm_password,
        });

        props.history.push("/service-provider");
        // setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
      setErrors(validation(tutorial));
      setDataIsCorrect(true);
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
          <button className="btn btn-success" >
            Add
          </button>
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
                  required
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
                  required
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
                  required
                  value={tutorial.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </div>

              
              <div className="form-group  mt-3 mb-3">
                <label htmlFor="phone_no">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone_no"
                  required
                  value={tutorial.phone_no}
                  onChange={handleInputChange}
                  name="phone_no"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="profile_pic">Profile Pic</label>
                <input
                  type="file"
                  className="form-control"
                  id="profile_pic"
                  value={tutorial.profile_pic}
                  onChange={handleImageChange}
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
           
                  value={tutorial.pan}
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
                  onChange={handleImageChange}
                  name="citizenship"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="document">Document</label>
                <input
                  type="file"
                  className="form-control"
                  id="document"
              
                  onChange={handleImageChange}
                  name="document"
                />
              </div>

              <div className="form-group mt-3 mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
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
                  required
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
