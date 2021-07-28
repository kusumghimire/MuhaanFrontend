import React, { useState,useEffect  } from "react";
// import AddOnApiList from "../services/TutorialService";
import AddOnApiList from "../../services/AddOnApi";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { FormatBoldTwoTone } from "@material-ui/icons";
import ServiceApi from "../../services/ServicesApi";
const AddOnListAdd = (props) => {
  const initialTutorialState = {
    id: null,
    name: "",
    description: "",
    service: "",
    image: "",
    rate: "",
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [servicedata, setServiceData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const retrieveService = () => {
    ServiceApi.getAll()
      .then((response) => {
        setServiceData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveService();
  }, []);

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

    formData.append("name", tutorial.name); //append the values with key, value pair
    formData.append("description", tutorial.description);
    formData.append("service", tutorial.service);
    formData.append("image", tutorial.image);
    formData.append("rate", tutorial.rate);

    // var data = {
    //   name: tutorial.name,
    //   description: tutorial.description,
    //   service: tutorial.service,
    //   image: tutorial.image,
    //   rate: tutorial.rate,
    // };
    
    console.log(tutorial.image,"test image");

    AddOnApiList.create(formData)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          service: response.data.service,
          image: response.data.image,
          rate: response.data.rate,
        });
        props.history.push("/add-on");
        // setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
                  Add On
                </Typography>
              </Grid>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={tutorial.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={tutorial.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
              <label htmlFor="service">Service</label>
                <select
                  name="service"
                  value={tutorial.service}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid gray",
                  }}
                >
                  {servicedata &&
                    servicedata.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.title}
                        </option>
                      );
                    })}
                </select>
              </div>



              <div className="form-group  mt-3 mb-3">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  required
                //   value={tutorial.image}
                  onChange={handleImageChange}
                  name="image"
                />
              </div>

              <div className="form-group mt-3 mb-3">
                <label htmlFor="rate">Rate</label>
                <input
                  type="number"
                  className="form-control"
                  id="rate"
                  required
                  value={tutorial.rate}
                  onChange={handleInputChange}
                  name="rate"
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

export default AddOnListAdd;
