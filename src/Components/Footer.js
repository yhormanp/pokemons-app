import React from "react";
import { BottomNavigationAction, BottomNavigation } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import StarsIcon from "@material-ui/icons/Stars";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();

  const [value, setValue] = React.useState("recents");

  const handleFooterClick = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        history.push("/home");
        break;
      case 1:
        history.push("/favorites");
        break;

      default:
        break;
    }
  };
  return (
    <div className="footer">
      <BottomNavigation value={value} onChange={handleFooterClick}>
        <BottomNavigationAction label="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Favorite" icon={<StarsIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default Footer;
