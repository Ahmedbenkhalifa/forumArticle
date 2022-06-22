import React from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import AddArticle from "./sections/AddArticle";
import EditArticle from "./components/EditArticle";
import ListArticles from "./sections/ListArticles";
import ListUsers from "./sections/ListUsers";

const DashboardAdmin = () => {
  return (
    <SideBar isAdmin={true}>
      <Routes>
        <Route path="/" element={<AddArticle />} />
        <Route path="/listAllArticle" element={<ListArticles />} />
        <Route path="/EditArticle/:id" element={<EditArticle />} />
        <Route path="/users" element={<ListUsers />} />
      </Routes>
    </SideBar>
  );
};

export default DashboardAdmin;
