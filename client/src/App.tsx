import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import Dashboard from "@/pages/Dashboard"
import Transactions from "@/pages/transactions/Transactions"
import Emis from "@/pages/Emis"
import Investments from "@/pages/Investments"
import BudgetGoals from "@/pages/BudgetGoals"
import AskFinance from "@/pages/AskFinance"
import MainLayout from "@/components/MainLayout"
import { ThemeProvider } from "./components/theme-provider"

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

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
