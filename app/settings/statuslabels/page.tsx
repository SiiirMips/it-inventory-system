"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table"

// Lucide Icons
import {
  PlusCircle,
  ChevronDown,
  Download,
  FileText,
  ArrowUpDown,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react"

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

// Statusbezeichnung Interface
interface StatusLabel {
  id: string;
  name: string;
  statusType: "Hardware" | "Software" | "Allgemein";
  assetCount: number;
  diagramColor: string;
  isDefault: boolean;
}

// Beispieldaten für Statusbezeichnungen
const mockStatusLabels: StatusLabel[] = [
  {
    id: "SL-001",
    name: "Aktiv",
    statusType: "Hardware",
    assetCount: 145,
    diagramColor: "#22c55e",
    isDefault: true,
  },
  {
    id: "SL-002",
    name: "Inaktiv",
    statusType: "Hardware",
    assetCount: 23,
    diagramColor: "#ef4444",
    isDefault: false,
  },
  {
    id: "SL-003",
    name: "In Wartung",
    statusType: "Hardware",
    assetCount: 8,
    diagramColor: "#f59e0b",
    isDefault: false,
  },
  {
    id: "SL-004",
    name: "Ausgemustert",
    statusType: "Hardware",
    assetCount: 12,
    diagramColor: "#6b7280",
    isDefault: false,
  },
  {
    id: "SL-005",
    name: "Lizenziert",
    statusType: "Software",
    assetCount: 67,
    diagramColor: "#3b82f6",
    isDefault: true,
  },
  {
    id: "SL-006",
    name: "Testversion",
    statusType: "Software",
    assetCount: 15,
    diagramColor: "#8b5cf6",
    isDefault: false,
  },
  {
    id: "SL-007",
    name: "Abgelaufen",
    statusType: "Software",
    assetCount: 4,
    diagramColor: "#dc2626",
    isDefault: false,
  },
  {
    id: "SL-008",
    name: "Bereit",
    statusType: "Allgemein",
    assetCount: 89,
    diagramColor: "#10b981",
    isDefault: false,
  },
];

// Spalten Definition
const columns: ColumnDef<StatusLabel>[] = [
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
    accessorKey: "statusType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Statustyp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "assetCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Assets
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "diagramColor",
    header: "Diagrammfarbe",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div 
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{ backgroundColor: row.getValue("diagramColor") }}
        />
        <span className="text-sm font-mono">{row.getValue("diagramColor")}</span>
      </div>
    ),
  },
  {
    accessorKey: "isDefault",
    header: "Standardbezeichnung",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.getValue("isDefault") ? (
          <Check className="h-5 w-5 text-green-600" />
        ) : (
          <X className="h-5 w-5 text-red-600" />
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Aktionen",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("Bearbeiten:", row.original.id)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => console.log("Löschen:", row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function StatusLabelsPage() {
  const [data, setData] = React.useState<StatusLabel[]>(mockStatusLabels);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
  });

  // CSV Export Funktion
  const exportToCSV = () => {
    const csvData = table.getFilteredRowModel().rows.map(row => {
      const rowData: any = {};
      table.getVisibleLeafColumns().forEach(column => {
        if (column.id !== "actions") {
          const value = row.getValue(column.id);
          rowData[column.id] = value;
        }
      });
      return rowData;
    });

    const headers = ["name", "statusType", "assetCount", "diagramColor", "isDefault"];
    const csvContent = [
      "Name,Statustyp,Assets,Diagrammfarbe,Standardbezeichnung",
      ...csvData.map(row => 
        headers.map(header => {
          let value = row[header] || '';
          if (header === "isDefault") {
            value = value ? "Ja" : "Nein";
          }
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `statusbezeichnungen_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                  <BreadcrumbLink href="/settings">
                    Einstellungen
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Statusbezeichnungen</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Statusbezeichnungen</h1>
            <Button>
              <PlusCircle className="mr-2 size-4" /> Neue Statusbezeichnung
            </Button>
          </div>

          {/* Such- und Exportoptionen */}
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Statusbezeichnungen suchen..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />

            <div className="flex items-center gap-2 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 size-4" /> Export <ChevronDown className="ml-2 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={exportToCSV}>
                    <FileText className="mr-2 size-4" />
                    Als CSV exportieren
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Tabelle */}
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
                    <TableRow key={row.id}>
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
                      Keine Statusbezeichnungen gefunden.
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
