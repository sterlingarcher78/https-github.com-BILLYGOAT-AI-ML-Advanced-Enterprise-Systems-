# CLAUDE.md - AI Assistant Guide for BillyGoat Codebase

**Last Updated:** 2025-11-17
**Project:** BillyGoat - AI Agent Management Platform
**Framework:** React + TypeScript + Vite
**Status:** Active Development

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Development Workflows](#development-workflows)
5. [Key Conventions](#key-conventions)
6. [Database & Backend](#database--backend)
7. [Component Architecture](#component-architecture)
8. [Styling System](#styling-system)
9. [State Management](#state-management)
10. [Routing](#routing)
11. [Important Files Reference](#important-files-reference)
12. [Common Development Tasks](#common-development-tasks)
13. [Security Considerations](#security-considerations)
14. [Testing & Quality](#testing--quality)
15. [Deployment](#deployment)
16. [Troubleshooting](#troubleshooting)

---

## Project Overview

**BillyGoat** is an AI agent management platform built with React and TypeScript. It provides a dashboard for managing AI agents, crews (multi-agent systems), and knowledge bases. The application is currently using mock data but has a fully configured Supabase backend ready for integration.

### Key Features
- **Dashboard:** Real-time crypto/agent performance visualization
- **Agent Management:** Create, configure, and monitor AI agents
- **Crew System:** Multi-agent orchestration and collaboration
- **Knowledge Base:** Content management for AI context
- **Audit System:** Compliance and security logging

### Current State
- ✅ Frontend UI complete with mock data
- ✅ Supabase backend configured (7 tables, 6 functions)
- ⚠️ Backend integration pending
- ⚠️ Authentication not yet implemented
- ⚠️ Security credentials exposed (needs fixing)

---

## Technology Stack

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool and dev server

### UI & Styling
- **shadcn/ui** - Component library (Radix UI primitives)
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **Lucide React 0.462.0** - Icon library
- **next-themes 0.3.0** - Dark mode support

### State & Data Management
- **TanStack React Query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form management
- **Zod 3.25.76** - Schema validation

### Backend & Database
- **Supabase 2.58.0** - PostgreSQL database + Auth + Storage
- **PostgreSQL 13.0.5** - Database (via Supabase)

### Routing
- **React Router DOM 6.30.1** - Client-side routing

### Charts & Visualization
- **Recharts 2.15.4** - Chart components
- **Embla Carousel 8.6.0** - Carousel functionality

### Developer Tools
- **ESLint 9.32.0** - Linting
- **TypeScript ESLint 8.38.0** - TS-specific linting
- **Lovable Tagger** - Development tagging (Lovable platform integration)

---

## Project Structure

```
billygoat/
├── .env                          # Environment variables (⚠️ exposed, needs fixing)
├── .gitignore                    # Git ignore rules
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript base config
├── tsconfig.app.json            # TypeScript app config
├── tsconfig.node.json           # TypeScript node config
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── eslint.config.js             # ESLint configuration
├── components.json              # shadcn/ui configuration
│
├── public/                      # Static assets
│
├── src/                         # Source code
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Root component with providers
│   ├── index.css                # Global styles
│   ├── vite-env.d.ts           # Vite type definitions
│   │
│   ├── pages/                   # Route pages
│   │   ├── Index.tsx           # Home page (dashboard)
│   │   └── NotFound.tsx        # 404 page
│   │
│   ├── components/              # React components
│   │   ├── ui/                 # shadcn/ui components (40+ components)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   └── dashboard/          # Dashboard-specific components
│   │       ├── CryptoDashboard.tsx  # Main dashboard
│   │       ├── ChartCard.tsx        # Chart component
│   │       ├── GaugeCard.tsx        # Gauge visualization
│   │       └── StatCard.tsx         # Stat display card
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   └── use-toast.ts        # Toast notifications hook
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── utils.ts            # Utility functions (cn helper)
│   │   └── crypto-data.ts      # Mock data generator (154 lines)
│   │
│   └── integrations/            # Third-party integrations
│       └── supabase/
│           ├── client.ts       # Supabase client initialization
│           └── types.ts        # Auto-generated DB types (442 lines)
│
├── supabase/                    # Supabase configuration
│   └── config.toml             # Supabase project config
│
└── [DOCS]/                      # Documentation (various .md files)
    ├── SUPABASE_QUICK_REFERENCE.md
    ├── SUPABASE_INTEGRATION_ANALYSIS.md
    ├── COMPLETE_ASSET_SUMMARY.md
    └── ...
```

### Directory Conventions

| Directory | Purpose | Naming Convention |
|-----------|---------|-------------------|
| `/src/pages/` | Route-level components | PascalCase (Index.tsx) |
| `/src/components/ui/` | Reusable UI components | kebab-case (button.tsx) |
| `/src/components/dashboard/` | Feature components | PascalCase (CryptoDashboard.tsx) |
| `/src/hooks/` | Custom React hooks | kebab-case with "use-" prefix |
| `/src/lib/` | Utilities and helpers | kebab-case |
| `/src/integrations/` | External service integrations | kebab-case |

---

## Development Workflows

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd billygoat

# Install dependencies
npm install

# Start development server
npm run dev
# Server runs on http://localhost:8080

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Server
- **URL:** `http://[::]:8080` (localhost:8080)
- **Hot Reload:** Enabled via Vite HMR
- **SWC:** React Fast Refresh enabled

### Build Process
- **Tool:** Vite
- **Output:** `/dist` directory
- **Modes:**
  - `npm run build` - Production build
  - `npm run build:dev` - Development build

### Environment Variables
```bash
# .env file (⚠️ Should be in .gitignore)
VITE_SUPABASE_PROJECT_ID="wdlqouqphojcrcmyeuak"
VITE_SUPABASE_URL="https://wdlqouqphojcrcmyeuak.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="[see .env file]"
```

**⚠️ SECURITY WARNING:** Credentials are currently exposed in git. See [Security Considerations](#security-considerations).

---

## Key Conventions

### TypeScript Configuration
```json
{
  "strict": false,                    // ⚠️ Should be true for production
  "noImplicitAny": false,             // ⚠️ Should be true
  "noUnusedParameters": false,        // ⚠️ Should be true
  "noUnusedLocals": false,            // ⚠️ Should be true
  "strictNullChecks": false,          // ⚠️ Should be true
  "skipLibCheck": true,
  "allowJs": true
}
```

**Recommendation:** Enable strict mode for better type safety.

### Path Aliases
```typescript
// tsconfig.json & vite.config.ts
"@/*" → "./src/*"

// Usage:
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
```

### Import Conventions
```typescript
// ✅ Good - Use path alias
import { Button } from "@/components/ui/button";

// ❌ Bad - Relative paths
import { Button } from "../../../components/ui/button";
```

### Component Patterns

#### Page Components
```typescript
// src/pages/Index.tsx
const Index = () => {
  return <MainFeature />;
};

export default Index;
```

#### Feature Components
```typescript
// src/components/dashboard/CryptoDashboard.tsx
export const CryptoDashboard = () => {
  // Component logic
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
};
```

#### UI Components (shadcn/ui pattern)
```typescript
// src/components/ui/button.tsx
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CryptoDashboard`, `StatCard` |
| Files (components) | Match component name | `CryptoDashboard.tsx` |
| Files (UI components) | kebab-case | `button.tsx`, `dropdown-menu.tsx` |
| Hooks | camelCase with "use" prefix | `useToast`, `useMobile` |
| Functions | camelCase | `generateCryptoData`, `formatCurrency` |
| Constants | UPPER_SNAKE_CASE | `SUPABASE_URL`, `MAX_RETRIES` |
| Interfaces/Types | PascalCase | `ButtonProps`, `Database` |
| CSS Classes | Tailwind utilities | `flex items-center gap-4` |

---

## Database & Backend

### Supabase Configuration

**Project Details:**
- **URL:** `https://wdlqouqphojcrcmyeuak.supabase.co`
- **Project ID:** `wdlqouqphojcrcmyeuak`
- **Region:** US East
- **Database:** PostgreSQL 13.0.5

### Database Schema (7 Tables)

#### 1. `profiles`
User account management linked to Supabase Auth.

```typescript
{
  id: string (UUID, FK to auth.users)
  email: string
  display_name: string
  role: string
  created_at: timestamp
  updated_at: timestamp
}
```

#### 2. `ai_agents`
AI agent registry and lifecycle management.

```typescript
{
  id: string (UUID)
  name: string
  type: string
  status: string
  is_active: boolean
  configuration: jsonb
  performance_metrics: jsonb
  created_at: timestamp
  updated_at: timestamp
}
```

#### 3. `crew_nuclear_system`
Multi-agent workflow orchestration.

```typescript
{
  id: string (UUID)
  crew_name: string
  crew_type: string
  status: string
  configuration: jsonb
  performance_data: jsonb
  last_execution: timestamp
  created_at: timestamp
  updated_at: timestamp
}
```

#### 4. `knowledge_base_entries`
Content and knowledge management.

```typescript
{
  id: string (UUID)
  title: string
  content: text
  category: string
  tags: string[]
  is_active: boolean
  metadata: jsonb
  created_at: timestamp
  updated_at: timestamp
}
```

#### 5. `deployment_packages`
Release versioning and deployment tracking.

```typescript
{
  id: string (UUID)
  name: string
  version: string
  status: string
  configuration: jsonb
  created_by: UUID (FK to profiles)
  deployed_at: timestamp
  created_at: timestamp
}
```

#### 6. `audit_logs`
Security and compliance audit trail.

```typescript
{
  id: string (UUID)
  user_id: UUID (FK to auth.users)
  action: string
  table_name: string
  record_id: string
  old_values: jsonb
  new_values: jsonb
  ip_address: string
  created_at: timestamp
}
```

#### 7. `system_performance_logs`
Performance monitoring and metrics.

```typescript
{
  id: string (UUID)
  system_id: string
  system_type: string
  metrics: jsonb
  timestamp: timestamp
  created_at: timestamp
}
```

### Database Functions (6 Available)

```sql
-- Check if user is admin
is_admin() → boolean

-- Password validation
validate_password_strength(password text) → boolean
is_common_password(password text) → boolean

-- Audit logging
log_audit_event(action text, ...) → void
system_insert_audit_log(user_id uuid, ...) → void

-- Admin management
promote_user_to_admin(user_email text) → void
```

### Supabase Client Usage

```typescript
// Import client
import { supabase } from "@/integrations/supabase/client";

// Query example
const { data, error } = await supabase
  .from('ai_agents')
  .select('*')
  .eq('is_active', true);

// Insert example
const { data, error } = await supabase
  .from('ai_agents')
  .insert({ name: 'Agent Name', type: 'type', status: 'active' });

// Update example
const { data, error } = await supabase
  .from('ai_agents')
  .update({ status: 'inactive' })
  .eq('id', agentId);

// Delete example
const { data, error } = await supabase
  .from('ai_agents')
  .delete()
  .eq('id', agentId);
```

### Current Integration Status

**⚠️ IMPORTANT:** The Supabase backend is configured but **NOT CURRENTLY USED** in the frontend.

- ✅ Database schema defined (7 tables)
- ✅ Type definitions generated (`types.ts`)
- ✅ Client initialized (`client.ts`)
- ❌ No queries in components (using mock data)
- ❌ No authentication implemented
- ❌ No real-time subscriptions
- ⚠️ Credentials hardcoded (security risk)

**Mock Data Location:** `/src/lib/crypto-data.ts` (154 lines)

---

## Component Architecture

### shadcn/ui Components

The project uses **shadcn/ui**, a collection of re-usable components built with Radix UI and Tailwind CSS. Components are copied into your project (not installed as a dependency).

**Available Components (40+):**
- Accordion, Alert, AlertDialog, AspectRatio, Avatar
- Badge, Button, Calendar, Card, Carousel
- Checkbox, Collapsible, Command, ContextMenu, Dialog
- DropdownMenu, Form, HoverCard, Input, InputOTP
- Label, Menubar, NavigationMenu, Popover, Progress
- RadioGroup, ScrollArea, Select, Separator, Sheet
- Skeleton, Slider, Sonner, Switch, Table
- Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip

### Component Configuration

```json
// components.json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Custom Components Structure

```
src/components/
├── ui/                    # shadcn/ui components (don't modify heavily)
│   └── button.tsx        # Extend via composition, not modification
│
└── dashboard/            # Feature-specific components
    ├── CryptoDashboard.tsx    # Main dashboard container
    ├── StatCard.tsx           # Reusable stat display
    ├── ChartCard.tsx          # Chart wrapper
    └── GaugeCard.tsx          # Gauge visualization
```

### Component Composition Pattern

```typescript
// ✅ Good - Compose existing components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const StatCard = ({ title, value, icon }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {icon}
      <span>{value}</span>
    </CardContent>
  </Card>
);

// ❌ Bad - Modifying shadcn/ui components directly
// Don't edit src/components/ui/card.tsx unless absolutely necessary
```

---

## Styling System

### Tailwind CSS Configuration

**Theme Extension:**
- Custom colors for crypto/dashboard theme
- CSS variables for theming
- Dark mode support
- Custom animations

### Color System

```typescript
// Semantic colors (CSS variables)
background, foreground, primary, secondary, destructive, muted, accent
card, popover, border, input, ring

// Crypto-specific colors
crypto-green, crypto-green-bright
crypto-red, crypto-red-bright
crypto-blue, crypto-purple, crypto-cyan, crypto-orange, crypto-pink

// Usage
<div className="bg-crypto-green text-foreground">
```

### Dark Mode

```typescript
// Enabled via next-themes
// Toggle between light/dark mode

// In components:
import { useTheme } from "next-themes"

const { theme, setTheme } = useTheme()
setTheme("dark") // or "light"
```

### Custom Gradients & Effects

```typescript
// Tailwind config defines:
gradient-primary, gradient-success, gradient-danger, gradient-card
glow-primary, glow-success, glow-danger

// Usage:
<div className="bg-gradient-primary shadow-glow-primary">
```

### Utility Helper

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage - merge Tailwind classes safely:
<Button className={cn("bg-primary", isActive && "bg-secondary")} />
```

### Styling Best Practices

```typescript
// ✅ Good - Use Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-lg bg-card">

// ✅ Good - Use cn() for conditional classes
<div className={cn("base-class", condition && "conditional-class")}>

// ⚠️ Acceptable - Custom CSS for complex animations
// Add to src/index.css with @layer utilities

// ❌ Bad - Inline styles (avoid unless dynamic values)
<div style={{ color: dynamicColor }}>
```

---

## State Management

### React Query (TanStack Query)

**Setup in App.tsx:**
```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* app */}
  </QueryClientProvider>
);
```

### Query Patterns (When Implemented)

```typescript
// Custom hook pattern for data fetching
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      return data;
    },
  });
}

// Usage in component:
const { data: agents, isLoading, error } = useAgents();
```

### Mutation Patterns

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAgent) => {
      const { data, error } = await supabase
        .from('ai_agents')
        .insert(newAgent);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });
}

// Usage:
const createAgent = useCreateAgent();
createAgent.mutate({ name: 'New Agent', type: 'assistant' });
```

### Local State
- **Component State:** `useState` for local UI state
- **Form State:** React Hook Form for complex forms
- **Toast Notifications:** `useToast` hook

---

## Routing

### React Router Setup

```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
```

### Current Routes
- `/` - Index page (CryptoDashboard)
- `/*` - 404 Not Found page

### Adding New Routes

```typescript
// 1. Create page component
// src/pages/Agents.tsx
const Agents = () => {
  return <div>Agents Page</div>;
};
export default Agents;

// 2. Add route in App.tsx
import Agents from "./pages/Agents";

<Route path="/agents" element={<Agents />} />
```

### Navigation

```typescript
// Link component
import { Link } from "react-router-dom";
<Link to="/agents">View Agents</Link>

// Programmatic navigation
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/agents");

// With state
navigate("/agents", { state: { from: "dashboard" } });
```

---

## Important Files Reference

### Configuration Files

| File | Purpose | Modify? |
|------|---------|---------|
| `package.json` | Dependencies and scripts | Yes |
| `vite.config.ts` | Vite build configuration | Rarely |
| `tsconfig.json` | TypeScript configuration | Rarely |
| `tsconfig.app.json` | App-specific TS config | Rarely |
| `tailwind.config.ts` | Tailwind theme customization | Yes |
| `components.json` | shadcn/ui configuration | Rarely |
| `eslint.config.js` | Linting rules | Yes |
| `.env` | Environment variables | Yes (⚠️ secure it) |
| `.gitignore` | Git ignore patterns | Rarely |

### Source Files

| File | Purpose | Modify? |
|------|---------|---------|
| `src/main.tsx` | Application entry point | Rarely |
| `src/App.tsx` | Root component with providers | Yes (routes) |
| `src/index.css` | Global styles and CSS variables | Yes |
| `src/lib/utils.ts` | Utility functions | Yes |
| `src/lib/crypto-data.ts` | Mock data generator | Delete after DB integration |
| `src/integrations/supabase/client.ts` | Supabase client | Rarely (⚠️ fix credentials) |
| `src/integrations/supabase/types.ts` | Auto-generated types | Never (regenerate) |

### Documentation Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file - AI assistant guide |
| `README.md` | Project overview and setup |
| `SUPABASE_QUICK_REFERENCE.md` | Supabase integration guide |
| `SUPABASE_INTEGRATION_ANALYSIS.md` | Detailed Supabase analysis |
| `COMPLETE_ASSET_SUMMARY.md` | Asset inventory |

---

## Common Development Tasks

### Adding a New Page

```bash
# 1. Create page component
# src/pages/NewPage.tsx
```

```typescript
const NewPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">New Page</h1>
    </div>
  );
};

export default NewPage;
```

```typescript
// 2. Add route in App.tsx
import NewPage from "./pages/NewPage";

<Route path="/new-page" element={<NewPage />} />
```

### Adding a shadcn/ui Component

```bash
# Install component via npx (recommended)
npx shadcn@latest add [component-name]

# Example:
npx shadcn@latest add badge
npx shadcn@latest add calendar
```

This will:
- Copy component to `src/components/ui/`
- Add necessary dependencies
- Update imports

### Creating a Custom Hook

```typescript
// src/hooks/use-agents.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_agents')
        .select('*');

      if (error) throw error;
      return data;
    },
  });
}

// Usage in component:
import { useAgents } from "@/hooks/use-agents";

const { data, isLoading, error } = useAgents();
```

### Working with Forms

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

const MyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
};
```

### Using Toast Notifications

```typescript
import { useToast } from "@/hooks/use-toast";

const MyComponent = () => {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: "Success!",
      description: "Your action was successful.",
      variant: "default", // or "destructive"
    });
  };

  return <button onClick={showNotification}>Show Toast</button>;
};
```

---

## Security Considerations

### ⚠️ CRITICAL SECURITY ISSUES

#### 1. Exposed Credentials
**Status:** ❌ CRITICAL
**Location:**
- `/src/integrations/supabase/client.ts` (hardcoded)
- `/.env` (in git repository)

**Risk:**
- Publishable key exposed in source code
- 48+ year key expiration = no rotation
- If RLS not enabled → full database exposure

**Fix Required:**
```typescript
// ❌ Current (BAD):
const SUPABASE_URL = "https://wdlqouqphojcrcmyeuak.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGc...";

// ✅ Fixed (GOOD):
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing Supabase credentials');
}
```

```bash
# Remove .env from git
git rm --cached .env
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# Create .env.local for local development
cp .env .env.local

# Rotate keys in Supabase dashboard
```

#### 2. Row Level Security (RLS)
**Status:** ⚠️ UNKNOWN
**Action Required:**

Verify in Supabase Dashboard that RLS is enabled for all tables:

```sql
-- Check RLS status
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public';

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables
```

Example policies:
```sql
-- Profiles: Users see only their own
CREATE POLICY "Users see own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- AI Agents: Authenticated users only
CREATE POLICY "Authenticated read agents" ON ai_agents
  FOR SELECT TO authenticated USING (true);
```

#### 3. TypeScript Strict Mode
**Status:** ⚠️ DISABLED
**Risk:** Type safety issues, runtime errors

**Recommendation:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Security Best Practices

#### Input Validation
```typescript
// Always validate user input
import * as z from "zod";

const agentSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.enum(['assistant', 'analyzer', 'executor']),
  configuration: z.object({}).passthrough(),
});

// Validate before DB insert
const validated = agentSchema.parse(userInput);
```

#### Error Handling
```typescript
// Don't expose internal errors to users
try {
  const { data, error } = await supabase.from('ai_agents').select();
  if (error) throw error;
} catch (err) {
  console.error('Database error:', err); // Log for debugging
  toast({
    title: "Error",
    description: "Failed to load data. Please try again.", // Generic message
    variant: "destructive",
  });
}
```

#### Authentication (When Implemented)
```typescript
// Check authentication status
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  navigate('/login');
  return;
}

// Verify user role
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

if (profile.role !== 'admin') {
  toast({ title: "Unauthorized", variant: "destructive" });
  return;
}
```

---

## Testing & Quality

### Linting

```bash
# Run ESLint
npm run lint

# Auto-fix issues
npx eslint . --fix
```

**ESLint Configuration:**
- TypeScript ESLint
- React Hooks rules
- React Refresh plugin

### Code Quality Checklist

Before committing:
- [ ] Run `npm run lint` and fix errors
- [ ] Check TypeScript errors: `npx tsc --noEmit`
- [ ] Test in browser (no console errors)
- [ ] Check responsive design (mobile/tablet/desktop)
- [ ] Verify dark mode compatibility
- [ ] Validate forms work correctly
- [ ] Test error states

### Component Testing Pattern

```typescript
// Manual testing checklist for new components:
// 1. Component renders without errors
// 2. Props are properly typed
// 3. Handles loading states
// 4. Handles error states
// 5. Responsive on mobile/tablet/desktop
// 6. Accessible (keyboard navigation, ARIA labels)
// 7. Works in dark mode
```

---

## Deployment

### Build for Production

```bash
# Production build
npm run build

# Output in /dist directory
# - Minified and optimized
# - Source maps generated
# - Assets hashed for cache busting
```

### Lovable Deployment

This project is integrated with Lovable platform:

```bash
# Deploy via Lovable
# 1. Open Lovable project: https://lovable.dev/projects/ad39598f-4c26-4c1c-ac13-4aaf8e40c27a
# 2. Click "Share" → "Publish"
# 3. Deployment is automatic
```

### Environment Variables for Production

Ensure these are set in your hosting platform:

```bash
VITE_SUPABASE_URL=https://wdlqouqphojcrcmyeuak.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[your-key]
VITE_SUPABASE_PROJECT_ID=wdlqouqphojcrcmyeuak
```

### Custom Domain Setup

1. Navigate to Project > Settings > Domains in Lovable
2. Click "Connect Domain"
3. Follow DNS configuration instructions
4. [Documentation](https://docs.lovable.dev/features/custom-domain)

### Deployment Checklist

Before deploying:
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables configured
- [ ] Supabase RLS policies enabled
- [ ] Credentials rotated and secured
- [ ] Error boundaries added
- [ ] Analytics/monitoring configured
- [ ] Test in production-like environment

---

## Troubleshooting

### Common Issues

#### Build Errors

**Issue:** TypeScript errors during build
**Solution:**
```bash
# Check errors
npx tsc --noEmit

# If using loose type checking, temporarily:
# Set "skipLibCheck": true in tsconfig.json
```

**Issue:** Vite build fails
**Solution:**
```bash
# Clear cache
rm -rf node_modules/.vite
rm -rf dist

# Rebuild
npm run build
```

#### Development Server

**Issue:** Hot reload not working
**Solution:**
```bash
# Restart dev server
# Ctrl+C, then:
npm run dev
```

**Issue:** Port 8080 already in use
**Solution:**
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or change port in vite.config.ts
```

#### Supabase Integration

**Issue:** "Missing Supabase credentials"
**Solution:**
```bash
# Verify .env file exists with:
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...

# Restart dev server after adding .env
```

**Issue:** Database queries fail
**Solution:**
```typescript
// Check RLS policies in Supabase Dashboard
// Temporarily disable RLS to test (NOT for production):
// ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;

// Check authentication status:
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);
```

#### UI/Styling Issues

**Issue:** Tailwind classes not applying
**Solution:**
```bash
# Verify file is in Tailwind content path (tailwind.config.ts)
# Restart dev server

# Check for typos in class names
# Use cn() helper for conditional classes
```

**Issue:** Dark mode not working
**Solution:**
```typescript
// Check ThemeProvider is in App.tsx
// Verify next-themes configuration
import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();
```

#### Import Errors

**Issue:** "Cannot find module '@/...'"
**Solution:**
```bash
# Verify path alias in:
# - tsconfig.json
# - vite.config.ts

# Restart TypeScript server in IDE
```

### Debug Mode

```typescript
// Enable React Query DevTools (development)
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>

// Enable Supabase debug logging
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key, {
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' }
  },
  db: {
    schema: 'public'
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    debug: true // Enable auth debug logs
  }
});
```

---

## AI Assistant Guidelines

### When Working with This Codebase

#### DO:
- ✅ Use path aliases (`@/`) for all imports
- ✅ Follow existing naming conventions
- ✅ Use existing shadcn/ui components before creating custom ones
- ✅ Use Tailwind utilities with `cn()` helper
- ✅ Implement proper TypeScript types
- ✅ Add error handling to all data fetching
- ✅ Validate user input with Zod schemas
- ✅ Use React Query for server state
- ✅ Test components in both light and dark modes
- ✅ Check responsive design (mobile/tablet/desktop)

#### DON'T:
- ❌ Modify shadcn/ui components in `/components/ui/` directly
- ❌ Use inline styles (use Tailwind)
- ❌ Hardcode API credentials
- ❌ Commit sensitive data
- ❌ Use relative imports (`../../../`)
- ❌ Create duplicate utility functions
- ❌ Ignore TypeScript errors
- ❌ Skip error handling

### Code Review Checklist

When generating code, verify:
- [ ] TypeScript types are complete and correct
- [ ] Imports use `@/` path alias
- [ ] Error states are handled
- [ ] Loading states are shown
- [ ] Responsive design is considered
- [ ] Dark mode compatibility
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Security (input validation, no exposed credentials)
- [ ] Performance (React Query caching, lazy loading)
- [ ] Follows existing patterns in codebase

### Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # Run linter

# Dependencies
npm install              # Install all dependencies
npm install [package]    # Add new dependency

# Cleanup
rm -rf node_modules      # Remove dependencies
rm -rf dist              # Remove build output
npm install              # Reinstall

# Git
git status               # Check status
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to remote
```

---

## Additional Resources

### Documentation
- **Vite:** https://vitejs.dev/
- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS:** https://tailwindcss.com/
- **shadcn/ui:** https://ui.shadcn.com/
- **React Query:** https://tanstack.com/query/latest
- **React Router:** https://reactrouter.com/
- **Supabase:** https://supabase.com/docs
- **Lovable:** https://docs.lovable.dev/

### Project-Specific Docs
- `/SUPABASE_QUICK_REFERENCE.md` - Supabase integration guide
- `/SUPABASE_INTEGRATION_ANALYSIS.md` - Detailed analysis (1,439 lines)
- `/README.md` - Project overview

### Support
- **GitHub Issues:** [Report issues]
- **Lovable Project:** https://lovable.dev/projects/ad39598f-4c26-4c1c-ac13-4aaf8e40c27a

---

**Last Updated:** 2025-11-17
**Maintainer:** BillyGoat Team
**Version:** 1.0.0

---

## Changelog

### 2025-11-17 - Initial CLAUDE.md Creation
- Created comprehensive AI assistant guide
- Documented codebase structure and conventions
- Added security considerations and warnings
- Included common development tasks
- Added troubleshooting section
