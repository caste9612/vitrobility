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
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      // get the data from the api
        let subCall = await getAllSubstrates();
        subCall.forEach(function(substrate) {

          tmpSubstrate.push({
          "id": substrate.id,
          "name": substrate.name,
          })
        });
        setSubstrates(tmpSubstrate);

        let coockCall = await getCookedJars();
        coockCall.forEach(function(cookedJar) {
          a.push({
            "id": cookedJar.barcode,
            "substrate": searchSubstrate(tmpSubstrate, cookedJar.substrate),
            "preparationDate": cookedJar.preparationDate
          })
          
        });
        setCookedjars(a);
    }

    // call the function
    fetchData().then(() => setCanRender( true ))
    //.catch(console.error);

  }, [])
  

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
    return tmpSubstrate.find(el => el.id === id).name;
  }



  // Subscribe to changes in any cookedjars record
  pb.collection('cookedjars').subscribe('*', function (e) {
    let record = e.record;
    let updCock = []
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
          updCock.push({
            "id": cookedJar.barcode,
            "substrate": searchSubstrate(tmpSubstrate, cookedJar.substrate),
            "preparationDate": cookedJar.preparationDate
          })
          
        });
        setCookedjars(updCock)
      })
  })

    /*
    switch(e.action){
      case "create":
        cookedjars.push({
            id: record.barcode,
            substrate: searchSubstrate(substrates, record.substrate),
            preparationDate: record.preparationDate
        })
      break;
      default: console.log("ciao")
    }
    */
  })

  if(canRender) {
    return (
      <>
          <ResponsiveAppBar user = {props.user}/>
          <CookedJarsDataTable pb = {pb} cookedjars ={cookedjars} />
          <NewCookedJarButton pb = {pb} cookedjars ={cookedjars}/>
      </>
    );
  } else {
      return(
          <div></div>
      )
  }
}



