import * as React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

import { deleteProfile } from "./profilesSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({profile}) => {
  const dispatch = useDispatch();

  return (
    <Card
      style={{
        bgcolor: "background.paper",
        margin: "5px",
      }}
    >
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={profile.name} src={profile.image} />
          </ListItemAvatar>
          <ListItemText>
            <React.Fragment>
              <Typography gutterBottom variant="h5" component="div">
                {profile.name}
              </Typography>
              <Typography gutterBottom component="div">
                {profile.dateOfBirth}
              </Typography>
              <Typography gutterBottom component="div">
                {profile.location}
              </Typography>
              <Typography gutterBottom component="div">
              {profile.skills}
              </Typography>
            </React.Fragment>
          </ListItemText>
        </ListItem>
        <ListItem alignItems="center">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              dispatch(deleteProfile(profile.id));
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
          ><Link to={`/profiles/${profile.id}`}>
            <EditTwoToneIcon />
            </Link>
          </IconButton>
        </ListItem>
      </List>
    </Card>
  );
};

export default Profile