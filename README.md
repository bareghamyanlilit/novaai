# NovaLiAi

## AI Agents & Automation Workspace

NovaLiAi is a modern AI SaaS dashboard template built with Next.js, React, TypeScript, and Tailwind CSS.

The project provides a clean foundation for building AI agent platforms, automation products, workflow-based applications, and modern SaaS dashboards.

---

## Features

* Modern AI SaaS dashboard
* Responsive dashboard layout
* Desktop sidebar navigation
* Mobile navigation
* AI Agents interface
* Workflow management interface
* Dynamic workflow pages
* Workflow builder
* Reusable workflow nodes
* Trigger nodes
* Condition nodes
* Agent nodes
* Action nodes
* Reusable UI components
* Responsive design
* Data visualization with Recharts
* Lucide icon system
* Client-side workflow persistence

---

## Tech Stack

| Technology   | Version / Usage |
| ------------ | --------------- |
| Next.js      | 16.3.8          |
| React        | 19.2.8          |
| TypeScript   | TypeScript 5    |
| Tailwind CSS | v4              |
| Lucide React | Icons           |
| Recharts     | Charts          |
| ESLint       | Code quality    |

---

## Requirements

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

The project provides the following npm scripts:

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates the production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint checks.

---

# Project Structure

The main project structure is organized as follows:

```text
novaliai/
│
├── app/
│   ├── dashboard/
│   ├── ...
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── ui/
│   ├── workflows/
│   └── ...
│
├── data/
│
├── lib/
│   ├── workflowStorage.ts
│   └── ...
│
├── public/
│
├── types/
│
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── README.md
```

The project follows the Next.js App Router architecture.

---

# Application Structure

## App

The `app` directory contains application routes, layouts, global styles, and page-level components.

Next.js App Router is used for navigation and route organization.

---

## Components

The `components` directory contains reusable interface components.

The project separates reusable UI elements from page-specific application logic.

This makes it easier to customize or extend the template.

---

## Data

The `data` directory contains application data used by the frontend.

This structure allows static or mock data to be separated from UI components.

If you connect NovaLiAi to a real backend, this layer can be replaced or extended with API/database data.

---

## Lib

The `lib` directory contains reusable application logic and utilities.

For example:

```text
lib/workflowStorage.ts
```

is responsible for workflow persistence on the client side.

---

## Public

The `public` directory contains static assets that can be referenced directly by the application.

Typical assets include:

* Images
* Logos
* Icons
* Other static files

---

## Types

The `types` directory contains shared TypeScript type definitions.

Keeping shared types separate helps maintain consistency throughout the application.

---

# Dashboard

NovaLiAi provides a SaaS-style dashboard interface designed around AI agents and automation workflows.

The dashboard architecture includes:

* Main navigation
* Sidebar
* Mobile navigation
* Dashboard header
* Main content area
* Reusable content components

The dashboard can be extended with additional sections such as:

* Analytics
* Settings
* Integrations
* Billing
* Team management

---

# AI Agents

The Agents section provides the frontend interface for managing AI agents.

An agent can represent an AI-powered task or automated process.

The current template focuses on the interface and application structure.

To turn the interface into a production AI platform, you can connect it to an AI backend or provider such as:

* OpenAI
* Anthropic
* Google Gemini
* Ollama
* Custom AI APIs

These integrations require additional implementation and are not automatically provided by the frontend template.

---

# Workflows

NovaLiAi includes a workflow-oriented interface for creating and managing automated processes.

A workflow can contain different types of nodes.

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

# Workflow Pages

Workflows use dynamic routes.

The workflow detail page follows the structure:

```text
/dashboard/workflows/[id]
```

The dynamic `id` identifies the selected workflow.

---

# Workflow Storage

Workflow data is currently persisted on the client using browser `localStorage`.

The storage utility is located at:

```text
lib/workflowStorage.ts
```

The application uses the following local storage key:

```text
novaliai-workflows
```

This means workflow data is stored locally in the user's browser.

### Important

The current implementation does **not** provide a server-side database.

Clearing browser storage or changing browsers/devices can result in the locally stored workflow data no longer being available.

For a production SaaS application, the storage layer can be replaced with a backend database.

Possible solutions include:

* PostgreSQL
* MySQL
* MongoDB
* Supabase
* Firebase

---

# UI Components

NovaLiAi uses reusable components to keep the interface consistent.

Examples include:

* Button
* Card
* Badge
* Sidebar
* Mobile Sidebar
* Dashboard Header
* Workflow configuration components

Reusable components can be modified without rewriting every page that uses them.

---

# Icons

NovaLiAi uses [Lucide React](https://lucide.dev/) for interface icons.

Example:

```tsx
import { Plus } from "lucide-react";

<Plus />
```

You can replace icons by importing another icon from Lucide.

---

# Charts

NovaLiAi uses Recharts for data visualization.

Example import:

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

The font can be replaced with another font if required.

---

# Styling

Global styling is located in:

```text
app/globals.css
```

Tailwind CSS is used throughout the application.

The styling system can be customized to match your own brand.

You can modify:

* Colors
* Backgrounds
* Borders
* Typography
* Spacing
* Border radius
* Shadows
* Responsive layouts

---

# Customization

NovaLiAi is designed to be customized without changing the entire application architecture.

## Branding

Search for:

```text
NovaLiAi
```

and replace the relevant application name with your own brand.

Update:

* Application name
* Logo
* Page titles
* Navigation labels
* Dashboard headings
* Metadata

---

## Metadata

Global metadata is configured in:

```text
app/layout.tsx
```

Example:

```tsx
export const metadata: Metadata = {
    title: {
        default: "NovaLiAi — AI Agents & Automation Workspace",
        template: "%s | NovaLiAi",
    },
};
```

Update this when rebranding the application.

---

## Colors

Global theme variables are defined in:

```text
app/globals.css
```

You can customize the primary color and other design tokens from there.

This is the recommended place to make global color changes rather than changing individual components one by one.

---

# Adding a New Page

Create a new directory inside `app`.

For example:

```text
app/dashboard/settings/page.tsx
```

Add:

```tsx
export default function SettingsPage() {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    );
}
```

The page will then be accessible at:

```text
/dashboard/settings
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

Import it using the project's path aliases:

```tsx
import { Modal } from "@/components/ui/Modal";
```

---

# Adding a Workflow Node

To add a new workflow node, update the workflow architecture and configuration UI.

For example, a new node could be:

```text
Webhook
```

or:

```text
Database
```

or:

```text
Email
```

A new node should generally include:

1. Node type
2. Node label
3. Node icon
4. Node rendering
5. Configuration UI
6. Data handling
7. Validation where necessary

---

# Environment Variables

The current frontend does not require an external AI API key just to run the included interface.

If you extend NovaLiAi with external services, create:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_APP_NAME=NovaLiAi
```

Never commit private API keys or other secrets to GitHub.

For example:

```text
.env
.env.local
.env.*.local
```

should remain private.

---

# Deployment

NovaLiAi can be deployed to hosting platforms that support Next.js.

## Vercel

Vercel is a natural deployment option for a Next.js application.

General process:

1. Push the project to GitHub.
2. Create a new project in Vercel.
3. Import the NovaLiAi repository.
4. Configure environment variables if required.
5. Deploy.

The standard build command is:

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
* [ ] Mobile layout has been tested
* [ ] Desktop layout has been tested
* [ ] Images load correctly
* [ ] Branding has been updated
* [ ] Metadata has been updated
* [ ] No private API keys are committed
* [ ] No development-only content remains
* [ ] Workflow functionality has been tested

---

# Troubleshooting

## `npm install` fails

Make sure you are using a supported Node.js version.

Then try:

```bash
npm install
```

If dependency installation becomes corrupted, remove `node_modules` and reinstall.

Windows PowerShell:

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

# Browser Support

NovaLiAi is intended for modern browsers.

Recommended:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

For the best experience, use a current stable browser version.

---

# Extending NovaLiAi

NovaLiAi provides a frontend foundation that can be extended into a complete AI SaaS product.

Possible future integrations include:

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

This information makes troubleshooting significantly faster.

---

# Conclusion

NovaLiAi provides a modern starting point for building AI agents, automation platforms, and SaaS products.

Its component-based architecture, workflow interface, responsive dashboard, and reusable styling system make it suitable for further customization and integration with backend services.

**NovaLiAi — AI Agents & Automation Workspace**
