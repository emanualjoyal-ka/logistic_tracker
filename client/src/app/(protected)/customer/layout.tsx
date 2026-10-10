import ProtectedRoute from "@/components/auth/ProtectedRoute";



const CustomerLayout=({children}:{children:React.ReactNode})=>{
    return(
        <div>
            <main className="px-4 md:px-8 lg:px-20 xl:px-[16.5rem]">
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            {children}
            </ProtectedRoute>
            </main>
        </div>
    )
}

export default CustomerLayout;