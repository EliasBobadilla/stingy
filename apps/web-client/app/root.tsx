import { Outlet } from "react-router";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Stingy Web Client</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body>
        <div id="root">
          <Outlet />
        </div>
      </body>
    </html>
  );
}
