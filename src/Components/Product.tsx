import React from "react";
import {IProduct} from "../models";
import axios from "axios";
import {config} from "./StartLine";

interface ProductProps {
    product: IProduct
}

function Delete(id:number){
    axios.delete(`https://localhost:7196/Delete?id=${id}`,config)
}



export function Product({product}: ProductProps) {
    return (
        <div className='container'>
            <img   src={`https://localhost:7196/api/Horse/${product.id}/image`}></img>
            <div className='containerCol'>
                <div className='itemTitle'>Название породы</div>
                <div className='item'>{product.name}</div>
                <div className='itemTitle'>Описание</div>
                <div className='item'>{product.desc}</div>
                <div className='itemTitle'>Краткое описание</div>
                <div className='item'>{product.shortDesc}</div>
                <button className='btnDel' onClick={()=>Delete(product.id)} value={`${product.id}`}>Удалить </button>
            </div>



        </div>
    )
}