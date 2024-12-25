import { FaMagnifyingGlass } from "react-icons/fa6";
export default function Navbar() {
    const navLinks = [
        'Music',
        'Podcast',
        'Live',
        'Radio'
    ]
  return (
    <nav className="flex md:flex-row flex-col gap-2 items-center py-8 w-full sticky top-0 bg-[#6b1818] z-[4]">
      <ul className="flex items-center justify-around lg:w-[50%] w-full">
        {
            navLinks.map((link, id)=>(
                <li className="text-white" key={id}>{link}</li>
            ))
        }
      </ul>
      <div className="flex lg:flex-1 relative px-4 w-full">
        <input className="text-white bg-[#381515] px-4 py-[10px] rounded-full w-full" type="text" placeholder="Search Tracks" />
        <FaMagnifyingGlass className="absolute top-[34%] right-[2rem] text-white"/>
      </div>
    </nav>
  )
}
