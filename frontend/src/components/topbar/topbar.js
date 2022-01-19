import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";

import { logout } from "../../apiCalls";
export default function Topbar() {
  const {user, isFetching, dispatch } = useContext(AuthContext);
  const history=useNavigate();

  const handleclick=(e)=>{
    e.preventDefault();
    logout(
      
      dispatch
      );
      history('/');
      // alert(user);

  }
  return (
    <div className="topbarContainer">You are in topbar
      <div className="topbarLeft">
        <span className="logo">Developer book </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
       
          <span className="topbarLink" onClick={()=>history("/")}>Homepage</span>
          
         
          <span className="topbarLink"  onClick={handleclick}>Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
        
          <div className="topbarIconItem" >
            <Chat onClick={()=>history('/messaging')}/>
            <span className="topbarIconBadge">2</span>
          </div>
       
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ?  user.profilePicture
                :"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}