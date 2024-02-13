# Room 302 - Webhook Dev Server

This is a simple Nuxt app to allow the studio to quickly prototype using webhooks. It provides 2 generalized endpoints, one authenticated and one not. The authenticated endpoint is used to test the webhook authentication, and the unauthenticated endpoint is used to test the webhook payload.

This allows the studio to quickly test and prototype webhooks without needing to deploy a new server each time.



https://github.com/room302studio/webhook-dev/assets/530073/a564550b-4895-49b3-b162-b28cb88f0231



## Overview

This server acts as a public interface at webhook-dev.room302.studio, where payloads from various webhook calls can be debugged and inspected in real-time.

## Features

- **Generalized Webhook Endpoint**: A single, catch-all webhook URL to which you can point any service's webhooks for immediate capturing and inspection of payloads.
- **Authenticated Endpoint**: An endpoint requiring authentication, perfect for testing secure webhook interactions.
- **Real-time Payload Inspection**: Webhook payloads are displayed live at webhook-dev.room302.studio for easy access and debugging.
- **History of Payloads**: Access to a log of most recent payloads, aiding in comparisons and tracking changes over time.

## Database
All webhook payloads are added to our supabase webhook__payload table, which is regularly pruned to keep the database size manageable.

### Database Schema
```sql
CREATE TABLE webhook__payload (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  payload jsonb NOT NULL
);
```
