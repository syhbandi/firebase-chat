import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/authContext";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect href={"/sign-in"} />;
  return <Stack />;
};

export default AppLayout;
