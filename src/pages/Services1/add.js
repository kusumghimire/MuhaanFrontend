import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServicesApi";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import ZoneApiList from "../../services/ZoneApi";
import TutorialDataService from "../../services/TutorialService";
const AddServices = (props) => {
  const initialTutorialState = {
    id: null,
    category: "",
    zone: "",
    title: "",
    image: "",
    description: "",
    discount: "",
    payment_choice: ""
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [servicedata, setServiceData] = useState([]);
  const [categorydata, setCategoryData] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState([]);

//   function handleSelectChange(event) {
//     const { name, value } = event.target;
//     setTutorial({ ...tutorial, [name]: value });
// }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial((prevTutorial)=>{ 
      return {...prevTutorial, [name]: value} 
    });

  };

  const handleImageChange = (event) => {
    setTutorial({ ...tutorial, image: event.target.files[0] });
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

  const saveTutorial = () => {
    let formData = new FormData();

    formData.append("category ",tutorial.category);
    formData.append("zone", tutorial.zone);
    formData.append("title", tutorial.title);
    formData.append("image", tutorial.image);
    formData.append("description", tutorial.description);
    formData.append("discount", tutorial.discount);
    formData.append("rate", tutorial.rate);
    formData.append("payment_choice", tutorial.payment_choice);
    // console.log(tutorial.zone);
    // console.log(tutorial.payment_choice);

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
  };

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

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="category">Category</label>
                <select name="category" value={tutorial.category} onChange={handleInputChange} style={{width:"100%",padding:"10px",borderRadius:"4px", border:"1px solid gray"}}>
              {categorydata &&
                categorydata.map((item) => {
                 return  <option value={item.id} key={item.id}>{item.title}</option>;
                })}
            </select>
              </div>

              <div className="form-group  mt-3 mb-3">
                <label htmlFor="zone">Zone</label>
              
            <select name="zone" value={tutorial.zone}  onChange={handleInputChange} style={{width:"100%",padding:"10px",borderRadius:"4px", border:"1px solid gray"}}>
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
                <select value={tutorial.payment_choice} onChange={handleInputChange} style={{width:"100%",padding:"10px",borderRadius:"4px", border:"1px solid gray"}} name="payment_choice">
              
                <option value={tutorial.discount}>Cash on delivery</option>
                <option value={tutorial.discount}>Online Payment</option>
            </select>
             
              </div>
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

              <button onClick={saveTutorial} className="btn btn-success">
                Submit
              </button>
            </Grid>
          </Grid>
        </div>
    
    </div>
  );
};

export default AddServices;
