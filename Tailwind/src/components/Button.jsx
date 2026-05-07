

export default function Button({children, ...props}){
    return(
        <button className="px-4 py-2 font-semibold uppercase rounded text-stone-200 hover:bg-amber-500 transition-colors duration-300 ease-in-out"{...props}>{children}</button>
    )
}