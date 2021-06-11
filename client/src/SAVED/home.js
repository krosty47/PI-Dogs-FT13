// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getAllBreeds, getBreedName, getDetailBreed, getTemperaments } from '../../actions/index';

// import './home.css'

// export default function Home() {


//     /////--------DISPATCH Y STORE------------///
//     const dispatch = useDispatch();
//     let allBreeds = useSelector(state => state.breeds);
//     /////------------------------------------///

//     //-----------USE EFFECT for HOME-------///

//     useEffect(() => {
//         dispatch(getAllBreeds())
//     }, [dispatch]);

//     //------------------------------------///


//     /////-------BACK AND FOWARD PAGE-------///

//     const [list, setList] = useState(1)
//     const s2 = (list * 8)
//     const s1 = (s2 - 8)
//     var view = allBreeds.slice(s1, s2)

//     const handleClickBack = (e) => {
//         e.preventDefault()
//         if (list > 1) {
//             setList(list - 1)
//         }
//     };

//     //--------------------------------------///

//     //------------ASC-DES-----------------///

//     //const [order, setOrder] = useState(2)

//     // const orderHandler = (e) => {
//     //     if (e.target.value === 'ASC' || e.target.value === 'DES') {
//     //         dispatch(asdOrder())
//     //     }
//     // };

//     console.log(allBreeds)

//     //----------------FORM------------------///

//     const [input, setInput] = useState({
//         breed: "",
//     })

//     const handbleInput = (e) => {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//     };
//     const handleDispatch = (e) => {
//         e.preventDefault();
//         input.breed ? dispatch(getBreedName(input.breed)) : alert("You must enter a valid breed name")
//     }
//     //-------------------------------------///






//     return (
//         <div className='home'>
//             {/* SEARCH BAR */}

//             <li>
//                 <form className='formBreeds' onSubmit={handleDispatch}>

//                     <div>
//                         <input
//                             type='text'
//                             autoComplete='off'
//                             placeholder='Breeds'
//                             name='breed'
//                             value={input.breed}
//                             onChange={handbleInput}
//                         />
//                     </div>
//                     <button className='formButton' type='submit'>Search</button>
//                 </form>
//             </li>

//             {/* BREED CARDS */}

//             <div className='cards'>
//                 <div>
//                     {view && view.map((el) => (

//                         <div className='cardBreed' key={el.id}>
//                             <h2>{el.name}</h2>
//                             <p>{el.temperament}</p>
//                             <Link to={`/detail/${el.id}`}>
//                                 <img src={el.img} className='cardImage' />
//                             </Link>
//                         </div>

//                     ))}
//                 </div>
//             </div>
//             {/* <button onClick={orderHandler}>PROBA ACA PAPU</button> */}

//             {/* <select className='select' onChange={orderHandler}>

//                 <option>ORDER</option>
//                 <option value={'ASC'}>ASCENDING ORDER</option>
//                 <option value={'DES'}>DESCENDING ORDER</option>

//             </select> */}

//             <div className='listPages'>

//                 <button onClick={handleClickBack}>Backward</button>
//                 <button>{list}</button>
//                 <button onClick={() => setList(list + 1)}>Forward</button>

//             </div>

//         </div>
//     )
// };
