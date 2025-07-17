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
import { Textarea } from "@/components/ui/textarea"
import {
  PlusSquare,
  Save,
  X,
  Upload,
  FileText,
  Monitor,
  HardDrive,
  Package,
  MapPin,
  User,
  DollarSign,
  Calendar,
  Key,
  Info,
} from "lucide-react"

export default function ManualEntryPage() {
  // Allgemeine Asset-Informationen
  const [assetName, setAssetName] = useState("")
  const [assetType, setAssetType] = useState("")
  const [status, setStatus] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [model, setModel] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [description, setDescription] = useState("")

  // Standort & Zuweisung
  const [location, setLocation] = useState("")
  const [department, setDepartment] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [ipAddress, setIpAddress] = useState("")
  const [macAddress, setMacAddress] = useState("")

  // Finanzielle & Kaufdetails
  const [purchaseDate, setPurchaseDate] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [supplier, setSupplier] = useState("")
  const [warrantyEnd, setWarrantyEnd] = useState("")

  // Hardware-spezifische Details
  const [operatingSystem, setOperatingSystem] = useState("")
  const [cpu, setCpu] = useState("")
  const [ram, setRam] = useState("")
  const [storage, setStorage] = useState("")

  // Software-spezifische Details
  const [licenseKey, setLicenseKey] = useState("")
  const [licenseType, setLicenseType] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  // Asset-Typ Optionen
  const assetTypes = [
    { value: "hardware", label: "Hardware" },
    { value: "software", label: "Software" },
    { value: "virtual", label: "Virtuell" },
    { value: "consumable", label: "Verbrauchsmaterial" },
    { value: "component", label: "Komponente" },
    { value: "accessory", label: "Zubehör" },
  ]

  // Status Optionen
  const statusOptions = [
    { value: "active", label: "Aktiv" },
    { value: "inactive", label: "Inaktiv" },
    { value: "maintenance", label: "Wartung" },
    { value: "disposed", label: "Ausgemustert" },
  ]

  // Lizenztyp Optionen
  const licenseTypes = [
    { value: "volume", label: "Volumenlizenz" },
    { value: "single", label: "Einzelplatz" },
    { value: "subscription", label: "Abonnement" },
  ]

  // Handler-Funktionen
  const handleSave = () => {
    console.log("Asset wird erstellt...")
    // Hier würde die Asset-Erstellung implementiert werden
  }

  const handleCancel = () => {
    console.log("Erfassung wird abgebrochen...")
    // Hier würde die Navigation zurück implementiert werden
  }

  // Prüfung ob spezifische Details angezeigt werden sollen
  const showSpecificDetails = assetType === "hardware" || assetType === "software"

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
                  <BreadcrumbPage>Manuelle Erfassung</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Neues Asset hinzufügen
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Erfassen Sie alle relevanten Informationen für das neue IT-Asset.
            </p>
          </div>

          {/* Abschnitt 1: Allgemeine Asset-Informationen */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                Allgemeine Asset-Informationen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asset-name" className="text-sm font-medium">
                    Asset-Name *
                  </Label>
                  <Input
                    id="asset-name"
                    placeholder="z.B. Laptop-001"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asset-type" className="text-sm font-medium">
                    Asset-Typ *
                  </Label>
                  <Select value={assetType} onValueChange={setAssetType}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Typ wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status *
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Status wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((statusOption) => (
                        <SelectItem key={statusOption.value} value={statusOption.value}>
                          {statusOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serial-number" className="text-sm font-medium">
                    Seriennummer
                  </Label>
                  <Input
                    id="serial-number"
                    placeholder="z.B. SN123456789"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model" className="text-sm font-medium">
                    Modell
                  </Label>
                  <Input
                    id="model"
                    placeholder="z.B. ThinkPad X1 Carbon"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer" className="text-sm font-medium">
                    Hersteller
                  </Label>
                  <Input
                    id="manufacturer"
                    placeholder="z.B. Lenovo"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Beschreibung
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Zusätzliche Informationen zum Asset..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Abschnitt 2: Standort & Zuweisung */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                Standort & Zuweisung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Standort
                  </Label>
                  <Input
                    id="location"
                    placeholder="z.B. Büro A, Raum 101"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">
                    Abteilung
                  </Label>
                  <Input
                    id="department"
                    placeholder="z.B. IT-Abteilung"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assigned-to" className="text-sm font-medium">
                    Zugewiesen an
                  </Label>
                  <Input
                    id="assigned-to"
                    placeholder="z.B. Max Mustermann"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip-address" className="text-sm font-medium">
                    IP-Adresse
                  </Label>
                  <Input
                    id="ip-address"
                    placeholder="z.B. 192.168.1.100"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mac-address" className="text-sm font-medium">
                    MAC-Adresse
                  </Label>
                  <Input
                    id="mac-address"
                    placeholder="z.B. 00:1B:44:11:3A:B7"
                    value={macAddress}
                    onChange={(e) => setMacAddress(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Abschnitt 3: Finanzielle & Kaufdetails */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                Finanzielle & Kaufdetails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchase-date" className="text-sm font-medium">
                    Kaufdatum
                  </Label>
                  <Input
                    id="purchase-date"
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchase-price" className="text-sm font-medium">
                    Kaufpreis
                  </Label>
                  <div className="relative">
                    <Input
                      id="purchase-price"
                      type="number"
                      placeholder="0.00"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      className="h-10 pl-8"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      €
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier" className="text-sm font-medium">
                    Lieferant
                  </Label>
                  <Input
                    id="supplier"
                    placeholder="z.B. IT-Shop GmbH"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warranty-end" className="text-sm font-medium">
                    Garantie-Ende
                  </Label>
                  <Input
                    id="warranty-end"
                    type="date"
                    value={warrantyEnd}
                    onChange={(e) => setWarrantyEnd(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Abschnitt 4: Spezifische Details (Conditional) */}
          {showSpecificDetails && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  {assetType === "hardware" ? (
                    <HardDrive className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  {assetType === "hardware" ? "Hardware-Details" : "Software-Details"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {assetType === "hardware" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="operating-system" className="text-sm font-medium">
                        Betriebssystem
                      </Label>
                      <Input
                        id="operating-system"
                        placeholder="z.B. Windows 11 Pro"
                        value={operatingSystem}
                        onChange={(e) => setOperatingSystem(e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpu" className="text-sm font-medium">
                        CPU
                      </Label>
                      <Input
                        id="cpu"
                        placeholder="z.B. Intel i7-11370H"
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ram" className="text-sm font-medium">
                        RAM
                      </Label>
                      <Input
                        id="ram"
                        placeholder="z.B. 16 GB DDR4"
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storage" className="text-sm font-medium">
                        Speicher
                      </Label>
                      <Input
                        id="storage"
                        placeholder="z.B. 512 GB SSD"
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                )}

                {assetType === "software" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="license-key" className="text-sm font-medium">
                        Lizenzschlüssel
                      </Label>
                      <Input
                        id="license-key"
                        placeholder="z.B. XXXX-XXXX-XXXX-XXXX"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="license-type" className="text-sm font-medium">
                        Lizenztyp
                      </Label>
                      <Select value={licenseType} onValueChange={setLicenseType}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Lizenztyp wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {licenseTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiry-date" className="text-sm font-medium">
                        Ablaufdatum
                      </Label>
                      <Input
                        id="expiry-date"
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Abschnitt 5: Dateianhänge */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                Anhänge & Dokumente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3" />
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  Dateien hierher ziehen oder klicken zum Hochladen
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  PDF, DOC, DOCX, JPG, PNG bis zu 10MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Aktionsbereich */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t">
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 sm:h-9"
            >
              <PlusSquare className="w-4 h-4" />
              Asset erstellen
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 sm:h-9"
            >
              <X className="w-4 h-4" />
              Abbrechen
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
