import { useEffect, useState } from "react";

function App() {
  
  const [infos,setInfos]=useState({sesso:"uomo",eta:18,peso:95,altezza:165});
  const [results,setResults]=useState({});

  useEffect(callTwo,[results]);

  function calcInfo(){

    console.log(calcMetBas())

    setResults({...results,pesoForma:calcPesoForma(),bmi:calcBMI(),metaBas:calcMetBas().toFixed(0),fabCal:calcFabGiorn()});

    document.getElementById("myBody").classList.remove("h-lvh"); 
    document.getElementById("listInfo1").classList.remove("hidden"); 
    document.getElementById("bmi_scala").classList.remove("hidden");
    document.getElementById("listInfo2").classList.remove("hidden"); 

  }

  function callTwo(){
    printBMI();
    printPesoForma();
    printMetBas();
    printFabCal();
  }

  function printBMI(){
    let string=`Il tuo BMI(indice massa corporea) è: ${results.bmi}, `;

    if(results.bmi<=18.5)
      string+="sei fortemente sotto peso";
    else if(results.bmi>16.5 && results.bmi<=18.4)
      string+="sei sotto peso";
    else if(results.bmi>18.5 && results.bmi<=24.9)
      string+="hai un peso normale";
    else if(results.bmi>25 && results.bmi<=30)
      string+="sei sovrappeso";
    else if(results.bmi>30.1 && results.bmi<=34.9)
      string+="soffri di obesità di primo grado";
    else if(results.bmi>35 && results.bmi<=40)
      string+="soffri di obesità di secondo grado";
    else if(results.bmi>40)
      string+="soffri di obesità di terzo grado";

    document.getElementById("bmi").innerText=string
  }  

  function printPesoForma(){
    document.getElementById("pesoForma").innerText=`Il tuo peso forma è: ${results.pesoForma}kg`;
  }

  function printMetBas(){
    document.getElementById("metBas").innerText=`Il tuo metabolismo basale(cioè la quantita di calorie che il tuo corpo brucia naturalmente per sopravvievere giornalmente) è: ${results.metaBas}kcal`;
  }

  function printFabCal(){
    document.getElementById("fabCal").innerText=`Il tuo corretto fabbisogno calorico giornaliero si aggira sulle: ${results.fabCal}kcal`;
  }

  function calcBMI(){
    return ((infos.peso/(Math.pow((infos.altezza/100),2))).toFixed(2));
  }

  function calcPesoForma(){
    if(infos.sesso==="donna")
      return (((Math.pow((infos.altezza/100),2))*20.6).toFixed(1));
    else
      return (((Math.pow((infos.altezza/100),2))*22.1).toFixed(1))
  }

  function calcMetBas(){
    if(infos.eta>=18 && infos.eta<=29){
      if(infos.sesso==="donna")
        return 14.7*infos.peso+496;
      else
        return 15.3*infos.peso+679;
    }
    if(infos.eta>=30 && infos.eta<=59){
      if(infos.sesso==="donna")
        return 8.7*infos.peso+829;
      else
        return 11.6*infos.peso+879;
    }
    if(infos.eta>=60 && infos.eta<=74){
      if(infos.sesso==="donna")
        return 9.2*infos.peso+688;
      else
        return 11.9*infos.peso+700;
    }
    if(infos.eta>74){
      if(infos.sesso==="donna")
        return 9.8*infos.peso+624;
      else
        return 8.4*infos.peso+819;
    }
  }

  function calcFabGiorn(){
    return (calcMetBas()+350).toFixed(0);
  }

  return (
    <div id="myBody" className="bg-gradient-to-bl to-green-400 from-green-950 h-lvh ">
        <div className="w-5/6 mx-auto pt-16 flex flex-col items-center">
          <h1 className="text-white text-6xl font-bold mb-14 text-center">PESO FORMA</h1>
          <div className="w-full flex flex-row justify-evenly">
            <select onChange={(e)=>setInfos({...infos,sesso:e.target.value})} className="p-3 rounded-full text-xl">
              <option value="uomo">uomo</option>
              <option value="donna">donna</option>
            </select>
            <input type="number" onInput={(e)=>setInfos({...infos,eta:e.target.value})} min="18" max="99" placeholder="Età" className="p-3 rounded-full text-xl min-w-32" defaultValue={infos.eta}/>
          </div>
          <label htmlFor="sliderPeso" className="text-white text-2xl font-semibold self-start mt-5">{infos.peso} kg</label>
          <input type="range" name="sliderPeso" id="sliderPeso" step={0.5} className="w-full p-2 cursor-pointer mb-10" min="45" max="160" defaultValue={infos.peso} onChange={(e)=>setInfos({...infos,peso:e.target.value})} />
          <label htmlFor="sliderAltezza" className="text-white text-2xl font-semibold self-start">{infos.altezza} cm</label>
          <input type="range" name="sliderAltezza" id="sliderAltezza" step={0.5} className="w-full p-2 cursor-pointer mb-10" min="140" max="210" defaultValue={infos.altezza} onChange={(e)=>setInfos({...infos,altezza:e.target.value})} />
          <button className="border-gray-200 border-4 p-3 text-xl rounded-full bg-white w-fit hover:bg-gray-200 mb-10" onClick={()=>calcInfo()}>CALCOLA PESO FORMA</button>
          <ul className="list-disc self-start hidden" id="listInfo1">
            <li id="bmi" className="text-white text-3xl font-semibold"></li>
            <li id="pesoForma" className="text-white text-3xl font-semibold"></li>
          </ul>
          <img src="bmi_scala.jpg" alt="" className=" w-full m-10 hidden cursor-pointer" id="bmi_scala" />
          <ul className="list-disc self-start hidden" id="listInfo2">
            <li id="metBas" className="text-white text-3xl font-semibold"></li>
            <li id="fabCal" className="text-white text-3xl font-semibold"></li>
          </ul>
        </div>
    </div>
  )
}

export default App
