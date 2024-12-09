import { ChangeEvent, FormEvent, useState } from "react"

export const useForm = <T>(state:T )=> {
    const [formData, setFormData]= useState(state)

    // const {email, name, password1, password2} = registerData;

    const onChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
    }

    const reset = ()=> {
        setFormData({...state})
    }

    const onSubmit = (e:FormEvent<HTMLFormElement>, handleSubmit: (data: T)=> void) => {
        e.preventDefault();
        handleSubmit(formData);
    }

    const isValidEmail = ( email: string ) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    return {
        // email, name, password1, password2, 
        ...formData,
        formData,
        onChange, onSubmit, reset, isValidEmail
    }
}
