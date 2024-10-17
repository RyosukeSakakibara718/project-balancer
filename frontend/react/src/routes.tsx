import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/components/templates";
import Login from "./pages/login/components/templates";
import MemberTable from "./pages/memberManagement/components/templates";
import ProjectManagement from "./pages/projectManagement/components/templates";
import ProjectDetail from "./pages/projectManagementDetail/components/templetes";
import ProjectsAchievements from "./pages/projectsAchievements/components/templates";
import UserManagement from "./pages/userManagement/components/templates";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/memberManagement" element={<MemberTable />} />
      <Route
        path="/projectManagement"
        element={<ProjectManagement />}
      />
      <Route
        path="/projectManagement/detail/:id?"
        element={<ProjectDetail />}
      />
      <Route path="/projectsAchievements" element={<ProjectsAchievements />} />
      <Route path="/userManagement" element={<UserManagement />} />
    </Routes>
  );
};

export default AppRoutes;
