import "./Bonn.css";

export default function Boton({ mm, children }) {
  return (
    <>
     
        <button className="container">
          {mm}
          <hr></hr>
          {children}
        
        </button>
      

    </>
  );
}
