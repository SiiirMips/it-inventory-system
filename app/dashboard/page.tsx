"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Layers,
  Ticket,
  CalendarMinus,
  Users,
  PlusSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Monitor,
  HardDrive,
  Server,
  Package,
  Activity,
  Clock,
  User,
  ExternalLink,
  AlertCircle,
} from "lucide-react"

export default function DashboardPage() {
  // Mock data for global statistics
  const globalStats = {
    totalAssets: 1247,
    openTickets: 23,
    expiringLicenses: 8,
    activeUsers: 156,
  }

  // Mock data for critical alerts
  const criticalAlerts = [
    {
      id: 1,
      type: "error",
      title: "Server DC-01 offline",
      description: "Produktionsserver nicht erreichbar seit 14:30",
      severity: "high",
    },
    {
      id: 2,
      type: "warning",
      title: "Microsoft Office Lizenz abgelaufen",
      description: "Lizenz für 25 Arbeitsplätze seit 3 Tagen abgelaufen",
      severity: "medium",
    },
    {
      id: 3,
      type: "info",
      title: "Geplante Wartung",
      description: "Netzwerk-Wartung am Samstag 02:00-06:00 Uhr",
      severity: "low",
    },
  ]

  // Mock data for asset distribution
  const assetDistribution = [
    { type: "Hardware", count: 789, percentage: 63 },
    { type: "Software", count: 298, percentage: 24 },
    { type: "Virtuell", count: 89, percentage: 7 },
    { type: "Verbrauchsmaterial", count: 71, percentage: 6 },
  ]

  // Mock data for open tickets
  const openTickets = [
    {
      id: "TKT-001",
      subject: "Laptop-Bildschirm defekt",
      status: "In Bearbeitung",
      priority: "Hoch",
      assignee: "Max Mustermann",
    },
    {
      id: "TKT-002",
      subject: "Software-Installation Anfrage",
      status: "Offen",
      priority: "Niedrig",
      assignee: "Anna Schmidt",
    },
    {
      id: "TKT-003",
      subject: "Netzwerk-Verbindungsprobleme",
      status: "Warten auf Antwort",
      priority: "Mittel",
      assignee: "IT Team",
    },
    {
      id: "TKT-004",
      subject: "Passwort zurücksetzen",
      status: "Offen",
      priority: "Niedrig",
      assignee: "Support Desk",
    },
    {
      id: "TKT-005",
      subject: "Server-Performance Probleme",
      status: "In Bearbeitung",
      priority: "Hoch",
      assignee: "System Admin",
    },
  ]

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Asset HW-LAPTOP-001 aktualisiert",
      user: "Admin",
      timestamp: "vor 5 Minuten",
      type: "update",
    },
    {
      id: 2,
      action: "Neuer Benutzer 'M. Weber' erstellt",
      user: "HR Team",
      timestamp: "vor 12 Minuten",
      type: "create",
    },
    {
      id: 3,
      action: "Ticket #TKT-001 geschlossen",
      user: "Support",
      timestamp: "vor 23 Minuten",
      type: "close",
    },
    {
      id: 4,
      action: "Software-Lizenz verlängert",
      user: "License Manager",
      timestamp: "vor 1 Stunde",
      type: "update",
    },
    {
      id: 5,
      action: "Neue Hardware eingegangen",
      user: "Warehouse",
      timestamp: "vor 2 Stunden",
      type: "create",
    },
  ]

  // Mock data for system health
  const systemHealth = [
    { service: "Datenbank", status: "online", uptime: "99.9%" },
    { service: "Web-Server", status: "online", uptime: "100%" },
    { service: "Scan-Dienst", status: "online", uptime: "98.7%" },
    { service: "Backup-System", status: "warning", uptime: "95.2%" },
    { service: "Mail-Server", status: "online", uptime: "99.8%" },
  ]

  // Helper functions
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "In Bearbeitung": { variant: "default", className: "bg-blue-100 text-blue-800" },
      "Offen": { variant: "secondary", className: "" },
      "Warten auf Antwort": { variant: "outline", className: "bg-yellow-100 text-yellow-800" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: "secondary", className: "" }
    
    return (
      <Badge variant={config.variant as any} className={config.className}>
        {status}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      "Hoch": { variant: "destructive", className: "" },
      "Mittel": { variant: "default", className: "bg-orange-100 text-orange-800" },
      "Niedrig": { variant: "secondary", className: "" },
    }
    const config = priorityConfig[priority as keyof typeof priorityConfig] || { variant: "secondary", className: "" }
    
    return (
      <Badge variant={config.variant as any} className={config.className}>
        {priority}
      </Badge>
    )
  }

  const getSystemStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "offline":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
          {/* Page Title & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Überblick über Ihre IT-Infrastruktur und Systemaktivität
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto">
                <PlusSquare className="w-4 h-4 mr-2" />
                Neues Asset
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Ticket className="w-4 h-4 mr-2" />
                Neues Ticket
              </Button>
            </div>
          </div>

          {/* 1. Global Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Layers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gesamte Assets</p>
                    <p className="text-2xl font-bold">{globalStats.totalAssets.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Ticket className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Offene Tickets</p>
                    <p className="text-2xl font-bold">{globalStats.openTickets}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <CalendarMinus className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Lizenzen bald ablaufend</p>
                    <p className="text-2xl font-bold">{globalStats.expiringLicenses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Aktive Benutzer</p>
                    <p className="text-2xl font-bold">{globalStats.activeUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 2. Critical Alerts */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Kritische Warnungen & Hinweise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalAlerts.map((alert) => (
                <Alert key={alert.id} className={
                  alert.severity === "high" ? "border-red-200 bg-red-50" :
                  alert.severity === "medium" ? "border-yellow-200 bg-yellow-50" :
                  "border-blue-200 bg-blue-50"
                }>
                  <AlertTriangle className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{alert.title}</div>
                    <AlertDescription className="text-sm">
                      {alert.description}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>

          {/* Grid Layout for remaining widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* 3. Asset Distribution */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Assets nach Typ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assetDistribution.map((asset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{asset.type}</span>
                      <span className="text-muted-foreground">{asset.count}</span>
                    </div>
                    <Progress value={asset.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 4. Recent Activities */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Jüngste Systemaktivität
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 text-sm">
                      <div className="p-1 bg-muted rounded-full mt-0.5">
                        <Clock className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{activity.action}</p>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          <User className="w-3 h-3" />
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. System Health */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  System-Gesundheit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemHealth.map((system, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getSystemStatusIcon(system.status)}
                        <span className="font-medium text-sm">{system.service}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Uptime</div>
                        <div className="text-sm font-medium">{system.uptime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 6. Open Tickets Table */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Meine offenen Tickets
                </CardTitle>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Alle Tickets anzeigen
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile: Card-based layout */}
              <div className="block sm:hidden space-y-4">
                {openTickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      <div className="flex gap-2">
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{ticket.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        Zugewiesen an: {ticket.assignee}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Table layout */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Betreff</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priorität</TableHead>
                      <TableHead>Zugewiesen an</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell className="text-muted-foreground">{ticket.assignee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
