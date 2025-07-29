import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cta = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge"> 
        Start learning your way
      </div>
      <h2 className="font-bold text-3xl">
        Build and personalize learning companion
      </h2>
      <p>
        Pick a name, subject, voice, & personality, to start learning through voice 
        conversations that feel natural and fun.
      </p>
      <Image 
        src="images/cta.svg"
        alt="cta"
        width={362}
        height={232}
      />
      <button className="btn-primary">
        <Image 
          src="icons/plus.svg"
          alt="plus"
          width={20}
          height={20}
        />
        <Link href="/companions/new">
          <p>Build a New Companion</p>
        </Link>
      </button>
    </section>
  )
}

export default Cta