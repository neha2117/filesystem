import axios from "axios";

export function getAllFoldersAction(dispatch) {
    return axios.get("http://localhost:3000")
    .then((response) => {
        dispatch(
            {
                type: "FOLDERS_DATA",
                payload: response.data
            }
        )
    })
}

export function getParticularFoldersAction(foldername) {
    console.log("action", foldername)
    return function(dispatch)
    {
        axios.get("http://localhost:3000"+foldername)
        .then((response) => {
            dispatch(
                {
                    type: "PARTICULAR_FOLDER",
                    payload: response.data
                }
            )
         })
    }
}



// export function hello(data) {
//     return{
//         type: "PLAYERS",
//         payload: data.data
//     }
// }