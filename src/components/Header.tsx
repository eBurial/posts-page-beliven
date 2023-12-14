import Image from "next/image";


export default function Header() {

    return (
        <div className="w-100 border-white flex items-center p-5">
            <Image alt="logo" src={'/logo-fiamma.svg'} width={200} height={100}></Image>
        
        </div>
    )
}