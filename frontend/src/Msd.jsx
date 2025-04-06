// import "./ad.css";
import "./Bonn.css"
export default function Msd() {
  const mm=[
    {titl:"DSSSSS"},
    {titl:"JJJJJJ"},
    {titl:"BBBBBBBB"},
    {titl:"AAAAAAA"}
  ]
  const ma=mm.map((item)=>{
    return <li  ><a className="mm" href="https://www.youtube.com/">{item.titl}</a></li>
           
  })
  // console.log(props);
  // console.log(name);
  // const elSty={
  //   backgroundColor:"red",
  // };
  return (
    <>
   
   <div  style={{


               margin: "0 auto ",
               fontSize:" 10px",
               width: "100%",
               display: "block",
              
               border: " solid 10px green",
              //  textAlign: "center",
               backgroundColor: "black",
               
               color: "green",
               marginTop: "20px",
             }}> 
      <ul>
        {ma}
      </ul>
      

    </div>
    </>

  );
}
