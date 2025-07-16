"use client"

import { AppSidebar } from "@/components/app-sidebar" // Pfad angepasst von app-sidebar zu sidebar
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader, // CardHeader wird hier nicht direkt verwendet, aber oft nützlich
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Settings,
  Users,
  Shield,
  Database,
  Mail,
  Globe, // Für Netzwerk & Domains, oder Systemeinstellungen
  Key, // Für API & Schlüssel
  FileText, // Für Berichte & Logs, oder Verträge
  Zap, // Für Integrationen
  Clock, // Für Zeitplanung
  Archive, // Für Archivierung
  Bell, // Für Benachrichtigungen
  Palette, // Für Design & Themes
  Download, // Für Import/Export
  Upload, // Für Backup & Restore (Upload für Restore, Download für Backup)
  Monitor, // Für Monitoring
  // NEUE ICONS FÜR DIE ERWEITERTEN PUNKTE
  Settings2, // Alternative für Allgemeine Systemeinstellungen
  Lock, // Für Authentifizierung & Sicherheit (alternativ zu Shield)
  Server, // Für Datenbank & Datenspeicher (alternativ zu Database)
  Scan, // Für Asset-Erkennung & Scan-Profile
  Workflow, // Für Asset-Lifecycle-Workflows
  Scale, // Für Lizenzmanagement-Richtlinien (Waage für Compliance)
  LifeBuoy, // Für Helpdesk & Ticket-Einstellungen (alternativ zu Ticket)
  DollarSign, // Für Finanz- & Vertragsmanagement
  ScrollText, // Für Audit- & Compliance-Protokollierung
  Activity, // Für Systemdiagnose & Monitoring (alternativ zu Monitor)
  Link as LinkIcon, // Für Integrationen, wenn Zap nicht passt
} from "lucide-react"

export default function Page() {
  const adminCards = [
    {
      title: "Allgemeine Systemeinstellungen",
      description: "Globale Konfigurationen für die Anwendung.",
      icon: Settings2, // Angepasstes Icon
      href: "/admin/general-settings",
    },
    {
      title: "Benutzer & Zugriffsverwaltung",
      description: "Erstellung, Verwaltung von Benutzern und deren Berechtigungen.",
      icon: Users,
      href: "/admin/users-access",
    },
    {
      title: "Authentifizierung & Sicherheit",
      description: "SSO, MFA, Passwortrichtlinien und Zugriffskontrollen.",
      icon: Shield, // Oder Lock
      href: "/admin/auth-security",
    },
    {
      title: "Datenbank & Datenspeicher",
      description: "Konfiguration, Backups, Wartung und Datenbereinigung.",
      icon: Database, // Oder Server
      href: "/admin/database-storage",
    },
    {
      title: "Integrationen & APIs",
      description: "Verwaltung von API-Schlüsseln und externen Systemanbindungen.",
      icon: Zap, // Oder LinkIcon
      href: "/admin/integrations-api",
    },
    {
      title: "Automatisierung & Zeitplanung",
      description: "Zeitpläne für Scans, Berichte und automatisierte Tasks.",
      icon: Clock,
      href: "/admin/automation-scheduling",
    },
    {
      title: "Benachrichtigungen & Kommunikation",
      description: "E-Mail-Konfiguration, Benachrichtigungstypen und Vorlagen.",
      icon: Bell, // Oder Mail
      href: "/admin/notifications-comm",
    },
    {
      title: "Benutzeroberfläche & Branding",
      description: "Logo-Upload, Farbschemata und UI-Anpassungen.",
      icon: Palette,
      href: "/admin/ui-branding",
    },
    {
      title: "Berichte & Analysekonfiguration",
      description: "Verwaltung von Berichtsvorlagen und Datenexport-Optionen.",
      icon: FileText, // Oder BarChart2
      href: "/admin/reports-analytics",
    },
    {
      title: "Asset-Erkennung & Scan-Profile",
      description: "Konfiguration von Scan-Methoden, IP-Bereichen und Zeitplänen.",
      icon: Scan, // Neues, passendes Icon
      href: "/admin/asset-discovery",
    },
    {
      title: "Asset-Lifecycle-Workflows",
      description: "Definition von Status-Workflows und Automatisierungen.",
      icon: Workflow, // Neues, passendes Icon
      href: "/admin/lifecycle-workflows",
    },
    {
      title: "Lizenzmanagement-Richtlinien",
      description: "Compliance-Regeln, Lizenztypen und Ablauf-Benachrichtigungen.",
      icon: Scale, // Neues, passendes Icon
      href: "/admin/license-policies",
    },
    {
      title: "Helpdesk- & Ticket-Einstellungen",
      description: "Konfiguration von Ticket-Kategorien, Prioritäten und SLAs.",
      icon: LifeBuoy, // Oder Ticket
      href: "/admin/helpdesk-tickets",
    },
    {
      title: "Finanz- & Vertragsmanagement",
      description: "Währungseinstellungen, Kostenkategorien und Vertragsverwaltung.",
      icon: DollarSign,
      href: "/admin/finance-contracts",
    },
    {
      title: "Audit- & Compliance-Protokollierung",
      description: "Detaillierte Protokollierung von Aktionen und Compliance-Berichte.",
      icon: ScrollText, // Neues, passendes Icon
      href: "/admin/audit-compliance",
    },
    {
      title: "Systemdiagnose & Monitoring",
      description: "Statusanzeigen, Log-Viewer und Performance-Metriken.",
      icon: Monitor, // Oder Activity
      href: "/admin/system-monitoring",
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Administration</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Administration</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminCards.map((card, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => (window.location.href = card.href)}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  {/* Icon wird hier gerendert */}
                  <card.icon className="h-10 w-10 text-muted-foreground mb-3" />
                  <CardTitle className="text-base font-medium mb-2">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
