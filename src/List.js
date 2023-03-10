import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

const List = () => {
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const q = query(collection(db, "Messages"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setMsgs(messages);
    });
    return unsubscribe;
  }, []);

  // To send the message
  const sendMsg = async (e) => {
    e.preventDefault();
    const docRef = collection(db, "Messages");
    if (newMsg) {
      const q = await addDoc(docRef, { message: newMsg });
      setNewMsg("");
    }
  };

  // To delete the message
  const deleteMsg = async (id) => {
    const docRef = doc(db, "Messages", id);
    await deleteDoc(docRef);
  };

  // To handle the input
  const handleOnChange = (e) => {
    setNewMsg(e.target.value);
  };

  return (
    <div className="list">
      <form onSubmit={sendMsg} className="record-input">
        <input
          placeholder="測試紀錄"
          className="input"
          value={newMsg}
          onChange={handleOnChange}
        ></input>
        <button type="submit" className="button">
          新增紀錄
        </button>
      </form>
      <hr></hr>
      <div className="msg-list">
        {msgs.map((msg) => (
          <div key={msg.id} className="message">
            <span>{msg.message}</span>
            <button
              type="button"
              className="button"
              onClick={() => deleteMsg(msg.id)}
            >
              刪除
            </button>
          </div>
        ))}
      </div>
      <br></br>
      <Link to="/" className="button">
        返回首頁
      </Link>
    </div>
  );
};

export default List;
