# Component Documentation Overview

This file aggregates the documentation for all reusable UI components in the project. Each section provides a brief description, the props (if any), and an example of how to use the component.

## ArtikelPage
**Purpose**: Displays a full article page with its content, author information, and related actions.
**Props**: None – the component fetches article data internally based on the route parameter.
**Usage**:
```tsx
<ArtikelPage />
```

## Footer
**Purpose**: Renders the site footer with copyright information and optional links.
**Props**: None – the component uses static content defined within the file.
**Usage**:
```tsx
<Footer />
```

## Jumbotron
**Purpose**: Displays a large banner section typically used for hero content, including title, subtitle, and optional call‑to‑action buttons.
**Props**: None – the component renders static content defined within the file.
**Usage**:
```tsx
<Jumbotron />
```

## JumbotronPage
**Purpose**: Renders a full‑page hero section that typically includes a large background image, headline, and call‑to‑action. It is used on landing or marketing pages.
**Props**: None – the component uses static content defined within the file.
**Usage**:
```tsx
<JumbotronPage />
```

## ModalArticle
**Purpose**: Displays a modal dialog containing article details and actions such as sharing or bookmarking.
**Props**: None – the component internally manages its visibility and content based on context or state.
**Usage**:
```tsx
<ModalArticle />
```

## ModalKegiatan
**Purpose**: Shows a modal dialog with details about a specific activity (kegiatan). It typically includes the activity title, description, date, and actions such as register or view more.
**Props**: None – the component manages its own state and fetches data based on context or route parameters.
**Usage**:
```tsx
<ModalKegiatan />
```

## NavigationBar
**Purpose**: Provides the top navigation bar for the application, including links to major sections, user profile access, and responsive menu handling.
**Props**: None – the component derives navigation items from static configuration or context.
**Usage**:
```tsx
<NavigationBar />
```

## navItem
**Purpose**: Represents a single navigation link item used inside the navigation bar or sidebar. It handles active state styling and routing.
**Props**: None – the component internally uses Next.js `Link` and context to determine the current route.
**Usage**:
```tsx
<navItem />
```

## SectionLogin
**Purpose**: Displays the login form for users to authenticate. It includes fields for email/username and password, validation, and a submit button.
**Props**: None – the component manages its own form state and handles submission via context or API calls.
**Usage**:
```tsx
<SectionLogin />
```

## SectionProfil
**Purpose**: Displays the user profile section, showing personal information, avatar, and links to edit profile or logout.
**Props**: None – the component pulls user data from context or a global store.
**Usage**:
```tsx
<SectionProfil />
```

## Sidebar
**Purpose**: Provides a collapsible side navigation panel used on admin or dashboard pages. It contains links to major sections and can be toggled open/closed.
**Props**: None – the component uses static navigation items defined within the file or from a configuration context.
**Usage**:
```tsx
<Sidebar />
```

## UnderMaintenance
**Purpose**: Shows a full‑page maintenance notice when the site is undergoing updates or downtime.
**Props**: None – the component renders static content with optional styling.
**Usage**:
```tsx
<UnderMaintenance />
```

## VisitorTracker
**Purpose**: Tracks and displays visitor statistics or logs. It may render a simple counter or a more detailed dashboard.
**Props**: None – the component fetches data from an API or context.
**Usage**:
```tsx
<VisitorTracker />
```
