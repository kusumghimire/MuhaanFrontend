import React, { useState } from "react";
// import TutorialDataService from "../services/TutorialService";
import ZoneApi from "../../services/ZoneApi";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const AddZone = (props) => {
  // const initialTutorialState = {
  //   id: null,
  //   name: "",
  // };
  const [tutorial, setTutorial] = useState({});
  const [submitted, setSubmitted] = useState(false);
 console.log(tutorial)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      name: tutorial.name,
    };
    console.log(data)
    

    ZoneApi.create(data)
      .then((response) => {
        
        setTutorial({
          id: response.data.id,
          name: response.data.name,
        });
        props.history.push("/zone");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const newTutorial = () => {
  //   setTutorial(initialTutorialState);
  //   setSubmitted(false);
  // };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h2>You submitted successfully!</h2>
          {/* <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button> */}
        </div>
      ) : (
        <div>
          <Grid container>
            <Grid item md={8}>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="title">
                    <Typography variant="h4">
                    Title
                    </Typography>
                    </label>
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
            </Grid>
          </Grid>

          {/* <div className="form-group">
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
          </div> */}

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddZone;
