import { PanoramaSharp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import TutorialDataService from "../../services/TutorialService";

const UpdateMainTutorial = props => {
  const initialTutorialState = {
    id: "",
    title: "",
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
      console.log(response);
      // setTutorials(response.data);
      
      const res= response && response.data && response.data.filter(item=>item.id ===  parseInt(props.match.params.id))
      setCurrentTutorial({
                id:res[0].id,
                title:res[0].title
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
        setMessage("Main category was updated successfully!");
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
          {/* <div className="form-group">
              <label htmlFor="title">Category</label>
              
              <select
                type="text"
                className="form-control"
                id="title"
                name="cat"
                value={currentTutorial.title}
                onChange={handleInputChange}
              >
                {
                  .map(item=>{
                    return(
                      <option value="" key="">{.cat}</option>
                    )
                  })
                }
              </select>
            </div> */}
            <div className="form-group">
              <label htmlFor="title">Main Category</label>
              
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
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
          <p>{message}</p>
        </div>
    </div>
  );
};

export default UpdateMainTutorial;