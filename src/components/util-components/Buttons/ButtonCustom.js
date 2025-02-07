import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const ButtomCustom = ({ icon, route, justifyContent, title, onClick }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginBottom: "15px",
        display: "flex",
        justifyContent: justifyContent,
      }}
    >
      {route ?
        <Button justifyContent="flex-end" onClick={(e) => navigate(`${APP_PREFIX_PATH}${route}`)}>
          {icon} {title}
        </Button> :
        <Button justifyContent="flex-end" onClick={onClick} >
          {icon} {title}
        </Button>
      }
    </div>
  );
};

export default ButtomCustom;
