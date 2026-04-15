import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementBy5 } from '../slices/counterSlice';
const Counter = () => {
    const counterValue=useSelector((state)=>state.counter.value)
    const dispatch=useDispatch();
  return (
    <div>
        <h1>{counterValue}</h1>
        <button onClick={()=>{dispatch(increment())}}>increment</button>
        <button onClick={()=>{dispatch(decrement())}}>decrement</button>
        <button onClick={()=>{dispatch(incrementBy5())}}>increment by 5</button>
    </div>
  )
}

export default Counter