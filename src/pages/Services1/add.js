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
    id: "",
    category: "",
    title: "",
    image: "",
    description: "",
    discount: "",
    credit_point: "",
  };
  const initialZoneState = {
    zone: [],
  };
  const initialPayment = { payment_choice: [] };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [zone, setZone] = useState(initialZoneState);
  const [payment_choice, setPayment] = useState(initialPayment);

  const [submitted, setSubmitted] = useState(false);
  const [servicedata, setServiceData] = useState([]);
  const [categorydata, setCategoryData] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState([]);
  const [finalData, setFinalData] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial((prevTutorial) => {
      return { ...prevTutorial, [name]: value };
    });
  };

  const handleInputZone = (event, option) => {
    setZone(
      option.map((el) => {
        return el.id;
      })
    );
  };
  const handleInputPay = (event, option) => {
    console.log(event);
    setPayment(
      option.map((el) => {
        return el.choice;
      })
    );
    console.log(
      option.map((el) => {
        return el.choice;
      })
    );
  };

  const handleImageChange = (event) => {
    setTutorial({ ...tutorial, image:event.target.files[0] });
    // console.log(event.target.files[0])
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

  // console.log(zonedata && zonedata.length > 0 ? zonedata[0].id : "hello");

  const saveTutorial = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("category ", tutorial.category);
    // let x=[];
    // zonedata &&
    //   zonedata.length > 0 &&
    //   zonedata.map((item, index) => {

    //    console.log(zonedata);
    //     // return formData.append(`zone[${index}]`,tutorial.zone.concat(zonedata));
    //   });
    formData.append("title", tutorial.title);
    formData.append("image", tutorial.image);
    formData.append("description", tutorial.description);
    formData.append("discount", tutorial.discount);
    formData.append("rate", tutorial.rate);
    formData.append("zone", zone);
    // let newForm = {
    //   category: tutorial.category,
    //   title: tutorial.title,
    //   image: tutorial.image,
    //   description: tutorial.description,
    //   discount: tutorial.discount,
    //   rate: tutorial.rate,
    //   zone: zone,
    //   payment_choice: payment_choice,
    //   credit_point: tutorial.credit_point,
    // };

    formData.append("payment_choice", payment_choice);
    formData.append("credit_point", tutorial.credit_point);
    let finalState;
    finalState = { ...tutorial, zone, payment_choice };
    console.log(finalState);

    ServiceApi.create(formData)

      .then((response) => {
        console.log(response);
        setFinalData(finalState);

        props.history.push("/services");
      })
      .catch((e) => {
        console.log(e);
      });

    // console.log(tutorial);
    // console.log(zone);
  };

  const classes = useStyles();
  const paymentChoice = [
    { choice: 1, title: "Online Payment" },
    { choice: 2, title: "Cash Payment" },
  ];
  return (
    <form onSubmit={saveTutorial}>
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
                  name="zone"
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
                <div className={classes.root}>
                  <label>Payment Choice</label>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={paymentChoice}
                    name="payment_choice"
                    onChange={handleInputPay}
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
              </div>
              <div className="form-group  mt-3 mb-3">
                <label htmlFor="credit_point">Credit Point</label>
                <input
                  type="text"
                  className="form-control"
                  id="credit_point"
                  required
                  value={tutorial.credit_point}
                  onChange={handleInputChange}
                  name="credit_point"
                />
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </Grid>
          </Grid>
        </div>
      </div>
    </form>
  );
};

export default AddServices;
