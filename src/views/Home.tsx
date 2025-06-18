import React from 'react'

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard | لوحة التحكم
            </h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <OverviewCard
                    label="Total Bookings | إجمالي الحجوزات"
                    value="1,245"
                />
                <OverviewCard
                    label="Active Rooms | الغرف المتاحة"
                    value="128"
                />
                <OverviewCard
                    label="Total Revenue | إجمالي الإيرادات"
                    value="$94,300"
                />
                <OverviewCard
                    label="Pending Reviews | المراجعات المعلقة"
                    value="12"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow mb-10">
                <h2 className="text-xl font-semibold mb-4">
                    Quick Actions | إجراءات سريعة
                </h2>
                <div className="flex flex-wrap gap-4">
                    <ActionButton label="Add New Room | إضافة غرفة جديدة" />
                    <ActionButton label="Manage Bookings | إدارة الحجوزات" />
                    <ActionButton label="User Accounts | حسابات المستخدمين" />
                    <ActionButton label="Reports | التقارير" />
                </div>
            </div>

            {/* Room Status Table (Optional) */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                    Room Status | حالة الغرف
                </h2>
                <table className="w-full text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Room</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">View</th>
                            <th className="p-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Deluxe 101</td>
                            <td className="p-2">Deluxe</td>
                            <td className="p-2 text-green-600">Available</td>
                            <td className="p-2">Sea View</td>
                            <td className="p-2">$150/night</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Standard 202</td>
                            <td className="p-2">Standard</td>
                            <td className="p-2 text-red-600">Occupied</td>
                            <td className="p-2">City View</td>
                            <td className="p-2">$90/night</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// OverviewCard Component
function OverviewCard({ label, value }: any) {
    return (
        <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500 mb-2">{label}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </div>
    )
}

// ActionButton Component
function ActionButton({ label }: any) {
    return (
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            {label}
        </button>
    )
}
