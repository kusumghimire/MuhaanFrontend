import { PanoramaSharp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import AddOnApiList from "../../services/AddOnApi";

const AddOnEdit = props => {
  const initialTutorialState = {
    id: "",
    name: "",
    description: "",
    service:"",
    image:"",
    rate:"",
    };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");


  const retrieveTutorials = () => {
    AddOnApiList.getAll()
    .then((response) => {
      // setTutorials(response.data);
      
      const res= response && response.data && response.data.filter(item=>item.id ===  parseInt(props.match.params.id))
      setCurrentTutorial({
                id:res[0].id,
                name:res[0].name,
                description:res[0].description,
                service:res[0].service,
                // image:res[0].image,
                rate:res[0].rate,
              });
    })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveTutorials();
  }, []);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const handleImageChange = (event) => {
    setCurrentTutorial({ ...currentTutorial, image:event.target.files[0] });
    // console.log(event.target.files[0])
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
    formData.append("service", currentTutorial.service);
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

    AddOnApiList.update(formData)
      .then((response) => {
        setCurrentTutorial({
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
              <input
                type="text"
                className="form-control"
                id="setvice"
                name="service"
                value={currentTutorial.service}
                onChange={handleInputChange}
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
