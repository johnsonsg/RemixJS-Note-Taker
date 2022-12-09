import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

// Global Style = main.css
import styles from '~/styles/main.css'
import MainNavigation from '~/components/Navigtion/MainNavigation'

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>An error occured.</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className='error'>
          <h1>An error occured.</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
