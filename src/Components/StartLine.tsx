import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {IProduct} from "../models";
interface IPropsPostHours{
    name:string,
    desc:string,
    shortDesc:string,
    image?:File
}
interface PropAuth {
    login: string,
    password: string
}
export let config = {
    headers:{ Authorization: `Bearer ` }

}

export function StartLine() {

    function check(event:React.FormEvent){
        event.preventDefault()

    }
    function check1(event:React.FormEvent){
        event.preventDefault()

    }
    function addLog(login:string,password:string){
       const response  = axios.post(`https://localhost:7196/registr?login=${login}&password=${password}`)
        setFormreg(false)


    }
    async function fetchProducts(){
        const response = await axios.get<IProduct[]>('https://localhost:7196/api/Horse')

        setProduct(response.data)

    }
    useEffect( ()=>{
        fetchProducts()

    },[])
     async function getToken(login:string,password:string){
        try {
            const response =await axios.post<string>(`https://localhost:7196/token?username=${loginInput}&password=${password}`)
            setForm(false)
            setError(false)
            setIsReg(false)


            config.headers.Authorization+=response.data
            console.log(config)




        }catch (e:unknown){
            const error = e as AxiosError
            setForm(true)
            setError(true)
            setTextError(error.message)

        }
    }
    async function AddHours(Hours:IPropsPostHours){
        const formData = new FormData();
        formData.append('name',Hours.name)
        formData.append('shortDesc',Hours.shortDesc)
        formData.append('desc',Hours.desc)
        if (Hours.image)
        {formData.append('image',Hours.image)}
        fetchProducts()

        setAddItem(false)

        const response  = axios({
            method: "post",
            url: 'https://localhost:7196/Add',
            headers:{ "Content-Type": "multipart/form-data","Authorization": config.headers.Authorization },
            data: formData

        })
            .then(function (response) {
                //handle success
                console.log('50000'+response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    }

    const onChangeImage = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            setImage(files[0])
        }
        console.log(image?.name)
    }
    const [product,setProduct]  = useState<IProduct[]>([])
    const [form, setForm] = useState(false)
    const [loginInput,setLoginInput] = useState('')
    const [loginInputReg,setLoginInputReg] = useState('')
    const [passwordInputReg,setPasswordInputReg] = useState('')

    const [passwordInput,setPasswordInput] = useState('')
    const [error,setError] = useState(false)
    const [textError,setTextError] = useState('')
    const [formreg,setFormreg] = useState(false)
    const [IsReg,setIsReg] = useState(true)
    const [addItem,setAddItem] = useState(false)
    const [name,setName] = useState('')
    const [shortDesc,setShortDesc] = useState('')
    const [desc,setDesc] = useState('')
    const [image,setImage] = useState<File>()
    return (
        <>
            <div className='startContainer'>
                <button className='btn'>Main</button>
                <button className='btn' onClick={()=>setAddItem(prev => !prev)}>AddHorse</button>
                <div>{IsReg&&<button onClick={() => setForm(prev => !prev)} className='btn'>Login</button>}<button onClick={() => setFormreg(prev => !prev)} className='btn'>Registration</button></div>
            </div>
            {form&&<div className="formContainer" onSubmit={check}>
                <div className="item">Login</div>
                <input onChange={event => setLoginInput(event.target.value)} value={loginInput}></input>
                <div className="item">Password</div>
                <input onChange={event => setPasswordInput(event.target.value)} value={passwordInput}></input>
                <button onClick={()=>getToken(loginInput,passwordInput)}>Войти</button>
                {error&&<div className='itemerror'>{textError}</div>}
            </div>}
            {formreg&&<div className="formContainer" onSubmit={check1}>
                <div className="item">Login</div>
                <input onChange={event => setLoginInputReg(event.target.value)} value={loginInputReg}></input>
                <div className="item">Password</div>
                <input onChange={event => setPasswordInputReg(event.target.value)} value={passwordInputReg}></input>
                <button onClick={()=>addLog(loginInputReg,passwordInputReg)}>Зарегестрироваться</button>

            </div>}
            {addItem&&<div className='formContainer' onSubmit={check1}>
                <div className="item">Name</div>
                <input onChange={event => setName(event.target.value)} value={name}></input>
                <div className="item">Description</div>
                <input onChange={event => setDesc(event.target.value)} value={desc}></input>
                <div className="item">ShortDescription</div>
                <input onChange={event => setShortDesc(event.target.value)} value={shortDesc}></input>
                <input type='file' onChange={onChangeImage}  />
                <button onClick={()=>AddHours({name,desc,shortDesc,image})}>Add horse </button>
            </div>}
        </>
    )
}