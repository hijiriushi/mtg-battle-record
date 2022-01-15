import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'

import  { db } from '../firebase/initFirebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'

const AddResult = () => {
        const resetForm = () => {
            Array.from(document.querySelectorAll("input")).forEach(
                input => (
                    input.value = "",
                    input.checked = false
                    )
            );
        }

        const notify = () => toast('登録完了', {
            duration: 4000,
            position: 'top-center',
        });

        const handleSubmit = (event) => {
            const tmpobj = {};
            event.preventDefault();
            tmpobj.date = Timestamp.fromDate(new Date(event.target.day.value));
            tmpobj.arch = event.target.arch.value;
            tmpobj.result = event.target.result.value;
            tmpobj.game1 = event.target.game1.value;
            tmpobj.game2 = event.target.game2.value;
            tmpobj.game3 = event.target.game3.value;
            tmpobj.order = event.target.order.value;
            console.log(tmpobj);

            registerResult(tmpobj);
    }

    const registerResult = (async (obj) => {
        try{
            notify();
            resetForm();
            await addDoc(collection(db, "results"), obj);
        } catch (error) {
            console.log(error);
        }
    })

    return (
    <Layout>
    <Head>
        <title>対戦戦績登録</title>
    </Head>
    <h1 className = "text-4xl font-bold my-6 text-center">対戦戦績登録</h1>
    <h2><Link href = '/'><a>Back</a></Link></h2>
    <form  onSubmit={handleSubmit} className = "flex flex-col items-center bg-white rounded mb-4">
    <div className = "w-full mb-10">
        <label className = "block text-gray-700 text-sm font-bold mb-2">対戦日</label> 
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="day" type="date" name="day" placeholder="" required></input>
    </div>
    <div className="w-full mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
       対戦アーキタイプ
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="arch" type="text" name="arch" required></input>
    </div>

    <div className="w-full mb-6">
  <span className="text-gray-700 text-sm font-bold">結果</span>
  <div className="mt-2">
    <label className="inline-flex items-center">
      <input type="radio" className="form-radio" name="result" value="win" required></input>
      <span className="ml-2">勝利</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="result" value="lose" required></input>
      <span className="ml-2">敗北</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="result" value="draw" required></input>
      <span className="ml-2">引分</span>
    </label>
  </div>
</div>

<div className="w-full mb-6">
  <span className="text-gray-700 text-sm font-bold">順番</span>
  <div className="mt-2">
    <label className="inline-flex items-center">
      <input type="radio" className="form-radio" name="order" value="first" required></input>
      <span className="ml-2">先手</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="order" value="second" required></input>
      <span className="ml-2">後手</span>
    </label>
  </div>
</div>

<div className="w-full mb-6">
  <span className="text-gray-700 text-sm font-bold">Game1</span>
  <div className="mt-2">
    <label className="inline-flex items-center">
      <input type="radio" className="form-radio" name="game1" value="win" required></input>
      <span className="ml-2">勝利</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="game1" value="lose" required></input>
      <span className="ml-2">敗北</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="game1" value="draw" required></input>
      <span className="ml-2">引分</span>
    </label>
  </div>
</div>

<div className="w-full mb-6">
  <span className="text-gray-700 text-sm font-bold">Game2</span>
  <div className="mt-2">
    <label className="inline-flex items-center">
      <input type="radio" className="form-radio" name="game2" value="win" required></input>
      <span className="ml-2">勝利</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="game2" value="lose" required></input>
      <span className="ml-2">敗北</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="game2" value="draw" required></input>
      <span className="ml-2">引分</span>
    </label>
  </div>
</div>

<div className="w-full mb-10">
  <span className="text-gray-700 text-sm font-bold">Game3</span>
  <div className="mt-2">
    <label className="inline-flex items-center">
      <input type="radio" className="form-radio" name="game3" value="win" required></input>
      <span className="ml-2">勝利</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="game3" value="lose" required></input>
      <span className="ml-2">敗北</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="game3" value="draw" required></input>
      <span className="ml-2">引分</span>
    </label>
  </div>
</div>

    <button className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
    type="submit">
        登録
      </button>
        </form>
        <Toaster toastOptions={{
            className: '',
            style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#FFFFFF',
            background: "#3B82F6"
            },
        }} 
        />
        <Navbar />
        </Layout>
    ) 
  }

  export default AddResult;