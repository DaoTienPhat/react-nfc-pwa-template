# Deployment Guide (Vercel + Environment Variables)

This project uses **environment variables (.env)** for configuration. Because `.env` files are **not uploaded to GitHub or Vercel automatically**, you must manually configure them when deploying.

---

# 1. Install Dependencies

```bash
npm install
```

---

# 2. Run Locally

Create a `.env` file in the project root:

```
VITE_API_URL=
VITE_TOKEN=
BLOB_READ_WRITE_TOKEN=
```

Then run:

```bash
npm run dev
```

---

# 3. Important Notes

* `.env` is ignored by git for security
* secrets should NEVER be committed
* Vercel requires variables to be added manually

Example `.gitignore`:

```
.env
```

---

# 4. Deploying to Vercel

## Step 1

Go to the Vercel dashboard.

## Step 2

Open your project.

## Step 3

Navigate to:

```
Settings → Environment Variables
```

## Step 4

Add the variables from your `.env` file.

Example:

| Variable              | Example Value                                      |
| --------------------- | -------------------------------------------------- |
| VITE_VERCEL_BLOB_PREFIX | your_vercel_prefix_url                                    |

Select environments:

* Production
* Preview
* Development

Then click **Save**.

---

# 5. Redeploy the Project

After adding environment variables, redeploy the project.

From the dashboard:

```
Deployments → Redeploy
```

or via CLI:

```bash
vercel --prod
```

---

# 6. Access Variables in Code (Vite)

Vite only exposes variables that start with `VITE_`.

Example usage:

```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

# 7. Security Reminder

Never expose private keys or tokens to the frontend unless they are meant to be public.

Keep sensitive variables server-side whenever possible.

---

# Summary

1. Create `.env` locally
2. Do NOT commit `.env`
3. Add variables in Vercel dashboard
4. Redeploy project
5. Access variables using `import.meta.env`
