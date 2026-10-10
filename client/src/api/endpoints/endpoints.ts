

export const API_ENDPOINTS={
    auth:{
        REGISTER:"/auth/register",
        LOGIN:"/auth/login",
        LOGOUT:"/auth/logout",
        ME:"/auth/me",
        REFRESH_TOKEN:"/auth/refresh"
    },
    orders:{
        GET_ORDERS:"/orders",
        GET_ORDER:(orderId:string)=>`/orders/${orderId}`,
        CANCEL_ORDER:(orderId:string)=>`/orders/${orderId}/cancel`,
    },
    partner:{
        GET_PROFILE:"/partner/profile",
        GET_ORDERS:"/partner/orders",
        GET_ORDER:(orderId:string)=>`/partner/order/${orderId}`,
        ACCEPT_DELIVERY:(orderId:string)=>`/partner/orders/${orderId}/accept`,
        PICKUP_ORDER:(orderId:string)=>`/partner/orders/${orderId}/pickup`,
        START_DELIVERY:(orderId:string)=>`/partner/orders/${orderId}/start`,
        ORDER_DELIVERED:(orderId:string)=>`/partner/orders/${orderId}/deliver`,
    },
    tracking:{
        GET_CURRENT_TRACKING:(orderId:string)=>`/tracking/orders/${orderId}/current`
    },
    admin:{
        GET_DASHBOARD_ORDERS:"/admin/dashboard",
        GET_CUSTOMER_ORDERS:"/admin/orders",
        GET_CUSTOMER_ORDER:(orderId:string)=>`/admin/orders/${orderId}`,
        GET_ALL_PARTNERS:"/admin/partners",
        GET_AVAILABLE_PARTNER:"/admin/partners/available",
        ASSIGN_ORDER:(orderId:string)=>`/admin/orders/${orderId}/assign`
    }
}