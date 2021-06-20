import React, { useState } from "react";
// import TutorialDataService from "../services/TutorialService";
import TutorialDataService from "../../services/TutorialService";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const AddTutorialCategory = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    cat: "",
    published: false,
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
      cat: tutorial.cat,
    };

    TutorialDataService.create(data)
      .then((response) => {
        props.history.push("sub-category");
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          cat: response.data.cat,
          published: response.data.published,
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
                  <Typography variant="h4">Main Category</Typography>
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
            <Grid item md={8}>
              <div className="form-group form-group mt-3 mb-3">
                <label htmlFor="description">Sub Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="subcategory"
                  required
                  value={tutorial.cat}
                  onChange={handleInputChange}
                  name="sub category"
                />
              </div>
            </Grid>
          </Grid>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorialCategory;
