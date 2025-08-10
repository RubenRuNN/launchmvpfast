import { relations, sql } from "drizzle-orm";
import {
    index,
    integer,
    pgEnum,
    pgTableCreator,
    primaryKey,
    text,
    timestamp,
    varchar,
    boolean,
    decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type AdapterAccount } from "next-auth/adapters";
import { z } from "zod";

export const createTable = pgTableCreator((name) => `carwash_${name}`);

export const usersRoleEnum = pgEnum("role", ["User", "Admin", "Super Admin"]);

export const users = createTable("user", {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
        mode: "date",
    }).default(sql`CURRENT_TIMESTAMP`),
    image: varchar("image", { length: 255 }),
    role: usersRoleEnum("role").default("User").notNull(),
    phone: varchar("phone", { length: 20 }),
    isNewUser: boolean("isNewUser").default(true).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    bookings: many(bookings),
    vehicles: many(vehicles),
}));

export const accounts = createTable(
    "account",
    {
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id),
        type: varchar("type", { length: 255 })
            .$type<AdapterAccount["type"]>()
            .notNull(),
        provider: varchar("provider", { length: 255 }).notNull(),
        providerAccountId: varchar("providerAccountId", {
            length: 255,
        }).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: varchar("token_type", { length: 255 }),
        scope: varchar("scope", { length: 255 }),
        id_token: text("id_token"),
        session_state: varchar("session_state", { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
        userIdIdx: index("account_userId_idx").on(account.userId),
    }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
    "session",
    {
        sessionToken: varchar("sessionToken", { length: 255 })
            .notNull()
            .primaryKey(),
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (session) => ({
        userIdIdx: index("session_userId_idx").on(session.userId),
    }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
    "verificationToken",
    {
        identifier: varchar("identifier", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    }),
);

// Organizations schema
export const organizations = createTable("organization", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    image: varchar("image", { length: 255 }),
    ownerId: varchar("ownerId", { length: 255 })
        .notNull()
        .references(() => users.id),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const organizationsRelations = relations(organizations, ({ one, many }) => ({
    owner: one(users, { fields: [organizations.ownerId], references: [users.id] }),
    membersToOrganizations: many(membersToOrganizations),
    subscriptions: one(subscriptions),
    washCenters: many(washCenters),
    services: many(services),
    employees: many(employees),
    vehicles: many(vehicles),
}));

export const membersToOrganizationsRoleEnum = pgEnum("members_to_organizations_role", [
    "Admin",
    "Member",
]);

export const membersToOrganizations = createTable("members_to_organizations", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    organizationId: varchar("organizationId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    memberId: varchar("memberId", { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    memberEmail: varchar("memberEmail", { length: 255 }).notNull(),
    role: membersToOrganizationsRoleEnum("role").default("Member").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const membersToOrganizationsRelations = relations(
    membersToOrganizations,
    ({ one }) => ({
        organization: one(organizations, {
            fields: [membersToOrganizations.organizationId],
            references: [organizations.id],
        }),
        member: one(users, {
            fields: [membersToOrganizations.memberId],
            references: [users.id],
        }),
    }),
);

// Wash Centers schema
export const washCenters = createTable("wash_center", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    orgId: varchar("orgId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    address: text("address").notNull(),
    phone: varchar("phone", { length: 20 }),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const washCentersRelations = relations(washCenters, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [washCenters.orgId],
        references: [organizations.id],
    }),
    bookings: many(bookings),
}));

// Services schema
export const serviceTypeEnum = pgEnum("service_type", ["Mobile", "Center"]);

export const services = createTable("service", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    orgId: varchar("orgId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    duration: integer("duration").notNull(), // in minutes
    type: serviceTypeEnum("type").notNull(),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const servicesRelations = relations(services, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [services.orgId],
        references: [organizations.id],
    }),
    bookings: many(bookings),
}));

// Employees schema
export const employees = createTable("employee", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    orgId: varchar("orgId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const employeesRelations = relations(employees, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [employees.orgId],
        references: [organizations.id],
    }),
    bookings: many(bookings),
}));

// Fleet Vehicles schema
export const fleetVehicles = createTable("fleet_vehicle", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    orgId: varchar("orgId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    licensePlate: varchar("licensePlate", { length: 20 }).notNull(),
    brand: varchar("brand", { length: 100 }).notNull(),
    model: varchar("model", { length: 100 }).notNull(),
    year: integer("year"),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const fleetVehiclesRelations = relations(fleetVehicles, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [fleetVehicles.orgId],
        references: [organizations.id],
    }),
    bookings: many(bookings),
}));

// Customer Vehicles schema
export const vehicles = createTable("vehicle", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    userId: varchar("userId", { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    orgId: varchar("orgId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    licensePlate: varchar("licensePlate", { length: 20 }).notNull(),
    brand: varchar("brand", { length: 100 }).notNull(),
    model: varchar("model", { length: 100 }).notNull(),
    year: integer("year"),
    color: varchar("color", { length: 50 }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
    user: one(users, { fields: [vehicles.userId], references: [users.id] }),
    organization: one(organizations, {
        fields: [vehicles.orgId],
        references: [organizations.id],
    }),
    bookings: many(bookings),
}));

// Booking Status enum
export const bookingStatusEnum = pgEnum("booking_status", [
    "Pending",
    "Confirmed",
    "InProgress",
    "Completed",
    "Canceled",
]);

// Bookings schema
export const bookings = createTable("booking", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    userId: varchar("userId", { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    orgId: varchar("orgId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    serviceId: varchar("serviceId", { length: 255 })
        .notNull()
        .references(() => services.id),
    vehicleId: varchar("vehicleId", { length: 255 })
        .notNull()
        .references(() => vehicles.id),
    washCenterId: varchar("washCenterId", { length: 255 })
        .references(() => washCenters.id),
    employeeId: varchar("employeeId", { length: 255 })
        .references(() => employees.id),
    fleetVehicleId: varchar("fleetVehicleId", { length: 255 })
        .references(() => fleetVehicles.id),
    scheduledDate: timestamp("scheduledDate", { mode: "date" }).notNull(),
    completedDate: timestamp("completedDate", { mode: "date" }),
    status: bookingStatusEnum("status").default("Pending").notNull(),
    totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
    notes: text("notes"),
    address: text("address"), // For mobile services
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
    user: one(users, { fields: [bookings.userId], references: [users.id] }),
    organization: one(organizations, {
        fields: [bookings.orgId],
        references: [organizations.id],
    }),
    service: one(services, {
        fields: [bookings.serviceId],
        references: [services.id],
    }),
    vehicle: one(vehicles, {
        fields: [bookings.vehicleId],
        references: [vehicles.id],
    }),
    washCenter: one(washCenters, {
        fields: [bookings.washCenterId],
        references: [washCenters.id],
    }),
    employee: one(employees, {
        fields: [bookings.employeeId],
        references: [employees.id],
    }),
    fleetVehicle: one(fleetVehicles, {
        fields: [bookings.fleetVehicleId],
        references: [fleetVehicles.id],
    }),
}));

// Subscriptions schema
export const subscriptions = createTable("subscription", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    lemonSqueezyId: varchar("lemonSqueezyId", { length: 255 }).notNull(),
    orderId: integer("orderId").notNull(),
    orgId: varchar("orgId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    variantId: integer("variantId").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
    organization: one(organizations, {
        fields: [subscriptions.orgId],
        references: [organizations.id],
    }),
}));

// Webhook Events schema
export const webhookEvents = createTable("webhook_event", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    eventName: varchar("eventName", { length: 255 }).notNull(),
    processed: boolean("processed").default(false).notNull(),
    body: text("body").notNull(),
    processingError: varchar("processingError", { length: 255 }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

// Feedback schema
export const feedbackLabelEnum = pgEnum("feedback_label", [
    "Bug Report",
    "Feature Request",
    "General",
]);

export const feedbackStatusEnum = pgEnum("feedback_status", [
    "Open",
    "In Progress",
    "Closed",
]);

export const feedback = createTable("feedback", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    userId: varchar("userId", { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    label: feedbackLabelEnum("label").default("General").notNull(),
    status: feedbackStatusEnum("status").default("Open").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const feedbackRelations = relations(feedback, ({ one }) => ({
    user: one(users, { fields: [feedback.userId], references: [users.id] }),
}));

// Waitlist schema
export const waitlistUsers = createTable("waitlist_user", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

// Organization requests schema
export const orgRequests = createTable("org_request", {
    id: varchar("id", { length: 255 })
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    organizationId: varchar("organizationId", { length: 255 })
        .notNull()
        .references(() => organizations.id, { onDelete: "cascade" }),
    userId: varchar("userId", { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const orgRequestsRelations = relations(orgRequests, ({ one }) => ({
    organization: one(organizations, {
        fields: [orgRequests.organizationId],
        references: [organizations.id],
    }),
    user: one(users, {
        fields: [orgRequests.userId],
        references: [users.id],
    }),
}));

// Schema exports for validation
export const userInsertSchema = createInsertSchema(users);
export const userSelectSchema = createSelectSchema(users);

export const createOrgInsertSchema = createInsertSchema(organizations);
export const orgRequestInsertSchema = createInsertSchema(orgRequests);
export const membersToOrganizationsInsertSchema = createInsertSchema(membersToOrganizations);

export const feedbackInsertSchema = createInsertSchema(feedback);
export const feedbackSelectSchema = createSelectSchema(feedback);

export const waitlistUsersSchema = createInsertSchema(waitlistUsers, {
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
});

export const washCenterInsertSchema = createInsertSchema(washCenters, {
    name: z.string().min(3, "Name must be at least 3 characters long"),
    address: z.string().min(10, "Address must be at least 10 characters long"),
    phone: z.string().optional(),
});

export const serviceInsertSchema = createInsertSchema(services, {
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().optional(),
    price: z.string().min(1, "Price is required"),
    duration: z.number().min(15, "Duration must be at least 15 minutes"),
});

export const employeeInsertSchema = createInsertSchema(employees, {
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
});

export const fleetVehicleInsertSchema = createInsertSchema(fleetVehicles, {
    licensePlate: z.string().min(3, "License plate is required"),
    brand: z.string().min(2, "Brand is required"),
    model: z.string().min(2, "Model is required"),
    year: z.number().optional(),
});

export const vehicleInsertSchema = createInsertSchema(vehicles, {
    licensePlate: z.string().min(3, "License plate is required"),
    brand: z.string().min(2, "Brand is required"),
    model: z.string().min(2, "Model is required"),
    year: z.number().optional(),
    color: z.string().optional(),
});

export const bookingInsertSchema = createInsertSchema(bookings, {
    scheduledDate: z.date(),
    totalPrice: z.string().min(1, "Price is required"),
    notes: z.string().optional(),
    address: z.string().optional(),
});

export const bookingSelectSchema = createSelectSchema(bookings);