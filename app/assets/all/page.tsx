"use client"

import * as React from "react"
import Link from "next/link"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel, // Wichtig für Pagination
  useReactTable,
} from "@tanstack/react-table"

// Lucide Icons
import {
  PlusCircle,
  ChevronDown,
  ListFilter,
} from "lucide-react"

// Shadcn/ui Komponenten
import { AppSidebar } from "@/components/app-sidebar" // Deine Sidebar-Komponente (Pfad angepasst von app-sidebar zu sidebar)
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
}
from "@/components/ui/dropdown-menu"
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
    header: "Asset ID",
    cell: ({ row }) => (
      <Link href={`/assets/${row.original.id}`} className="font-medium text-blue-600 hover:underline">
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Typ",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "location",
    header: "Standort",
  },
  {
    accessorKey: "assignedTo",
    header: "Zugewiesen an",
  },
  {
    accessorKey: "serialNumber",
    header: "Seriennummer",
  },
  {
    accessorKey: "lastSeen",
    header: "Zuletzt gesehen",
  },
];

export default function AssetsAllPage() {
  const [data, setData] = React.useState<Asset[]>(mockAssets);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<any[]>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Startet bei Seite 0
    pageSize: 10, // Standardmäßig 10 Einträge pro Seite
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Pagination aktivieren
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination, // Pagination-Zustand aktualisieren
    state: {
      globalFilter,
      columnFilters,
      pagination, // Pagination-Zustand übergeben
    },
  });

  const assetTypes = ["Hardware", "Software", "Virtual", "Consumable"];

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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
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
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[100px]">
                  <SelectValue placeholder="Pro Seite" />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
