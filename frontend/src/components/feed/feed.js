import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../Data";
import { useEffect,useState ,useContext} from "react";
import axios from "axios";
import { useParams } from "react-router";

import { AuthContext } from "../../Context/AuthContext";
export default function Feed({username}) {

  const [post,setPosts]= useState([]);
 
  const {user}=useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:4000/api/post/posts/" + username)
        : await axios.get("http://localhost:4000/api/post/timeline/" + user._id);
        
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
          );

        // alert(res.data[0].img+" "+res.data[1].img);
          // setPosts(res.data);
        };
    // alert("feed");
    
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}

        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
  );
}