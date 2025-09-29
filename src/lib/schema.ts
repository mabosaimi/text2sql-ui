export type ColumnSchema = {
  name: string;
  type: string;
  description?: string;
};

export type TableSchema = {
  table: string;
  description?: string;
  columns: ColumnSchema[];
};

// Sample schemas used to inspire queries in the UI.
// TODO: fetch the schemas from the API.
export const SAMPLE_SCHEMAS: TableSchema[] = [
  {
    table: "customers",
    description:
      "People or organizations that purchase or may purchase goods/services.",
    columns: [
      {
        name: "customer_id",
        type: "BIGINT",
        description: "Surrogate primary key for the customer.",
      },
      {
        name: "account_type",
        type: "VARCHAR(20)",
        description: "Type such as consumer or business.",
      },
      {
        name: "first_name",
        type: "VARCHAR(80)",
        description: "Given name for contact purposes.",
      },
      {
        name: "last_name",
        type: "VARCHAR(80)",
        description: "Family name for contact purposes.",
      },
      {
        name: "email",
        type: "VARCHAR(255)",
        description: "Primary contact email; unique when present.",
      },
      {
        name: "phone",
        type: "VARCHAR(32)",
        description: "Primary contact phone number.",
      },
      {
        name: "address_id",
        type: "BIGINT",
        description: "FK to customer_addresses for canonical address.",
      },
      {
        name: "country",
        type: "CHAR(2)",
        description: "ISO‑2 country code of primary address.",
      },
      {
        name: "registered_at",
        type: "TIMESTAMP",
        description: "Timestamp when the customer registered.",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "Lifecycle state such as active, prospect, churned.",
      },
    ],
  },
  {
    table: "customer_addresses",
    description:
      "Normalized postal addresses for customers, suppliers, and locations.",
    columns: [
      {
        name: "address_id",
        type: "BIGINT",
        description: "Primary key for the address record.",
      },
      { name: "line1", type: "VARCHAR(120)", description: "Street line 1." },
      {
        name: "line2",
        type: "VARCHAR(120)",
        description: "Street line 2 or unit/suite (nullable).",
      },
      { name: "city", type: "VARCHAR(80)", description: "City or locality." },
      {
        name: "state",
        type: "VARCHAR(80)",
        description: "Region/state/province.",
      },
      {
        name: "postal_code",
        type: "VARCHAR(20)",
        description: "Postal/ZIP code.",
      },
      { name: "country", type: "CHAR(2)", description: "ISO‑2 country code." },
      {
        name: "latitude",
        type: "DECIMAL(9,6)",
        description: "Latitude for geocoding (nullable).",
      },
      {
        name: "longitude",
        type: "DECIMAL(9,6)",
        description: "Longitude for geocoding (nullable).",
      },
      {
        name: "valid_from",
        type: "DATE",
        description: "Start date the address is valid from.",
      },
      {
        name: "valid_to",
        type: "DATE",
        description: "End date the address is valid to (nullable).",
      },
    ],
  },
  {
    table: "products",
    description: "Catalog of sellable items or services.",
    columns: [
      {
        name: "product_id",
        type: "BIGINT",
        description: "Primary key for the product.",
      },
      {
        name: "sku",
        type: "VARCHAR(64)",
        description: "Stock keeping unit code; unique per product.",
      },
      {
        name: "product_name",
        type: "VARCHAR(160)",
        description: "Marketing name of the product.",
      },
      {
        name: "category_id",
        type: "BIGINT",
        description: "FK to categories for hierarchy grouping.",
      },
      {
        name: "unit_price",
        type: "DECIMAL(12,2)",
        description: "List price in the default currency.",
      },
      {
        name: "currency",
        type: "CHAR(3)",
        description: "ISO‑4217 currency code for unit_price.",
      },
      {
        name: "active",
        type: "BOOLEAN",
        description: "If the product is available for sale.",
      },
      {
        name: "created_at",
        type: "TIMESTAMP",
        description: "Record creation time.",
      },
      {
        name: "updated_at",
        type: "TIMESTAMP",
        description: "Last update time.",
      },
    ],
  },
  {
    table: "categories",
    description: "Product category hierarchy for analytics and navigation.",
    columns: [
      {
        name: "category_id",
        type: "BIGINT",
        description: "Primary key for the category.",
      },
      {
        name: "category_name",
        type: "VARCHAR(120)",
        description: "Human‑readable category label.",
      },
      {
        name: "parent_category_id",
        type: "BIGINT",
        description: "Self‑reference to parent category (nullable).",
      },
      {
        name: "description",
        type: "TEXT",
        description: "Longer description for the category (nullable).",
      },
    ],
  },
  {
    table: "orders",
    description: "Sales orders placed by customers; header level details.",
    columns: [
      {
        name: "order_id",
        type: "BIGINT",
        description: "Primary key for the order.",
      },
      {
        name: "customer_id",
        type: "BIGINT",
        description: "FK to customers who placed the order.",
      },
      {
        name: "order_date",
        type: "TIMESTAMP",
        description: "Time the order was submitted.",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "Order state such as pending, paid, shipped.",
      },
      {
        name: "payment_method",
        type: "VARCHAR(20)",
        description: "Method like card, bank, wallet.",
      },
      {
        name: "order_total",
        type: "DECIMAL(12,2)",
        description: "Total monetary value of the order.",
      },
      {
        name: "currency",
        type: "CHAR(3)",
        description: "Currency for order_total.",
      },
      {
        name: "shipping_address_id",
        type: "BIGINT",
        description: "FK to customer_addresses for shipping.",
      },
    ],
  },
  {
    table: "order_items",
    description: "Line‑level items linking orders to products.",
    columns: [
      {
        name: "order_item_id",
        type: "BIGINT",
        description: "Primary key for the line item.",
      },
      { name: "order_id", type: "BIGINT", description: "FK to orders header." },
      {
        name: "product_id",
        type: "BIGINT",
        description: "FK to products catalog.",
      },
      {
        name: "quantity",
        type: "INT",
        description: "Units ordered for this product.",
      },
      {
        name: "unit_price",
        type: "DECIMAL(12,2)",
        description: "Unit price at time of sale.",
      },
      {
        name: "discount",
        type: "DECIMAL(5,2)",
        description: "Percentage discount applied (0–100).",
      },
      {
        name: "line_total",
        type: "DECIMAL(12,2)",
        description: "Extended price after discount.",
      },
    ],
  },
  {
    table: "payments",
    description: "Customer payments applied to orders or invoices.",
    columns: [
      {
        name: "payment_id",
        type: "BIGINT",
        description: "Primary key for the payment.",
      },
      {
        name: "order_id",
        type: "BIGINT",
        description: "FK to orders being paid (nullable if invoice_id used).",
      },
      {
        name: "invoice_id",
        type: "BIGINT",
        description: "FK to invoices (nullable if order_id used).",
      },
      {
        name: "payment_date",
        type: "TIMESTAMP",
        description: "Time the payment was captured.",
      },
      {
        name: "amount",
        type: "DECIMAL(12,2)",
        description: "Amount received in payment.",
      },
      {
        name: "currency",
        type: "CHAR(3)",
        description: "Currency for the amount.",
      },
      {
        name: "method",
        type: "VARCHAR(20)",
        description: "Card, bank_transfer, wallet, cash, etc.",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "authorized, captured, refunded, failed.",
      },
    ],
  },
  {
    table: "invoices",
    description: "Billing documents issued to customers for accounting.",
    columns: [
      {
        name: "invoice_id",
        type: "BIGINT",
        description: "Primary key for the invoice.",
      },
      {
        name: "customer_id",
        type: "BIGINT",
        description: "FK to customers billed.",
      },
      {
        name: "invoice_date",
        type: "DATE",
        description: "Date the invoice was issued.",
      },
      {
        name: "due_date",
        type: "DATE",
        description: "Payment due date per terms.",
      },
      {
        name: "total_due",
        type: "DECIMAL(12,2)",
        description: "Total amount due on the invoice.",
      },
      {
        name: "currency",
        type: "CHAR(3)",
        description: "Currency for total_due.",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "open, paid, overdue, cancelled.",
      },
    ],
  },
  {
    table: "subscriptions",
    description: "Recurring customer subscriptions for SaaS or services.",
    columns: [
      {
        name: "subscription_id",
        type: "BIGINT",
        description: "Primary key for the subscription.",
      },
      {
        name: "customer_id",
        type: "BIGINT",
        description: "FK to customers holding the subscription.",
      },
      {
        name: "plan_id",
        type: "BIGINT",
        description: "FK to subscription_plans.",
      },
      {
        name: "start_date",
        type: "DATE",
        description: "Start date of the subscription.",
      },
      {
        name: "end_date",
        type: "DATE",
        description: "End date or null if ongoing.",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "active, paused, cancelled, expired.",
      },
      {
        name: "auto_renew",
        type: "BOOLEAN",
        description: "Whether the subscription auto‑renews.",
      },
    ],
  },
  {
    table: "subscription_plans",
    description: "Catalog of subscription plans and pricing tiers.",
    columns: [
      {
        name: "plan_id",
        type: "BIGINT",
        description: "Primary key for the plan.",
      },
      {
        name: "plan_name",
        type: "VARCHAR(80)",
        description: "Marketing name for the plan.",
      },
      {
        name: "billing_cycle",
        type: "VARCHAR(20)",
        description: "monthly, yearly, etc.",
      },
      {
        name: "price",
        type: "DECIMAL(12,2)",
        description: "Price per billing cycle.",
      },
      { name: "currency", type: "CHAR(3)", description: "Currency for price." },
      {
        name: "features",
        type: "JSON",
        description: "Feature flags or limits for the plan.",
      },
    ],
  },
  {
    table: "employees",
    description: "Company staff directory for HR and RBAC.",
    columns: [
      {
        name: "employee_id",
        type: "BIGINT",
        description: "Primary key for employee.",
      },
      { name: "first_name", type: "VARCHAR(80)", description: "Given name." },
      { name: "last_name", type: "VARCHAR(80)", description: "Family name." },
      {
        name: "email",
        type: "VARCHAR(255)",
        description: "Work email address (unique).",
      },
      { name: "phone", type: "VARCHAR(32)", description: "Work phone number." },
      { name: "hire_date", type: "DATE", description: "Date employee joined." },
      {
        name: "job_title",
        type: "VARCHAR(120)",
        description: "Official job title.",
      },
      {
        name: "department_id",
        type: "BIGINT",
        description: "FK to departments.",
      },
      {
        name: "manager_id",
        type: "BIGINT",
        description: "Self‑FK to the manager employee_id (nullable).",
      },
    ],
  },
  {
    table: "departments",
    description: "Organizational units for budgeting and reporting.",
    columns: [
      {
        name: "department_id",
        type: "BIGINT",
        description: "Primary key for the department.",
      },
      {
        name: "department_name",
        type: "VARCHAR(120)",
        description: "Name of the department.",
      },
      {
        name: "cost_center",
        type: "VARCHAR(32)",
        description: "Accounting cost center code.",
      },
      {
        name: "manager_id",
        type: "BIGINT",
        description: "FK to employees who manage the department.",
      },
    ],
  },
  {
    table: "projects",
    description:
      "Portfolio of internal or client projects with budgets and timelines.",
    columns: [
      {
        name: "project_id",
        type: "BIGINT",
        description: "Primary key for the project.",
      },
      {
        name: "project_name",
        type: "VARCHAR(160)",
        description: "Short name of the project.",
      },
      {
        name: "sponsor_department_id",
        type: "BIGINT",
        description: "FK to departments sponsoring the work.",
      },
      {
        name: "start_date",
        type: "DATE",
        description: "Planned or actual start date.",
      },
      {
        name: "end_date",
        type: "DATE",
        description: "Planned or actual end date (nullable).",
      },
      {
        name: "budget",
        type: "DECIMAL(14,2)",
        description: "Approved budget for the project.",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "planned, active, on_hold, complete.",
      },
    ],
  },
  {
    table: "tasks",
    description: "Executable work items under projects.",
    columns: [
      {
        name: "task_id",
        type: "BIGINT",
        description: "Primary key for the task.",
      },
      { name: "project_id", type: "BIGINT", description: "FK to projects." },
      {
        name: "task_name",
        type: "VARCHAR(160)",
        description: "Short description of the task.",
      },
      {
        name: "assignee_employee_id",
        type: "BIGINT",
        description: "FK to employees assigned.",
      },
      {
        name: "due_date",
        type: "DATE",
        description: "Target completion date.",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "todo, in_progress, blocked, done.",
      },
      {
        name: "priority",
        type: "VARCHAR(10)",
        description: "low, medium, high, urgent.",
      },
    ],
  },
  {
    table: "support_tickets",
    description: "Customer support issues tracked by the service team.",
    columns: [
      {
        name: "ticket_id",
        type: "BIGINT",
        description: "Primary key for the ticket.",
      },
      {
        name: "customer_id",
        type: "BIGINT",
        description: "FK to customers who opened the ticket.",
      },
      {
        name: "subject",
        type: "VARCHAR(160)",
        description: "Short title summarizing the issue.",
      },
      {
        name: "description",
        type: "TEXT",
        description: "Detailed problem description.",
      },
      {
        name: "priority",
        type: "VARCHAR(10)",
        description: "low, medium, high, urgent.",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "open, pending, on_hold, resolved, closed.",
      },
      {
        name: "opened_at",
        type: "TIMESTAMP",
        description: "When the ticket was created.",
      },
      {
        name: "closed_at",
        type: "TIMESTAMP",
        description: "When the ticket was closed (nullable).",
      },
    ],
  },
  {
    table: "web_sessions",
    description: "Website/app sessions for digital analytics.",
    columns: [
      {
        name: "session_id",
        type: "VARCHAR(64)",
        description: "Client session identifier.",
      },
      {
        name: "visitor_id",
        type: "VARCHAR(64)",
        description: "Anonymous or known user identifier.",
      },
      {
        name: "started_at",
        type: "TIMESTAMP",
        description: "Session start time.",
      },
      {
        name: "ended_at",
        type: "TIMESTAMP",
        description: "Session end time (nullable).",
      },
      {
        name: "source",
        type: "VARCHAR(40)",
        description: "Traffic source/medium or campaign.",
      },
      {
        name: "device",
        type: "VARCHAR(40)",
        description: "Device class such as mobile or desktop.",
      },
      {
        name: "country",
        type: "CHAR(2)",
        description: "ISO‑2 country of the session.",
      },
    ],
  },
  {
    table: "marketing_campaigns",
    description: "Planned and active campaigns for acquisition and retention.",
    columns: [
      {
        name: "campaign_id",
        type: "BIGINT",
        description: "Primary key for the campaign.",
      },
      {
        name: "campaign_name",
        type: "VARCHAR(160)",
        description: "Human‑readable campaign label.",
      },
      {
        name: "channel",
        type: "VARCHAR(40)",
        description: "email, ads, social, affiliates, etc.",
      },
      {
        name: "budget",
        type: "DECIMAL(14,2)",
        description: "Allocated spend for the campaign.",
      },
      { name: "currency", type: "CHAR(3)", description: "Currency of budget." },
      { name: "start_date", type: "DATE", description: "Campaign start date." },
      {
        name: "end_date",
        type: "DATE",
        description: "Campaign end date (nullable).",
      },
    ],
  },
  {
    table: "leads",
    description: "Prospective customers captured by marketing or sales.",
    columns: [
      {
        name: "lead_id",
        type: "BIGINT",
        description: "Primary key for the lead.",
      },
      {
        name: "source",
        type: "VARCHAR(40)",
        description: "Origin of the lead such as web, event, referral.",
      },
      {
        name: "first_name",
        type: "VARCHAR(80)",
        description: "Lead’s given name.",
      },
      {
        name: "last_name",
        type: "VARCHAR(80)",
        description: "Lead’s family name.",
      },
      {
        name: "email",
        type: "VARCHAR(255)",
        description: "Contact email address (nullable).",
      },
      {
        name: "company",
        type: "VARCHAR(160)",
        description: "Company name if B2B (nullable).",
      },
      {
        name: "status",
        type: "VARCHAR(20)",
        description: "new, qualified, unqualified, converted.",
      },
      {
        name: "created_at",
        type: "TIMESTAMP",
        description: "Time the lead was created.",
      },
    ],
  },
  {
    table: "crm_interactions",
    description: "Logged emails, calls, and meetings with leads or customers.",
    columns: [
      {
        name: "interaction_id",
        type: "BIGINT",
        description: "Primary key for the interaction.",
      },
      {
        name: "actor_employee_id",
        type: "BIGINT",
        description: "FK to employees who performed the interaction.",
      },
      {
        name: "lead_id",
        type: "BIGINT",
        description: "FK to leads (nullable if customer_id used).",
      },
      {
        name: "customer_id",
        type: "BIGINT",
        description: "FK to customers (nullable if lead_id used).",
      },
      {
        name: "channel",
        type: "VARCHAR(20)",
        description: "email, call, meeting, chat, etc.",
      },
      {
        name: "occurred_at",
        type: "TIMESTAMP",
        description: "When the interaction occurred.",
      },
      {
        name: "notes",
        type: "TEXT",
        description: "Free‑form summary of the interaction.",
      },
    ],
  },
  {
    table: "inventory",
    description: "Current and reserved stock levels by product and location.",
    columns: [
      {
        name: "inventory_id",
        type: "BIGINT",
        description: "Primary key for the inventory record.",
      },
      { name: "product_id", type: "BIGINT", description: "FK to products." },
      {
        name: "location_id",
        type: "BIGINT",
        description: "FK to locations (warehouse/store).",
      },
      {
        name: "on_hand_qty",
        type: "INT",
        description: "Physical units currently available.",
      },
      {
        name: "reserved_qty",
        type: "INT",
        description: "Units reserved for open orders.",
      },
      {
        name: "reorder_point",
        type: "INT",
        description: "Threshold to trigger replenishment.",
      },
      {
        name: "last_restock_date",
        type: "DATE",
        description: "Date of last inbound stock.",
      },
    ],
  },
];
