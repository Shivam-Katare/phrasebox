import * as React from "react";
import { usePathname } from "next/navigation";
import { Carattere } from "next/font/google";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { FileText, LayoutDashboard, Save, Bell, AlertCircle, MousePointerClick, LoaderPinwheelIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Image from "next/image";
import Logo from "@/app/public/logoTwo.svg";

// Sample data
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Start Exploring",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/user/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Generate",
          url: "/user/generate",
          icon: SparklesIcon,
        },
        {
          title: "Templates",
          url: "/user/templates",
          icon: FileText,
          subItems: [
            {
              title: "Buttons",
              url: "/user/templates/buttons",
              icon: MousePointerClick,
            },
            {
              title: "Alerts",
              url: "/user/templates/alerts",
              icon: AlertCircle,
            },
            {
              title: "Tooltips",
              url: "/user/templates/tooltips",
              icon: Bell,
            },
            {
              title: "Loadings",
              url: "/user/templates/loadings",
              icon: LoaderPinwheelIcon,
            },
            {
              title: "Error Pages",
              url: "/user/templates/errorpages",
              icon: AlertCircle,
            }
          ],
        },
        {
          title: "Saves",
          url: "/user/saves",
          icon: Save,
        },
      ],
    },
  ],
};

const carattere = Carattere({ subsets: ["latin"], weight: "400" });


export function AppSidebar({ ...props }) {
  const currentPath = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} /> */}
        {/* <Image src={Logo} alt="Phrase Box" width={120} height={40} /> */}
        <h1 className={`text-[40px] text-center pt-[14px] font-bold text-black ${carattere.className}`}>Phrase Box</h1>
      </SidebarHeader>
      <SidebarContent>
        {/* Create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((menuItem) => (
                  <React.Fragment key={menuItem.title}>
                    {/* If the menu item has sub-items, render them in a collapsible */}
                    {menuItem.subItems ? (
                      <Collapsible defaultOpen={menuItem.isActive} className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton isActive={menuItem.isActive || currentPath.startsWith(menuItem.url)}>
                              <menuItem.icon className="mr-2 h-5 w-5" />
                              {menuItem.title}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {menuItem.subItems.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuButton asChild isActive={currentPath === subItem.url}>
                                    <Link href={subItem.url}>
                                      <subItem.icon className="mr-2 h-5 w-5" />
                                      {subItem.title}
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={currentPath === menuItem.url}>
                          <Link href={menuItem.url}>
                            <menuItem.icon className="mr-2 h-5 w-5" />
                            {menuItem.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
