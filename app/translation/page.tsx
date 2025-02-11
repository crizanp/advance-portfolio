// app/translate/page.tsx
import TranslationPage from './TranslationPage'
import { metadata } from './metadata'
import { jsonLd } from './metadata'

export { metadata };

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TranslationPage />
    </>
  )
}