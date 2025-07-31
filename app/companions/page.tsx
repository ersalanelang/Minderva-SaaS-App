import {getAllCompanions} from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const user = await currentUser()
    if (!user) {redirect('/')}
    const companions = await getAllCompanions({ subject, topic, userId: user.id});

    return (
        <main>
            <section className="">
                <h1 className="pb-3">Companion Library</h1>
                <div className="flex gap-4 items-center max-md:gap-1">
                    {/* SearchInput mengambil space lebih banyak */}
                    <div className="flex-1">
                        <SearchInput />
                    </div>
                    <div>
                        <SubjectFilter />
                    </div>
                    <Link href="/companions/new">
                    <button className="btn-primary font-semibold h-10 px-3 py-2 whitespace-nowrap">
                        <span>Add</span>
                        <span className="text-lg leading-none ml-1">+</span>
                    </button>
                    </Link>
                </div>
            </section>
            <section className="companions-grid">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        </main>
    )
}

export default CompanionsLibrary
