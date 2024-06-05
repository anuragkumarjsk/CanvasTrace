import React,{useRef,useState,useEffect} from 'react'

const Canvas = ({ imageUrl,windowWidth, windowHeight }) => {
    const canvasRef = useRef(null);
    const [polygons, setPolygons] = useState([]);
    const [currentPoints, setCurrentPoints] = useState([]);
    const [nextCount, setNextCount] = useState(0);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = imageUrl;
  
      img.onload = () => {
        canvas.width = windowWidth;
        canvas.height = windowHeight;
        ctx.drawImage(img, 0, 0);
      };
    }, [imageUrl]);
  
    const handleCanvasClick = (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      setCurrentPoints((prevPoints) => [...prevPoints, { x, y }]);
    };

  const drawPolygon = (ctx, points) => {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();
  };


  const handleNextTrace = () => {
    setPolygons((prevPolygons) => [...prevPolygons, currentPoints]);
    setCurrentPoints([]);
    setNextCount(nextCount + 1);
  };

  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      polygons.forEach((polygon) => {
        drawPolygon(ctx, polygon);
      });

      drawPolygon(ctx, currentPoints);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'edited-image.png';
      link.click();
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      polygons.forEach((polygon) => {
        drawPolygon(ctx, polygon);
      });

      drawPolygon(ctx, currentPoints);
    };
  }, [currentPoints, polygons, imageUrl]);


  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <h2 style={{ position:'relative',color:'black', fontSize:'40px'}}>Outline Tracer</h2>  
      <canvas ref={canvasRef} onClick={handleCanvasClick} width={windowWidth} height={windowHeight}></canvas>
      <div style={{width:'100%', padding:'10px', display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
         <button style={{marginRight:'10px'}} onClick={handleNextTrace}>Next Trace</button>
         <button style={{marginRight:'10px'}}  onClick={handleSaveClick}>Save Image</button>
      </div>
    </div>
  );
};

export default Canvas;
