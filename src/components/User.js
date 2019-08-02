import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon
} from "@material-ui/core";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10
  }
}));

const User = ({ user, theme }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            {user.get.name.charAt(0)}
            {user.get.name.split(" ")[1].charAt(0)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.get.name} />
        <IconButton
          edge="end"
          onClick={event => setAnchorEl(event.currentTarget)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            theme.setDarkTheme(!theme.dark);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <InvertColorsIcon />
          </ListItemIcon>
          Enable {theme.dark ? "Light" : "Dark"} Mode
        </MenuItem>
        <MenuItem onClick={() => user.signOut()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default User;
