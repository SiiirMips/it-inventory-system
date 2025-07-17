"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    items: {
      title: string
      url?: string
      icon?: LucideIcon
      isActive?: boolean
      items?: {
        title: string
        url?: string
        icon?: LucideIcon
        items?: {
          title: string
          url: string
          icon?: LucideIcon
        }[]
      }[]
    }[]
  }[]
}) {
  return (
    <>
      {items.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url || "#"}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <Collapsible key={subItem.title} asChild>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url || "#"}>
                                    {subItem.icon && <subItem.icon />}
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                                {subItem.items?.length ? (
                                  <>
                                    <CollapsibleTrigger asChild>
                                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                                        <ChevronRight />
                                        <span className="sr-only">Toggle</span>
                                      </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                      <SidebarMenuSub>
                                        {subItem.items?.map((subSubItem) => (
                                          <SidebarMenuSubItem key={subSubItem.title}>
                                            <SidebarMenuSubButton asChild>
                                              <a href={subSubItem.url}>
                                                {subSubItem.icon && <subSubItem.icon />}
                                                <span>{subSubItem.title}</span>
                                              </a>
                                            </SidebarMenuSubButton>
                                          </SidebarMenuSubItem>
                                        ))}
                                      </SidebarMenuSub>
                                    </CollapsibleContent>
                                  </>
                                ) : null}
                              </SidebarMenuSubItem>
                            </Collapsible>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
