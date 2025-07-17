"use client"

import * as React from "react"
import { toast } from "sonner"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Save } from "lucide-react"

export default function Page() {
  // Anwendungsbasisinformationen
  const [appName, setAppName] = React.useState("IT Inventory System")
  const [baseUrl, setBaseUrl] = React.useState("https://inventory.company.com")
  
  // Lokalisierung & Zeit
  const [defaultLanguage, setDefaultLanguage] = React.useState("de")
  const [defaultTimezone, setDefaultTimezone] = React.useState("Europe/Berlin")
  const [dateTimeFormat, setDateTimeFormat] = React.useState("DD.MM.YYYY HH:mm")
  const [defaultCurrency, setDefaultCurrency] = React.useState("EUR")
  
  // Benutzeroberfläche & Darstellung
  const [darkMode, setDarkMode] = React.useState(false)
  const [defaultDashboard, setDefaultDashboard] = React.useState("overview")
  const [sessionTimeout, setSessionTimeout] = React.useState("480")
  
  // Wartung & Betriebsmodus
  const [maintenanceMode, setMaintenanceMode] = React.useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = React.useState("Das System befindet sich derzeit in Wartung. Bitte versuchen Sie es später erneut.")
  const [logLevel, setLogLevel] = React.useState("info")
  
  // Datenschutz & Compliance
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = React.useState("")
  const [imprintUrl, setImprintUrl] = React.useState("")
  const [cookieConsent, setCookieConsent] = React.useState(true)

  const handleSave = () => {
    // Hier würde die Speicherlogik implementiert werden
    console.log("Einstellungen gespeichert")
    toast.success("Einstellungen erfolgreich gespeichert!")
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
                  <BreadcrumbLink href="/admin">
                    Administration
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Allgemeine Einstellungen</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Allgemeine Systemeinstellungen</h1>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Einstellungen speichern
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Anwendungsbasisinformationen */}
            <Card>
              <CardHeader>
                <CardTitle>Anwendungsbasisinformationen</CardTitle>
                <CardDescription>
                  Grundlegende Informationen über die Anwendung
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Anwendungsname</Label>
                    <Input
                      id="app-name"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      placeholder="IT Inventory System"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="base-url">Anwendungs-Basis-URL</Label>
                    <Input
                      id="base-url"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="https://inventory.company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Logo-Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Klicken Sie hier oder ziehen Sie ein Logo per Drag & Drop hinein
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG bis zu 2MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lokalisierung & Zeit */}
            <Card>
              <CardHeader>
                <CardTitle>Lokalisierung & Zeit</CardTitle>
                <CardDescription>
                  Einstellungen für Sprache, Zeit und regionale Formate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-language">Standardsprache</Label>
                    <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sprache wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-timezone">Standard-Zeitzone</Label>
                    <Select value={defaultTimezone} onValueChange={setDefaultTimezone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Zeitzone wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Berlin">Europe/Berlin (CET)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="datetime-format">Datum- & Zeitformat</Label>
                    <Select value={dateTimeFormat} onValueChange={setDateTimeFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Format wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD.MM.YYYY HH:mm">DD.MM.YYYY HH:mm</SelectItem>
                        <SelectItem value="MM/DD/YYYY HH:mm">MM/DD/YYYY HH:mm</SelectItem>
                        <SelectItem value="YYYY-MM-DD HH:mm">YYYY-MM-DD HH:mm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-currency">Standardwährung</Label>
                    <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Währung wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CHF">CHF (CHF)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benutzeroberfläche & Darstellung */}
            <Card>
              <CardHeader>
                <CardTitle>Benutzeroberfläche & Darstellung</CardTitle>
                <CardDescription>
                  Einstellungen für das Aussehen und Verhalten der Benutzeroberfläche
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                    <Label htmlFor="dark-mode">Dunkles Theme als Standard</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-dashboard">Standard-Dashboard-Ansicht</Label>
                    <Select value={defaultDashboard} onValueChange={setDefaultDashboard}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ansicht wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overview">Übersicht</SelectItem>
                        <SelectItem value="assets">Asset-Dashboard</SelectItem>
                        <SelectItem value="reports">Berichte</SelectItem>
                        <SelectItem value="analytics">Analysen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Sitzungs-Timeout (Minuten)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      placeholder="480"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wartung & Betriebsmodus */}
            <Card>
              <CardHeader>
                <CardTitle>Wartung & Betriebsmodus</CardTitle>
                <CardDescription>
                  Einstellungen für Wartungsmodus und Systemprotokollierung
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenance-mode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                  <Label htmlFor="maintenance-mode">Wartungsmodus aktivieren</Label>
                </div>
                {maintenanceMode && (
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Wartungsmeldung</Label>
                    <Textarea
                      id="maintenance-message"
                      value={maintenanceMessage}
                      onChange={(e) => setMaintenanceMessage(e.target.value)}
                      placeholder="Nachricht für Benutzer während der Wartung..."
                      rows={3}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="log-level">Standard-Protokollierungsstufe</Label>
                  <Select value={logLevel} onValueChange={setLogLevel}>
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue placeholder="Log-Level wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Datenschutz & Compliance */}
            <Card>
              <CardHeader>
                <CardTitle>Datenschutz & Compliance</CardTitle>
                <CardDescription>
                  Einstellungen für rechtliche Anforderungen und Datenschutz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="privacy-policy">Link zur Datenschutzerklärung</Label>
                    <Input
                      id="privacy-policy"
                      value={privacyPolicyUrl}
                      onChange={(e) => setPrivacyPolicyUrl(e.target.value)}
                      placeholder="https://company.com/privacy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imprint">Link zum Impressum</Label>
                    <Input
                      id="imprint"
                      value={imprintUrl}
                      onChange={(e) => setImprintUrl(e.target.value)}
                      placeholder="https://company.com/imprint"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="cookie-consent"
                    checked={cookieConsent}
                    onCheckedChange={setCookieConsent}
                  />
                  <Label htmlFor="cookie-consent">Cookie-Einwilligungsmanagement aktivieren</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
