import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { expenseFormSchema } from "@/types"
import type { z } from "zod"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  categories,
  subCategory,
  paymentMethods,
  creditCardList,
  savingAccountList,
} from "@/lib/constants"

export function ExpenseForm() {
  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
  })

  // Have to watch the payment method to conditionally render related fields
  const paymentMethod = form.watch("paymentMethod")

  function onSubmit(data: z.infer<typeof expenseFormSchema>) {
    console.log(data)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="expense-form"
      className="mt-4 space-y-8 overflow-auto pb-4"
    >
      {/* Description */}
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="mb-2">
              Basic details
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            </FieldLabel>
            <FieldDescription>What did you spend on?</FieldDescription>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter a description"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Amount */}
      <Controller
        name="amount"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Amount
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="₹ 0.00"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Date */}
      <Controller
        name="date"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>
              Date
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            </FieldLabel>
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Category */}
      <Controller
        name="category"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Category</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                aria-invalid={fieldState.invalid}
                className="w-full data-[size=default]:h-12"
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Subcategory */}
      <Controller
        name="subcategory"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Subcategory</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                aria-invalid={fieldState.invalid}
                className="w-full data-[size=default]:h-12"
              >
                <SelectValue placeholder="Select a subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subCategory.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Payment Method */}
      <Controller
        name="paymentMethod"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Payment Method</FieldLabel>
            <Select
              value={field.value}
              onValueChange={(v) => {
                field.onChange(v)
                if (v !== "Credit Card")
                  form.setValue("creditCardList", undefined)
              }}
            >
              <SelectTrigger
                aria-invalid={fieldState.invalid}
                className="w-full data-[size=default]:h-12"
              >
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Credit Card */}
      {paymentMethod === "Credit Card" && (
        <Controller
          name="creditCardList"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Credit Card</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  className="w-full data-[size=default]:h-12"
                >
                  <SelectValue placeholder="Select a credit card" />
                </SelectTrigger>
                <SelectContent>
                  {creditCardList.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}
      {/* Saving Account */}
      {(paymentMethod === "UPI" ||
        paymentMethod === "Debit Card" ||
        paymentMethod === "Bank Transfer") && (
        <Controller
          name="savingsAccount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Savings Account</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  className="w-full data-[size=default]:h-12"
                >
                  <SelectValue placeholder="Select a saving account" />
                </SelectTrigger>
                <SelectContent>
                  {savingAccountList.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}
      {/* Notes */}
      <Controller
        name="note"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="A detail worth remembering..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  )
}
