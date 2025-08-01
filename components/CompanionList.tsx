import { cn, getSubjectColor} from "../lib/utils"
import Link from 'next/link'
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  className?: string;
}

const CompanionList = ({title, companions, className} : CompanionsListProps) => {
  return (
    <article className={cn('companion-list', className)}>
      <h2 className="font-bold text-3xl">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-1/3">Lessons</TableHead>
            <TableHead className="text-lg text-center">Subject</TableHead>
            <TableHead className="text-lg text-center">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({id, name, topic, subject, duration}) => (
            <TableRow key={id}>
              <TableCell>
                <Link href={`companions/${id}`}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                      style={{backgroundColor:getSubjectColor(subject)}}
                    >
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">
                        {name}
                      </p>
                      <p className="text-xl">
                        {topic}
                      </p>
                    </div>
                  </div>
                </Link>
              </TableCell>

              <TableCell>
                <div  className="flex justify-center">
                  <div className="subject-badge w-fit max-md:hidden">
                    {subject}
                  </div>
                  <div 
                    className="rounded-lg  w-fit p-2 md:hidden"
                    style={{backgroundColor: getSubjectColor(subject)}}
                  >
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={17}
                      height={17}
                    />
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2 w-full ">
                  <p className="text-2xl">
                    {duration} {' '}
                    <span className="max-md:hidden">mins</span>
                  </p>
                  <Image src={`icons/clock.svg`} alt="minutes" width={17}
                    height={17}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  )
}

export default CompanionList