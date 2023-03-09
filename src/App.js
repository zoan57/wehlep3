import React from 'react'
import { Link } from "react-router-dom";

const App = () => {
    return (
        <div>
            <section className='index-header'>React練習專案</section>
            <section className='main'>歡迎光臨我的頁面</section>
            <Link to="/list">
                <button className='button'>點此開始</button>
            </Link>
        </div>
    )
}

export default App