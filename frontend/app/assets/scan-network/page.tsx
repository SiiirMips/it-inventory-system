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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Download,
  TestTube,
  Save,
  Edit,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

export default function NetworkScanPage() {
  // SNMP State
  const [snmpHost, setSnmpHost] = useState("")
  const [snmpCommunity, setSnmpCommunity] = useState("")
  const [snmpVersion, setSnmpVersion] = useState("")

  // SSH State
  const [sshHost, setSshHost] = useState("")
  const [sshPort, setSshPort] = useState("22")
  const [sshUsername, setSshUsername] = useState("")
  const [sshPassword, setSshPassword] = useState("")
  const [sshKey, setSshKey] = useState("")

  // WMI State
  const [wmiHost, setWmiHost] = useState("")
  const [wmiDomain, setWmiDomain] = useState("")
  const [wmiUsername, setWmiUsername] = useState("")
  const [wmiPassword, setWmiPassword] = useState("")

  // VMware State
  const [vmwareHost, setVmwareHost] = useState("")
  const [vmwareUsername, setVmwareUsername] = useState("")
  const [vmwarePassword, setVmwarePassword] = useState("")

  // LDAP State
  const [ldapHost, setLdapHost] = useState("")
  const [ldapBaseDN, setLdapBaseDN] = useState("")
  const [ldapUsername, setLdapUsername] = useState("")
  const [ldapPassword, setLdapPassword] = useState("")

  // Mock data for configured scans
  const mockScans = [
    {
      id: 1,
      type: "SNMP",
      target: "192.168.1.1",
      lastTested: "2024-01-15 14:30",
      status: "connected",
    },
    {
      id: 2,
      type: "SSH",
      target: "server01.company.com",
      lastTested: "2024-01-15 13:45",
      status: "connected",
    },
    {
      id: 3,
      type: "WMI",
      target: "192.168.1.100-150",
      lastTested: "2024-01-15 12:15",
      status: "failed",
    },
    {
      id: 4,
      type: "VMware",
      target: "vcenter.company.com",
      lastTested: "2024-01-15 11:00",
      status: "connected",
    },
    {
      id: 5,
      type: "LDAP",
      target: "dc01.company.com",
      lastTested: "2024-01-15 10:30",
      status: "testing",
    },
    {
      id: 6,
      type: "SNMP",
      target: "switch01.company.com",
      lastTested: "2024-01-14 16:20",
      status: "failed",
    },
    {
      id: 7,
      type: "SSH",
      target: "192.168.2.50-100",
      lastTested: "2024-01-14 15:45",
      status: "connected",
    },
  ]

  // Placeholder functions
  const handleDownloadAgent = () => {
    console.log("Agent download initiated")
  }

  const handleTestConnection = (type: string) => {
    console.log(`Testing ${type} connection`)
  }

  const handleSaveCredentials = (type: string) => {
    console.log(`Saving ${type} credentials`)
  }

  const handleEditScan = (id: number) => {
    console.log(`Editing scan ${id}`)
  }

  const handleDeleteScan = (id: number) => {
    console.log(`Deleting scan ${id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Verbunden
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Fehlgeschlagen
          </Badge>
        )
      case "testing":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Wird getestet
          </Badge>
        )
      default:
        return <Badge variant="outline">Unbekannt</Badge>
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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/assets">Assets</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Netzwerk-Scan</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
          {/* Page Title - Mobile optimized */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Netzwerk-Scan & Agentenverwaltung
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Verwalten Sie Scan-Agenten und Anmeldedaten für die automatische
              Netzwerk-Inventarisierung.
            </p>
          </div>

          {/* Section 1: Agent Download - Mobile optimized */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  Inventarisierungs-Agent herunterladen
                </span>
              </CardTitle>
              <CardDescription className="text-sm">
                Für Geräte, die nicht agentenlos gescannt werden können, laden Sie
                unseren schlanken Agenten herunter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleDownloadAgent}
                className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 sm:h-9"
              >
                <Download className="w-4 h-4" />
                Agent herunterladen
              </Button>
            </CardContent>
          </Card>

          {/* Section 2: Credential Management - Mobile optimized */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  Anmeldedaten für Scans
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Ihre Anmeldedaten werden sicher verschlüsselt gespeichert und nur
                  für die Netzwerk-Scans verwendet. Eine detaillierte Beschreibung
                  unserer Sicherheitsmaßnahmen finden Sie in den Systemeinstellungen.
                </AlertDescription>
              </Alert>

              <Tabs defaultValue="snmp" className="w-full">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-auto">
                  <TabsTrigger value="snmp" className="text-xs sm:text-sm py-2">
                    SNMP
                  </TabsTrigger>
                  <TabsTrigger value="ssh" className="text-xs sm:text-sm py-2">
                    SSH
                  </TabsTrigger>
                  <TabsTrigger value="wmi" className="text-xs sm:text-sm py-2">
                    WMI
                  </TabsTrigger>
                  <TabsTrigger
                    value="vmware"
                    className="text-xs sm:text-sm py-2 col-span-1 sm:col-span-1"
                  >
                    VMware
                  </TabsTrigger>
                  <TabsTrigger
                    value="ldap"
                    className="text-xs sm:text-sm py-2 col-span-2 sm:col-span-1"
                  >
                    LDAP/AD
                  </TabsTrigger>
                </TabsList>

                {/* SNMP Tab - Mobile optimized */}
                <TabsContent value="snmp" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="snmp-host"
                        className="text-sm font-medium"
                      >
                        Host/IP
                      </Label>
                      <Input
                        id="snmp-host"
                        placeholder="192.168.1.1"
                        value={snmpHost}
                        onChange={(e) => setSnmpHost(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="snmp-community"
                        className="text-sm font-medium"
                      >
                        Community String
                      </Label>
                      <Input
                        id="snmp-community"
                        placeholder="public"
                        value={snmpCommunity}
                        onChange={(e) => setSnmpCommunity(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="snmp-version"
                        className="text-sm font-medium"
                      >
                        SNMP Version
                      </Label>
                      <Select
                        value={snmpVersion}
                        onValueChange={setSnmpVersion}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Version wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1">v1</SelectItem>
                          <SelectItem value="v2c">v2c</SelectItem>
                          <SelectItem value="v3">v3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection("SNMP")}
                      className="w-full sm:w-auto h-10"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Verbindung testen
                    </Button>
                    <Button
                      onClick={() => handleSaveCredentials("SNMP")}
                      className="w-full sm:w-auto h-10"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Speichern
                    </Button>
                  </div>
                </TabsContent>

                {/* SSH Tab - Mobile optimized */}
                <TabsContent value="ssh" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="ssh-host"
                        className="text-sm font-medium"
                      >
                        Host/IP
                      </Label>
                      <Input
                        id="ssh-host"
                        placeholder="server01.company.com"
                        value={sshHost}
                        onChange={(e) => setSshHost(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="ssh-port"
                        className="text-sm font-medium"
                      >
                        Port
                      </Label>
                      <Input
                        id="ssh-port"
                        type="number"
                        placeholder="22"
                        value={sshPort}
                        onChange={(e) => setSshPort(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="ssh-username"
                        className="text-sm font-medium"
                      >
                        Benutzername
                      </Label>
                      <Input
                        id="ssh-username"
                        placeholder="admin"
                        value={sshUsername}
                        onChange={(e) => setSshUsername(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="ssh-password"
                        className="text-sm font-medium"
                      >
                        Passwort
                      </Label>
                      <Input
                        id="ssh-password"
                        type="password"
                        value={sshPassword}
                        onChange={(e) => setSshPassword(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="ssh-key"
                        className="text-sm font-medium"
                      >
                        SSH Key (alternativ zum Passwort)
                      </Label>
                      <Textarea
                        id="ssh-key"
                        placeholder="-----BEGIN PRIVATE KEY-----"
                        value={sshKey}
                        onChange={(e) => setSshKey(e.target.value)}
                        rows={4}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection("SSH")}
                      className="w-full sm:w-auto h-10"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Verbindung testen
                    </Button>
                    <Button
                      onClick={() => handleSaveCredentials("SSH")}
                      className="w-full sm:w-auto h-10"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Speichern
                    </Button>
                  </div>
                </TabsContent>

                {/* WMI Tab - Mobile optimized */}
                <TabsContent value="wmi" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="wmi-host"
                        className="text-sm font-medium"
                      >
                        Host/IP
                      </Label>
                      <Input
                        id="wmi-host"
                        placeholder="192.168.1.100"
                        value={wmiHost}
                        onChange={(e) => setWmiHost(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="wmi-domain"
                        className="text-sm font-medium"
                      >
                        Domain (optional)
                      </Label>
                      <Input
                        id="wmi-domain"
                        placeholder="COMPANY"
                        value={wmiDomain}
                        onChange={(e) => setWmiDomain(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="wmi-username"
                        className="text-sm font-medium"
                      >
                        Benutzername
                      </Label>
                      <Input
                        id="wmi-username"
                        placeholder="administrator"
                        value={wmiUsername}
                        onChange={(e) => setWmiUsername(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="wmi-password"
                        className="text-sm font-medium"
                      >
                        Passwort
                      </Label>
                      <Input
                        id="wmi-password"
                        type="password"
                        value={wmiPassword}
                        onChange={(e) => setWmiPassword(e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection("WMI")}
                      className="w-full sm:w-auto h-10"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Verbindung testen
                    </Button>
                    <Button
                      onClick={() => handleSaveCredentials("WMI")}
                      className="w-full sm:w-auto h-10"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Speichern
                    </Button>
                  </div>
                </TabsContent>

                {/* VMware Tab - Mobile optimized */}
                <TabsContent value="vmware" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="vmware-host"
                        className="text-sm font-medium"
                      >
                        vCenter/ESXi Host/IP
                      </Label>
                      <Input
                        id="vmware-host"
                        placeholder="vcenter.company.com"
                        value={vmwareHost}
                        onChange={(e) => setVmwareHost(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="vmware-username"
                        className="text-sm font-medium"
                      >
                        Benutzername
                      </Label>
                      <Input
                        id="vmware-username"
                        placeholder="administrator@vsphere.local"
                        value={vmwareUsername}
                        onChange={(e) => setVmwareUsername(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="vmware-password"
                        className="text-sm font-medium"
                      >
                        Passwort
                      </Label>
                      <Input
                        id="vmware-password"
                        type="password"
                        value={vmwarePassword}
                        onChange={(e) => setVmwarePassword(e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection("VMware")}
                      className="w-full sm:w-auto h-10"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Verbindung testen
                    </Button>
                    <Button
                      onClick={() => handleSaveCredentials("VMware")}
                      className="w-full sm:w-auto h-10"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Speichern
                    </Button>
                  </div>
                </TabsContent>

                {/* LDAP Tab - Mobile optimized */}
                <TabsContent value="ldap" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="ldap-host"
                        className="text-sm font-medium"
                      >
                        Domain Controller/IP
                      </Label>
                      <Input
                        id="ldap-host"
                        placeholder="dc01.company.com"
                        value={ldapHost}
                        onChange={(e) => setLdapHost(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="ldap-basedn"
                        className="text-sm font-medium"
                      >
                        Base DN
                      </Label>
                      <Input
                        id="ldap-basedn"
                        placeholder="DC=company,DC=com"
                        value={ldapBaseDN}
                        onChange={(e) => setLdapBaseDN(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="ldap-username"
                        className="text-sm font-medium"
                      >
                        Benutzername
                      </Label>
                      <Input
                        id="ldap-username"
                        placeholder="service@company.com"
                        value={ldapUsername}
                        onChange={(e) => setLdapUsername(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="ldap-password"
                        className="text-sm font-medium"
                      >
                        Passwort
                      </Label>
                      <Input
                        id="ldap-password"
                        type="password"
                        value={ldapPassword}
                        onChange={(e) => setLdapPassword(e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection("LDAP")}
                      className="w-full sm:w-auto h-10"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Verbindung testen
                    </Button>
                    <Button
                      onClick={() => handleSaveCredentials("LDAP")}
                      className="w-full sm:w-auto h-10"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Speichern
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Section 3: Scan Overview & Status - Mobile optimized */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Konfigurierte Scans & Status
              </CardTitle>
              <CardDescription className="text-sm">
                Übersicht über alle konfigurierten Netzwerk-Scans und deren aktueller
                Status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mobile: Card-based layout */}
              <div className="block sm:hidden space-y-4">
                {mockScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{scan.type}</span>
                        {getStatusBadge(scan.status)}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditScan(scan.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteScan(scan.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Ziel: </span>
                        <span>{scan.target}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Zuletzt getestet: {scan.lastTested}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Table layout */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Typ</TableHead>
                      <TableHead>Ziel</TableHead>
                      <TableHead>Zuletzt getestet</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockScans.map((scan) => (
                      <TableRow key={scan.id}>
                        <TableCell className="font-medium">{scan.type}</TableCell>
                        <TableCell>{scan.target}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {scan.lastTested}
                        </TableCell>
                        <TableCell>{getStatusBadge(scan.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditScan(scan.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteScan(scan.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
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
