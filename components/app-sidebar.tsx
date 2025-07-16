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
  Map, // Nicht mehr direkt verwendet, aber behalten, falls noch benötigt
  MapPin, // Nicht mehr direkt verwendet, aber behalten, falls noch benötigt
  Network,
  Package,
  PieChart, // Nicht mehr direkt verwendet, aber behalten, falls noch benötigt
  PlusSquare,
  Send,
  Server,
  Settings, // Für Hauptpunkt "Einstellungen" und "Administration"
  Settings2, // Alternative für Einstellungen
  SquareTerminal, // Nicht mehr direkt verwendet, aber behalten, falls noch benötigt
  UserCog,
  Zap,
  History,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
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
    // "Standorte & Organisation" wurde entfernt, da die Unterpunkte nun unter "Einstellungen" sind
    // {
    //   title: "Standorte & Organisation",
    //   url: "/locations",
    //   icon: MapPin,
    //   items: [
    //     {
    //       title: "Standorte",
    //       url: "/locations/overview",
    //     },
    //     {
    //       title: "Abteilungen & Teams",
    //       url: "/locations/departments",
    //     },
    //     {
    //       title: "Benutzer",
    //       url: "/locations/users",
    //     },
    //   ],
    // },
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
      title: "Einstellungen",
      url: "/settings", // Hauptseite für Einstellungen
      icon: Settings, // Wiederverwendung des Settings-Icons
      items: [
        { title: "Benutzerdefinierte Felder", url: "/settings/custom-fields" },
        { title: "Statusbezeichnungen", url: "/settings/statuslabels" },
        { title: "Asset Modelle", url: "/settings/asset-models" },
        { title: "Kategorien", url: "/settings/categories" },
        { title: "Hersteller", url: "/settings/manufacturers" },
        { title: "Lieferanten", url: "/settings/suppliers" },
        { title: "Abteilungen", url: "/settings/departments" }, // Aus "Standorte & Organisation" verschoben
        { title: "Standorte", url: "/settings/locations" },     // Aus "Standorte & Organisation" verschoben
        { title: "Firmen", url: "/settings/companies" },
      ],
    },


    {
      title: "Administration",
      url: "/admin",
      icon: Settings, // Allgemeines Zahnrad-Icon
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
        <div className="flex items-center justify-center w-full py-4">
          <a href="/dashboard">
            <img 
              src="/logo.svg" 
              alt="IT Inventory System Logo" 
              className="h-18 w-auto" // Stelle sicher, dass logo.svg im public-Ordner ist
            />
          </a>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Hauptnavigation */}
        <NavMain items={data.navMain} />
        
        {/* NavProjects wurde entfernt, da es in der neuen Struktur nicht mehr explizit benötigt wird.
            Wenn du es doch brauchst, musst du es hier wieder einfügen und die data.projects Struktur befüllen. */}
        {/* {data.projects && <NavProjects projects={data.projects} />} */}
        
        {/* Sekundäre Navigation (z.B. Support, Feedback) */}
        {data.navSecondary && <NavSecondary items={data.navSecondary} className="mt-auto" />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
