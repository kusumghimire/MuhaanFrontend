import React, { useState, useEffect } from "react";
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
  const [categorydata, setCategoryData] = useState([]);
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [finalData, setFinalData] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };
  const selectInputChange = (event) => {
    const { name, value } = event.target;
    // setCategory({ [name]: value });
    setCategory({ [name]: value });

  };
  console.log(category);
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
    retrieveTutorialsCategory();
  }, []);

  const saveTutorial = (e) => {
    e.preventDefault();
    var data = {
      id: tutorial.id,
      title: tutorial.title,
      cat: category.category,
    };
    console.log(data);

    TutorialDataService.create(data)
      .then((response) => {
        props.history.push("main-category");
        setFinalData(data);
        setSubmitted(true);
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
        <form onSubmit={saveTutorial}>
          <Grid container>
            <Grid item md={8}>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="cat">
                  <Typography variant="h4">Main Category</Typography>
                </label>
                <select
                  name="category"
                  value={tutorial.category}
                  onChange={selectInputChange}
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
              <div className="form-group mt-3 mb-3">
                <label htmlFor="title">
                  <Typography variant="h4">Sub Category</Typography>
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

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddTutorial;
