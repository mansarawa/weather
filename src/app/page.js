'use client'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import './style.css'
import styles from './page.module.css'

export default  function Home() {
  const [weather,setWeather]=useState("")
  const [location,setLocation]=useState("")
  const getWeatherData = async()=>{
    const api_key='66c15e931906419e80504447231810'
    const api_url='http://api.weatherapi.com/v1/current.json?key=' + api_key +'&q='+ location
    if(location){
      try {
        const res=await fetch(api_url)
        const data=await res.json();
        console.log(data)
        if(data){
          const api_data={
            wind:data.current.wind_kph,            
            feels:data.current.feelslike_c,
            temp:data.current.temp_c,
            humadity:data.current.humidity,
            visiblity:data.current.vis_km,
            conditon:data.current.condition.text,
            icon:data.current.condition.icon
          }
          setWeather(<>
               <div className="data">
               <div className="temp">  {api_data.temp} </div>
               <div className="condition"> {api_data.conditon}</div>
               <div className="d-flex below">
      <div className="state">Wind_kph: {api_data.wind}</div>
      <div className="city"> Feels Like: {api_data.feels}</div>
      
      <div className="humadity"> Humadity :{api_data.humadity}</div>
      <div className="vis_km"> Visiblity :{api_data.visiblity}</div>
      </div>
      
     
      
    </div>
          </>)
        }
        
      } catch (error) {
        console.log(error)
        
      }
    }
  }
   

  return (
    <html>
      <body>
  <div >
    <nav className="navbar navbar-expand-lg bg-body-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Mansa's Weather App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active " aria-current="page" href="#">Home</a>
        </li>
       
       
        
      </ul>
      <form className="d-flex" role="search">
        <input type="text" value={location}  onChange={(e)=>setLocation(e.target.value)} className="form-control me-2"  placeholder="Search Location" aria-label="Search"/>
        <button onClick={getWeatherData} className="btn btn-outline-dark" type="button">Search</button>
      </form>
    </div>
  </div>
</nav>
<main>
  <div className="container">
    
    {weather}
  </div>

</main>
 
 
  </div>
  </body>
  </html>
  )
}
