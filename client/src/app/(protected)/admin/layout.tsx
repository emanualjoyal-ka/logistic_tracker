import ProtectedRoute from "@/components/auth/ProtectedRoute";



const AdminLayout=({children}:{children:React.ReactNode})=>{
    return(
        <div>
            <main>
            <ProtectedRoute allowedRoles={["ADMIN"]}>
            {children}
            </ProtectedRoute>
            </main>
        </div>
    )
}

export default AdminLayout;