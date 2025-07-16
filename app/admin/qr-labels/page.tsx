"use client"

import * as React from "react"
import QRCode from "qrcode"
import jsPDF from "jspdf"
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
import { Textarea } from "@/components/ui/textarea"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  QrCode,
  Image,
  Type,
  Globe,
  Tag,
  MapPin,
  Calendar,
  User,
  Download,
  Eye,
  Trash2,
  FileText,
} from "lucide-react"

// Drag and Drop Types
const ItemTypes = {
  QR_CODE: 'qr_code',
  TEXT_FIELD: 'text_field',
  LOGO: 'logo',
  EXISTING_ELEMENT: 'existing_element'
}

// Grid configuration
const GRID_SIZE = 5; // 5mm grid cells
const ELEMENT_TYPES_CONFIG = {
  qr: { width: 20, height: 20 }, // 4x4 grid cells
  text: { width: 25, height: 5 }, // 5x1 grid cells
  field: { width: 25, height: 5 }, // 5x1 grid cells
  logo: { width: 15, height: 15 }, // 3x3 grid cells
};

// Label Element Interface - modified
interface LabelElement {
  id: string;
  type: 'qr' | 'text' | 'logo' | 'field';
  content: string;
  gridPosition: { col: number; row: number }; // Changed from position to gridPosition
  gridSize: { cols: number; rows: number }; // Changed from size to gridSize
  style: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    alignment?: string;
  };
}

// Print Settings Interface
interface PrintSettings {
  pageFormat: 'A4' | 'Letter' | 'Custom';
  customWidth: number;
  customHeight: number;
  labelsPerRow: number;
  labelsPerColumn: number;
  topMargin: number;
  leftMargin: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  labelWidth: number;
  labelHeight: number;
}

// Asset Interface (simplified from assets page)
interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
}

// Mock assets data for PDF generation
const mockAssets: Asset[] = Array.from({ length: 20 }, (_, i) => ({
  id: `ASSET-${String(i + 1).padStart(3, '0')}`,
  name: `Device ${i + 1}`,
  type: "Hardware",
  location: "Office A",
}));

// Predefined field types
const fieldTypes = [
  { value: 'asset_id', label: 'Asset ID', icon: Tag },
  { value: 'asset_name', label: 'Asset Name', icon: Type },
  { value: 'ip_address', label: 'IP Adresse', icon: Globe },
  { value: 'location', label: 'Standort', icon: MapPin },
  { value: 'assigned_to', label: 'Zugewiesen an', icon: User },
  { value: 'date_created', label: 'Erstellungsdatum', icon: Calendar },
  { value: 'serial_number', label: 'Seriennummer', icon: Tag },
];

// Draggable Element Component
interface DraggableElementProps {
  type: string;
  content: string;
  icon: React.ComponentType<any>;
  label: string;
  children: React.ReactNode;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, content, icon: Icon, label, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type === 'qr' ? ItemTypes.QR_CODE : ItemTypes.TEXT_FIELD,
    item: { type, content, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag as any}
      className={`cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {children}
    </div>
  )
}

// Draggable Existing Element Component
interface DraggableExistingElementProps {
  element: LabelElement;
  children: React.ReactNode;
  onMove: (id: string, newPosition: { col: number; row: number }) => void;
}

const DraggableExistingElement: React.FC<DraggableExistingElementProps> = ({ element, children, onMove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EXISTING_ELEMENT,
    item: { id: element.id, currentPosition: element.gridPosition },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag as any}
      className={`cursor-move ${isDragging ? 'opacity-50 z-50' : 'opacity-100'}`}
    >
      {children}
    </div>
  )
}

// Drop Zone Component
interface DropZoneProps {
  onDrop: (item: any, position: { x: number; y: number }) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop, children, className, style }) => {
  const dropRef = React.useRef<HTMLDivElement>(null);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.QR_CODE, ItemTypes.TEXT_FIELD, ItemTypes.EXISTING_ELEMENT],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const targetRect = dropRef.current?.getBoundingClientRect();
      
      if (offset && targetRect) {
        const position = {
          x: offset.x - targetRect.left,
          y: offset.y - targetRect.top
        };
        onDrop(item, position);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  // Combine the drop ref with our own ref
  const setRefs = React.useCallback((node: HTMLDivElement) => {
    dropRef.current = node;
    drop(node);
  }, [drop]);

  return (
    <div
      ref={setRefs}
      className={`${className} ${isOver ? 'bg-blue-50 border-blue-300' : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default function QRLabelsPage() {
  const [labelElements, setLabelElements] = React.useState<LabelElement[]>([
    {
      id: '1',
      type: 'qr',
      content: 'ASSET-001',
      gridPosition: { col: 0, row: 0 },
      gridSize: { cols: 4, rows: 4 },
      style: {},
    }
  ]);
  
  const [selectedElement, setSelectedElement] = React.useState<string | null>(null);
  const [qrContent, setQrContent] = React.useState('{{asset_id}}');
  const [qrCodeDataUrls, setQrCodeDataUrls] = React.useState<Record<string, string>>({});

  // Print Settings State
  const [printSettings, setPrintSettings] = React.useState<PrintSettings>({
    pageFormat: 'A4',
    customWidth: 210,
    customHeight: 297,
    labelsPerRow: 3,
    labelsPerColumn: 7,
    topMargin: 15,
    leftMargin: 15,
    horizontalSpacing: 5,
    verticalSpacing: 5,
    labelWidth: 60,
    labelHeight: 30,
  });

  // Calculate grid dimensions
  const gridDimensions = React.useMemo(() => {
    const cols = Math.floor(printSettings.labelWidth / GRID_SIZE);
    const rows = Math.floor(printSettings.labelHeight / GRID_SIZE);
    return { cols, rows };
  }, [printSettings.labelWidth, printSettings.labelHeight]);

  // Custom hook to track window size
  function useWindowSize() {
    const [size, setSize] = React.useState<{ width: number; height: number }>({
      width: typeof window !== "undefined" ? window.innerWidth : 400,
      height: typeof window !== "undefined" ? window.innerHeight : 400,
    });

    React.useEffect(() => {
      function handleResize() {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
  }

  const windowSize = useWindowSize();

  // Calculate display dimensions with constraints
  const displayDimensions = React.useMemo(() => {
    const maxWidth = Math.min(400, windowSize.width * 0.4);
    const maxHeight = Math.min(400, windowSize.height * 0.6);

    const mmToPx = 4;
    const targetWidthPx = printSettings.labelWidth * mmToPx;
    const targetHeightPx = printSettings.labelHeight * mmToPx;

    const scaleX = maxWidth / targetWidthPx;
    const scaleY = maxHeight / targetHeightPx;
    const scale = Math.min(1, scaleX, scaleY);

    return {
      width: targetWidthPx * scale,
      height: targetHeightPx * scale,
      scale: scale,
      cellWidth: GRID_SIZE * mmToPx * scale,
      cellHeight: GRID_SIZE * mmToPx * scale,
    };
  }, [printSettings.labelWidth, printSettings.labelHeight, windowSize]);

  // Convert pixel position to grid position
  const pixelToGrid = (x: number, y: number) => {
    const mmX = (x / displayDimensions.width) * printSettings.labelWidth;
    const mmY = (y / displayDimensions.height) * printSettings.labelHeight;
    
    const col = Math.floor(mmX / GRID_SIZE);
    const row = Math.floor(mmY / GRID_SIZE);
    
    return {
      col: Math.max(0, Math.min(col, gridDimensions.cols - 1)),
      row: Math.max(0, Math.min(row, gridDimensions.rows - 1))
    };
  };

  // Check if a position is occupied by another element
  const isPositionOccupied = (col: number, row: number, cols: number, rows: number, excludeId?: string) => {
    return labelElements.some(element => {
      if (element.id === excludeId) return false;
      
      const elementEndCol = element.gridPosition.col + element.gridSize.cols;
      const elementEndRow = element.gridPosition.row + element.gridSize.rows;
      const newEndCol = col + cols;
      const newEndRow = row + rows;
      
      return !(
        col >= elementEndCol ||
        newEndCol <= element.gridPosition.col ||
        row >= elementEndRow ||
        newEndRow <= element.gridPosition.row
      );
    });
  };

  // Find next available position for an element
  const findAvailablePosition = (cols: number, rows: number, preferredCol?: number, preferredRow?: number, excludeId?: string) => {
    // Try preferred position first if provided
    if (preferredCol !== undefined && preferredRow !== undefined) {
      const maxCol = gridDimensions.cols - cols;
      const maxRow = gridDimensions.rows - rows;
      const constrainedCol = Math.max(0, Math.min(preferredCol, maxCol));
      const constrainedRow = Math.max(0, Math.min(preferredRow, maxRow));
      
      if (!isPositionOccupied(constrainedCol, constrainedRow, cols, rows, excludeId)) {
        return { col: constrainedCol, row: constrainedRow };
      }
    }

    // Find any available position
    for (let row = 0; row <= gridDimensions.rows - rows; row++) {
      for (let col = 0; col <= gridDimensions.cols - cols; col++) {
        if (!isPositionOccupied(col, row, cols, rows, excludeId)) {
          return { col, row };
        }
      }
    }
    return { col: 0, row: 0 }; // Fallback
  };

  // Convert grid position to actual mm position
  const gridToMm = (gridPos: { col: number; row: number }) => ({
    x: gridPos.col * GRID_SIZE,
    y: gridPos.row * GRID_SIZE
  });

  // Convert grid size to actual mm size
  const gridSizeToMm = (gridSize: { cols: number; rows: number }) => ({
    width: gridSize.cols * GRID_SIZE,
    height: gridSize.rows * GRID_SIZE
  });

  // Handle drop on label canvas
  const handleDrop = (item: any, position: { x: number; y: number }) => {
    if (item.type === ItemTypes.EXISTING_ELEMENT) {
      // Moving existing element
      const gridPos = pixelToGrid(position.x, position.y);
      const element = labelElements.find(el => el.id === item.id);
      if (element) {
        const newPosition = findAvailablePosition(
          element.gridSize.cols, 
          element.gridSize.rows, 
          gridPos.col, 
          gridPos.row, 
          item.id
        );
        updateElement(item.id, { gridPosition: newPosition });
      }
    } else {
      // Adding new element
      const gridPos = pixelToGrid(position.x, position.y);
      let elementType: LabelElement['type'];
      let content = item.content;

      if (item.type === ItemTypes.QR_CODE) {
        elementType = 'qr';
        content = qrContent;
      } else if (item.type === ItemTypes.TEXT_FIELD) {
        elementType = item.content.startsWith('{{') ? 'field' : 'text';
      } else {
        elementType = 'text';
      }

      addElementAtPosition(elementType, content, gridPos.col, gridPos.row);
    }
  };

  // Add new element at specific position
  const addElementAtPosition = (type: LabelElement['type'], content: string, col: number, row: number) => {
    const config = ELEMENT_TYPES_CONFIG[type];
    const gridSize = {
      cols: Math.ceil(config.width / GRID_SIZE),
      rows: Math.ceil(config.height / GRID_SIZE)
    };
    
    const availablePosition = findAvailablePosition(gridSize.cols, gridSize.rows, col, row);
    
    const newElement: LabelElement = {
      id: Date.now().toString(),
      type,
      content: content || (type === 'qr' ? qrContent : type === 'text' ? 'Beispieltext' : type),
      gridPosition: availablePosition,
      gridSize,
      style: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#000000',
        alignment: 'left',
      },
    };
    setLabelElements([...labelElements, newElement]);
  };

  // Generate QR code data URL
  const generateQRDataUrl = async (content: string, elementId: string) => {
    try {
      const dataUrl = await QRCode.toDataURL(content, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeDataUrls(prev => ({ ...prev, [elementId]: dataUrl }));
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Generate QR codes for all QR elements
  React.useEffect(() => {
    labelElements.forEach(element => {
      if (element.type === 'qr') {
        generateQRDataUrl(element.content, element.id);
      }
    });
  }, [labelElements]);

  // Update QR content for all QR elements when global QR content changes
  React.useEffect(() => {
    setLabelElements(prev => prev.map(el => 
      el.type === 'qr' ? { ...el, content: qrContent } : el
    ));
  }, [qrContent]);

  // Update element
  const updateElement = (id: string, updates: Partial<LabelElement>) => {
    setLabelElements(labelElements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  // Delete element
  const deleteElement = (id: string) => {
    setLabelElements(labelElements.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  // Generate browser preview
  const generatePreview = async () => {
    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    if (!previewWindow) return;

    const qrElements = await Promise.all(
      labelElements
        .filter(el => el.type === 'qr')
        .map(async element => {
          const qrDataUrl = await QRCode.toDataURL(element.content, {
            width: 200,
            margin: 1,
            color: { dark: '#000000', light: '#FFFFFF' }
          });
          return { ...element, qrDataUrl };
        })
    );

    const labelHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Label Vorschau</title>
        <style>
          body { margin: 20px; font-family: Arial, sans-serif; }
          .label { 
            width: ${printSettings.labelWidth}mm; 
            height: ${printSettings.labelHeight}mm; 
            position: relative; 
            border: 1px solid #000;
            background: white;
            margin: 10px;
          }
          .element { position: absolute; }
          .qr-image { width: 100%; height: 100%; object-fit: contain; }
          @media print {
            body { margin: 0; }
            .label { margin: 0; page-break-after: always; }
          }
        </style>
      </head>
      <body>
        <h1>Label Vorschau</h1>
        <p>Drücken Sie Strg+P zum Drucken</p>
        
        <div class="label">
          ${labelElements.map(element => {
            const position = gridToMm(element.gridPosition);
            const size = gridSizeToMm(element.gridSize);
            
            if (element.type === 'qr') {
              const qrElement = qrElements.find(qr => qr.id === element.id);
              return `
                <div class="element" style="left: ${position.x}mm; top: ${position.y}mm; width: ${size.width}mm; height: ${size.height}mm;">
                  <img src="${qrElement?.qrDataUrl}" class="qr-image" alt="QR Code" />
                </div>
              `;
            } else {
              return `
                <div class="element" style="left: ${position.x}mm; top: ${position.y}mm; width: ${size.width}mm; height: ${size.height}mm; font-size: ${element.style.fontSize || 12}px; color: ${element.style.color || '#000000'}; text-align: ${element.style.alignment || 'left'}; display: flex; align-items: center; padding: 2px;">
                  ${element.content.replace(/[{}]/g, '')}
                </div>
              `;
            }
          }).join('')}
        </div>
        
        <script>window.focus();</script>
      </body>
      </html>
    `;

    previewWindow.document.write(labelHtml);
    previewWindow.document.close();
  };

  // PDF Export functionality
  const exportToPDF = async () => {
    try {
      const pageWidth = printSettings.pageFormat === 'A4' ? 210 : 
                       printSettings.pageFormat === 'Letter' ? 215.9 : 
                       printSettings.customWidth;
      const pageHeight = printSettings.pageFormat === 'A4' ? 297 : 
                        printSettings.pageFormat === 'Letter' ? 279.4 : 
                        printSettings.customHeight;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pageWidth, pageHeight]
      });

      let currentPage = 0;
      const labelsPerPage = printSettings.labelsPerRow * printSettings.labelsPerColumn;

      for (let assetIndex = 0; assetIndex < mockAssets.length; assetIndex++) {
        const asset = mockAssets[assetIndex];
        const labelIndex = assetIndex % labelsPerPage;

        if (labelIndex === 0 && assetIndex > 0) {
          pdf.addPage();
          currentPage++;
        }

        const row = Math.floor(labelIndex / printSettings.labelsPerRow);
        const col = labelIndex % printSettings.labelsPerRow;

        const labelX = printSettings.leftMargin + col * (printSettings.labelWidth + printSettings.horizontalSpacing);
        const labelY = printSettings.topMargin + row * (printSettings.labelHeight + printSettings.verticalSpacing);

        const assetQrContent = qrContent.replace('{{asset_id}}', asset.id).replace('{{asset_name}}', asset.name);
        const qrDataUrl = await QRCode.toDataURL(assetQrContent, {
          width: 200,
          margin: 1,
          color: { dark: '#000000', light: '#FFFFFF' }
        });

        for (const element of labelElements) {
          const position = gridToMm(element.gridPosition);
          const size = gridSizeToMm(element.gridSize);
          
          const elementX = labelX + position.x;
          const elementY = labelY + position.y;

          if (element.type === 'qr') {
            pdf.addImage(qrDataUrl, 'PNG', elementX, elementY, size.width, size.height);
          } else if (element.type === 'text' || element.type === 'field') {
            let textContent = element.content;
            if (element.type === 'field') {
              textContent = textContent
                .replace('{{asset_id}}', asset.id)
                .replace('{{asset_name}}', asset.name)
                .replace('{{location}}', asset.location)
                .replace(/[{}]/g, '');
            }

            pdf.setFontSize(element.style.fontSize || 12);
            pdf.setTextColor(element.style.color || '#000000');
            
            const textX = element.style.alignment === 'center' ? elementX + size.width / 2 :
                         element.style.alignment === 'right' ? elementX + size.width :
                         elementX;

            pdf.text(textContent, textX, elementY + size.height / 2);
          }
        }

        pdf.setDrawColor(200, 200, 200);
        pdf.rect(labelX, labelY, printSettings.labelWidth, printSettings.labelHeight);
      }

      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      const newTab = window.open(pdfUrl, '_blank');
      
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 1000);
      
      if (!newTab) {
        alert('Popup wurde blockiert. Bitte erlauben Sie Popups für diese Seite und versuchen Sie es erneut.');
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Fehler beim Generieren der PDF. Bitte versuchen Sie es erneut.');
    }
  };

  const selectedEl = labelElements.find(el => el.id === selectedElement);

  return (
    <DndProvider backend={HTML5Backend}>
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
                    <BreadcrumbPage>QR-Code Labels</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-semibold">QR-Code Label Generator</h1>
              <div className="flex gap-2">
                <Button variant="outline" onClick={generatePreview}>
                  <Eye className="mr-2 h-4 w-4" />
                  Vorschau
                </Button>
                <Button onClick={exportToPDF}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF Exportieren
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Element Toolbox with Draggable Elements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Elemente</CardTitle>
                  <CardDescription>
                    Ziehen Sie Elemente auf das Label (Drag & Drop)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">QR-Code (20x20mm)</Label>
                    <DraggableElement
                      type="qr"
                      content={qrContent}
                      icon={QrCode}
                      label="QR-Code"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        QR-Code ziehen
                      </Button>
                    </DraggableElement>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Datenfelder (25x5mm)</Label>
                    {fieldTypes.map((field) => (
                      <DraggableElement
                        key={field.value}
                        type="field"
                        content={`{{${field.value}}}`}
                        icon={field.icon}
                        label={field.label}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <field.icon className="mr-2 h-3 w-3" />
                          {field.label}
                        </Button>
                      </DraggableElement>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Weitere Elemente</Label>
                    <DraggableElement
                      type="text"
                      content="Beispieltext"
                      icon={Type}
                      label="Text"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Type className="mr-2 h-3 w-3" />
                        Text ziehen (25x5mm)
                      </Button>
                    </DraggableElement>
                    <DraggableElement
                      type="logo"
                      content="Logo"
                      icon={Image}
                      label="Logo"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Image className="mr-2 h-3 w-3" />
                        Logo ziehen (15x15mm)
                      </Button>
                    </DraggableElement>
                  </div>
                </CardContent>
              </Card>

              {/* Label Canvas with Drop Zone */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Label Designer (Drag & Drop)</CardTitle>
                  <CardDescription>
                    Größe: {printSettings.labelWidth} x {printSettings.labelHeight} mm
                    | Raster: {gridDimensions.cols} x {gridDimensions.rows} Zellen ({GRID_SIZE}mm pro Zelle)
                    {displayDimensions.scale < 1 && ` | Skaliert: ${Math.round(displayDimensions.scale * 100)}%`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center min-h-[200px]">
                    <DropZone
                      onDrop={handleDrop}
                      className="relative border-2 border-dashed border-gray-300 bg-white select-none transition-colors"
                      style={{
                        width: `${displayDimensions.width}px`,
                        height: `${displayDimensions.height}px`,
                        backgroundImage: `
                          linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                          linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
                        `,
                        backgroundSize: `${displayDimensions.cellWidth}px ${displayDimensions.cellHeight}px`,
                      }}
                    >
                      {labelElements.map((element) => {
                        const position = gridToMm(element.gridPosition);
                        const size = gridSizeToMm(element.gridSize);
                        
                        return (
                          <DraggableExistingElement
                            key={element.id}
                            element={element}
                            onMove={(id, newPosition) => updateElement(id, { gridPosition: newPosition })}
                          >
                            <div
                              className={`absolute border-2 ${
                                selectedElement === element.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-300 bg-white'
                              } hover:shadow-md transition-shadow`}
                              style={{
                                left: `${(position.x / printSettings.labelWidth) * displayDimensions.width}px`,
                                top: `${(position.y / printSettings.labelHeight) * displayDimensions.height}px`,
                                width: `${(size.width / printSettings.labelWidth) * displayDimensions.width}px`,
                                height: `${(size.height / printSettings.labelHeight) * displayDimensions.height}px`,
                              }}
                              onClick={() => setSelectedElement(element.id)}
                            >
                              {element.type === 'qr' && (
                                <div className="w-full h-full flex items-center justify-center p-1">
                                  {qrCodeDataUrls[element.id] ? (
                                    <img 
                                      src={qrCodeDataUrls[element.id]} 
                                      alt="QR Code" 
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <div className="text-xs text-gray-500">Loading...</div>
                                  )}
                                </div>
                              )}
                              {element.type === 'text' && (
                                <div 
                                  className="w-full h-full flex items-center p-1 text-xs overflow-hidden"
                                  style={{ 
                                    fontSize: `${Math.max(8, (element.style.fontSize || 12) * displayDimensions.scale)}px`,
                                    color: element.style.color,
                                    textAlign: element.style.alignment as any,
                                  }}
                                >
                                  {element.content}
                                </div>
                              )}
                              {element.type === 'field' && (
                                <div 
                                  className="w-full h-full flex items-center p-1 text-xs bg-blue-100 overflow-hidden"
                                  style={{ 
                                    fontSize: `${Math.max(8, (element.style.fontSize || 12) * displayDimensions.scale)}px`,
                                    color: element.style.color,
                                    textAlign: element.style.alignment as any,
                                  }}
                                >
                                  {element.content.replace(/[{}]/g, '')}
                                </div>
                              )}
                              {element.type === 'logo' && (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs">
                                  Logo
                                </div>
                              )}
                              
                              {selectedElement === element.id && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="absolute -top-2 -right-2 h-6 w-6 p-0 z-10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteElement(element.id);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </DraggableExistingElement>
                        );
                      })}
                    </DropZone>
                  </div>
                </CardContent>
              </Card>

              {/* Properties Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Eigenschaften</CardTitle>
                  <CardDescription>
                    {selectedEl ? 'Element bearbeiten' : 'Element auswählen'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="label" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="label">Label</TabsTrigger>
                      <TabsTrigger value="element">Element</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="label" className="space-y-4">
                      <div className="space-y-2">
                        <Label>QR-Code Standard-Inhalt</Label>
                        <Textarea
                          placeholder="{{asset_id}} - {{asset_name}}"
                          value={qrContent}
                          onChange={(e) => setQrContent(e.target.value)}
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground">
                          Wird für neue QR-Codes verwendet und aktualisiert alle bestehenden QR-Codes
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="element" className="space-y-4">
                      {selectedEl ? (
                        <>
                          <div className="space-y-2">
                            <Label>Inhalt</Label>
                            <Textarea
                              value={selectedEl.content}
                              onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                              rows={2}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label>Raster Position</Label>
                              <div className="text-sm text-muted-foreground">
                                Spalte: {selectedEl.gridPosition.col + 1}, Reihe: {selectedEl.gridPosition.row + 1}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Raster Größe</Label>
                              <div className="text-sm text-muted-foreground">
                                {selectedEl.gridSize.cols} x {selectedEl.gridSize.rows} Zellen
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              <strong>Info:</strong> Elemente haben feste Größen und rasten im {GRID_SIZE}mm-Raster ein. 
                              Ziehen Sie Elemente zum Verschieben.
                            </p>
                          </div>

                          {(selectedEl.type === 'text' || selectedEl.type === 'field') && (
                            <>
                              <div className="space-y-2">
                                <Label>Schriftgröße</Label>
                                <Input
                                  type="number"
                                  value={selectedEl.style.fontSize || 12}
                                  onChange={(e) => updateElement(selectedEl.id, {
                                    style: { ...selectedEl.style, fontSize: Number(e.target.value) }
                                  })}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Textfarbe</Label>
                                <Input
                                  type="color"
                                  value={selectedEl.style.color || '#000000'}
                                  onChange={(e) => updateElement(selectedEl.id, {
                                    style: { ...selectedEl.style, color: e.target.value }
                                  })}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Ausrichtung</Label>
                                <Select
                                  value={selectedEl.style.alignment || 'left'}
                                  onValueChange={(value) => updateElement(selectedEl.id, {
                                    style: { ...selectedEl.style, alignment: value }
                                  })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="left">Links</SelectItem>
                                    <SelectItem value="center">Mitte</SelectItem>
                                    <SelectItem value="right">Rechts</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Wählen Sie ein Element aus, um es zu bearbeiten.
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Print Settings Section - unchanged */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Druckeinstellungen</CardTitle>
                <CardDescription>
                  Konfiguration für PDF-Export mit mehreren Etiketten (PDF öffnet in neuem Tab)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Page Format */}
                  <div className="space-y-2">
                    <Label>Blattformat</Label>
                    <Select
                      value={printSettings.pageFormat}
                      onValueChange={(value) => setPrintSettings(prev => ({ 
                        ...prev, 
                        pageFormat: value as 'A4' | 'Letter' | 'Custom' 
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A4">A4 (210x297mm)</SelectItem>
                        <SelectItem value="Letter">Letter (216x279mm)</SelectItem>
                        <SelectItem value="Custom">Benutzerdefiniert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom dimensions (only show if Custom is selected) */}
                  {printSettings.pageFormat === 'Custom' && (
                    <>
                      <div className="space-y-2">
                        <Label>Blattbreite (mm)</Label>
                        <Input
                          type="number"
                          value={printSettings.customWidth}
                          onChange={(e) => setPrintSettings(prev => ({ 
                            ...prev, 
                            customWidth: Number(e.target.value) 
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Blatthöhe (mm)</Label>
                        <Input
                          type="number"
                          value={printSettings.customHeight}
                          onChange={(e) => setPrintSettings(prev => ({ 
                            ...prev, 
                            customHeight: Number(e.target.value) 
                          }))}
                        />
                      </div>
                    </>
                  )}

                  {/* Labels per row/column */}
                  <div className="space-y-2">
                    <Label>Etiketten pro Reihe</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={printSettings.labelsPerRow}
                      onChange={(e) => setPrintSettings(prev => ({ 
                        ...prev, 
                        labelsPerRow: Number(e.target.value) 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Etiketten pro Spalte</Label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={printSettings.labelsPerColumn}
                      onChange={(e) => setPrintSettings(prev => ({ 
                        ...prev, 
                        labelsPerColumn: Number(e.target.value) 
                      }))}
                    />
                  </div>

                  {/* Margins */}
                  <div className="space-y-2">
                    <Label>Oberer Rand (mm)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={printSettings.topMargin}
                      onChange={(e) => setPrintSettings(prev => ({ 
                        ...prev, 
                        topMargin: Number(e.target.value) 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Linker Rand (mm)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={printSettings.leftMargin}
                      onChange={(e) => setPrintSettings(prev => ({ 
                        ...prev, 
                        leftMargin: Number(e.target.value) 
                      }))}
                    />
                  </div>

                  {/* Spacing */}
                  <div className="space-y-2">
                    <Label>Horizontaler Abstand (mm)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={printSettings.horizontalSpacing}
                      onChange={(e) => setPrintSettings(prev => ({ 
                        ...prev, 
                        horizontalSpacing: Number(e.target.value) 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Vertikaler Abstand (mm)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={printSettings.verticalSpacing}
                      onChange={(e) => setPrintSettings(prev => ({ 
                        ...prev, 
                        verticalSpacing: Number(e.target.value) 
                      }))}
                    />
                  </div>

                  {/* Label dimensions */}
                  <div className="space-y-2">
                    <Label>Etikettenbreite (mm)</Label>
                    <Input
                      type="number"
                      min="10"
                      value={printSettings.labelWidth}
                      onChange={(e) => setPrintSettings(prev => ({ 
                        ...prev, 
                        labelWidth: Number(e.target.value) 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Etikettenhöhe (mm)</Label>
                    <Input
                      type="number"
                      min="10"
                      value={printSettings.labelHeight}
                      onChange={(e) => setPrintSettings(prev => ({ 
                        ...prev, 
                        labelHeight: Number(e.target.value) 
                      }))}
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Info:</strong> Es werden {mockAssets.length} Etiketten für die verfügbaren Assets generiert. 
                    Pro Seite passen {printSettings.labelsPerRow * printSettings.labelsPerColumn} Etiketten.
                    Das PDF wird in einem neuen Browser-Tab geöffnet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DndProvider>
  )
}
