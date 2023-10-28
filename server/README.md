# book-tracker



**Testing cookies locally with Apollo Sandbox**
1. Turn on "include cookies" setting in Sandbox connection settings.
2. Include shared header "x-forwarded-proto" = "https" in Sandbox connection settings. 
3. In index.ts:
- app.set("trust proxy", 1);
  const cors = {
    credentials: true,
    origin: "https://studio.apollographql.com",
  };
- in session:
    secure: true,
    sameSite: "none",
- include { cors } in applyMiddleware
