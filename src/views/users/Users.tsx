import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import UsersTable from '@/components/users/UsersTable'

const CustomerList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Users</h3>
                        </div>
                        <UsersTable onUserUpdated={() => {}} />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default CustomerList
