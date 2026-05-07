import { Children } from "react";


export default function TabButton({children,handleClick,isSelected}) {
        return <button className={isSelected ? 'active' : null} onClick={handleClick}>{children}</button>
}