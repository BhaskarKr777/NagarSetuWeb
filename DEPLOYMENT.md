# Deploy NagarSetu to Netlify

This repository is ready to deploy as a React single-page application (SPA).
The hosted demo stores report changes in the visitor's browser using
`localStorage`; it does not attempt to use the local Express JSON database.

## Netlify setup

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Netlify, choose **Add new site** and import the repository.
3. Keep the detected settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `22` (also set by `netlify.toml`)
4. Deploy. The SPA redirect in `netlify.toml` and `public/_redirects` allows
   direct visits to pages such as `/citizen/report`.

## AI service options

Netlify static hosting cannot run `ml_service`, which is a Python FastAPI
process. The deployed site therefore uses the existing browser fallback for
the CivicSight demo by default.

To use the Python classifier in production, deploy `ml_service` to a Python
host such as Render, Railway, Fly.io, or a container platform. Then set the
Netlify environment variable below before deploying:

```text
VITE_ML_API_URL=https://your-ml-service.example.com
```

The URL must permit browser requests from your Netlify site (CORS) and expose
`POST /analyze`. Never put model-provider secrets in `VITE_*` variables.

## Important production limitation

The current Express backend persists to `backend/data/db.json`. Netlify's
serverless filesystem is not durable, so it must not be used as the production
database. The present Netlify demo is intentionally browser-local. For shared
citizen reports, authentication, admin access, and durable data, move the API
to a persistent backend and database before public use.
