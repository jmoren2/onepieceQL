import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

const Home: NextPage = () => {
    const createUrl = '/api/characters/create'
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [link, setLink] = useState('')

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setName(event.target.value)
    }

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setDesc(e.target.value)
    }

    const handleLinkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setLink(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault()
        const newCharacter = {
            name: name,
            description: desc,
            link: link
        }

        let response = await axios.post('http://localhost:4000' + createUrl, newCharacter)
        console.log(response)
        
        resetState()
    }

    const resetState = () =>{
        setName('')
        setDesc('')
        setLink('')
    }
    return (
        <div>
        <div className='container'>
            <h1>New Character</h1>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Name' onChange={handleNameChange} value={name} className='form-control form-group' />
                    <textarea placeholder='Body' onChange={handleDescChange} value={desc} className='form-control form-group' />
                    <textarea placeholder='Body' onChange={handleLinkChange} value={link} className='form-control form-group' />
                    <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Home
