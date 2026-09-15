import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import Dashboard from "@/pages/Dashboard"
import Transactions from "@/pages/Transactions"
import Emis from "@/pages/Emis"
import Investments from "@/pages/Investments"
import BudgetGoals from "@/pages/BudgetGoals"
import AskFinance from "@/pages/AskFinance"
import MainLayout from "@/components/MainLayout"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "react-hot-toast"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Page not found</div>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "emis",
        element: <Emis />,
      },
      {
        path: "investments",
        element: <Investments />,
      },
      {
        path: "budget",
        element: <BudgetGoals />,
      },
      {
        path: "ask-finance",
        element: <AskFinance />,
      },
    ],
  },
])

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
