import { UserRole } from "@/types/auth";
import { LayoutDashboard, LucideIcon, Package,PackageOpen,Truck } from "lucide-react";

type sideBar={
    id:number;
    title:string;
    link:string;
    icon:LucideIcon;
    role:UserRole;
}

type sideBarItems={
    admin:sideBar[];
    customer:sideBar[];
    delivery_partner:sideBar[];
}

export const sidebarItems:sideBarItems = {
    admin:[
    {
        id:1,
        title:"Dashboard",
        link:"/admin/dashboard",
        icon:LayoutDashboard,
        role:"ADMIN"
    },
    {
        id:2,
        title:"Orders",
        link:"/admin/orders",
        icon:Package,
        role:"ADMIN"
    },
    {
        id:3,
        title:"Partners",
        link:"/admin/partners",
        icon:Truck,
        role:"ADMIN"
    }
    ],
    customer:[
    {
        id:1,
        title:"Dashboard",
        link:"/customer/dashboard",
        icon:LayoutDashboard,
        role:"CUSTOMER"
    },
    {
        id:2,
        title:"Orders",
        link:"/customer/orders",
        icon:Package,
        role:"CUSTOMER"
    }
    ],
    delivery_partner:[
    {
        id:1,
        title:"Dashboard",
        link:"/partner/dashboard",
        icon:LayoutDashboard,
        role:"DELIVERY_PARTNER"
    },
    {
        id:2,
        title:"Deliveries",
        link:"/partner/deliveries",
        icon:PackageOpen,
        role:"DELIVERY_PARTNER"
    }
    ]
}
