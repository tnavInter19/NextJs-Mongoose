import React from "react";
import { useRouter } from "next/router";
import { ACCESS_RULES } from "./roles";

const withRoleAccess = (WrappedComponent: React.ComponentType<any>, allowedRoles: string[]) => {
  const WithRoleAccess: React.FC = (props) => {
    const router = useRouter();
    const userRole = "user"; // Get the user's role from your authentication system

    if (!allowedRoles.includes(userRole)) {
      router.push("/"); // Redirect to the homepage or an "unauthorized" page
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithRoleAccess;
};

export default withRoleAccess;