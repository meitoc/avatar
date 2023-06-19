import './App.css';
import { useState,useEffect } from "react";


/* try but fail to get png files name on dirrctor, try later
function getDirectoryPngFiles(directoryName) {
  const directory = window.location.origin + "/" + directoryName;
  console.log(directory)//test
  return fetch(directory)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const pngFiles = [];
      const fileLinks = doc.getElementsByTagName("a");
      for (let i = 0; i < fileLinks.length; i++) {
        const link = fileLinks[i];
        const fileName = link.href.split("/").pop();
        if (/\.png$/.test(fileName)) {
          pngFiles.push(fileName);
        }
      }
      console.log(pngFiles);//test
      return pngFiles;
    });
}
*/
function randomTo(input){
  return Math.ceil(Math.random() * input);
}
//=============
function App() {
  const [indexPng,indexPngState]=useState([
    {name: "Body", path: "character/body", file: 17, chosen: randomTo(17)},
    {name: "Earrings", path: "character/accessories/earrings", file: 32, chosen: randomTo(32)},
    {name: "Clothes layer 1", path: "character/clothes/layer_1", file: 5, chosen: randomTo(5)},
    {name: "Clothes layer 2", path: "character/clothes/layer_2", file: 5, chosen:randomTo(5)},
    {name: "Clothes layer 3", path: "character/clothes/layer_3", file: 9, chosen:randomTo(5)},
    {name: "Neckwear", path: "character/accessories/neckwear", file: 18, chosen: randomTo(18)},
    {name: "Eyebrows", path: "character/eyebrows", file: 15, chosen:randomTo(15)},
    {name: "Eyes", path: "character/eyes", file: 24, chosen:randomTo(24)},
    {name: "Glasses", path: "character/accessories/glasses", file: 17, chosen: randomTo(17)},
    {name: "Hair", path: "character/hair", file: 73, chosen:randomTo(73)},
    {name: "Facial hair", path: "character/facial_hair", file: 18, chosen:randomTo(18)},
    {name: "Mouth", path: "character/mouths", file: 24, chosen:randomTo(24)},
    {name: "Nose", path: "character/noses", file: 1, chosen:randomTo(1)},
    {name: "Hat", path: "character/accessories/hats", file: 28, chosen: randomTo(28)}
  ]);
  const [reRender,reRenderState]=useState(true);
  const [appDirection, appDirectionState] = useState(window.innerWidth >= 1000?'row':'column');
  const [maxDivWidth, maxDivWidthState] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      maxDivWidthState(window.innerWidth);
      if (window.innerWidth >= 1000) {
        appDirectionState('row');
      } else {
        appDirectionState('column');
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //==============
  function clickTo(choice,id){
    indexPng.find((e)=> e.name===choice).chosen=id;
    indexPngState(indexPng);
    reRenderState(!reRender);
  }
  //============== Child Component
  function ChoiceItem({choice}){
    let pngDirectory = (indexPng.find((e)=> e.name===choice));
    let iconQuantity = pngDirectory.file;
    let iconChosen = pngDirectory.chosen;
    if(iconQuantity>1){
      let iconPath = window.location.origin+"/"+pngDirectory.path;
      let choiceItemInside = [];
      for(let i=1;i<=iconQuantity;i++){
        choiceItemInside.push(
          <img className={iconChosen!==i? "iconForChoice":"iconBeChosen"}
          key={`choice-${choice}${i}`}
          src={`${iconPath}/${i}.png`}
          alt=""
          onClick={()=>{if(iconChosen!==i) clickTo(choice,i);}}
          />
        )
      }
      return(<div className="ChoiceItem" style={{maxWidth:maxDivWidth}}><h2>{choice}</h2><div className="ChoiceItemIcons"><>{choiceItemInside}</></div></div>)
    };
    return "";
  };
    //===
  function Choices() {
    
    return (
      <div className="Choices">{
        indexPng.map((e)=>(<ChoiceItem choice = {e.name} />))
      }
      </div>
    );
  }
  //==============Main component
  function Avatar() {
    //props is a list id of items
    
    let chosenItemInside = [];
    indexPng.forEach((e,index)=>{
      let id=e.chosen;
      let name=e.name;
      let iconPath = window.location.origin+"/"+e.path;
      chosenItemInside.push(
        <img className='imageAvatarLayer' 
        key={`chosen-${name}${id}`}
        src={`${iconPath}/${id}.png`}
        style={{ zIndex: index , maxWidth: maxDivWidth-10}}
        alt=""
        />
      );
      if(name==="Earrings"){
        chosenItemInside.push(
          <img className='imageAvatarLayerFlip'
          key={`chosen-${name}${id}flip`}
          src={`${iconPath}/${id}.png`}
          style={{ zIndex: index , maxWidth: maxDivWidth-10}}
          alt=""
          />
        );
      }
    });
    const randomChose = ()=>{
      indexPng.forEach((e)=>{
        let file = e.file;
        e.chosen = randomTo(file);
      });
      indexPngState(indexPng);
      reRenderState(!reRender);
    }
    return (
      <div className="Avatar">
        <h1>CHOSE YOUR AVATAR</h1>
        <div className="containerAvatar" style={appDirection==="row"?{ position: "sticky", top: 10}:{ position: "relative"}}>
          <div className="imageAvatar" style={{maxWidth:maxDivWidth-40,maxHeight:maxDivWidth}}>
            <>{chosenItemInside}</>
          </div>
          <button onClick={randomChose}>RANDOM!</button>
        </div>
      </div>
    );
  }
  return (
    <div className="App" style={{ flexDirection: appDirection , maxWidth:maxDivWidth}}>
          <Avatar/>
          <Choices/>
    </div>
  );
}


export default App;
