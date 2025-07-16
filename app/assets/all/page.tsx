"use client"

import * as React from "react"
import Link from "next/link"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, // Neu für Sortierung
  useReactTable,
  SortingState, // Neu für Sortierung
} from "@tanstack/react-table"



// Lucide Icons
import {
  PlusCircle,
  ChevronDown,
  ChevronUp,
  ListFilter,
  Download,
  FileSpreadsheet,
  FileText,
  ArrowUpDown,
  Copy,
  CheckSquare,
  Pencil,
  Trash2,
} from "lucide-react"

// Shadcn/ui Komponenten
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
import { Input } from "@/components/ui/input"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem, // Dieser Import fehlt
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination" // Neu für Pagination
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip" // Neu für Tooltips


// 1. Definiere dein Asset-Datenmodell (TypeScript Interface)
interface Asset {
  id: string;
  name: string;
  type: "Hardware" | "Software" | "Virtual" | "Consumable";
  status: "Active" | "Inactive" | "Maintenance" | "Disposed";
  location: string;
  assignedTo: string;
  serialNumber?: string;
  lastSeen?: string;
}

// 2. Erstelle Beispieldaten (ca. 50 Assets)
const mockAssets: Asset[] = Array.from({ length: 50 }, (_, i) => {
  const types = ["Hardware", "Software", "Virtual", "Consumable"];
  const statuses = ["Active", "Inactive", "Maintenance", "Disposed"];
  const locations = ["Office A, Room 101", "Office B, Hallway", "AWS us-east-1", "Home Office", "Storage Room"];
  const assignedTo = ["Max Mustermann", "Lena Schmidt", "IT Team", "Anna Meier", "Stock", "John Doe", "Jane Smith"];

  return {
    id: `ASSET-${String(i + 1).padStart(3, '0')}`,
    name: `Device ${i + 1} (${types[i % types.length]})`,
    type: types[i % types.length] as Asset['type'],
    status: statuses[i % statuses.length] as Asset['status'],
    location: locations[i % locations.length],
    assignedTo: assignedTo[i % assignedTo.length],
    serialNumber: `SN-${Math.floor(Math.random() * 1000000000)}`,
    lastSeen: `2025-07-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}`,
  };
});

// 3. Definiere die Spalten für deine Tabelle
const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Asset ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link href={`/assets/${row.original.id}`} className="font-medium text-blue-600 hover:underline">
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Typ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Standort
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Zugewiesen an
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "serialNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Seriennummer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "lastSeen",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Zuletzt gesehen
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "checkout",
    header: "Zurücknehmen/Herausgeben",
    cell: ({ row }) => (
      <Button
        onClick={() => handleCheckout(row.original.id)}
        className="bg-pink-500 hover:bg-pink-600 text-white"
        size="sm"
      >
        Herausgeben
      </Button>
    ),
  },
  {
    id: "actions",
    header: "Aktionen",
    cell: ({ row }) => (
      <TooltipProvider>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleDuplicate(row.original.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white h-8 w-8 p-0"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Kopieren</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleAssign(row.original.id)}
                className="bg-gray-700 hover:bg-gray-800 text-white h-8 w-8 p-0"
                size="sm"
              >
                <CheckSquare className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Prüfung</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleEdit(row.original.id)}
                className="bg-orange-500 hover:bg-orange-600 text-white h-8 w-8 p-0"
                size="sm"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bearbeiten</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleDelete(row.original.id)}
                className="bg-red-500 hover:bg-red-600 text-white h-8 w-8 p-0"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Löschen</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    ),
  },
];

export default function AssetsAllPage() {
  const [data, setData] = React.useState<Asset[]>(mockAssets);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<any[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Startet bei Seite 0
    pageSize: 13, // Standardmäßig 15 Einträge pro Seite
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), // Sortierung aktivieren
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting, // Sortierung-Zustand aktualisieren
    onPaginationChange: setPagination,
    state: {
      globalFilter,
      columnFilters,
      sorting, // Sortierung-Zustand übergeben
      pagination,
    },
  });

  const assetTypes = ["Hardware", "Software", "Virtual", "Consumable"];

  // CSV Export Funktion
  const exportToCSV = () => {
    const csvData = table.getFilteredRowModel().rows.map(row => {
      const rowData: any = {};
      table.getVisibleLeafColumns().forEach(column => {
        const value = row.getValue(column.id);
        rowData[column.id] = value;
      });
      return rowData;
    });

    // CSV Header erstellen
    const headers = table.getVisibleLeafColumns().map(column => {
      const headerValue = column.columnDef.header;
      if (typeof headerValue === 'string') {
        return headerValue;
      }
      // Fallback zu column.id wenn header eine Funktion ist
      return column.id;
    });

    // CSV Content erstellen
    const csvContent = [
      headers.join(','), // Header Zeile
      ...csvData.map(row => 
        headers.map(header => {
          const columnId = table.getVisibleLeafColumns().find(col => {
            const headerValue = col.columnDef.header;
            return (typeof headerValue === 'string' ? headerValue : col.id) === header;
          })?.id || header;
          
          let value = row[columnId] || '';
          // Escape Kommas und Anführungszeichen in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // CSV Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `assets_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Platzhalter-Funktionen für die neuen Buttons
  const handleCheckout = (assetId: string) => {
    console.log("Herausgeben:", assetId);
  };

  const handleDuplicate = (assetId: string) => {
    console.log("Duplizieren:", assetId);
  };

  const handleAssign = (assetId: string) => {
    console.log("Zuweisen:", assetId);
  };

  const handleEdit = (assetId: string) => {
    console.log("Bearbeiten:", assetId);
  };

  const handleDelete = (assetId: string) => {
    console.log("Löschen:", assetId);
  };

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
                  <BreadcrumbLink href="/assets">
                    Assets
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Alle</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Alle Assets</h1>
            <Link href="/assets/create">
              <Button>
                <PlusCircle className="mr-2 size-4" /> Neues Asset
              </Button>
            </Link>
          </div>

          {/* Such- und Filteroptionen */}
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Assets suchen (ID, Name, Zugewiesen an)..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />

            <Select
              value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
              onValueChange={(value) => table.getColumn("type")?.setFilterValue(value === "all" ? undefined : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Typ filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Typen</SelectItem>
                {assetTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Export und Spalten Button Group */}
            <div className="flex items-center gap-2 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 size-4" /> Export <ChevronDown className="ml-2 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileSpreadsheet className="mr-2 size-4" />
                    Als Excel exportieren
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportToCSV}>
                    <FileText className="mr-2 size-4" />
                    Als CSV exportieren
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ListFilter className="mr-2 size-4" /> Spalten <ChevronDown className="ml-2 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Die shadcn/ui Tabelle */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Keine Assets gefunden.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Seite {table.getState().pagination.pageIndex + 1} von {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => table.previousPage()}
                      className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => table.nextPage()}
                      className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function handleDuplicate(id: string): void {
  throw new Error("Function not implemented.")
}

function handleAssign(id: string): void {
  throw new Error("Function not implemented.")
}

function handleEdit(id: string): void {
  throw new Error("Function not implemented.")
}

function handleDelete(id: string): void {
  throw new Error("Function not implemented.")
}

function handleCheckout(id: string): void {
  throw new Error("Function not implemented.")
}

