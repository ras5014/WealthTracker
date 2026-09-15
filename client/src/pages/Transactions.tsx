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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseForm } from "@/components/forms/ExpenseForm"

export default function Transactions() {
  return (
    <div className="flex flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <Button variant="outline">Current month</Button>
          <Button variant="outline">Previous month</Button>
          <Button variant="outline">Last 3 months</Button>
          <Button variant="outline">Last 6 months</Button>
          <Button variant="outline">Last 12 months</Button>
          <Separator orientation="vertical" />
          <span className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">From</p>
            <DatePicker />
          </span>

          <span className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">To</p>
            <DatePicker />
          </span>
          <Button>Apply</Button>
          <Button variant="outline">Reset</Button>
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
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <div className="mt-2 w-full p-2">
                <Tabs defaultValue="expense" className="w-full">
                  <TabsList className="grid h-12 w-full grid-cols-2">
                    <TabsTrigger value="expense" className="text-base">
                      Expense
                    </TabsTrigger>
                    <TabsTrigger value="income" className="text-base">
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
                <Button>Submit</Button>
                <DrawerClose render={<Button variant="outline" />}>
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
