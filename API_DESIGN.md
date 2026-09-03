# WealthTracker — API Design & Caching Strategy

## The Core Problem with the Current Approach

Right now the entire `FinanceData` object loads at once — all expenses across all months, all EMIs, all funds, NPS, PF, and plans in a single blob. When you move to real APIs this means:

- The dashboard fetches data it doesn't need (e.g. all historical expenses)
- The transactions page fetches data it doesn't need (e.g. NPS/PF details)
- Every mutation re-saves the entire object
- No pagination — 2 years of expenses load even when you're viewing this month

The fix is to split by **resource** and by **access pattern**.

---

## API Endpoints

### Base URL
```
/api/v1
```

All endpoints require `Authorization: Bearer <token>` (JWT).  
All responses follow: `{ data: T, meta?: PaginationMeta }` or `{ error: string }`.

---

### 1. Transactions

Transactions are the highest-volume resource. They need pagination and month filtering at the API level — not in the frontend.

```
GET    /transactions?month=2026-09&page=1&limit=20&type=Debit&category=Essentials&search=groceries
POST   /transactions
PUT    /transactions/:id
DELETE /transactions/:id
```

**GET query params:**

| Param      | Type   | Default      | Description                        |
|------------|--------|--------------|------------------------------------|
| `month`    | string | current month | Format: `YYYY-MM`                 |
| `page`     | number | 1            |                                    |
| `limit`    | number | 20           | Max 100                            |
| `type`     | string | —            | `Debit` or `Credit`               |
| `category` | string | —            | `Essentials` or `Entertainment`   |
| `search`   | string | —            | Searches description, note        |

**GET response:**
```json
{
  "data": [ ...Expense[] ],
  "meta": {
    "total": 34,
    "page": 1,
    "limit": 20,
    "totalPages": 2,
    "month": "2026-09"
  }
}
```

**Why month at API level:** You never need all months at once. Each month is an independent cache entry.

---

### 2. Dashboard Summary

The dashboard needs aggregated numbers, not raw records. A dedicated summary endpoint avoids loading all transactions just to compute totals.

```
GET /dashboard/summary?month=2026-09
```

**Response:**
```json
{
  "data": {
    "monthSpend": 24340,
    "monthIncome": 95000,
    "emiDue": 50700,
    "portfolioValue": 597500,
    "activePlanCount": 2,
    "cashflowChart": [
      { "month": "Apr", "key": "2026-04", "spend": 38200, "invested": 4000 },
      { "month": "May", "key": "2026-05", "spend": 41800, "invested": 4000 },
      { "month": "Jun", "key": "2026-06", "spend": 43900, "invested": 4000 },
      { "month": "Jul", "key": "2026-07", "spend": 39600, "invested": 5000 },
      { "month": "Aug", "key": "2026-08", "spend": 37516, "invested": 5000 },
      { "month": "Sep", "key": "2026-09", "spend": 24340, "invested": 5000 }
    ],
    "categoryBreakdown": [
      { "name": "Essentials", "value": 22340 },
      { "name": "Entertainment", "value": 2000 }
    ],
    "recentTransactions": [ ...last 5 Expense[] ]
  }
}
```

**Why a dedicated endpoint:** The backend computes aggregates in SQL (`SUM`, `GROUP BY`) — far cheaper than sending 200 rows to the frontend to reduce in JS.

---

### 3. EMIs / Loans

```
GET    /emis
POST   /emis
PUT    /emis/:id
DELETE /emis/:id
PATCH  /emis/:id/mark-paid   — body: { month: "2026-09" }
```

EMIs are low-volume (typically < 10 records). Load all at once, cache aggressively.

---

### 4. Investments — Mutual Funds

```
GET    /funds
POST   /funds
PUT    /funds/:id
DELETE /funds/:id
```

---

### 5. Investments — NPS

```
GET  /nps
POST /nps/contributions          — body: { amount: number }
GET  /nps/contributions?limit=10
```

---

### 6. Investments — PF

```
GET /pf
```

PF data is typically read-only from the employer. No mutations needed unless you allow manual overrides.

---

### 7. Budget Plans

```
GET    /plans
POST   /plans
PUT    /plans/:id
DELETE /plans/:id
PATCH  /plans/:id/contribute     — body: { amount: number }
```

---

## React Query Caching Strategy

### Query Keys (structured for granular invalidation)

```ts
// transactions are keyed by month + filters so each month is cached separately
['transactions', { month: '2026-09', page: 1, type: 'All', category: 'All', search: '' }]

// dashboard summary keyed by month
['dashboard', 'summary', '2026-09']

// these are small, stable datasets — cache them long
['emis']
['funds']
['nps']
['nps', 'contributions']
['pf']
['plans']
```

### staleTime per resource

| Resource              | staleTime     | Reasoning                                              |
|-----------------------|---------------|--------------------------------------------------------|
| `transactions`        | 2 minutes     | User may add from another device                       |
| `dashboard/summary`   | 2 minutes     | Derived from transactions, same staleness              |
| `emis`                | 10 minutes    | Changes rarely                                         |
| `funds`               | 5 minutes     | NAV updates once a day, but user may edit              |
| `nps`                 | 10 minutes    | Contributions are infrequent                           |
| `pf`                  | 30 minutes    | Read-only, changes monthly                             |
| `plans`               | 5 minutes     | User may contribute from another session               |

### Mutation → Invalidation map

| Mutation                        | Invalidate                                      |
|---------------------------------|-------------------------------------------------|
| Add / edit / delete transaction | `['transactions', { month }]`, `['dashboard', 'summary', month]` |
| Add / edit / delete EMI         | `['emis']`                                      |
| Mark EMI paid                   | `['emis']`, `['dashboard', 'summary', month]`   |
| Add / edit / delete fund        | `['funds']`, `['dashboard', 'summary', month]`  |
| Add NPS contribution            | `['nps']`, `['nps', 'contributions']`, `['dashboard', 'summary', month]` |
| Add / edit / delete plan        | `['plans']`, `['dashboard', 'summary', month]`  |
| Contribute to plan              | `['plans']`                                     |

### Optimistic updates

Use optimistic updates for mutations that feel slow (add transaction, mark EMI paid, contribute to plan):

```ts
useMutation({
  mutationFn: (newExpense) => api.post('/transactions', newExpense),
  onMutate: async (newExpense) => {
    await queryClient.cancelQueries({ queryKey: ['transactions', filters] });
    const previous = queryClient.getQueryData(['transactions', filters]);
    queryClient.setQueryData(['transactions', filters], (old) => ({
      ...old,
      data: [newExpense, ...old.data],
    }));
    return { previous };
  },
  onError: (_, __, ctx) => {
    queryClient.setQueryData(['transactions', filters], ctx.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['transactions', filters] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
  },
});
```

---

## When to Use Redis

Redis is a server-side cache sitting between your API and your database. The frontend never talks to Redis directly.

### Use Redis for these cases:

#### 1. Dashboard summary endpoint — **YES, use Redis**
```
Cache key:  dashboard:summary:{userId}:{month}
TTL:        5 minutes
```
The summary aggregates across potentially thousands of transactions using SQL `SUM` and `GROUP BY`. This is the most expensive query in the app. Cache the computed result per user per month. Invalidate when a transaction is added/edited/deleted for that month.

#### 2. Cashflow chart data — **YES, use Redis**
```
Cache key:  dashboard:cashflow:{userId}
TTL:        10 minutes
```
The 6-month cashflow chart requires aggregating 6 months of transactions. Cache the entire array. Invalidate on any transaction mutation.

#### 3. Transactions list — **NO, skip Redis**
Transactions are already paginated and filtered at the DB level. The DB query is fast with proper indexes (`user_id`, `date`, `type`). Adding Redis here adds complexity without meaningful gain.

#### 4. EMIs, Funds, Plans — **NO, skip Redis**
These are small datasets (< 20 rows each). A DB query with a `WHERE user_id = ?` index is sub-millisecond. Redis would be over-engineering.

#### 5. NPS / PF — **MAYBE, use Redis**
```
Cache key:  nps:{userId}
TTL:        1 hour
```
Only worth it if NPS/PF data comes from a third-party API (e.g. NSDL, EPFO) that is slow or rate-limited. If it's your own DB, skip it.

### Redis invalidation pattern (server-side)

```
POST /transactions        → DEL dashboard:summary:{userId}:{month}
                          → DEL dashboard:cashflow:{userId}

PUT  /transactions/:id    → DEL dashboard:summary:{userId}:{month}
                          → DEL dashboard:cashflow:{userId}

DELETE /transactions/:id  → DEL dashboard:summary:{userId}:{month}
                          → DEL dashboard:cashflow:{userId}
```

### Summary: Redis decision table

| Endpoint              | Use Redis? | TTL        | Reason                                      |
|-----------------------|------------|------------|---------------------------------------------|
| `GET /dashboard/summary` | ✅ Yes  | 5 min      | Expensive aggregation, called on every load |
| `GET /dashboard/cashflow`| ✅ Yes  | 10 min     | 6-month cross-table aggregation             |
| `GET /transactions`      | ❌ No   | —          | Paginated, fast with DB index               |
| `GET /emis`              | ❌ No   | —          | < 10 rows, trivial query                    |
| `GET /funds`             | ❌ No   | —          | < 10 rows, trivial query                    |
| `GET /plans`             | ❌ No   | —          | < 10 rows, trivial query                    |
| `GET /nps`               | ⚠️ Maybe | 1 hour   | Only if sourced from external API           |
| `GET /pf`                | ⚠️ Maybe | 1 hour   | Only if sourced from EPFO API               |

---

## Database Indexes to Create

These make the Redis-free endpoints fast enough that you won't need caching there:

```sql
-- Transactions: the most queried table
CREATE INDEX idx_transactions_user_month ON transactions (user_id, DATE_FORMAT(date, '%Y-%m'));
CREATE INDEX idx_transactions_user_type  ON transactions (user_id, transaction_type);

-- EMIs
CREATE INDEX idx_emis_user ON emis (user_id);

-- Funds / contributions
CREATE INDEX idx_funds_user ON mutual_funds (user_id);
CREATE INDEX idx_contributions_user_month ON nps_contributions (user_id, DATE_FORMAT(date, '%Y-%m'));

-- Plans
CREATE INDEX idx_plans_user_status ON budget_plans (user_id, status);
```

---

## Migration Path from Current Frontend

Current state: one `useFinanceData()` hook loads everything from localStorage.

Target state: each page calls only the hooks it needs.

| Page        | Hooks to call                                              |
|-------------|------------------------------------------------------------|
| Dashboard   | `useDashboardSummary(month)`                               |
| Transactions| `useTransactions({ month, page, type, category, search })` |
| EMIs        | `useEMIs()`                                                |
| Savings     | `useFunds()`, `useNPS()`, `useNPSContributions()`, `usePF()` |
| Budget      | `usePlans()`                                               |

When you replace mocks with real API calls, you only change the `queryFn` inside each hook — the components don't change at all.
