import * as React from "react";
import { usePathname } from "next/navigation";
import { Carattere, Onest } from "next/font/google";
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
import { FileText, Save, Bell, AlertCircle, MousePointerClick, LoaderPinwheelIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Sample data
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Start Exploring",
      url: "#",
      items: [
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
            },
            {
              title: "Welcomes",
              url: "/user/templates/welcome",
              icon: Bell,
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

const inter = Onest({ subsets: ["latin"] });

export function AppSidebar({ ...props }) {
  const currentPath = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className={`text-[30px] text-center pt-[14px] font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${inter.className}`}>Phrase Box</h1>
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
                    {menuItem.subItems ? (
                      <Collapsible defaultOpen={true} className="group/collapsible">
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
