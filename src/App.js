import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:8001';


function Article(props){
  
  const [cafeMenu, setCafeMenu] = useState([
    // {
    //   id : 1,
    //   order_time: "000000",
    //   amount : 1000,
    //   order_status : "READY",
    //   memo : "반가워요~~@!!"
    // }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCafe() {
    try {
      const response = await axios.get(
        url + props.endpoint, {params: {cafeId : 1}}
      );
      console.log("R.data", response.data);

      let tmp = response.data;
      console.log("tmp",tmp);
      setCafeMenu(response.data);
      console.log("cafemenu1", cafeMenu);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCafe();
  });

  console.log("cafemenu2", cafeMenu);
  
  let lis = [];
  let tmp = [];
  for(let i=0; i< cafeMenu.length; i++){

    let t = cafeMenu[i];
    console.log("T =====", t.length);
    lis.push(<ul className='get-server-info'> <h2>주문번호 {t.id}번</h2> <li>시간 : {t.order_time}</li> <li>가격 : {t.amount}</li> <li>상태 : {t.order_status}</li> <li>요청사항 : {t.memo}</li> </ul>);
  }

  return <article>
      {lis}
  </article>
}

function App() {

  const [endpoint, setEndpoint] = useState("");

  let content = null;
  if (endpoint) {
    console.log("endPoint : ", endpoint);
    content = <Article endpoint={endpoint} ></Article>
  }

  // useEffect(() => {
  // }, content);

  return (
    <div className="App">

    <div id='wrap'>

      <header id='serviceHeader'>
        <div id='topInnerHeader' className='innerHeader'>
          <h1 className='Logo'>종달의 민족</h1>
        </div>

      </header>


      <div id="sideArea">
        <div className='Left_Navigation_Bar main'>
          <div className='mb-content'>
            <h3 className='Left_btn'>
              <p href='#'>접수대기</p>
              <p>0</p>
            </h3>
            <h3 className='Left_btn'>
              <p href='#'>처리중</p>
              <p>0</p>
            </h3>
            <h3 className='Left_btn'>
              <p href='#'>완료</p>
              
              <p>0</p>
            </h3>
            <h3 className='Left_btn'>
              <p href='#'>주문조회</p>
            </h3>
          </div>
        </div>
      </div>

      <div id="list-container">
        <div id="topBtnArea" className='main_banners'>
          <button className="top-button" onClick={event => {
            event.preventDefault();
            setEndpoint('/cafe/payments');
          }}>주문현황</button>
          <button className="top-button-not" onClick={event => {
            event.preventDefault();
            setEndpoint('/cafe');
          }}>매장 관리</button>

        </div>
        <div className='cafe-name'>
          <h2 className='cafe-name-h2'> 카페명 : 원석's카페</h2>
        </div>
        <div className='cafe-info'>
          {content}
        </div>

      </div>
    </div>

    </div>
  );
}

export default App;
