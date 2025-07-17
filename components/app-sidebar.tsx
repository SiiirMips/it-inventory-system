"use client"

import { LucideIcon } from "lucide-react"

type NavItem = {
  title: string
  url?: string
  icon?: LucideIcon
  isActive?: boolean
  items?: NavItem[]
}

type NavMainProps = {
  items: {
    title: string
    items: NavItem[]
  }[]
}

import * as React from "react"
import {
  AppWindow,
  Archive,
  BarChart2,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Command,
  DollarSign,
  FileText,
  HardDrive,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Network,
  Package,
  PlusSquare,
  Send,
  Server,
  Settings,
  Settings2,
  Zap,
  History,
  Laptop,
  MonitorDot,
  Router,
  Printer,
  Phone,
  Mouse,
  Cpu,
  LogOut,
  LogIn,
  Ticket,
  UserCheck,
  Bug,
  GitPullRequest,
  MessageSquare,
  Clock,
  ScrollText,
  Monitor,
  ListFilter,
  ToolCase,
  SquareStack,
  Pencil,
  Trash2,
  Copy,
  CheckSquare,
  Clipboard,
  Eye,
  PencilRuler,
  Gauge,
  Shield,
  Key,
  Mail,
  Globe,
  Download,
  Upload,
  Activity,
  Scale,
  Workflow,
  UserCog,
  Database,
  Bell,
  Palette,
  Scan,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Marvin Blöcher",
    email: "admin@it-inventory-system.com",
    avatar: "/avatars/marvin.jpg",
  },
  navMain: [
    // Abteil 1: Plattform-Übersicht
    {
      title: "Plattform-Übersicht",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          isActive: true,
        },
      ],
    },
    // Abteil 2: Asset Management
    {
      title: "Asset Management",
      items: [
        {
          title: "Bestandsübersicht",
          url: "/assets",
          icon: Layers,
          items: [
            {
              title: "Alle Assets",
              url: "/assets/all",
            },
            {
              title: "Computer",
              url: "/assets/hardware/computers",
              icon: Laptop,
            },
            {
              title: "Monitore",
              url: "/assets/hardware/monitors",
              icon: MonitorDot,
            },
            {
              title: "Netzwerkgeräte",
              url: "/assets/hardware/network-devices",
              icon: Router,
            },
            {
              title: "Drucker",
              url: "/assets/hardware/printers",
              icon: Printer,
            },
            {
              title: "Telefone",
              url: "/assets/hardware/phones",
              icon: Phone,
            },
            {
              title: "Sonstige Hardware",
              url: "/assets/hardware/other",
              icon: HardDrive,
            },
            {
              title: "Software",
              url: "/assets/software",
              icon: AppWindow,
              items: [
                {
                  title: "Lizenzen",
                  url: "/assets/software/licenses",
                  icon: BookOpen,
                },
                {
                  title: "Anwendungen",
                  url: "/assets/software/applications",
                  icon: AppWindow,
                },
              ],
            },
            {
              title: "Virtuelle Assets",
              url: "/assets/virtual",
              icon: Server,
            },
            {
              title: "Zubehör",
              url: "/assets/accessories",
              icon: Mouse,
            },
            {
              title: "Verbrauchsmaterialien",
              url: "/assets/consumables",
              icon: Package,
            },
            {
              title: "Komponenten",
              url: "/assets/components",
              icon: Cpu,
            },
          ],
        },
        {
          title: "Asset-Operationen",
          url: "/assets/operations",
          icon: ToolCase,
          items: [
            {
              title: "Asset zuweisen/ausgeben",
              url: "/assets/checkout",
              icon: LogOut,
            },
            {
              title: "Asset zurücknehmen/einlagern",
              url: "/assets/checkin",
              icon: LogIn,
            },
            {
              title: "Netzwerk-Scan",
              url: "/assets/scan-network",
              icon: Network,
            },
            {
              title: "Manuelle Erfassung",
              url: "/assets/manual-entry",
              icon: PlusSquare,
            },
            {
              title: "QR-Label Generator",
              url: "/admin/qr-labels",
              icon: Clipboard,
            },
          ],
        },
        {
          title: "Lifecycle & Wartung",
          url: "/lifecycle",
          icon: History,
          items: [
            {
              title: "Beschaffung",
              url: "/lifecycle/procurement",
            },
            {
              title: "Wartung & Reparatur",
              url: "/lifecycle/maintenance",
            },
            {
              title: "Audits & Compliance",
              url: "/lifecycle/audits",
              icon: ClipboardList,
            },
            {
              title: "Ausmusterung",
              url: "/lifecycle/disposal",
              icon: Archive,
            },
          ],
        },
      ],
    },
    // Abteil 3: Service & Support
    {
      title: "Service & Support",
      items: [
        {
          title: "Dashboard",
          url: "/support/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Ticket-Verwaltung",
          url: "/support/tickets",
          icon: Ticket,
          items: [
            {
              title: "Alle Tickets",
              url: "/support/tickets/overview",
              icon: ListFilter,
            },
            {
              title: "Meine Tickets",
              url: "/support/tickets/my",
            },
            {
              title: "Zugewiesene Tickets",
              url: "/support/tickets/assigned",
              icon: UserCheck,
            },
            {
              title: "Offene Tickets",
              url: "/support/tickets/open",
            },
            {
              title: "Neues Ticket erstellen",
              url: "/support/tickets/create",
              icon: PlusSquare,
            },
          ],
        },
        {
          title: "ITSM-Prozesse",
          url: "/support/itsm-processes",
          icon: Workflow,
          items: [
            {
              title: "Problem Management",
              url: "/support/problems",
              icon: Bug,
            },
            {
              title: "Change Management",
              url: "/support/changes",
              icon: GitPullRequest,
            },
            {
              title: "Wissensdatenbank",
              url: "/support/knowledgebase",
              icon: Lightbulb,
            },
            {
              title: "Servicekatalog",
              url: "/support/service-catalog",
              icon: ClipboardList,
            },
            {
              title: "Automatisierung",
              url: "/support/automation",
              icon: Zap,
            },
            {
              title: "SLA Management",
              url: "/support/sla",
              icon: Clock,
            },
            {
              title: "Kommunikation",
              url: "/support/communication",
              icon: MessageSquare,
            },
          ],
        },
        {
          title: "Einstellungen (Support)",
          url: "/support/settings",
          icon: Settings2,
          items: [
            {
              title: "Ticket-Kategorien",
              url: "/support/settings/categories",
            },
            {
              title: "Ticket-Status",
              url: "/support/settings/statuses",
            },
            {
              title: "Prioritäten",
              url: "/support/settings/priorities",
            },
            {
              title: "Benutzerdefinierte Ticket-Felder",
              url: "/support/settings/custom-fields",
            },
            {
              title: "Benachrichtigungseinstellungen",
              url: "/support/settings/notifications",
            },
          ],
        },
      ],
    },
    // Abteil 4: Finanzen & Compliance
    {
      title: "Finanzen & Compliance",
      items: [
        {
          title: "Kosten & Verträge",
          url: "/finance",
          icon: DollarSign,
          items: [
            {
              title: "Kostenübersicht",
              url: "/finance/costs",
            },
            {
              title: "Vertragsmanagement",
              url: "/finance/contracts",
              icon: FileText,
            },
          ],
        },
        {
          title: "Berichte & Analyse",
          url: "/reports",
          icon: BarChart2,
          items: [
            {
              title: "Standardberichte",
              url: "/reports/standard",
            },
            {
              title: "Benutzerdefinierte Berichte",
              url: "/reports/custom",
            },
            {
              title: "Trend-Analysen",
              url: "/reports/trends",
            },
            {
              title: "Dashboard-Anpassung",
              url: "/reports/dashboard-settings",
            },
          ],
        },
        {
          title: "Audits & Protokolle",
          url: "/audits-logs",
          icon: ScrollText,
          items: [
            {
              title: "Audit-Trails",
              url: "/audits-logs/audit-trails",
            },
            {
              title: "Systemprotokolle",
              url: "/audits-logs/system-logs",
            },
            {
              title: "Compliance-Berichte",
              url: "/audits-logs/compliance-reports",
            },
          ],
        },
      ],
    },
    // Abteil 5: Administration & Konfiguration
    {
      title: "Administration & Konfiguration",
      items: [
        {
          title: "Admin-Dashboard",
          url: "/admin",
          icon: Settings,
        },
        {
          title: "Systemeinstellungen",
          url: "/settings/general",
          icon: Settings2,
          items: [
            {
              title: "Allgemeine Einstellungen",
              url: "/admin/general-settings",
            },
            {
              title: "Benutzer & Rollen",
              url: "/admin/users-access",
              icon: UserCog,
            },
            {
              title: "Authentifizierung & Sicherheit",
              url: "/admin/auth-security",
              icon: Shield,
            },
            {
              title: "Datenbank & Datenspeicher",
              url: "/admin/database-storage",
              icon: Database,
            },
            {
              title: "Integrationen & APIs",
              url: "/admin/integrations-api",
              icon: Zap,
            },
            {
              title: "Automatisierung & Zeitplanung",
              url: "/admin/automation-scheduling",
              icon: Clock,
            },
            {
              title: "Benachrichtigungen & Kommunikation",
              url: "/admin/notifications-comm",
              icon: Bell,
            },
            {
              title: "Benutzeroberfläche & Branding",
              url: "/admin/ui-branding",
              icon: Palette,
            },
            {
              title: "Berichte & Analysekonfiguration",
              url: "/admin/reports-analytics",
              icon: BarChart2,
            },
            {
              title: "Asset-Erkennung & Scan-Profile",
              url: "/admin/asset-discovery",
              icon: Scan,
            },
            {
              title: "Asset-Lifecycle-Workflows",
              url: "/admin/lifecycle-workflows",
              icon: Workflow,
            },
            {
              title: "Lizenzmanagement-Richtlinien",
              url: "/admin/license-policies",
              icon: Scale,
            },
            {
              title: "Audit- & Compliance-Protokollierung",
              url: "/admin/audit-compliance",
              icon: ScrollText,
            },
            {
              title: "Systemdiagnose & Monitoring",
              url: "/admin/system-monitoring",
              icon: Monitor,
            },
            {
              title: "Import/Export",
              url: "/admin/import-export",
              icon: Download,
            },
            {
              title: "Backup & Restore",
              url: "/admin/backup-restore",
              icon: Upload,
            },
          ],
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support & Hilfe",
      url: "/service/tickets",
      icon: LifeBuoy,
    },
    {
      title: "Feedback geben",
      url: "/feedback",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center w-full py-4">
          <a href="/dashboard">
            <img 
              src="/logo.svg" 
              alt="IT Inventory System Logo" 
              className="h-12 w-auto"
            />
          </a>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {data.navSecondary && <NavSecondary items={data.navSecondary} className="mt-auto" />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

