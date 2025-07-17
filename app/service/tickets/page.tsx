"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  TrendingUp,
  Users,
  Activity,
  Settings,
} from "lucide-react"
import Link from "next/link"

interface TicketData {
  id: string
  subject: string
  status: "open" | "in-progress" | "pending" | "closed"
  priority: "high" | "medium" | "low"
  assignedTo?: string
  creator: string
  lastUpdated: string
  createdAt: string
}

export default function Page() {
  // Mock data for dashboard
  const [dashboardStats] = useState({
    totalOpen: 42,
    inProgress: 18,
    newToday: 7,
    closedThisWeek: 23,
  })

  const [myTickets] = useState<TicketData[]>([
    {
      id: "TK-001",
      subject: "Computer läuft langsam",
      status: "in-progress",
      priority: "medium",
      assignedTo: "John Doe",
      creator: "Maria Schmidt",
      lastUpdated: "vor 2 Stunden",
      createdAt: "2024-01-15",
    },
    {
      id: "TK-005",
      subject: "Drucker Verbindungsprobleme",
      status: "open",
      priority: "high",
      assignedTo: "John Doe",
      creator: "Peter Weber",
      lastUpdated: "vor 30 Minuten",
      createdAt: "2024-01-15",
    },
    {
      id: "TK-008",
      subject: "E-Mail Setup erforderlich",
      status: "pending",
      priority: "low",
      assignedTo: "John Doe",
      creator: "Lisa Müller",
      lastUpdated: "vor 1 Tag",
      createdAt: "2024-01-14",
    },
  ])

  const [recentTickets] = useState<TicketData[]>([
    {
      id: "TK-012",
      subject: "Monitor flackert",
      status: "open",
      priority: "medium",
      creator: "Tom Fischer",
      lastUpdated: "vor 15 Minuten",
      createdAt: "2024-01-15",
    },
    {
      id: "TK-011",
      subject: "Software Installation",
      status: "in-progress",
      priority: "low",
      creator: "Anna Wagner",
      lastUpdated: "vor 45 Minuten",
      createdAt: "2024-01-15",
    },
    {
      id: "TK-010",
      subject: "Netzwerk Zugriffsprobleme",
      status: "open",
      priority: "high",
      creator: "Michael Klein",
      lastUpdated: "vor 1 Stunde",
      createdAt: "2024-01-15",
    },
  ])

  const [statusDistribution] = useState({
    open: 42,
    "in-progress": 18,
    pending: 12,
    closed: 128,
  })

  const [priorityDistribution] = useState({
    high: 15,
    medium: 35,
    low: 22,
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "open":
        return "destructive"
      case "in-progress":
        return "default"
      case "pending":
        return "secondary"
      case "closed":
        return "outline"
      default:
        return "default"
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Offen"
      case "in-progress":
        return "In Bearbeitung"
      case "pending":
        return "Wartend"
      case "closed":
        return "Geschlossen"
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Hoch"
      case "medium":
        return "Mittel"
      case "low":
        return "Niedrig"
      default:
        return priority
    }
  }

  const totalTickets = Object.values(statusDistribution).reduce(
    (a, b) => a + b,
    0
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [quickTicketForm, setQuickTicketForm] = useState({
    subject: "",
    priority: "",
    description: "",
  })

  const handleQuickTicketSubmit = () => {
    // Here you would typically send the data to your API
    console.log("Quick ticket created:", quickTicketForm)
    // Reset form and close dialog
    setQuickTicketForm({ subject: "", priority: "", description: "" })
    setIsDialogOpen(false)
    // You could also show a success toast here
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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/service">Service</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Tickets Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Quick Actions */}
          <div className="flex gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Neues Ticket erstellen
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schnell Ticket erstellen</DialogTitle>
                  <DialogDescription>
                    Erstellen Sie ein neues Ticket mit den grundlegenden
                    Informationen.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Betreff</Label>
                    <Input
                      id="subject"
                      placeholder="Kurze Beschreibung des Problems"
                      value={quickTicketForm.subject}
                      onChange={(e) =>
                        setQuickTicketForm({
                          ...quickTicketForm,
                          subject: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priorität</Label>
                    <Select
                      value={quickTicketForm.priority}
                      onValueChange={(value) =>
                        setQuickTicketForm({
                          ...quickTicketForm,
                          priority: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priorität wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Niedrig</SelectItem>
                        <SelectItem value="medium">Mittel</SelectItem>
                        <SelectItem value="high">Hoch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea
                      id="description"
                      placeholder="Detaillierte Beschreibung des Problems"
                      value={quickTicketForm.description}
                      onChange={(e) =>
                        setQuickTicketForm({
                          ...quickTicketForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Link href={`/service/tickets/create?subject=${encodeURIComponent(quickTicketForm.subject)}&description=${encodeURIComponent(quickTicketForm.description)}&priority=${quickTicketForm.priority}`}>
                    <Button variant="outline" className="gap-2 w-full sm:w-auto">
                      <Settings className="h-4 w-4" />
                      Erweiterte Optionen
                    </Button>
                  </Link>
                  <Button
                    onClick={handleQuickTicketSubmit}
                    disabled={!quickTicketForm.subject || !quickTicketForm.priority}
                    className="w-full sm:w-auto"
                  >
                    Ticket erstellen
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Link href="/service/tickets/open">
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Alle Tickets anzeigen
              </Button>
            </Link>
          </div>

          {/* Overview Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Offene Tickets
                </CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.totalOpen}
                </div>
                <p className="text-xs text-muted-foreground">
                  Benötigen Aufmerksamkeit
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  In Bearbeitung
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.inProgress}
                </div>
                <p className="text-xs text-muted-foreground">
                  Werden bearbeitet
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Neue heute</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.newToday}</div>
                <p className="text-xs text-muted-foreground">
                  Seit heute Morgen
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Diese Woche gelöst
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.closedThisWeek}
                </div>
                <p className="text-xs text-muted-foreground">
                  Erfolgreich bearbeitet
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* My Assigned Tickets */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Meine zugewiesenen Tickets
                  </CardTitle>
                  <CardDescription>
                    Tickets, die Ihnen aktuell zugewiesen sind
                  </CardDescription>
                </div>
                <Link href="/service/tickets/my">
                  <Button variant="outline" size="sm">
                    Alle anzeigen
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Betreff</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priorität</TableHead>
                      <TableHead>Zuletzt aktualisiert</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(ticket.status)}>
                            {getStatusLabel(ticket.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
                            {getPriorityLabel(ticket.priority)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {ticket.lastUpdated}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Tickets by Status */}
            <Card>
              <CardHeader>
                <CardTitle>Tickets nach Status</CardTitle>
                <CardDescription>
                  Verteilung aller Tickets im System
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(statusDistribution).map(([status, count]) => (
                  <div key={status} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Badge
                          variant={getStatusBadgeVariant(status)}
                          className="h-2 w-2 p-0"
                        />
                        {getStatusLabel(status)}
                      </span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <Progress value={(count / totalTickets) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tickets by Priority */}
            <Card>
              <CardHeader>
                <CardTitle>Tickets nach Priorität</CardTitle>
                <CardDescription>
                  Nur offene und aktive Tickets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(priorityDistribution).map(([priority, count]) => (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle
                        className={`h-4 w-4 ${
                          priority === "high"
                            ? "text-red-500"
                            : priority === "medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      />
                      <span className="text-sm font-medium">
                        {getPriorityLabel(priority)}
                      </span>
                    </div>
                    <Badge variant={getPriorityBadgeVariant(priority)}>
                      {count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Neueste Tickets
                </CardTitle>
                <CardDescription>
                  Zuletzt erstellte oder aktualisierte Tickets
                </CardDescription>
              </div>
              <Link href="/service/tickets/open">
                <Button variant="outline" size="sm">
                  Alle anzeigen
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Betreff</TableHead>
                    <TableHead>Ersteller</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Zuletzt aktualisiert</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono">{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>{ticket.creator}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(ticket.status)}>
                          {getStatusLabel(ticket.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {ticket.lastUpdated}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
