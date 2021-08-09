import { PanoramaSharp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import AddOnApiList from "../../services/AddOnApi";
import ServiceApi from "../../services/ServicesApi";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const AddOnEdit = props => {
  const initialTutorialState = {
    id: "",
    name: "",
    description: "",
    image:"",
    rate:"",
    };
    const initialService = {
      service: ""
    };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const [serviceData,setServiceData]=useState([]);
const [service,setServiceChange]=useState(initialService);
const [finalData, setFinalData] = useState({});

  // retrieve service
  const retrieveService = () => {
    ServiceApi.getAll()
      .then((response) => {
        setServiceData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

// console.log(serviceData);

  // 
  
  const retrieveTutorials = () => {
    AddOnApiList.getAll()
    .then((response) => {
      // setTutorials(response.data);
      
      const res= response && response.data && response.data.filter(item=>item.id ===  parseInt(props.match.params.id))
      setCurrentTutorial({
                id:res[0].id,
                name:res[0].name,
                description:res[0].description,
               
                image:res[0].image,
                rate:res[0].rate,
              });
              setServiceChange({
                service:res[0].service
              })
              console.log(res);
    })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveTutorials();
    retrieveService();
  }, []);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };
  const handleImageChange = (event) => {
    setCurrentTutorial({ ...currentTutorial, image:event.target.files[0] });
    // console.log(event.target.files[0])
  };
  const handleServiceChange = (event,value) => {
    // setServiceChange(value);
    console.log(value.id);
    setServiceChange(value.id);

  };
  const updateTutorial = () => {
    // console.log(currentTutorial)
    // AddOnApiList.update(currentTutorial.id, currentTutorial)
    
    //   .then(response => {
    //     console.log(response.data);
    //     props.history.push("/add-on");
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    
    
    let formData = new FormData();

    formData.append("name", currentTutorial.name); //append the values with key, value pair
    formData.append("description", currentTutorial.description);
    formData.append("service", service);
    formData.append("image", currentTutorial.image);
    formData.append("rate", currentTutorial.rate);

    // var data = {
    //   name: tutorial.name,
    //   description: tutorial.description,
    //   service: tutorial.service,
    //   image: tutorial.image,
    //   rate: tutorial.rate,
    // };
    
    // console.log(tutorial.image,"test image");
    let finalState;
    finalState = { ...currentTutorial, service};
    console.log(finalState);
    AddOnApiList.update(currentTutorial.id,formData)
      .then((response) => {
        setFinalData(finalState);
        props.history.push("/add-on");
        // setSubmitted(true);
    
      })
      .catch((e) => {
        console.log(e);
      });

  };



  return (
    <div>

        <div className="edit-form">
          <h4>Edit Add On</h4>
          <form>
            <div className="form-group mt-3 mb-3">
              <label htmlFor="name">Add On </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTutorial.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3 mb-3">
              <label htmlFor="name">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3 mb-3">
              <label htmlFor="name">Service </label>
              {/* <input
                type="text"
                className="form-control"
                id="setvice"
                name="service"
                value={currentTutorial.service}
                onChange={handleInputChange}
              /> */}
              {/* <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid gray",
                  }} 
                  name="service"
                  value={currentTutorial.service}

                  onChange={handleInputChange}
                >
                  {serviceData.map((option) => (
                    <option value={option.id} >
                  
                      {option.title}
                    </option>
                  ))}
                </select> */}
                <Autocomplete
                  id="tags-standard"
                  options={serviceData}
                  // defaultValue={serviceData[5]}
              
                  onChange={handleServiceChange}
                  name="service"
                  // multiple
             
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                    
                    />
                  )}
                />
            </div>

            <div className="form-group  mt-3 mb-3">
                <label htmlFor="image">Image</label>
                {/* <p>Current Image: {currentTutorial.image}</p> */}
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  required
                //   value={tutorial.image}
                  defaultValue={currentTutorial.image}
                  onChange={handleImageChange}
                  name="image"
                />
              </div>

            <div className="form-group mt-3 mb-3">
              <label htmlFor="rate">Rate </label>
              <input
                type="number"
                className="form-control"
                id="rate"
                name="rate"
                value={currentTutorial.rate}
                onChange={handleInputChange}
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

        </div>
    </div>
  );
};

export default AddOnEdit;
