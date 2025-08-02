import { SignIn } from '@clerk/nextjs'
import 'clerk-themez/themes/cosmicflux.css';

export default function Page() {
    return <main className="main-layout flex items-center mt-10 mb-20 justify-center">
        <SignIn />
    </main>
}