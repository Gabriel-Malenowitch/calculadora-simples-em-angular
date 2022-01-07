import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  outputText = '0'
  finished = false

  constructor() { }
  ngOnInit(): void {
  }
  
  toString(array: string[]): string{
    let finalWord = ''
    array.forEach(itemFromArray=>{
      finalWord = `${finalWord}${itemFromArray}`
    })
    return finalWord;
  }

  clear(){
    this.outputText = '0'
  }
  backspace(){
    if(this.outputText !== "0"){
      let outputTextToArray = this.outputText.split('')
      const lenght = outputTextToArray.length
      outputTextToArray.pop()
      this.outputText = this.toString(outputTextToArray)
    }
  }
  minus(){
    this.isFinished()
    this.outputText += this.findSignalInString(this.outputText) ? "" : "-"
  }
  more(){
    this.isFinished()
    this.outputText += this.findSignalInString(this.outputText) ? "" : "+"
  }
  divide(){
    this.isFinished()
    this.outputText += this.findSignalInString(this.outputText) ? "" : "/"
  }
  multiply(){
    this.isFinished()
    this.outputText += this.findSignalInString(this.outputText) ? "" : "x"
  }
  add(value: number){
    this.isFinished()
    this.outputText+=value
  }
  setResult(){
    this.outputText = this.solveThisBigProblemThatIdontLike(this.outputText)
  }

  solveThisBigProblemThatIdontLike(problem: string){
    let secondNumber = ''
    let firstNumber = ''
    let signal = ''
    let result = 0

    const problemArray = problem.split('')

    problemArray.forEach((char: string)=>{
      if(this.isNumber(char) && signal === ''){
        firstNumber += char
      }
      if(signal !== ''){
        secondNumber = `${secondNumber}${char}`
      }
      if(!this.isNumber(char)){
        signal = char
      }
    })
    
    switch (signal){
      case "-":
        result = Number(firstNumber) - Number(secondNumber)
        break

      case "+":
        result = Number(firstNumber) + Number(secondNumber)
        break

      case "x":
        result = Number(firstNumber) * Number(secondNumber)
        break
        
      case "/":
        result = Number(firstNumber) / Number(secondNumber)
        break
      }

      this.finished = true
      
      return String(result.toFixed(2))
      
    }

    isNumber(signal: string){
      if(signal === '-' || signal === '+' || signal === 'x' || signal === '/'){
        return false
      }else{
        return true
      }
    }

    findSignalInString(word: string){
      const wordArray = word.split('')
      let answer = false
      wordArray.forEach(char=>{
        if(char === '-' || char === '+' || char === 'x' || char === '/'){
          answer = true
        }
      })
      return answer
    }

    isFinished(){
      if(this.finished){
        this.clear()
        this.finished = false
      }
    }

  }
  