import NewCookedJarButton from "../Buttons/NewCookedJar";
import CookedJarsDataTable from "../CookedJars/CookedJars";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";
import PocketBase from 'pocketbase';
import { useNavigate, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"


export default function Home(props) {

  const [cookedjars, setCookedjars] = useState([])
  const [substrates, setSubstrates] = useState([])

  if(typeof props.user == 'undefined' || Object.keys(props.user).length === 0 ){
    return <Navigate to='/auth' />
  }

  const pb = new PocketBase('http://127.0.0.1:8090');

  function searchSubstrate(id){
    substrates.forEach( (el) => {
      if(el.id == id){
        return el
      }
    })
  }

  async function getSubstrates(){
    const records = await pb.collection('substrates').getFullList(200 /* batch size */, {
      sort: '-created',
    }).then( (e) => {
        e.forEach(function(substrate) {

          var tmpSubstrate = {
          "id": substrate.id,
          "name": substrate.name,
          }

          if(substrates.indexOf(tmpSubstrate) == -1){
            setSubstrates(substrates => [...substrates, tmpSubstrate]);
          }
        });
      });
  }

  async function getCookedJars(){
    await pb.collection('cookedjars').getFullList(200 /* batch size */, {
      sort: '-created',
    }).then( (e) => {
      e.forEach(function(cookedJar) {
        var tmpJar = {
          "barcode": cookedJar.barcode,
          "preparationDate": cookedJar.preparationDate,
          "substrate": searchSubstrate(cookedJar.substrate)?.name
        }
        setCookedjars(cookedjars => [...cookedjars, tmpJar]);
      });
    });
  }

  getSubstrates()

  getCookedJars()

  // Subscribe to changes in any cookedjars record
  pb.collection('cookedjars').subscribe('*', function (e) {
    //console.log(e.record);
  }).then( (e) => {
  });
  
  console.log(substrates)
  console.log(cookedjars)

  return (
    <>
        <ResponsiveAppBar user = {props.user}/>
        <CookedJarsDataTable />
        <NewCookedJarButton />
    </>
  );
}