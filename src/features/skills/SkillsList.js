import { useSelector } from "react-redux";
import { selectAllSkills } from "./skillsSlice";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardMedia, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

import { deleteSkill } from "./skillsSlice";
import { useDispatch } from "react-redux";

import { Link } from 'react-router-dom';

const SkillsList = () => {

  const dispatch = useDispatch();
  const skills = useSelector(selectAllSkills);

  return (
    <TableContainer sx={{ maxWidth: 550 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skills.map((skill) => (
            <TableRow
              key={skill.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{skill.name}</TableCell>
              <TableCell align="left">
                <CardMedia
                  component="img"
                  alt="name"
                  image={skill.image}
                  value={skill.image}
                  style={{
                    width: "60px",
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    dispatch(deleteSkill(skill.id));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" size="small">
                  <Link to={`/skills/${skill.id}`}>
                    <EditTwoToneIcon />
                  </Link>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkillsList;
