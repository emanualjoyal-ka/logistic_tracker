import ProtectedRoute from "@/components/auth/ProtectedRoute";



const PartnerLayout=({children}:{children:React.ReactNode})=>{
    return(
        <div>
            <main>
            <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]}>
            {children}
            </ProtectedRoute>
            </main>
        </div>
    )
}

export default PartnerLayout;