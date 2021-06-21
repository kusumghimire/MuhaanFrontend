import React, { useState } from "react";
// import TutorialDataService from "../services/TutorialService";
import TutorialDataService from "../../services/TutorialService";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const AddTutorial = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
    };

    TutorialDataService.create(data)
      .then((response) => {
        props.history.push("main-category");
        setTutorial({
          id: response.data.id,
          title: response.data.title,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
              <div className="form-group mt-3 mb-3">
                <label htmlFor="title">
                    <Typography variant="h4">
                    Title
                    </Typography>
                    </label>
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

export default AddTutorial;
