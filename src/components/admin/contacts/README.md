# Contact Management Module

This document provides an overview of the implementation of the contact management module in the admin dashboard.

## Features

- View a paginated list of all contacts.
- View the full details of a specific contact.
- Mark a contact as "confirmed".
- Delete a contact.

## File Structure

The following files were created or modified to implement this feature:

- `src/services/api/contactsService.ts`: Contains the API client functions for interacting with the contacts API.
- `src/services/hooks/useContacts.ts`: Provides React Query hooks for fetching and mutating contact data.
- `src/lib/api/queryKeys.ts`: Updated with new query keys for the contacts module.
- `src/components/admin/contacts/hooks/use-contact-crud.ts`: A custom hook to manage the state and logic for the contacts page.
- `src/components/admin/contacts/components/contact-table.tsx`: A component to display the list of contacts with pagination and action buttons.
- `src/components/admin/contacts/components/contact-detail-dialog.tsx`: A dialog component to show the full details of a selected contact.
- `src/components/admin/contacts/components/index.tsx`: The main component for the contact management page, which integrates all the other components and hooks.
- `src/locales/vi/translation.json`: Updated with Vietnamese translations for the new UI elements.
- `src/locales/en/translation.json`: Updated with English translations for the new UI elements.
- `src/routes/admin/_layout/contact.tsx`: The route for the contact management page.
- `src/page/admin/dashboard/admin-contacts/index.tsx`: The page component that renders the `ContactManager`.
- `src/components/layout/sidebar-manager.tsx`: The admin sidebar, which now includes a link to the contact management page.

## How it Works

The contact management page uses a combination of React Query for data fetching and state management, and a custom CRUD hook to handle user interactions. The UI is built with a combination of custom components and components from the `@/components/ui` library.

The `useContactCrud` hook is the core of the feature, managing the state for the current page, the selected contact, and the detail dialog. It also provides functions for confirming and deleting contacts, which are passed down to the `ContactTable` and `ContactDetailDialog` components.

Translations are managed with `i18next` and are stored in the `src/locales` directory.

