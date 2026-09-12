import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import Dashboard from "@/pages/Dashboard"
import Transactions from "@/pages/Transactions"
import Emis from "@/pages/Emis"
import Investments from "@/pages/Investments"
import BudgetGoals from "@/pages/BudgetGoals"
import AskAi from "@/pages/AskAi"
import MainLayout from "@/components/MainLayout"

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
        path: "ask-ai",
        element: <AskAi />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
