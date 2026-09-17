import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { incomeFormSchema } from "@/types"
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
  creditCardList,
  creditedToItems,
  savingAccountList,
} from "@/lib/constants"

export default function IncomeForm() {
  const form = useForm<z.infer<typeof incomeFormSchema>>({
    resolver: zodResolver(incomeFormSchema),
  })

  // Have to watch the payment method to conditionally render related fields
  const creditedTo = form.watch("creditedTo")

  function onSubmit(data: z.infer<typeof incomeFormSchema>) {
    console.log(data)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="income-form"
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
            <FieldDescription>What came in?</FieldDescription>
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
      {/* Credited To */}
      <Controller
        name="creditedTo"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>
              Credited To
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            </FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                aria-invalid={fieldState.invalid}
                className="w-full data-[size=default]:h-12"
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {creditedToItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Credit Card */}
      {creditedTo === "creditCard" && (
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
      {creditedTo === "savingsAccount" && (
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
