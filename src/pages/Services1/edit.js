import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServicesApi";
import ZoneApiList from "../../services/ZoneApi";
import TutorialDataService from "../../services/TutorialService";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const EditServices = (props) => {
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
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [zone, setZone] = useState(initialZoneState);
  const [payment_choice, setPayment] = useState(initialPayment);
  const [servicedata, setServiceData] = useState([]);
  const [categorydata, setCategoryData] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState([]);
  const [finalData, setFinalData] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial((prevTutorial) => {
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
  useEffect(() => {
    retrieveTutorialsCategory();
    retrieveTutorials();
    retrieveTutorialsZone();
  }, []);

  const handleImageChange = (event) => {
    setCurrentTutorial({ ...currentTutorial, image:event.target.files[0] });
    console.log(event.target.files[0])
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
  
  const retrieveTutorials = () => {
    ServiceApi.getAll()
      .then((response) => {
        // setTutorials(response.data);
        const res =
          response &&
          response.data &&
          response.data.filter(
            (item) => item.id === parseInt(props.match.params.id)
          );
        let pay=res[0].payment_choice.split(",")
        setCurrentTutorial({
          id: res[0].id,
          category: res[0].category,
          title: res[0].title,
          image: res[0].image,
          description: res[0].description,
          rate: res[0].rate,
          discount: res[0].discount,
          payment_choice: pay,
          zone:res[0].zone.map((item)=>{
            return item.id
          }),
          credit_point: res[0].credit_point,
        });
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

  const updateTutorial = (e) => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append("id",currentTutorial.id);
    // formData.append("category ", currentTutorial.category);
    // // let x=[];
    // // zonedata &&
    // //   zonedata.length > 0 &&
    // //   zonedata.map((item, index) => {

    // //    console.log(zonedata);
    // //     // return formData.append(`zone[${index}]`,tutorial.zone.concat(zonedata));
    // //   });
    // formData.append("title", currentTutorial.title);
    // formData.append("image", currentTutorial.image);
    // formData.append("description", currentTutorial.description);
    // formData.append("discount", currentTutorial.discount);
    // formData.append("rate", currentTutorial.rate);
    // formData.append("zone", zone);
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

    // formData.append("payment_choice", payment_choice);
    // formData.append("credit_point", currentTutorial.credit_point);
    let finalState;
    finalState = { ...currentTutorial, zone, payment_choice };


    console.log(finalState);
    ServiceApi.update(finalState.id, finalState)

    // console.log(tutorial);
    // console.log(zone);
  };

  const paymentChoice = [
    { choice: 1, title: "Online Payment" },
    { choice: 2, title: "Cash Payment" },
  ];
  return (
    <div>
      <div className="edit-form">
        <h4>Edit Service</h4>
        <Grid container>
          <Grid item md={8}>
            <form>
              <div className="form-group  mt-3 mb-3">
                <label htmlFor="category">Category</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid gray",
                  }} 
                  name="category"
                  value={currentTutorial.category}

                  onChange={handleInputChange}
                >
                  {categorydata.map((option) => (
                    <option value={option.id}>
                      {option.title}
                    </option>
                  ))}
                </select>
                {/* <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid gray",
                  }}
                               onChange={handleInputChange}
                >
                  {categorydata &&
                    categorydata.map((item) => {
                      return (
                        <>
                          <option value={item.id}>{item.title}</option>
                        </>
                      );
                    })}
                </select> */}
                {/* <p>{currentTutorial.category}</p> */}
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="zone">Zone</label>

                {/* <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid gray",
                  }}
                >
                  {servicedata &&
                    servicedata.map((item) => {
                      return <option value={item.id} >{item.name}</option>;
                    })}
                </select> */}

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

                {/* <select name={field}   value={currentTutorial.zone}
              onChange={handleDropdownChange}>
              {FBButtons.map((fbb) => (
                <option key={fbb.key} value={fbb.key}>
                  {fbb.value}
                </option>
              ))}
              ;
            </select> */}

                {/* 
            <select
              value={currentTutorial.zone}
              onChange={handleDropdownChange}
            >
              <option value="grapefruit">1</option>
              <option value="lime">2</option>
              <option value="coconut">3</option>
              <option value="mango">4</option>
            </select> */}
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="zone">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={currentTutorial.title}
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
                  value={currentTutorial.description}
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
                  value={currentTutorial.rate}
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
                  value={currentTutorial.discount}
                  onChange={handleInputChange}
                  name="discount"
                />
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="payment_choice">Payment Choice</label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="payment_choice"
                  required
                  value={currentTutorial.payment_choice}
                  onChange={handleInputChange}
                  name="payment_choice"
                /> */}
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
              <div className="form-group  mt-3 mb-3">
                <label htmlFor="credit_point">Credit Point</label>
                <input
                  type="text"
                  className="form-control"
                  id="credit_point"
                  required
                  value={currentTutorial.credit_point}
                  onChange={handleInputChange}
                  name="credit_point"
                />
              </div>
            </form>

            <button
              type="submit"
              className="btn btn-success mt-3 mb-3"
              onClick={updateTutorial}
            >
              Update
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EditServices;
