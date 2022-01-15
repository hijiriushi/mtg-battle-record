import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'

import  { db } from '../firebase/initFirebase'
import { collection, getDocs, Timestamp } from 'firebase/firestore'

const seeResult = () => {
        const [results, setResults] = useState([]);
        
        useEffect(async () => {
            try{
                const items = [];
                const ref = collection(db, "results");
                const documents = await getDocs(ref);
                documents.forEach(doc => {
                items.push(doc.data());
            })
            console.log(items);
            setResults(items);
            } catch (error) {
                console.log(error)
            }
        }, []);

        const calcWinLose = ((r1, r2, r3) => {
            let win = 0, lose = 0, draw = 0;
            if (r1 == "win") {win++}
            else if (r1 == "lose") {lose++}
            else draw++

            if (r2 == "win") {win++}
            else if (r2 == "lose") {lose++}
            else draw++

            if (r3 == "win") {win++}
            else if (r3 == "lose") {lose++}
            else draw++

            return (
                <>
                    {win}-{lose}-{draw}
                </>
            )
        })

        const colorWinLose = ((res) => {
            if (res == "win") {
                return (
                    <div className="text-4xl font-bold text-blue-900">
                    {res}
                    </div>
                )
            }
            else if (res == "lose") {
                return (
                    <div className="text-4xl font-bold text-red-900">
                    {res}
                    </div>
                )
            }
            else {
                return (
                    <div className="text-4xl font-bold text-gray-900">
                    {res}
                    </div>
                )
            }
        })

    return (
        <Layout>
        <Head>
            <title>対戦戦績</title>
        </Head>
        <h1 className = "text-4xl font-bold my-6 text-center">対戦成績</h1>
        <h2><Link href = '/'><a>Back</a></Link></h2>
        <ul>
        {results.map((res, index) => {
            return (
                <li key={index} className = "flex shadow border mb-2 px-4 py-4">
                    <div className="w-1/3">  
                        <div className="text-sm font-bold -mb-1 text-gray-700">
                            日付
                        </div>
                        <div className="mb-2 text-lg font-bold">
                            {res.date.toDate().toDateString().split(' ').slice(1).join(' ')}
                        </div>
                        <div className="text-sm font-bold -mb-1 text-gray-700">
                            結果
                        </div>
                        <div className="text-lg font-bold">
                            {colorWinLose(res.result)}
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="text-sm font-bold -mb-1 text-gray-700">
                            対戦デッキ
                        </div>
                        <div className="text-lg font-bold">
                            {res.arch}
                        </div>
                </div>
                    <div className="w-1/3">
                        <div className="text-sm font-bold -mb-1 text-gray-700">
                            勝敗
                        </div>
                        <div className="text-lg font-bold">
                            {calcWinLose(res.game1, res.game2, res.game3)}
                        </div>
                    </div>
                    </li>
            )
        })}
        </ul>
        <Navbar />
        </Layout>
    ) 
  }

  export default seeResult;