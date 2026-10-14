import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashBoardLayout from "@/components/layouts/DashboardLayout";



const ProtectedLayout=({children}:{children:React.ReactNode})=>{
    return(
        <div>
            <main>
            <ProtectedRoute>
                <DashBoardLayout>
                    {children}
                </DashBoardLayout>
            </ProtectedRoute>
            </main>
        </div>
    )
}

export default ProtectedLayout;