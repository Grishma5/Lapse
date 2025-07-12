import React, { useState } from 'react'

export const ListandKeys = () => {
    const [list] = useState([{ id: 1, name: "product1",
        price: 120 , image:"vite.svg"},
        { id: 2, name: "product2", price: 130 }])
    return (
        <div>
            <ul className='flex flex-col'>
                {list.map((item, index) => (
                    <div className='border border-amber-500 m-4'>
                        <li key={index} > {item}</li>

                    </div>
                ))}
            </ul>
            </div>
      )
}

/*import React, { useState } from 'react'

export const ListandKeys = () => {
    const [list, setList] = useState([
        { id: 1, name: "product1", price: 120, image: "vite.svg" },
        { id: 2, name: "product2", price: 130, image: "vite.svg" }
    ])
    
    return (
        <div>
            <ul className='flex flex-col'>
                {list.map((item) => (
                    <div key={item.id} className='border border-amber-500 m-4 p-4'>
                        <li>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            {item.image && <img src={item.image} alt={item.name} className="w-16 h-16" />}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}
    */