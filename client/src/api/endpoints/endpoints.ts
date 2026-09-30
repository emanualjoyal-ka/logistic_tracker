

export const API_ENDPOINTS={
    auth:{
        REGISTER:"/auth/register",
        LOGIN:"/auth/login",
        LOGOUT:"/auth/logout",
        ME:"/auth/me",
        REFRESH_TOKEN:"/auth/refresh-token"
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
        GET_CURRENT_TRACKING:(orderId:string)=>`/tracking/orders/${orderId}/current`,
    }
}