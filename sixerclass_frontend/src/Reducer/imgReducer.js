export default function reducer(state = {
    imageData : {},
}, action){
    switch(action.type){
        case "IMAGE_DATA" : {
            return { ...state, imageData : action.payload} 
        }
        default : {}
    }

    return state;
}