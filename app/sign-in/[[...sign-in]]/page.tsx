import { SignIn } from '@clerk/nextjs'
// import 'clerk-themez/themes/moonlitflux.css'; //ngasih tema di halaman sign-in

export default function Page() {
    return <main className="main-layout flex items-center mt-10 mb-20 justify-center">
        <SignIn />
    </main>
}