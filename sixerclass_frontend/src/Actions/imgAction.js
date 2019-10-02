import axios from "axios";

export function getParticularImageDetailAction(imagePath) {
    return function(dispatch) {
        axios.get("http://localhost:3000/getImageDetail?path="+imagePath)
        .then((response) => {
            dispatch(
                {
                    type: "IMAGE_DATA",
                    payload: response.data
                }
            )
         })
    }
}