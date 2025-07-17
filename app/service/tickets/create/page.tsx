"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Upload,
  X,
  Plus,
  Monitor,
  Printer,
  Smartphone,
  Laptop,
  Server,
  Router,
  Save,
  Send,
  AlertTriangle,
  Clock,
  Users,
  Bell,
  Link as LinkIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Asset {
  id: string
  name: string
  type: "desktop" | "laptop" | "printer" | "server" | "router" | "mobile"
  serialNumber: string
  location: string
  user?: string
}

interface TicketForm {
  subject: string
  description: string
  priority: string
  category: string
  subcategory: string
  assignedTo: string
  requester: string
  location: string
  linkedAssets: Asset[]
  tags: string[]
  dueDate: string
  estimatedHours: string
  slaLevel: string
  escalationLevel: string
  notifyStakeholders: boolean
  allowSelfService: boolean
  requireApproval: boolean
  attachments: File[]
  customFields: Record<string, string>
}

export default function Page() {
  const searchParams = useSearchParams()
  
  const [form, setForm] = useState<TicketForm>({
    subject: searchParams?.get('subject') || '',
    description: searchParams?.get('description') || '',
    priority: searchParams?.get('priority') || '',
    category: '',
    subcategory: '',
    assignedTo: '',
    requester: '',
    location: '',
    linkedAssets: [],
    tags: [],
    dueDate: '',
    estimatedHours: '',
    slaLevel: '',
    escalationLevel: '',
    notifyStakeholders: true,
    allowSelfService: false,
    requireApproval: false,
    attachments: [],
    customFields: {},
  })

  const [openAssetPopover, setOpenAssetPopover] = useState(false)
  const [openAssigneePopover, setOpenAssigneePopover] = useState(false)
  const [currentTag, setCurrentTag] = useState('')
  
  // Mock data
  const [assets] = useState<Asset[]>([
    { id: '1', name: 'PC-001', type: 'desktop', serialNumber: 'SN001', location: 'Büro 1.01', user: 'Max Mustermann' },
    { id: '2', name: 'LT-005', type: 'laptop', serialNumber: 'SN005', location: 'Büro 2.15', user: 'Anna Schmidt' },
    { id: '3', name: 'PR-010', type: 'printer', serialNumber: 'SN010', location: 'Flur 1. OG' },
    { id: '4', name: 'SV-001', type: 'server', serialNumber: 'SN100', location: 'Serverraum' },
    { id: '5', name: 'RT-003', type: 'router', serialNumber: 'SN030', location: 'IT-Raum' },
  ])

  const [assignees] = useState([
    { id: '1', name: 'John Doe', role: 'IT-Support L1' },
    { id: '2', name: 'Jane Smith', role: 'IT-Support L2' },
    { id: '3', name: 'Mike Johnson', role: 'System Administrator' },
    { id: '4', name: 'Sarah Wilson', role: 'Network Specialist' },
  ])

  const categories = {
    'hardware': ['Desktop PC', 'Laptop', 'Drucker', 'Monitor', 'Peripheriegeräte'],
    'software': ['Office-Programme', 'Betriebssystem', 'Anwendungssoftware', 'Lizenzen'],
    'network': ['Internet-Verbindung', 'WLAN', 'VPN', 'E-Mail', 'Server-Zugriff'],
    'security': ['Passwort-Reset', 'Zugriffsrechte', 'Malware', 'Phishing'],
    'request': ['Neue Hardware', 'Software-Installation', 'Benutzer-Account', 'Berechtigung'],
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'desktop': return <Monitor className="h-4 w-4" />
      case 'laptop': return <Laptop className="h-4 w-4" />
      case 'printer': return <Printer className="h-4 w-4" />
      case 'server': return <Server className="h-4 w-4" />
      case 'router': return <Router className="h-4 w-4" />
      case 'mobile': return <Smartphone className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  const handleAssetSelection = (asset: Asset) => {
    if (!form.linkedAssets.find(a => a.id === asset.id)) {
      setForm({
        ...form,
        linkedAssets: [...form.linkedAssets, asset]
      })
    }
    setOpenAssetPopover(false)
  }

  const removeAsset = (assetId: string) => {
    setForm({
      ...form,
      linkedAssets: form.linkedAssets.filter(a => a.id !== assetId)
    })
  }

  const addTag = () => {
    if (currentTag && !form.tags.includes(currentTag)) {
      setForm({
        ...form,
        tags: [...form.tags, currentTag]
      })
      setCurrentTag('')
    }
  }

  const removeTag = (tag: string) => {
    setForm({
      ...form,
      tags: form.tags.filter(t => t !== tag)
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setForm({
      ...form,
      attachments: [...form.attachments, ...files]
    })
  }

  const removeAttachment = (index: number) => {
    setForm({
      ...form,
      attachments: form.attachments.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (isDraft = false) => {
    console.log('Ticket submitted:', { ...form, isDraft })
    // Here you would send the data to your API
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
                  <BreadcrumbLink href="/service/tickets">Tickets</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Neues Ticket erstellen</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Neues Ticket erstellen</h1>
              <p className="text-muted-foreground">
                Erstellen Sie ein detailliertes Ticket mit erweiterten Optionen
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleSubmit(true)}>
                <Save className="h-4 w-4 mr-2" />
                Als Entwurf speichern
              </Button>
              <Button onClick={() => handleSubmit(false)}>
                <Send className="h-4 w-4 mr-2" />
                Ticket erstellen
              </Button>
            </div>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Grundlagen</TabsTrigger>
              <TabsTrigger value="assets">Assets & Verknüpfungen</TabsTrigger>
              <TabsTrigger value="advanced">Erweiterte Optionen</TabsTrigger>
              <TabsTrigger value="attachments">Anhänge & Tags</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket-Informationen</CardTitle>
                  <CardDescription>
                    Grundlegende Informationen für das neue Ticket
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Betreff *</Label>
                      <Input
                        id="subject"
                        placeholder="Kurze Beschreibung des Problems"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requester">Anforderer</Label>
                      <Input
                        id="requester"
                        placeholder="Name des Anforderers"
                        value={form.requester}
                        onChange={(e) => setForm({ ...form, requester: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Beschreibung *</Label>
                    <Textarea
                      id="description"
                      className="min-h-[120px]"
                      placeholder="Detaillierte Beschreibung des Problems oder der Anfrage"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priorität *</Label>
                      <Select value={form.priority} onValueChange={(value) => setForm({ ...form, priority: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Priorität wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Niedrig</SelectItem>
                          <SelectItem value="medium">Mittel</SelectItem>
                          <SelectItem value="high">Hoch</SelectItem>
                          <SelectItem value="critical">Kritisch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategorie</Label>
                      <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value, subcategory: '' })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Kategorie wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hardware">Hardware</SelectItem>
                          <SelectItem value="software">Software</SelectItem>
                          <SelectItem value="network">Netzwerk</SelectItem>
                          <SelectItem value="security">Sicherheit</SelectItem>
                          <SelectItem value="request">Anfrage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subcategory">Unterkategorie</Label>
                      <Select 
                        value={form.subcategory} 
                        onValueChange={(value) => setForm({ ...form, subcategory: value })}
                        disabled={!form.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unterkategorie wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {form.category && categories[form.category as keyof typeof categories]?.map((sub) => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Zugewiesen an</Label>
                      <Popover open={openAssigneePopover} onOpenChange={setOpenAssigneePopover}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-between">
                            {form.assignedTo ? 
                              assignees.find(a => a.id === form.assignedTo)?.name :
                              "Mitarbeiter auswählen"
                            }
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Mitarbeiter suchen..." />
                            <CommandEmpty>Keine Mitarbeiter gefunden.</CommandEmpty>
                            <CommandGroup>
                              {assignees.map((assignee) => (
                                <CommandItem
                                  key={assignee.id}
                                  onSelect={() => {
                                    setForm({ ...form, assignedTo: assignee.id })
                                    setOpenAssigneePopover(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.assignedTo === assignee.id ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">{assignee.name}</div>
                                    <div className="text-sm text-muted-foreground">{assignee.role}</div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Standort</Label>
                      <Input
                        id="location"
                        placeholder="z.B. Büro 1.01, Gebäude A"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Asset-Verknüpfungen
                  </CardTitle>
                  <CardDescription>
                    Verknüpfen Sie das Ticket mit betroffenen Assets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Assets auswählen</Label>
                    <Popover open={openAssetPopover} onOpenChange={setOpenAssetPopover}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-between">
                          Asset hinzufügen
                          <Plus className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-96 p-0">
                        <Command>
                          <CommandInput placeholder="Asset suchen..." />
                          <CommandEmpty>Keine Assets gefunden.</CommandEmpty>
                          <CommandGroup>
                            {assets.map((asset) => (
                              <CommandItem
                                key={asset.id}
                                onSelect={() => handleAssetSelection(asset)}
                              >
                                <div className="flex items-center gap-3">
                                  {getAssetIcon(asset.type)}
                                  <div>
                                    <div className="font-medium">{asset.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {asset.serialNumber} • {asset.location}
                                      {asset.user && ` • ${asset.user}`}
                                    </div>
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {form.linkedAssets.length > 0 && (
                    <div className="space-y-2">
                      <Label>Verknüpfte Assets</Label>
                      <div className="grid gap-3">
                        {form.linkedAssets.map((asset) => (
                          <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getAssetIcon(asset.type)}
                              <div>
                                <div className="font-medium">{asset.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {asset.serialNumber} • {asset.location}
                                  {asset.user && ` • ${asset.user}`}
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeAsset(asset.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      SLA & Zeitplanung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="slaLevel">SLA-Level</Label>
                      <Select value={form.slaLevel} onValueChange={(value) => setForm({ ...form, slaLevel: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="SLA-Level wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (3 Werktage)</SelectItem>
                          <SelectItem value="express">Express (1 Werktag)</SelectItem>
                          <SelectItem value="emergency">Notfall (4 Stunden)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedHours">Geschätzte Stunden</Label>
                      <Input
                        id="estimatedHours"
                        type="number"
                        placeholder="z.B. 2.5"
                        value={form.estimatedHours}
                        onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Fälligkeitsdatum</Label>
                      <Input
                        id="dueDate"
                        type="datetime-local"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Eskalation & Benachrichtigungen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="escalationLevel">Eskalationsstufe</Label>
                      <Select value={form.escalationLevel} onValueChange={(value) => setForm({ ...form, escalationLevel: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Eskalationsstufe wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="level1">Level 1 - IT-Support</SelectItem>
                          <SelectItem value="level2">Level 2 - Senior Support</SelectItem>
                          <SelectItem value="level3">Level 3 - Systemadministration</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="notifyStakeholders"
                          checked={form.notifyStakeholders}
                          onCheckedChange={(checked) => setForm({ ...form, notifyStakeholders: !!checked })}
                        />
                        <Label htmlFor="notifyStakeholders" className="text-sm">
                          Stakeholder benachrichtigen
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowSelfService"
                          checked={form.allowSelfService}
                          onCheckedChange={(checked) => setForm({ ...form, allowSelfService: !!checked })}
                        />
                        <Label htmlFor="allowSelfService" className="text-sm">
                          Self-Service erlauben
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="requireApproval"
                          checked={form.requireApproval}
                          onCheckedChange={(checked) => setForm({ ...form, requireApproval: !!checked })}
                        />
                        <Label htmlFor="requireApproval" className="text-sm">
                          Genehmigung erforderlich
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="attachments" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Datei-Anhänge
                    </CardTitle>
                    <CardDescription>
                      Screenshots, Dokumente oder andere relevante Dateien
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="attachments">Dateien auswählen</Label>
                      <Input
                        id="attachments"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.xlsx"
                      />
                    </div>

                    {form.attachments.length > 0 && (
                      <div className="space-y-2">
                        <Label>Hochgeladene Dateien</Label>
                        <div className="space-y-2">
                          {form.attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <span className="text-sm">{file.name}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeAttachment(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tags & Labels</CardTitle>
                    <CardDescription>
                      Schlagwörter zur besseren Kategorisierung
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Tag hinzufügen"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button size="sm" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {form.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {form.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
