export default function Input({ label, invalid, ...props}) {
  let labelClasses = "block mb-2 text-sm font-bold tracking-wide uppercase";
  let inputClasses = "w-full px-3 py-2 leading-tight rounded shadow";

    if(invalid){
       labelClasses += " text-red-400";
       inputClasses += " text-red-400 border-red-300 bg-red-100";
    }else {
         labelClasses += " text-stone-200";
         inputClasses += " text-red-700 bg-stone-300";
    }
    return (
        <p>
            <label className={labelClasses}>{label}</label>
            <input className={inputClasses} {...props} />
        </p>
    )
}