const express = require('express');

const app = express();

app.get( "/mean", (req, res) => {
    if( req.nums ){

        const nums = req.nums.split(",")

        let mean = nums.reduce( (sum, num, index, nums ) =>{
            const trueNum = parseInt( num )
            if( isNaN(trueNum) ){
                return res.status(400).json(`${ num } is not a number`)
            }
            else{
                sum += trueNum
                if( index == nums.length - 1 ){
                    return sum/nums.length
                }
                else{
                    return sum
                }
            }
        },0)

        return res.json({
            operation: "mean",
            value: mean
          })
    }
    else{
        return res.status(400).json( "nums are required")
    }
})

app.get( "/median", (req, res) => {
    if( req.nums ){
    
        const nums = req.nums.split(",")
    
        let median = nums.sort().reduce( (median, num, index, nums ) =>{
            const trueNum = parseInt( num )
            if( isNaN(trueNum) ){
                return res.status(400).json(`${ num } is not a number`)
            }
            else{
                if( index == Math.trunc(nums.length/2) ){
                    return nums.length % 2 ?
                        trueNum : ( trueNum + parseInt(nums[ index ]) )/2
                }
                else{
                    return median
                }
            }
        },0)
    
        return res.json({
            operation: "median",
            value: median
          })
    }
    else{
        return res.status(400).json( "nums are required")
    }
})

app.get( "/mode", (req, res) => {
    
    if( req.nums ){
    
        const nums = req.nums.split(",")
    
        let mode = nums.sort().reduce( (modeDict, num, index, nums ) =>{
            const trueNum = parseInt( num )
            if( isNaN(trueNum) ){
                return res.status(400).json(`${ num } is not a number`)
            }
            else{
                if( modeDict[ trueNum ] ){
                    ++modeDict[ trueNum ] 
                }
                else{
                    modeDict[ trueNum ] = 1
                }

                if( index == nums.length - 1){
                    let mode = 0
                    let size = 0
                    for( number in modeDict ){
                        if( modeDict[ number ] > size ){
                            mode = number
                            size = modeDict[ number ]
                        }
                    }
                    return mode
                }
                else{
                    return modeDict
                }
            }
        },{})
    
        return res.json({
            operation: "mode",
            value: mode
          })
    }
    else{
        return res.status(400).json( "nums are required")
    }
})

app.listen(3000, function () {
  console.log('App on port 3000');
})