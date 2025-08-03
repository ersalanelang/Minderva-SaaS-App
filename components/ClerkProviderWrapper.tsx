'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark, neobrutalism } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
//import 'clerk-themez/themes/moonlitflux.css';

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null // prevent hydration mismatch

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        variables: { colorPrimary: '#fe5933' },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
