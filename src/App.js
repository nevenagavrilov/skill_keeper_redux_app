import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./features/home/Home";
import Skills from "./features/skills/Skills";
import Profiles from "./features/profiles/Profiles";
import EditSkillForm from "./features/skills/EditSkillForm";
import EditProfileForm from "./features/profiles/EditProfileForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />

        <Route exact path="/profiles" element={<Profiles />} />
        <Route path="/profiles/:profileId" element={<EditProfileForm/>} />

        <Route path="/skills" element={<Skills />}/>     
        <Route path="/skills/:skillId" element={<EditSkillForm/>} />
        
      </Routes>
    </>
  );
}

export default App;
