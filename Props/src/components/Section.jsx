
export default function Section({title, children, ...props}) {

    //({...props})=> this will collect all other remaniing props into a single object called props
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}