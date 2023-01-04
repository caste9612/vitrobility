import NewCookedJarButton from "../Buttons/NewCookedJar";
import CookedJarsDataTable from "../CookedJars/CookedJars";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";
import { useNavigate, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"


export default function Home(props) {
  const pb = props.pb;
  let tmpSubstrate = []
  let a = []
  const [cookedjars, setCookedjars] = useState([])
  const [substrates, setSubstrates] = useState([])

  useEffect(() => {
    getAllSubstrates().then((res) =>{
      res.forEach(function(substrate) {

        tmpSubstrate.push({
        "id": substrate.id,
        "name": substrate.name,
        })
      });
      setSubstrates(tmpSubstrate);
      getCookedJars().then((resp) => {
        
        resp.forEach(function(cookedJar) {
          
          a.push({
            "id": cookedJar.barcode,
            "substrate": "ciao",//searchSubstrate(tmpSubstrate, cookedJar.substrate) 
            "preparationDate": cookedJar.preparationDate
          })
          
        });
        setCookedjars(a)
      })
    })

}, []);
  

  if(typeof props.user == 'undefined' || Object.keys(props.user).length === 0 ){
    return <Navigate to='/auth' />
  }


  async function getAllSubstrates() {
    return await pb.collection('substrates').getFullList(200, {sort: '-created'})
  }
  
  async function getCookedJars(){
    return await pb.collection('cookedjars').getFullList(200,{sort: '-created'})
  }
  
  function searchSubstrate(tmpSubstrate, id){
    return tmpSubstrate.forEach( (el) => {
      if(el.id === id) return el
    })
  }

/*

  // Subscribe to changes in any cookedjars record
  pb.collection('cookedjars').subscribe('*', function (e) {
    //console.log(e.record);
  }).then( (e) => {
  });
  
  */
  //console.log(substrates)
  //console.log(cookedjars)

  return (
    <>
        <ResponsiveAppBar user = {props.user}/>
        <CookedJarsDataTable pb = {pb} substrates ={cookedjars} />
        <NewCookedJarButton />
    </>
  );
}



