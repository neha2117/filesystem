import React from 'react';
import { connect } from "react-redux";
import { getAllFoldersAction , getParticularFoldersAction } from "../Actions/folderAction";
import { getParticularImageDetailAction } from "../Actions/imgAction";
import FolderIcon from "../img/folder_icon_big.svg";
import FileIcon from "../img/document_icon_big.svg";
import './index.css';

const mapStateToProps = (store) => {
    return({
        folders: store.folder.folderData,
        particularFolderData: store.folder.particularFolderData,
        imageData: store.img.imageData
    })
}

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            folderData: [],
            particularFolderData: [],
            imgData: [],
            folderName: "",
            imgName: ""
        }
    }
    componentDidMount() {
        this.props.dispatch(getAllFoldersAction)
        console.log("location", this.props.location.pathname)
        if (this.props.location && this.props.location.pathname && this.props.location.pathname !== "/") {
            this.props.dispatch(getParticularFoldersAction(this.props.location.pathname))
            this.setState({
                folderName: this.props.location.pathname.slice(1)
            })
        }    
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.folders !== nextProps.folders) {
            if (nextProps.folders && nextProps.folders.status) {
                this.setState({
                    folderData: nextProps.folders.data
                })
            }
        }

        if (this.props.particularFolderData !== nextProps.particularFolderData) {
            if (nextProps.particularFolderData && nextProps.particularFolderData.status) {
                this.setState({
                    particularFolderData: nextProps.particularFolderData.data
                })
            }
        }

        if (this.props.imageData !== nextProps.imageData) {
            if (nextProps.imageData && nextProps.imageData.status) {
                this.setState({
                    imgData: nextProps.imageData.data
                }, () => {
                    console.log(this.state.imgData)
                })
            }
        }
    }

    getFolderData(value){
        var folderName = value
        this.setState({
            folderName: folderName,
            imgData: []
        })
        this.props.dispatch(getParticularFoldersAction("/"+folderName))
        this.props.history.push({
            pathname: `/${folderName}`
        })
    }

    getImgDetail(value) {
        var imgName = value
        console.log("imgName", imgName)
        this.setState({
            imgName: imgName
        })
        var path = this.state.folderName+"/"+imgName
        this.props.dispatch(getParticularImageDetailAction(path))
    }

    render() {
        return(
            <div className="mainContainer">
                <div className="folderContainer">
                {
                   
                    this.state.folderData.map((value, key) => {
                        return( <div className="folder" onClick={this.getFolderData.bind(this,value)}>
                           <div> <img src={FolderIcon} ></img></div>
                            <div className="folderName">{value}</div>
                        </div>)
                    })
                        
                }
                </div>
                <div className="imageContainer">
                    {
                        this.state.particularFolderData.map((value, key) => {
                            return(
                                <div className="image" onClick={this.getImgDetail.bind(this, value)}>
                                    <div><img src={FileIcon} /></div>
                                    <div className="folderName">{value}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        // Object.keys(this.state.imgData).map((value, key) => {
                        //     return(
                            this.state.imgData && this.state.imgData.length !== 0?
                                <div className="fileDetails">
                                    <div >Name: {this.state.imgName}</div>
                                    <div >Size: {this.state.imgData.size}</div>
                                    <div >Created At: {(this.state.imgData.birthtime && this.state.imgData.birthtime.split("T")[0])} </div>
                                    <div >Created Time: {(this.state.imgData.birthtime && this.state.imgData.birthtime.split("T")[1].split(".")[0])}</div>
                                    {console.log(this.state.imgData)}
                                </div> : null
                        //     )
                        // })
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Index)