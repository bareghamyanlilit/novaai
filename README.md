# NovaLiAi

## AI Agents & Automation Workspace

NovaLiAi is a modern AI SaaS dashboard template built with Next.js, React, TypeScript, and Tailwind CSS.

It provides a clean foundation for building AI agent platforms, automation products, workflow-based applications, and modern SaaS dashboards.

NovaLiAi is designed as a frontend-focused template. Demo data and selected application state are handled on the client side, making the project easy to customize and extend with your own backend, database, authentication, AI providers, and third-party services.

---

## Features

* Modern AI SaaS dashboard
* Responsive dashboard layout
* Desktop sidebar navigation
* Mobile navigation
* AI Agents management interface
* Agent creation and detail pages
* Prompt Library
* Prompt search and category filtering
* Prompt creation and management
* Workflow management interface
* Dynamic workflow pages
* Workflow builder
* Reusable workflow nodes
* Trigger nodes
* Condition nodes
* Agent nodes
* Action nodes
* Client-side data persistence
* Reusable UI components
* Responsive design
* Data visualization with Recharts
* Lucide icon system
* Marketing website pages
* Authentication pages
* Pricing page
* Blog pages
* FAQ and contact pages
* Settings, team, billing, analytics, knowledge, and notifications interfaces

---

## Tech Stack

| Technology   | Version / Usage    |
| ------------ | ------------------ |
| Next.js      | 16.3.8             |
| React        | 19.2.8             |
| TypeScript   | TypeScript 5       |
| Tailwind CSS | v4                 |
| Lucide React | Interface icons    |
| Recharts     | Data visualization |
| ESLint       | Code quality       |

---

# Requirements

Before installing NovaLiAi, make sure you have:

* Node.js 20 or newer
* npm
* Git

Check your installed versions:

```bash
node -v
npm -v
git --version
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/bareghamyanlilit/novaliai.git
```

Move into the project directory:

```bash
cd novaliai
```

## 2. Install dependencies

```bash
npm install
```

---

# Development

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The application will automatically update when source files are changed.

---

# Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

The production application will normally be available at:

```text
http://localhost:3000
```

---

# Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Build

```bash
npm run build
```

Creates the production build.

### Start

```bash
npm run start
```

Starts the production Next.js server.

### Lint

```bash
npm run lint
```

Runs ESLint checks.

---

# Project Structure

The project follows the Next.js App Router architecture.

```text
novaliai/
│
├── app/
│   ├── (marketing)/
│   │   ├── about/
│   │   ├── agents/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── features/
│   │   ├── pricing/
│   │   └── solutions/
│   │
│   ├── dashboard/
│   │   ├── agents/
│   │   ├── analytics/
│   │   ├── billing/
│   │   ├── chat/
│   │   ├── knowledge/
│   │   ├── notifications/
│   │   ├── prompts/
│   │   ├── settings/
│   │   ├── team/
│   │   └── workflows/
│   │
│   ├── forgot-password/
│   ├── login/
│   ├── register/
│   ├── reset-password/
│   ├── privacy/
│   ├── terms/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── og-image.png
│
├── components/
│   ├── dashboard/
│   ├── marketing/
│   └── ui/
│
├── data/
│   ├── agents.ts
│   ├── analytics.ts
│   ├── billing.ts
│   ├── blog.ts
│   ├── chats.ts
│   ├── knowledge.ts
│   ├── notifications.ts
│   ├── pricing.ts
│   ├── prompts.ts
│   ├── settings.ts
│   ├── team.ts
│   └── workflows.ts
│
├── lib/
│   ├── agentStorage.ts
│   ├── billingStorage.ts
│   ├── chatStorage.ts
│   ├── knowledgeStorage.ts
│   ├── notificationStorage.ts
│   ├── paymentStorage.ts
│   ├── promptStorage.ts
│   ├── settingsStorage.ts
│   ├── teamStorage.ts
│   └── workflowStorage.ts
│
├── public/
│   └── og-image.png
│
├── types/
│   ├── agent.ts
│   ├── billing.ts
│   ├── blog.ts
│   ├── chat.ts
│   ├── knowledge.ts
│   ├── notification.ts
│   ├── pricing.ts
│   ├── prompt.ts
│   ├── settings.ts
│   ├── team.ts
│   └── workflow.ts
│
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# Application Architecture

## App

The `app` directory contains application routes, layouts, global styles, metadata, and page-level components.

NovaLiAi uses the Next.js App Router for route organization and navigation.

Route groups are used to separate the marketing website from the dashboard without affecting the public URL structure.

---

## Components

The `components` directory contains reusable interface components.

### Dashboard

Dashboard-specific components such as:

* Sidebar
* Mobile navigation
* Dashboard header
* Agent cards
* Prompt cards
* Workflow configuration
* Statistics cards
* Charts
* Activity components

### Marketing

Marketing website components such as:

* Navbar
* Hero
* Features
* Pricing
* FAQ
* Testimonials
* CTA
* Footer
* Product previews

### UI

Shared interface components such as:

* Button
* Card
* Badge
* Input
* Avatar
* Skeleton

Reusable components make it easier to maintain consistent styling throughout the application.

---

# Data

The `data` directory contains the frontend data used by the template.

Examples include:

```text
data/agents.ts
data/analytics.ts
data/blog.ts
data/billing.ts
data/chats.ts
data/knowledge.ts
data/notifications.ts
data/pricing.ts
data/prompts.ts
data/settings.ts
data/team.ts
data/workflows.ts
```

The data layer is separated from UI components so that demo content can be replaced or extended easily.

When connecting NovaLiAi to a real backend, these data sources can be replaced with API, database, or server-side data.

---

# Client-Side Storage

NovaLiAi includes client-side storage utilities for selected application features.

Storage utilities are located in:

```text
lib/
```

Examples include:

```text
lib/agentStorage.ts
lib/chatStorage.ts
lib/promptStorage.ts
lib/workflowStorage.ts
```

Browser `localStorage` is used for demo persistence.

This allows users to create and manage selected data without requiring a backend database.

## Important

The included template does not provide a server-side database.

Local browser data can be lost if the user clears browser storage or changes browser/device.

For a production SaaS application, the storage layer can be replaced with a backend database or API.

Possible solutions include:

* PostgreSQL
* MySQL
* MongoDB
* Supabase
* Firebase
* Custom REST or GraphQL APIs

---

# Dashboard

NovaLiAi provides a SaaS-style dashboard designed around AI agents, prompts, automation, and workflows.

The dashboard includes:

* Main navigation
* Desktop sidebar
* Mobile navigation
* Dashboard header
* Main content area
* Reusable content components
* Analytics interface
* Billing interface
* Team interface
* Settings interface
* Knowledge interface
* Notifications interface
* Chat interface

The dashboard architecture is designed to make it easy to add additional SaaS features.

---

# AI Agents

The Agents section provides an interface for creating and managing AI agents.

Agent functionality includes:

* Agent listing
* Agent creation
* Agent detail pages
* Agent status
* Agent configuration
* Agent deletion
* Client-side persistence

The current template provides the frontend architecture and demo behavior.

To turn the interface into a production AI platform, connect it to an AI backend or provider such as:

* OpenAI
* Anthropic
* Google Gemini
* Ollama
* Custom AI APIs

These integrations require additional backend or provider-specific implementation.

---

# Prompt Library

NovaLiAi includes a Prompt Library for organizing and reusing AI prompts.

Features include:

* Prompt listing
* Search
* Category filtering
* Prompt creation
* Prompt viewing
* Prompt copying
* Prompt deletion
* Client-side persistence

Available categories include:

* Marketing
* Sales
* Support
* Research
* Productivity

Prompt storage is handled by:

```text
lib/promptStorage.ts
```

Prompt demo data is located in:

```text
data/prompts.ts
```

The Prompt Library can be connected to a backend database when building a production application.

---

# Workflows

NovaLiAi includes a workflow-oriented interface for creating and managing automated processes.

A workflow can contain different node types.

Current node types include:

### Trigger

Defines the starting point of a workflow.

Example:

```text
New customer submits a form
```

### Condition

Defines logic used to determine what happens next.

Example:

```text
If customer type is "new"
```

### Agent

Represents an AI agent or AI-powered operation.

Example:

```text
AI Agent → Analyze customer request
```

### Action

Represents an operation performed by the workflow.

Example:

```text
Send notification
```

---

# Workflow Builder

The workflow builder provides an interface for configuring workflow nodes.

Workflow configuration is handled through reusable components.

The current architecture is designed to be extended with additional node types such as:

```text
Webhook
Database
Email
HTTP Request
Delay
Notification
```

A new node generally requires:

1. Node type
2. Node label
3. Node icon
4. Node rendering
5. Configuration UI
6. Data handling
7. Validation where necessary

---

# Workflow Pages

Workflows use dynamic routes.

The workflow detail page follows the structure:

```text
/dashboard/workflows/[id]
```

The dynamic `id` identifies the selected workflow.

New workflows can be created through:

```text
/dashboard/workflows/new
```

---

# Workflow Storage

Workflow data is persisted on the client using browser `localStorage`.

The storage utility is located at:

```text
lib/workflowStorage.ts
```

The local storage key is:

```text
novaliai-workflows
```

Workflow data is therefore stored locally in the user's browser.

For a production application, the storage implementation can be replaced with a server-side database.

---

# UI Components

NovaLiAi uses reusable components to keep the interface consistent.

Examples include:

* Button
* Card
* Badge
* Input
* Avatar
* Skeleton
* Sidebar
* Mobile Sidebar
* Dashboard Header
* Agent Card
* Prompt Card
* Workflow configuration components
* Chart components

Shared components can be modified without rewriting every page that uses them.

---

# Icons

NovaLiAi uses Lucide React for interface icons.

Example:

```tsx
import { Plus } from "lucide-react";

<Plus size={18} />
```

Additional icons can be imported from the Lucide icon library.

---

# Charts

NovaLiAi uses Recharts for data visualization.

Example:

```tsx
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
```

Recharts can be used to create:

* Analytics charts
* Usage charts
* Activity charts
* Revenue charts
* Workflow statistics

---

# Typography

NovaLiAi uses the Inter typeface through Next.js font optimization.

The font configuration is located in:

```text
app/layout.tsx
```

The font can be replaced with another supported font if required.

---

# Styling

Global styling is located in:

```text
app/globals.css
```

Tailwind CSS is used throughout the application.

The design system can be customized by changing:

* Colors
* Backgrounds
* Borders
* Typography
* Spacing
* Border radius
* Shadows
* Responsive layouts

Global design tokens should be updated in the shared styling system rather than changing individual components unnecessarily.

---

# Customization

NovaLiAi is designed to be customized without changing the entire application architecture.

## Branding

Search for:

```text
NovaLiAi
```

and replace the relevant application name with your own brand.

Typical branding areas include:

* Application name
* Logo
* Page titles
* Navigation labels
* Dashboard headings
* Metadata
* Marketing copy

---

## Metadata

Global metadata is configured in:

```text
app/layout.tsx
```

The metadata includes:

* Page title
* Description
* Keywords
* Open Graph metadata
* Twitter metadata
* Canonical URL
* Robots configuration

Update these values when rebranding the application.

---

## Colors

Global theme variables are defined in:

```text
app/globals.css
```

This is the recommended place to customize the primary color and other design tokens.

---

# Adding a New Page

Create a new directory inside `app`.

For example:

```text
app/dashboard/settings/example/page.tsx
```

Then add a page component:

```tsx
export default function ExamplePage() {
    return (
        <div>
            <h1>Example Page</h1>
        </div>
    );
}
```

The page will then be available at:

```text
/dashboard/settings/example
```

---

# Adding a New Component

Create a component inside the appropriate `components` directory.

For example:

```text
components/ui/Modal.tsx
```

Example:

```tsx
export function Modal() {
    return (
        <div>
            Modal content
        </div>
    );
}
```

Import it using the project's path alias:

```tsx
import { Modal } from "@/components/ui/Modal";
```

---

# Adding a Workflow Node

To add a new workflow node:

1. Define the node type.
2. Add the node label.
3. Add the node icon.
4. Add node rendering.
5. Add configuration controls.
6. Add data handling.
7. Add validation where required.
8. Update workflow persistence if necessary.

Example node types:

```text
Webhook
Database
Email
HTTP Request
Delay
Notification
```

---

# Environment Variables

NovaLiAi does not require environment variables for the included frontend demo functionality.

If you extend the project with external APIs, authentication, databases, payment providers, or other services, create:

```text
.env.local
```

and add the required environment variables.

Never commit private API keys, database credentials, authentication secrets, or other sensitive values to Git.

Recommended private files include:

```text
.env
.env.local
.env.*.local
```

---

# Deployment

NovaLiAi can be deployed to hosting platforms that support Next.js applications.

## Vercel

Vercel is a natural deployment option for Next.js projects.

General process:

1. Push the project to GitHub.
2. Create a new project in Vercel.
3. Import the NovaLiAi repository.
4. Configure environment variables if your customized application requires them.
5. Deploy.

The standard production build command is:

```bash
npm run build
```

---

# Production Checklist

Before publishing a customized NovaLiAi project, verify:

* [ ] `npm install` works
* [ ] `npm run dev` works
* [ ] `npm run lint` passes
* [ ] `npm run build` succeeds
* [ ] All navigation links work
* [ ] All pages load correctly
* [ ] Desktop layout has been tested
* [ ] Mobile layout has been tested
* [ ] Images load correctly
* [ ] Favicon has been updated
* [ ] Open Graph image has been updated
* [ ] Branding has been updated
* [ ] Metadata has been updated
* [ ] No private API keys are committed
* [ ] No development-only content remains
* [ ] Client-side persistence has been tested
* [ ] Workflow functionality has been tested
* [ ] Agent functionality has been tested
* [ ] Prompt functionality has been tested
* [ ] Production build has been tested

---

# Troubleshooting

## `npm install` fails

Make sure you are using a supported Node.js version.

Then try:

```bash
npm install
```

If dependency installation becomes corrupted, remove `node_modules` and reinstall.

### Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

## Port 3000 is already in use

Run the development server on another port:

```bash
npm run dev -- -p 3001
```

Then open:

```text
http://localhost:3001
```

---

## Build fails

Run:

```bash
npm run build
```

Read the first reported error and fix it before continuing.

After making changes, run the build again.

---

## Changes are not visible

Restart the development server.

If necessary, remove the Next.js cache:

```powershell
Remove-Item -Recurse -Force .next
```

Then restart:

```bash
npm run dev
```

---

## Local data is missing

NovaLiAi uses browser `localStorage` for selected demo functionality.

If stored data disappears, check whether:

* Browser storage was cleared.
* The application is running in a different browser.
* The application is running on a different device.
* The relevant local storage entry was removed.

For production applications, use a server-side database instead of relying exclusively on browser storage.

---

# Browser Support

NovaLiAi is intended for modern browsers.

Recommended browsers include:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

For the best experience, use a current stable browser version.

---

# Extending NovaLiAi

NovaLiAi provides a frontend foundation that can be extended into a complete AI SaaS product.

Possible integrations include:

## Authentication

* Auth.js
* Clerk
* Supabase Auth
* Custom authentication

## Database

* PostgreSQL
* MongoDB
* Supabase
* Firebase

## AI

* OpenAI
* Anthropic
* Google Gemini
* Ollama
* Custom AI providers

## Payments

* Stripe
* Paddle
* Lemon Squeezy

## Automation

* Webhooks
* Scheduled workflows
* External APIs
* Email integrations

These integrations require additional backend or third-party service implementation.

---

# License

Please refer to the license included with your purchased or distributed version of NovaLiAi.

Third-party packages remain subject to their respective licenses.

---

# Credits

NovaLiAi is built with:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React
* Recharts

---

# Support

When requesting support, please include:

* NovaLiAi version
* Operating system
* Node.js version
* npm version
* Browser and browser version
* Exact error message
* Steps to reproduce the problem

Providing this information makes troubleshooting significantly faster.

---

# Conclusion

NovaLiAi provides a modern starting point for building AI agent platforms, automation pharoducts, workflow-based applications, and SaaS dashboards.

Its component-based architecture, responsive dashboard, workflow builder, Prompt Library, agent management interface, reusable UI system, and client-side persistence make it easy to customize and extend.

Connect the template to your preferred backend, database, authentication system, AI provider, and third-party services to build a production-ready AI SaaS application.

**NovaLiAi — AI Agents & Automation Workspace**
