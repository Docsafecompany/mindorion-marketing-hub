/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  products?: string
  teamSize?: string
  message?: string
  locale?: string
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <Section style={row}>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value}</Text>
  </Section>
)

const Email = ({
  firstName = '',
  lastName = '',
  email = '',
  company = '',
  products = '',
  teamSize = '',
  message = '',
  locale = 'fr',
}: Props) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Contact'
  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>{`Nouvelle demande de démo : ${fullName}${company ? ` (${company})` : ''}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>MINDORION</Text>
          <Heading style={h1}>Nouvelle demande de démo</Heading>

          <Row label="Prénom" value={firstName || '-'} />
          <Row label="Nom" value={lastName || '-'} />
          <Section style={row}>
            <Text style={rowLabel}>Email</Text>
            <Text style={rowValue}>
              <Link href={`mailto:${email}`} style={link}>
                {email || '-'}
              </Link>
            </Text>
          </Section>
          <Row label="Société" value={company || '-'} />
          <Row label="Produits sélectionnés" value={products || '-'} />
          <Row label="Taille d'équipe" value={teamSize || 'Non précisée'} />

          <Hr style={hr} />

          <Text style={rowLabel}>Message</Text>
          <Text style={messageStyle}>{message || 'Aucun message.'}</Text>

          <Hr style={hr} />
          <Text style={footer}>
            {`Envoyé depuis le formulaire de contact du site Mindorion (langue : ${locale}). Répondez directement à cet email pour joindre le visiteur.`}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Record<string, any>) => {
    const name = [data?.firstName, data?.lastName].filter(Boolean).join(' ') || 'Nouveau contact'
    const company = data?.company ? ` - ${data.company}` : ''
    return `Demande de démo : ${name}${company}`
  },
  displayName: 'Demande de démo (contact)',
  to: 'contact@mindorion.com',
  previewData: {
    firstName: 'Camille',
    lastName: 'Baltaze',
    email: 'camille@exemple.com',
    company: 'Exemple SAS',
    products: 'ProposalIQ, GrowthIQ',
    teamSize: '6-20 personnes',
    message: 'Nous souhaitons une démo de la suite complète.',
    locale: 'fr',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
}

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '32px 28px',
}

const eyebrow = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.22em',
  color: '#534ab7',
  margin: '0 0 8px',
}

const h1 = {
  fontSize: '22px',
  fontWeight: 800,
  color: '#17171a',
  margin: '0 0 24px',
}

const row = {
  margin: '0 0 12px',
}

const rowLabel = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#8a8a92',
  margin: '0 0 2px',
}

const rowValue = {
  fontSize: '15px',
  color: '#17171a',
  margin: '0',
}

const messageStyle = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#17171a',
  whiteSpace: 'pre-wrap' as const,
  margin: '4px 0 0',
}

const link = {
  color: '#534ab7',
  textDecoration: 'underline',
}

const hr = {
  borderColor: '#e8e6e0',
  margin: '24px 0',
}

const footer = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#8a8a92',
  margin: '0',
}
