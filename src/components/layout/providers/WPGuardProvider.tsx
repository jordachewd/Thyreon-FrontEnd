import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import muiTheme from "@/themes/muiTheme";
import { ReactNode } from "react";
import { ApolloWrapper } from "../wrappers/ApolloWrapper";

interface ThemeProps {
  children: ReactNode;
}

export default function WPGuardProvider({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ApolloWrapper>{children}</ApolloWrapper>
    </ThemeProvider>
  );
}
