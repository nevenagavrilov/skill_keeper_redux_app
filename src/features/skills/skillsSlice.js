import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SKILLS_URL = "https://6195285474c1bd00176c6be7.mockapi.io/skills";

const initialState = {
  skills: [],
};

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  const response = await axios.get(SKILLS_URL);
  return response.data;
});

export const addNewSkill = createAsyncThunk(
  "skills/addNewSkill",
  async (initialSkill) => {
    const response = await axios.post(SKILLS_URL, initialSkill);
    return response.data;
  }
);

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async (initialSkill) => {
    const { id } = initialSkill;
    try {
      const response = await axios.put(`${SKILLS_URL}/${id}`, initialSkill);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    deleteSkill(state, action) {
      const skillId = action.payload;
      state.skills = state.skills.filter((skill) => skill.id !== skillId);
      axios.delete(`${SKILLS_URL}/${skillId}`);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(addNewSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const skills = state.skills.filter((skill) => skill.id !== id);
        state.skills = [...skills, action.payload];
      });
  },
});

export const selectAllSkills = (state) => state.skills.skills;

export const selectSkillById = (state, skillId) =>
  state.skills.skills.find((skill) => skill.id === skillId);

export const { deleteSkill } = skillsSlice.actions;

export default skillsSlice.reducer;
