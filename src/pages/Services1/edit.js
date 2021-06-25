import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServicesApi";
import ZoneApiList from "../../services/ZoneApi";
import TutorialDataService from "../../services/TutorialService";
import Grid from "@material-ui/core/Grid";

const EditServices = (props) => {
  const initialTutorialState = {
    id: "",
    category: "",
    zone: "",
    title: "",
    image: "",
    description: "",
    discount: "",
    payment_choice: "",
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [servicedata, setServiceData] = useState([]);
  const [categorydata, setCategoryData] = useState([]);

  const retrieveTutorialsCategory = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setCategoryData(response.data);      
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(categorydata)


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
        setCurrentTutorial({
          id: res[0].id,
          category: res[0].category,
          title: res[0].title,
          image: res[0].image,
          description: res[0].description,
          discount: res[0].discount,
          payment_choice: res[0].payment_choice,
        });
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
  // console.log(servicedata)

  useEffect(() => {
    retrieveTutorialsCategory();
    retrieveTutorials();
    retrieveTutorialsZone();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  // const handleDropdownChange = (event) => {
  //   const { name, value } = event.target;
  //   setServiceData({ ...currentTutorial, [name]: value });
  // };

  const handleImageChange = (event) => {
    setCurrentTutorial({ ...currentTutorial, image: event.target.files[0] });
    // console.log(event.target.files[0])
  };

  const updateTutorial = () => {
    console.log(currentTutorial);
    ServiceApi.update(currentTutorial.id, currentTutorial)

      .then((response) => {
        console.log(response.data);
        
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <div>
      <div className="edit-form">
        <h4>Edit Service</h4>
        <Grid container>
 <Grid item md={8}>
        <form>
          <div className="form-group  mt-3 mb-3">
            <label htmlFor="category">Category</label>
            <select style={{width:"100%",padding:"10px",borderRadius:"4px", border:"1px solid gray"}}>
              {categorydata &&
                categorydata.map((item) => {
                  return <option value={item.id}>{item.title}</option>;
                })}
            </select>
          </div>

          <div className="form-group  mt-3 mb-3">
            <label htmlFor="zone">Zone</label>

            <select style={{width:"100%",padding:"10px",borderRadius:"4px", border:"1px solid gray"}}>
              {servicedata &&
                servicedata.map((item) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
            </select>

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
            <input
              type="text"
              className="form-control"
              id="payment_choice"
              required
              value={currentTutorial.payment_choice}
              onChange={handleInputChange}
              name="payment_choice"
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
