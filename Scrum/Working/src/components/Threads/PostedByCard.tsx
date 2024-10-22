import React from "react";
import "./PostedByCards.css";
import { useHistory } from "react-router-dom";
import { getUser2 } from "../../controller/UserController";

interface PostByCardProps {
  usuario: string;
  posttime: string;
  img_usuario: string;
  dpi: string;
}

const PostByCard: React.FC<PostByCardProps> = ({
  usuario,
  posttime,
  img_usuario,
  dpi,
}) => {
  const history = useHistory();

  const handleProfileClick = async () => {
    let userDPI = "";
    const user = localStorage.getItem("User");

    if (user) {
      const parsedUser = JSON.parse(user);
      userDPI = parsedUser.dpi;
    }

    // Fetch user data by DPI
    const data = await getUser2(dpi);
    if (data && data.length > 0) {
      localStorage.setItem("notUser", JSON.stringify(data[0]));

      // Check if the clicked user is the logged-in user
      if (userDPI && userDPI === data[0].dpi) {
        history.push("/empleado?ownerUser=true");
      } else {
        history.push("/empleado?ownerUser=false");
      }
    } else {
      console.error("User not found.");
    }
  };

  return (
    <div className="postedby-card">
      <div className="post-user-profile">
        <img
          src={img_usuario}
          alt={`${usuario} profile`}
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="user-info-container">
        <h4
          className="postedby-usuario"
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
        >
          {usuario}{" "}
        </h4>
        <h6 className="postedby-time">{new Date(posttime).toLocaleString()}</h6>
      </div>
    </div>
  );
};

export default PostByCard;
