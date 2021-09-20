import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { SetErrors } from "../store/session";

const ErrorComponent = () => {
   
    const errors = useSelector(state => state.session.errors)
    const dispatch = useDispatch()
    useEffect(()=>{
        const errorTimer = setTimeout(()=>{
            dispatch(SetErrors(null))
            
        }, 6000)
        return ()=>clearTimeout(errorTimer)
    
    },[errors])

    return (
       <> 
       {errors?<div className="errorDiv">
            {errors.map(e => (
                <span key={uuidv4()}>{e}</span>
            ))}

        </div>:null}
        </>
    )
}

export default ErrorComponent