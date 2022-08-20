import { IconButton } from "@material-ui/core";
import { Menu, MoreVert } from "@material-ui/icons";
import pdfLogo from "../pdf_share.png";
import React from "react";
import "./Announcement.css";
function Announcement({ image, name, date, content, authorId,file,fileType }) {
  const gotoPdf = (url) => {
    console.log(url);
    window.open(url,'_blank', 'noopener,noreferrer');
  }
  return (
    <div className="announcement">
      <div className="announcement__informationContainer">
        <div className="announcement__infoSection">
          <div className="announcement__imageContainer">
            <img src={image} alt="Profile photo" />
          </div>
          <div className="announcement__nameAndDate">
            <div className="announcement__name">{name}</div>
            <div className="announcement__date">{date}</div>
          </div>
        </div>
        <div className="announcement__infoSection">
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="announcement__content">{content}</div>
      {
        (fileType === "jpg" || fileType === "jpeg" || fileType === "png")?
        <img src={file} style={{width:150,height:150,marginTop:10}} />:(fileType === "pdf")? <img src={pdfLogo} className= "pdf__logo" onClick ={() => gotoPdf(file)} /> :(fileType == "") ? <div></div>:<div>file not supported</div>
        
      }
    </div>
  );
}
export default Announcement;