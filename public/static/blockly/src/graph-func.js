// 1.直线
let makeLine = function(start_x,start_y,end_x,end_y,border_width,color){
  let line = new ezpsy.Line({
    shape: {
      x: start_x, 
      y: start_y,
      xEnd: end_x,
      yEnd: end_y
    },
    style: {
      lineWidth: border_width,
      stroke: color
    }
  })
  // console.dir(line)
  ez.add(line)
  return line
}

//2.矩形
let makeRect = function(left,top,width,height,border_width,color_stroke,color_fill){
  let strokeRect = new ezpsy.Rectangle({
    shape: {
      x: left,
      y: top,
      width: width,
      height: height
    },
    style: {
      lineWidth: border_width,
      stroke: color_stroke,
      fill: color_fill
    }
  })
  ez.add(strokeRect)
  return(strokeRect)
  // console.dir(strokeRect)
}

// 3.实心矩形
// let makeFillRect=function(left,top,width,height,color){
//   let fillRect = new ezpsy.Rectangle({
//     shape: {
//       x: left,
//       y: top,
//       width: width,
//       height: height
//     },
//     style: {
//       fill: color
//     }
//   })
//   ez.add(fillRect)
//   return(fillRect)
// }

// 4.三角形
let makeTriangle=function(x1,y1,x2,y2,x3,y3,border_width,color_stroke,color_fill){
  let triangle = new ezpsy.Polygon({
    shape: {
      xA: [x1,x2,x3],
      yA: [y1,y2,y3]
    },
    style: {
      lineWidth: border_width,
      stroke: color_stroke,
      fill: color_fill
    }
  })
  ez.add(triangle)
  return(triangle)
}

// 5.空心圆
let makeCircle=function(x,y,r,border_width,color_stroke,color_fill){
  let stroke_circle = new ezpsy.Circle({
    shape: {
      x: x,
      y: y,
      r: r
    },
    style: {
      lineWidth: border_width,
      stroke: color_stroke,
      fill: color_fill
    }
  })
  ez.add(stroke_circle)
  return(stroke_circle)
}

// 6.填充圆
// let makeFill_circle=function(x,y,r,color){
//   let fill_circle = new ezpsy.Circle({
//     shape: {
//       x: x,
//       y: y,
//       r: r
//     },
//     style: {
//       fill: color
//     }
//   })
//   ez.add(fill_circle)
//   return(fill_circle)
// }

//7.文本
let makeText = function(
  value_text,
  value_x, value_y, 
  font_size, font_weight, font_style,font_family,
  textAlgin,textBaseline,color
){
  let text = new ezpsy.Texts({
    shape: {
        text: value_text,
        x: value_x,
        y: value_y,
        // maxWidth: 200
    },
    style: {
        fill: color,
        fontWeight: font_weight,
        fontSize: font_size,
        fontStyle: font_style,
        fontFamily: font_family,
        // stroke: color
    },
    textLine:{
      textA: textAlgin,
      textB: textBaseline
    }
  })
  ez.add(text)
  return(text)
}

// 8.图片
let preImage=function(url,x,y,width,height){
  let img = new ezpsy.Img({
    shape: {
      img: url,
      x: x,
      y: y,
      width: width,
      height: height
    }
  })
  return img;
}

let drawImage = (img)=>{
  ez.add(img);
}

// let ctx = [[@{/}]];

//光栅
let makeGrating = function(value_x,value_y,value_r,value_pixelPerDegree,value_spatialFrequency,value_angle,value_contrast,value_phase,value_noiseLevel,value_animateCycle,time){
  let f = false
  if(value_noiseLevel !== 0)
    f = true
  let grat = new ezpsy.sinGrating({
    wasm : './static/pkg/singrat_bg.wasm',
    shape: {
      x: value_x,                 
      y: value_y,                 
      r: value_r,    
      pixelsPerDegree: value_pixelPerDegree, 
      spatialFrequency: value_spatialFrequency,
      angle: value_angle, 
      contrast: value_contrast, 
      phase: value_phase,
      level: value_noiseLevel,
      gamma: 1
    },
    isNoise: f
  })
  if(!time)
    time = 1000;
  ez.add(grat);
  if(value_animateCycle){
    grat.play(value_animateCycle,time) 
  }
  else{
    (async ()=>{
      grat.draw()
      await delay_frame(Math.ceil(time/1000*60));
      grat.remove()
    })()
  }
  let canvas = grat.ctx.canvas
  // console.dir(canvas)
  canvas.style.background = '#808080'
  return grat
}

//随机点
let makeRandomDot = function(value_x,value_y,value_r,value_maskBand,value_dotNumber,value_minSpeed,value_maxSpeed){
  
  let randomDot = new ezpsy.RandomDot({
      shape: {
          x: value_x,
          y: value_y,
          r: value_r,
          number: value_dotNumber,
          minSpeed: value_minSpeed,
          maxSpeed: value_maxSpeed
      }
  })

  ez.add(randomDot);

  return randomDot
}