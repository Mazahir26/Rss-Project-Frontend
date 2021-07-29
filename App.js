import React from "react";
import Index from "./src/pages/index";
import { Provider as AuthProvider } from "./src/Context/AuthContext";
import { Provider as DataProvider } from "./src/Context/MainDataContext";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Index />
      </DataProvider>
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 30,
//   },
// });
