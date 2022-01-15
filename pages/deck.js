import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import toast, { Toaster } from 'react-hot-toast'
import {AiOutlineStar, Fa500Px } from 'react-icons/ai'

import  { db } from '../firebase/initFirebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

const setDeck = () => {
        const [main, setMain] = useState([]);
        const [side, setSide] = useState([]);
        const [title, setTitle] = useState("");
        const [section, setSection] = useState("main");
        const [cardNum, setCardNum] = useState(1);
        const [deck, setDeck] = useState({});
        const [tmp, setTmp] = useState('');
        const [decklist, setDecklist] = useState([]);
        const [registeredId, setRegisteredId] = useState("");
        const [editingDeckId, setEditingDeckId] = useState("");
        const [edit, setEdit] = useState(false);
        
        useEffect(async () => {
            try{
                const items = [];
                const ref = collection(db, "decks");
                const documents = await getDocs(ref);
                documents.forEach((doc, index) => {
                const data = doc.data();
                items.push({
                    main: data.main,
                    side: data.side,
                    title: data.title,
                    id: doc.id
                })
            })
            setDecklist(items);

            const documentsDeckId = await getDocs(collection(db, "registered"));
            const tmpRegisteredId = documentsDeckId.docs[0].data().id;
            setRegisteredId(tmpRegisteredId);
            } catch (error) {
                console.log(error)
            }
        }, [edit]);

        const notify = () => toast('登録完了', {
            duration: 4000,
            position: 'top-center',
        });

        const addCard = (event) => {
            const entry = {};
            event.preventDefault();
            if (tmp === "") {
                alert("文字を入力してください");
                return;
              }
            entry.name = tmp;
            entry.num = cardNum;
            if (section == "main") {
                setMain([...main, entry]);
            } else {
                setSide([...side, entry]);
            }
            setTmp("");
        };

        const removeCard = (index) => {
            if (section == "main") {
                const newCard = main.filter((card, cardIndex) => {
                    return index !== cardIndex;
                });
                setMain(newCard);
            } else {
                const newCard = side.filter((card, cardIndex) => {
                    return index !== cardIndex;
                });
                setSide(newCard);
            }
        }

        const resetField = () => {
            setTitle("")
            setCardNum(1)
            setMain([])
            setSide([])
            setSection("main")
            setEditingDeckId("")
        }

        const switchEdit = () => {
            if (edit) setEdit(false)
            else setEdit(true)
            resetField()
        }

        const addNum = () => {
            const tmp = cardNum + 1;
            if (tmp > 4) tmp = 4;
            setCardNum(tmp);
        }

        const decNum = () => {
            const tmp = cardNum - 1;
            if (tmp < 1) tmp = 1;
            setCardNum(tmp);
        }

        const registerDeck = async () => {
            if (title === "") {
                alert("デッキ名を登録してください");
                return;
              }
            deck.title = title;
            deck.main = main;
            deck.side = side;
            if (editingDeckId == "")
            {
                try{
                    notify();
                    await addDoc(collection(db, "decks"), deck);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try{
                    notify();
                    await updateDoc(doc(db, "decks", editingDeckId), {
                        main: main,
                        side: side,
                        title: title
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            setEdit(false);
            resetField()
        }

        const switchSection = (section) => {
            setSection(section);
        }

        const switchRegister = async (id) => {
            decklist.map((deck) => {
                if (id == deck.id) setRegisteredId(deck.id)
            })
            await updateDoc(doc(db, "registered", "deckId"), {
                "id": id
            });
        }

        const idToTitle = () => {
            const title = "";
            decklist.map((deck) => {  
                if(registeredId == deck.id) title = deck.title
            }) 
            return title
        }

        const editDeck = (id) => {
            setEdit(true)
            decklist.map((deck) => {
                if (id == deck.id) {
                    setTitle(deck.title)
                    setMain(deck.main)
                    setSide(deck.side)
                    setEditingDeckId(deck.id)
                }
            })
        }

        const deleteDeck = async (id) => {
            // keikoku hanei
            await deleteDoc(doc(db, "decks", id));
        }

    return (
        <Layout>
        <Head>
            <title>デッキ登録</title>
        </Head>
        <h1 className = "text-4xl font-bold my-6 text-center">デッキ登録</h1>
        <h2><Link href = '/'><a>Back</a></Link></h2>
       <div className=" flex justify-center flex-col text-center">
      {edit && (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    デッキ名
                </label>
                <input
                type="text"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={e => setTitle(e.target.value)}
                value={title}
                />
            <div className="w-full mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    カード名
                </label>
                <input
                type="text"
                name="deck"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={e => setTmp(e.target.value)}
                value={tmp}
                />
                <div className="flex justify-between items-end">
                <div className="w-1/2 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        数
                    </label>
                    <input
                    type="text"
                    name="deck"
                    className="shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={cardNum}
                    onChange={e => setNum(e.target.value)}
                    />
                    <button className="ml-1 shadow h-10  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={addNum}
                    >+</button>
                    <button className="ml-1 shadow h-10  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={decNum}
                    >-</button>
                </div>
                <button className="shadow h-10 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={addCard}>追加</button>
                </div>
            </div>
            <div className="flex flex-row justify-center mb-4">
                {section == "main" ? (
                        <>
                        <button onClick={() => switchSection("main")} className="py-2 px-6 hover:text-blue-500 focus:outline-none border-b-2 border-blue-500">メイン</button>
                        <button onClick={() => switchSection("side")} className="py-2 px-6 hover:text-blue-500 focus:outline-none">サイド</button>
                        </>
                        ) : (
                        <>
                        <button onClick={() => switchSection("main")} className="py-2 px-6 hover:text-blue-500 focus:outline-none">メイン</button>
                        <button onClick={() => switchSection("side")} className="py-2 px-6 hover:text-blue-500 focus:outline-none border-b-2 border-blue-500">サイド</button>
                        </>
                        )
                }
                </div>
            <ul className="text-left px-8 mb-4">
        {section == "main" ? (<>
            {main.map((card, index) => {
          return ( 
          <li key={index} className = "flex justify-between shadow border px-2 py-2">
              <div className="break-all w-1/2">{card.name}</div>
              <div>{card.num}</div>
              <button onClick={() => removeCard(index)}>x</button>
              </li>
          )})}
        </>) : (<>
            {side.map((card, index) => {
          return ( 
          <li key={index} className = "flex justify-between shadow border px-2 py-2">
              <div className="break-all w-1/2">{card.name}</div>
              <div>{card.num}</div>
              <button onClick={() => removeCard(index)}>x</button>
              </li>
          )})}
        </>)}
        
          </ul>
          <div className="flex flex-col items-center">
          <button className="block mb-4 shadow h-10 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={registerDeck}>保存</button>
        <button className="block" onClick={() => switchEdit()}>戻る</button>
        </div>
      </div>
      )}
      {edit == false && (
    <>
      <div className="font-bold">登録中のデッキ</div>
      <div className="mb-8">[ {idToTitle()} ]</div>
      <ul className="text-left">
        {decklist.map((deck, index) => {
          return ( 
          <li key={deck.id} className = "flex justify-between relative flex-col shadow border mb-2 px-2 py-4">
            {(deck.id == registeredId) && (
                <div className="absolute top w-2 h-24 flex items-center justify-center bg-red-400 -mt-4 -ml-2"></div>
            )}
            <div className = "flex items-center break-all ml-2 mb-2">
                <span className="font-bold">
                {deck.title}
                </span>
                </div>
          <div className = "ml-2">
          <button 
          onClick={() => switchRegister(deck.id)}
          className="shadow text-sm py-1 px-2 border rounded focus:outline-none focus:shadow-outline">
            登録
          </button>
          <button
          onClick={() => editDeck(deck.id)}
          className="shadow text-sm ml-2 py-1 px-2 border rounded focus:outline-none focus:shadow-outline">
            編集
          </button>
          <button
          onClick={() => deleteDeck(deck.id)}
          className="shadow text-sm ml-2 py-1 px-2 border rounded focus:outline-none focus:shadow-outline" >
            削除
        </button>
          </div>
          </li>
          )
        })}
         <li className = "flex text-3xl justify-center mb-2 px-4 py-4">
             <button className = "w-full" onClick={() => switchEdit()}>+</button>
          </li>
      </ul>
      </>
      )}
      </div>
        <Navbar />
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
        </Layout>
    ) 
  }

  export default setDeck;