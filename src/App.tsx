import AerialHouse from '/aerial-multipleroofs.webp'
import Canvas from './components/Canvas'
function App() {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width : 0.95 * width,
      height : 0.90 * height
    };
  }
  const {width,height} = getWindowDimensions()

  return (
    <>
      <div style={{background:'wheat', width:'100vw',display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
        <Canvas imageUrl={AerialHouse} windowWidth={width} windowHeight={height}/>
      </div>
    </>
  )
}

export default App
