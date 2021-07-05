import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServicesApi";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import ZoneApiList from "../../services/ZoneApi";
import TutorialDataService from "../../services/TutorialService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

const AddServices = (props) => {
  const initialTutorialState = {
    id: null,
    category: "",
    zone: null,
    title: "",
    image: "",
    description: "",
    discount: "",
    payment_choice:null,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [servicedata, setServiceData] = useState([]);
  const [categorydata, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleInputZone = (event, option) => {
    const zoneData = [];
    option.map((each) => zoneData.push(each.name));
    setTutorial({ ...tutorial, zone: zoneData });
    console.log(tutorial.zoneData,"zone data");
  };

  const handleInputPayment = (event, option) => {
    const zoneData = [];
    option.map((each) => zoneData.push(each.name));
    setTutorial({ ...tutorial, zone: zoneData });
  };

  const handleImageChange = (event) => {
    setTutorial({ ...tutorial, image: event.target.files[0] });
    // console.log(event.target.files[0])
  };
  
  const retrieveTutorialsZone = () => {
    ZoneApiList.getAll()
      .then((response) => {
        console.log(response, "response data");
        setServiceData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveTutorialsCategory = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveTutorialsZone();
    retrieveTutorialsCategory();
  }, []);
  console.log(retrieveTutorialsZone);

  const saveTutorial = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("category ", tutorial.category);
    formData.append("zone", tutorial.zone);
    formData.append("title", tutorial.title);
    formData.append("image", tutorial.image);
    formData.append("description", tutorial.description);
    formData.append("discount", tutorial.discount);
    formData.append("rate", tutorial.rate);
    formData.append("payment_choice", tutorial.payment_choice);

    ServiceApi.create(formData)

      .then((response) => {
        setTutorial({
          id: response.data.id,
          category: response.data.category,
          title: response.data.title,
          image: response.data.image,
          description: response.data.description,
          rate: response.data.rate,
          discount: response.data.discount,
          payment_choice: response.data.payment_choice,
        });
        props.history.push("/services");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(tutorial);
  };

  const classes = useStyles();
  const paymentChoice = [
    { title: "Online Payment" },
    { title: "Cash Payment" },
  ];
  return (
    <div className="submit-form">
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

            {/* Here is mulitselect started */}
            <form onSubmit={saveTutorial}>
              <div className="form-group  mt-3 mb-3">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  value={tutorial.category}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid gray",
                  }}
                >
                  {categorydata &&
                    categorydata.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.title}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className={classes.root}>
                <label>Zone</label>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={servicedata}
                  onChange={handleInputZone}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select Zone"
                    />
                  )}
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="title">Title</label>
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
                <select
                  value={tutorial.payment_choice}
                  name="payment_choice"
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid gray",
                  }}
                >
                  <option value="1">Cash Payment</option>
                  <option value="2">Online Payment</option>
                </select>
              </div>

              {/* <div className="form-group  mt-3 mb-3">
                <div className={classes.root}>
                  <label>Payment Choice</label>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={tutorial.payment_choice}
                    name="payment_choice"
                    onChange={handleInputZone}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select Payment"
                      />
                    )}
                  />
                </div>
              </div> */}
              {/* <div className="form-group  mt-3 mb-3">
                <label htmlFor="payment_choice">Payment</label>
                <input
                  type="text"
                  className="form-control"
                  id="payment_choice"
                  required
                  value={tutorial.payment_choice}
                  onChange={handleInputChange}
                  name="payment_choice"
                />
              </div> */}

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddServices;
