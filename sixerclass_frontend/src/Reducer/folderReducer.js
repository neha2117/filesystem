export default function reducer(state = {
    folderData : {},
    particularFolderData : {}
}, action){
    switch(action.type){
        case "FOLDERS_DATA" : {
            return { ...state, folderData : action.payload} 
        }
        case "PARTICULAR_FOLDER" : {
            return { ...state, particularFolderData : action.payload}
        }
        default : {}
    }

    return state;
}