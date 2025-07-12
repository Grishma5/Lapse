/*export function Buttons({label,onclick,className}) {
    return(
        <div>
            <button onClick={onclick}
             className={`${className ? className :
             'bg-green-500 text-white p-2 m-4 rounded-sm'}`}>{label}</button>
        </div>
    )
}


export function Textfields({ type, onChange, placeholder , name }) {
    return (
        <div>
            <input type={type} placeholder={placeholder} name={name}
            onChange={onChange} className='border border-amber-500' />
            </div>
      )
}*/

export function Buttons({ label, onclick, className }) {
    return (
        <div>
            <button 
                onClick={onclick}
                className={className ? className : 'bg-green-500 text-white p-2 m-4 rounded-sm'}
            >
                {label}
            </button>
        </div>
    )
}

export function Textfields({ type = "text", onChange, placeholder, name }) {
    return (
        <div>
            <input 
                type={type} 
                placeholder={placeholder} 
                name={name}
                onChange={onChange} 
                className='border border-amber-500 p-2 m-2' 
            />
        </div>
    )
}