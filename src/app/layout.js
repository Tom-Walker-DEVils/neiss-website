import './globals.css'

import { AnalyticsWrapper } from '@components/analytics'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Credits />
        <AnalyticsWrapper />
      </body>
    </html>
  )
}

function Credits() {
  return (
    <p style={{
      textAlign: 'center',
      fontFamily: 'sans-serif',
      fontSize: '12px',
      padding: '12px',
      color: '#aaa',
    }}>
      <span>App by <strong>s_meeps</strong></span>
      <span> / </span>
      <span>API by <strong>ScottDev</strong></span>
      <span> / </span>
      <span>Data from <a href="https://www.cpsc.gov/cgibin/NEISSQuery/home.aspx" target="_blank" rel="noreferrer"><strong>CPSC</strong></a></span>
      <span> / </span>
      <span><a href="https://discord.gg/NGpC3hhD" target="_blank" rel="noreferrer"><strong>Contact</strong></a></span>
    </p>
  )
}

