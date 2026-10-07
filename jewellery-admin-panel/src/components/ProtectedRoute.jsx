import { Navigate } from "react-router-dom";
import { isAuthed } from "../api/client";
import Shell from "./Shell";

export default function ProtectedRoute() {
  return isAuthed() ? <Shell /> : <Navigate to="/login" replace />;
}
