import { PanoramaSharp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import TutorialDataService from "../../services/TutorialService";

const AddOnEdit = props => {
  const initialTutorialState = {
    id: "",
    cat: "",
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  // const getTutorial = id => {
  //   TutorialDataService.get(id)
  //     .then(response => {
  //       console.log(response)
  //       setCurrentTutorial({
  //         id:response.data.id,
  //         title:response.data.title
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };
  const retrieveTutorials = () => {
    TutorialDataService.getAll()
    .then((response) => {
      // setTutorials(response.data);
      
      const res= response && response.data && response.data.filter(item=>item.id ===  parseInt(props.match.params.id))
      setCurrentTutorial({
                id:res[0].id,
                cat:res[0].cat
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

 

  const updateTutorial = () => {
    console.log(currentTutorial)
    TutorialDataService.update(currentTutorial.id, currentTutorial)
    
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>

        <div className="edit-form">
          <h4>Edit Main Category</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.cat}
                onChange={handleInputChange}
              />
            </div>
          </form>

          {/* <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button> */}

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
