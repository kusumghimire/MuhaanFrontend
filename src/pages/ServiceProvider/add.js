import React, { useState } from "react";
import ServiceProviderApi from "../../services/ServiceProviderApi";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const AddServiceProvider = (props) => {
  const initialTutorialState = {
    id: null,
    firstname: "",
    lastname: "",
    profile:"",
    address:"",
    number:"",
    officename:"",
    pan:"",
    citizenship:"",
    document:"",
    password:"",
    confirmpassword:"",
    description: "",
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

  const saveTutorial = () => {
    let formData = new FormData();

    formData.append("firstname", tutorial.firstname); //append the values with key, value pair
    formData.append("lastname", tutorial.lastname);
    formData.append("profile", tutorial.proflie);
    formData.append("address", tutorial.address);
    formData.append("number", tutorial.number);
    formData.append("officenumber", tutorial.officenumber);
    formData.append("pan", tutorial.pan);
    formData.append("citizenship", tutorial.citizenship);
    formData.append("document", tutorial.document);
    formData.append("password", tutorial.password);
    formData.append("confirmpassword", tutorial.confirmpassword);

    ServiceProviderApi.create(formData)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          profile: response.data.profile,
          address: response.data.address,
          number: response.data.number,
          officenumber: response.data.officenumber,
          pan: response.data.pan,
          citizenship: response.data.citizenship,
          document: response.data.document,
          password: response.data.password,
          confirmpassword: response.data.confirmpassword,
        });

        props.history.push("/service-provider");
        // setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
      setErrors(validation(values));
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
              <div className="form-group  mt-3 mb-3">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  required
                  value={tutorial.firstname}
                  onChange={handleInputChange}
                  name="firstname"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  required
                  value={tutorial.lastname}
                  onChange={handleInputChange}
                  name="lastname"
                />
              </div>
              <div className="form-group  mt-3 mb-3">
                <label htmlFor="profile">Profile Pic</label>
                <input
                  type="file"
                  className="form-control"
                  id="profile"
                  required
                  onChange={handleImageChange}
                  name="profile"
                />
              </div>
              <div className="form-group  mt-3 mb-3">
                <label htmlFor="number">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  required
                  value={tutorial.number}
                  onChange={handleInputChange}
                  name="number"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="officename">Office Name </label>
                <input
                  type="text"
                  className="form-control"
                  id="officename"
                  required
                  value={tutorial.officename}
                  onChange={handleInputChange}
                  name="officename"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="pan">PAN/VAT</label>
                <input
                  type="text"
                  className="form-control"
                  id="pan"
                  required
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
                  required
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
                  required
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
                  onChange={handleInputChange}
                  name="password"
                />
              </div>

              <div className="form-group mt-3 mb-3">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  required
                  value={tutorial.confirmpassword}
                  onChange={handleInputChange}
                  name="confirmpassword"
                />
              </div>

              <button onClick={saveTutorial} className="btn btn-success">
                Submit
              </button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AddServiceProvider;
