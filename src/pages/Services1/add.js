import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServicesApi";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import ZoneApiList from "../../services/ZoneApi";

const AddServices = (props) => {
  const initialTutorialState = {
    id: null,
    category: "",
    zone: "",
    title: "",
    image: "",
    description: "",
    discount: "",
    payment_choice: "",
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [servicedata, setServiceData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleImageChange = (event) => {
    setTutorial({ ...tutorial, image: event.target.files[0] });
    // console.log(event.target.files[0])
  };

  const saveTutorial = () => {
    let formData = new FormData();

    formData.append("category", tutorial.category);
    formData.append("zone", tutorial.zone);
    formData.append("title", tutorial.title);
    formData.append("image", tutorial.image);
    formData.append("description", tutorial.description);
    formData.append("discount", tutorial.discount);
    formData.append("payment_choice", tutorial.payment_choice);

    ServiceApi.create(formData)
      .then((response) => {
        props.history.push("services");
        setTutorial({
          id: response.data.id,
          category: response.data.category,
          title: response.data.title,
          image: response.data.image,
          description: response.data.description,
          discount: response.data.discount,
          payment_choice: response.data.payment_choice,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveTutorialsZone = () => {
    ZoneApiList.getAll()
      .then((response) => {
        setServiceData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveTutorialsZone();
  }, []);
  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h2>You submitted successfully!</h2>
          <button className="btn btn-success" onClick={newTutorial}>
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
                  Add Service
                </Typography>
              </Grid>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  required
                  value={tutorial.category}
                  onChange={handleInputChange}
                  name="category"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="zone">Zone</label>
              
            <select style={{width:"100%",padding:"10px",borderRadius:"4px", border:"1px solid gray"}}>
              {servicedata &&
                servicedata.map((item) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
            </select>
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="zone">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={tutorial.title}
                  onChange={handleInputChange}
                  name="title"
                />
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
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  className="form-control"
                  id="discount"
                  required
                  value={tutorial.discount}
                  onChange={handleInputChange}
                  name="discount"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="payment_choice">Payment Choice</label>
                <select style={{width:"100%",padding:"10px",borderRadius:"4px", border:"1px solid gray"}}>
              
                <option value={tutorial.discount}>Cash on delivery</option>
                <option value={tutorial.discount}>Online Payment</option>
            </select>
             
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

export default AddServices;
