import { ChartAreaInteractive } from "@/components/charts/AreaChart"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { RotateCcw, SquarePen } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseForm } from "@/components/forms/ExpenseForm"

export default function Transactions() {
  return (
    <div className="flex flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button className="h-12" variant="outline">
            Current month
          </Button>
          <Button className="h-12" variant="outline">
            Previous month
          </Button>
          <Button className="h-12" variant="outline">
            Last 3 months
          </Button>
          <Button className="h-12" variant="outline">
            Last 6 months
          </Button>
          <Button className="h-12" variant="outline">
            Last 12 months
          </Button>
          <Separator orientation="vertical" />
          <span className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">From</p>
            <DatePicker />
          </span>

          <span className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">To</p>
            <DatePicker />
          </span>
          <Button className="h-12">
            <SquarePen className="h-4 w-4" />
            Apply
          </Button>
          <Button className="h-12" variant="outline">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
        <div>
          <Drawer swipeDirection="right">
            <DrawerTrigger
              render={
                <Button className="h-12 transition-all duration-200 hover:scale-105">
                  + Add Transaction
                </Button>
              }
            >
              Open
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <DrawerHeader>
                <DrawerTitle className="text-2xl font-medium">
                  Add transaction
                </DrawerTitle>
                <DrawerDescription>
                  record money moving in or out.
                </DrawerDescription>
              </DrawerHeader>
              <div className="mt-2 w-full px-4">
                <Tabs defaultValue="expense" className="w-full">
                  <TabsList
                    className="w-full overflow-hidden rounded-xl bg-muted"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      height: "3rem",
                      padding: "0.25rem",
                      alignItems: "stretch",
                      boxSizing: "border-box",
                    }}
                  >
                    <TabsTrigger
                      value="expense"
                      className="rounded-[calc(var(--radius-xl)-0.25rem)] text-base font-medium text-muted-foreground transition-all data-active:!bg-primary data-active:!text-primary-foreground data-active:!shadow-none"
                      style={{
                        height: "auto",
                        minHeight: 0,
                        alignSelf: "stretch",
                        boxSizing: "border-box",
                      }}
                    >
                      Expense
                    </TabsTrigger>
                    <TabsTrigger
                      value="income"
                      className="rounded-[calc(var(--radius-xl)-0.25rem)] text-base font-medium text-muted-foreground transition-all data-active:!bg-primary data-active:!text-primary-foreground data-active:!shadow-none"
                      style={{
                        height: "auto",
                        minHeight: 0,
                        alignSelf: "stretch",
                        boxSizing: "border-box",
                      }}
                    >
                      Income
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="expense" className="w-full">
                    <ExpenseForm />
                  </TabsContent>
                  <TabsContent value="income" className="w-full">
                    Add or manage your income here.
                  </TabsContent>
                </Tabs>
              </div>
              <DrawerFooter>
                <Button type="submit" form="expense-form" className="h-12">
                  Submit
                </Button>
                <DrawerClose
                  render={<Button variant="outline" className="h-12" />}
                >
                  Cancel
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  )
}
