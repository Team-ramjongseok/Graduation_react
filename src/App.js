import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:8001';



function App() {

  const cafeId = 1;
  
  const [cafeMenu, setCafeMenu] = useState([]);
  const [title, setTitle] = useState("카페번호 : " + cafeId);
  const [orderStatus, setOrderStatus] = useState([1,2,1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function changeBtnColor(index) {
    if(index === 0) {
      document.getElementById('order-btn').style.backgroundColor = '#7d89e7';
      document.getElementById('market-btn').style.backgroundColor = 'gray';
    }
    if(index === 1) {
      document.getElementById('order-btn').style.backgroundColor = 'gray';
      document.getElementById('market-btn').style.backgroundColor = '#7d89e7';
    }
    if(index === 2) {
      document.getElementById('order-btn').style.backgroundColor = 'gray';
      document.getElementById('market-btn').style.backgroundColor = 'gray';
    }
  }

  async function fetchCafe(endpoint) {

    if(!endpoint) return;
    try {
      const response = await axios.get(
        url + endpoint, {params: {cafeId : cafeId}}
      );
      
      console.log("endpoint ===", endpoint);
      let lis = [];
      for(let i=0; i< response.data.length; i++){
        let json = response.data[i];
        console.log("jsondata =====", json);
        const checklist1 = ['id', 'order_time', 'amount', 'order_status', 'memo'];
        const checklist2 = ['id', 'name', 'cafe_img', 'cafe_info', 'operation', 'location', 'seat_empty', 'seat_all', 'price'];
        if(endpoint === "/cafe/payments") {
          lis.push(<ul className='get-server-info'> 
          <h2>주문번호 {json.id}번</h2> 
          <li>메뉴 : {json.name}</li>
          <li>시간 : {json.order_time}</li> 
          <li>가격 : {json.amount}</li> 
          <li>상태 : {json.order_status}</li> 
          <li>요청사항 : {json.memo}</li> 
          </ul>);
        }
        if(endpoint === "/cafe"){
          lis.push(<ul className='get-server-info'> 
          <h2>메뉴번호 {json.id}번</h2> 
          <li>메뉴이름 : {json.name}</li>
          <li>카페이미지 : {json.cafe_img}</li>
          <li>카페정보 : {json.cafe_info}</li> 
          <li>운영시간 : {json.operation}</li> 
          <li>위치 : {json.location}</li> 
          <li>총자리 : {json.seat_all}</li> 
          <li>빈자리 : {json.seat_empty}</li>
          <li>가격 : {json.price}</li>
          </ul>);
        }
        if(endpoint === "/cafe/payments/check") {
          lis.push(<ul className='get-server-info'> 
            <h2>주문번호 {json.id}번</h2> 
            <li>메뉴 : {json.name}</li>
            <li>시간 : {json.order_time}</li> 
            <li>가격 : {json.amount}</li> 
            <li>상태 : {json.order_status}</li> 
            <li>요청사항 : {json.memo}</li> 
            <button>CHECK TO READY</button>
            </ul>);
        }
        if(endpoint === "/cafe/payments/ready") {
          lis.push(<ul className='get-server-info'> 
            <h2>주문번호 {json.id}번</h2> 
            <li>메뉴 : {json.name}</li>
            <li>시간 : {json.order_time}</li> 
            <li>가격 : {json.amount}</li> 
            <li>상태 : {json.order_status}</li> 
            <li>요청사항 : {json.memo}</li> 
            <button>READY TO COMPLETE</button>
            </ul>);
        }
        if(endpoint === "/cafe/payments/complete") {
          lis.push(<ul className='get-server-info'> 
          <h2>주문번호 {json.id}번</h2> 
          <li>메뉴 : {json.name}</li>
          <li>시간 : {json.order_time}</li> 
          <li>가격 : {json.amount}</li> 
          <li>상태 : {json.order_status}</li> 
          <li>요청사항 : {json.memo}</li> 
          </ul>);
        }
      }
      
      

      setCafeMenu(lis);
      console.log("cafemenu1", cafeMenu);
    } catch (err) {
      console.error(err);
    }
  }



  
  let content = null;
  if (cafeMenu) {
    console.log("cafeMenu: ", cafeMenu);
    content = cafeMenu;
  }



  return (
    <div className="App">

    <div id='wrap'>

      <header id='serviceHeader'>
        <div id='topInnerHeader' className='innerHeader'>
          <h1 className='Logo'>종달의 민족 </h1>
        </div>

      </header>


      <div id="sideArea">
        <div className='Left_Navigation_Bar main'>
          <div className='mb-content'>
            <h3 className='Left_btn' onClick={event => {
            changeBtnColor(2);
            setTitle('접수대기');
            event.preventDefault();
            fetchCafe('/cafe/payments/check')
            }}>
              <p>접수대기</p>
              <p>{orderStatus[0]}</p>
            </h3>
            <h3 className='Left_btn' onClick={event => {
            changeBtnColor(2);
            setTitle('처리중');
            event.preventDefault();
            fetchCafe('/cafe/payments/ready')
            }}>
              <p>처리중</p>
              <p>{orderStatus[1]}</p>
            </h3>
            <h3 className='Left_btn' onClick={event => {
            changeBtnColor(2);
            setTitle('완료');
            event.preventDefault();
            fetchCafe('/cafe/payments/complete')
            }}>
              <p>완료</p>
              <p>{orderStatus[2]}</p>
            </h3>
            <h3 className='Left_btn'  onClick={event => {
            changeBtnColor(2);
            setTitle('주문조회');
            event.preventDefault();
            fetchCafe('/cafe/payments')
            }}>
              <p>주문조회</p>
            </h3>
          </div>
        </div>
      </div>

      <div id="list-container">
        <div id="topBtnArea" className='main_banners'>
        <button className="top-button" id="order-btn" onClick={event => {
            changeBtnColor(0);
            setTitle('주문현황');
            event.preventDefault();
            fetchCafe('/cafe/payments')
          }}>주문현황</button>
          <button className="top-button-not" id="market-btn" onClick={event => {
            changeBtnColor(1);
            setTitle('매장관리');
            event.preventDefault();
            fetchCafe('/cafe')
          }}>매장관리</button>

        </div>
        <div className='cafe-name'>
          <h2 className='cafe-name-h2'> {title} </h2>
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
