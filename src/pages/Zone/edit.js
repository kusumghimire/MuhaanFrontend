import { PanoramaSharp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import ZoneApi from "../../services/ZoneApi";

const UpdateZone = props => {
  const initialTutorialState = {
    id: "",
    name: "",
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const retrieveTutorials = () => {
    ZoneApi.getAll()
    .then((response) => {
      console.log(response);
      // setTutorials(response.data);
      
      const res= response && response.data && response.data.filter(item=>item.id ===  parseInt(props.match.params.id))
      setCurrentTutorial({
                id:res[0].id,
                name:res[0].name
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

  const updateZone = () => {
    console.log(currentTutorial)
    ZoneApi.update(currentTutorial.id, {name:currentTutorial.name})
    
      .then(response => {
        console.log(response.data);
        props.history.push("/zone");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>

        <div className="edit-form">
          <h4>Edit Zone</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Zone</label>
              
              <input
                type="text"
                className="form-control"
                id="title"
                name="name"
                value={currentTutorial.name}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            type="submit"
            className="btn btn-success mt-3 mb-3"
            onClick={updateZone}
          >
            Update
          </button>
        </div>
    </div>
  );
};

export default UpdateZone;