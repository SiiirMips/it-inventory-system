"use client"

import * as React from "react"
import {
  AppWindow,
  Archive,
  BarChart2,
  BookOpen,
  Bot,
  ClipboardCheck,
  ClipboardList,
  Command,
  DollarSign,
  FileText,
  Frame,
  Globe,
  HardDrive,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Map,
  MapPin,
  Network,
  Package,
  PieChart,
  PlusSquare,
  Send,
  Server,
  Settings,
  Settings2,
  SquareTerminal,
  UserCog,
  Zap,
  History,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Marvin Blöcher", // Dein Name
    email: "admin@it-inventory-system.com", // Beispiel-E-Mail
    avatar: "/avatars/marvin.jpg", // Denk an ein passendes Bild oder nutze einen Platzhalter
  },
  // Hauptnavigation mit den von uns besprochenen Punkten
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard", // Home-Seite
      icon: LayoutDashboard,
      isActive: true, // Beispiel: Startseite ist aktiv
    },
    {
      title: "Assets",
      url: "/assets", // Oder eine Übersichtsseite für Assets
      icon: Layers, // Ein Icon, das eine Sammlung oder Schichten darstellt
      items: [
        {
          title: "Alle Assets",
          url: "/assets/all",
        },
        {
          title: "Hardware",
          url: "/assets/hardware",
          items: [ // Verschachtelte Unterpunkte für Hardware
            {
              title: "Netzwerk-Scan",
              url: "/assets/hardware/scan",
              icon: Network, // Hier könnten auch spezifische Icons für Sub-Sub-Punkte sein
            },
            {
              title: "Manuelle Erfassung",
              url: "/assets/hardware/manual",
              icon: PlusSquare,
            },
          ]
        },
        {
          title: "Software",
          url: "/assets/software",
          items: [ // Verschachtelte Unterpunkte für Software
            {
              title: "Lizenzen",
              url: "/assets/software/licenses",
              icon: BookOpen, // Oder ein spezifischeres Lizenz-Icon
            },
            {
              title: "Anwendungen",
              url: "/assets/software/applications",
              icon: AppWindow,
            },
          ]
        },
        {
          title: "Verbrauchsmaterialien",
          url: "/assets/consumables",
          icon: Package,
        },
        {
          title: "Virtuelle Assets",
          url: "/assets/virtual",
          icon: Server,
        },
      ],
    },
    {
      title: "Standorte & Organisation",
      url: "/locations",
      icon: MapPin,
      items: [
        {
          title: "Standorte",
          url: "/locations/overview",
        },
        {
          title: "Abteilungen & Teams",
          url: "/locations/departments",
        },
        {
          title: "Benutzer",
          url: "/locations/users",
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
          icon: ClipboardList, // Ein spezifischeres Icon
        },
        {
          title: "Ausmusterung",
          url: "/lifecycle/disposal",
          icon: Archive,
        },
      ],
    },
    {
      title: "Service & Support",
      url: "/support",
      icon: LifeBuoy, // Passt noch ganz gut für Support
      items: [
        {
          title: "Tickets",
          url: "/support/tickets",
          items: [
            {
              title: "Meine Tickets",
              url: "/support/tickets/my",
            },
            {
              title: "Alle offenen Tickets",
              url: "/support/tickets/open",
            },
          ]
        },
        {
          title: "Probleme",
          url: "/support/problems",
          icon: ClipboardCheck, // Ein spezifischeres Icon
        },
        {
          title: "Wissensdatenbank",
          url: "/support/knowledgebase",
          icon: Lightbulb, // Passt gut
        },
      ],
    },
    {
      title: "Finanzen & Verträge",
      url: "/finance",
      icon: DollarSign,
      items: [
        {
          title: "Kostenübersicht",
          url: "/finance/costs",
        },
        {
          title: "Verträge",
          url: "/finance/contracts",
          icon: FileText, // Passt gut
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
          url: "/reports/dashboard-settings", // Vielleicht ein Sub-Punkt, wo das Dashboard konfiguriert werden kann
        },
      ],
    },
    {
      title: "Administration",
      url: "/admin",
      icon: Settings, // Allgemeines Zahnrad-Icon
      items: [
        {
          title: "Benutzer & Rollen",
          url: "/admin/users",
          icon: UserCog, // Passt gut
        },
        {
          title: "Integrationen",
          url: "/admin/integrations",
          icon: Zap, // Symbolisiert Verbindungen
        },
        {
          title: "Systemeinstellungen",
          url: "/admin/settings",
          icon: Globe, // Oder ein anderes spezifisches Einstellungs-Icon
        },
      ],
    },
  ],
  // Die folgenden Strukturen sind aus dem Original-Template und müssen je nach Bedarf angepasst oder entfernt werden
  // Für deine spezifischen "Projekte" könnten das Tags, Custom Groups oder andere Filter sein, die du in "Assets" integrieren könntest.
  // Wenn nicht benötigt, die NavProjects-Komponente anpassen oder entfernen.
  projects: [
    {
      name: "IT-Hardware Rollout Q3",
      url: "#",
      icon: HardDrive, // Habe das Icon passend zur IT gewählt
    },
    {
      name: "Software Lizenz Audit 2025",
      url: "#",
      icon: AppWindow, // Habe das Icon passend zur IT gewählt
    },
    {
      name: "Netzwerkgeräte Upgrade",
      url: "#",
      icon: Network, // Habe das Icon passend zur IT gewählt
    },
  ],
  navSecondary: [ // Kann für allgemeine Links wie Support, Feedback, Dokumentation genutzt werden
    {
      title: "Support & Hilfe",
      url: "/support/help",
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
