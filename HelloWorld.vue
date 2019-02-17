<template>
  <div class="hello">
    <h1>Ask your Health Buddy! *Snack Edition*</h1>
    <h1 style="color: blue">{{msg}}</h1>
    <h2>Your BMI is: {{bmi}}</h2>   
    <h2>Your total calorie count for snacks for the day is: {{sumCal}}</h2>
    <h2>Your calorie limit for snacks for the day is: {{maxCal}}</h2>
    <h2 style="color: red">{{warnMsg}}</h2>
    


    <form>
  <div>
      <label for="height">Height (m):</label>
      <input type='text' v-model="height"/>
  </div>
  <div>
  <div>

  </div>
      <label for="weight">Weight (kgs):</label>
      <input type='text' v-model="weight"/>
  </div>

  <div>
     <label for="age">Age (yrs):</label>
      <input type='text' v-model="age"/>
  </div>
  

  <div>
    <label for="pa">Physical Activity Intensity:</label><br>
    <button @click="sedentary"> Sedentary </button><br>
    <button @click="lowactive"> Low Active </button><br>
    <button @click="active"> Active </button><br>
    <button @click="veryactive"> Very Active </button><br>

    <br>
    
    
  </div>
  <button v-on:click="checkHealth"> Check Health </button>
    </form>
    <quagga-scanner :onDetected="logIt" :readerSize="readerSize" :readerType="'ean_reader'"></quagga-scanner>
    <quagga-scanner :onDetected="checkHealth" :readerSize="readerSize" :readerType="'ean_reader'"></quagga-scanner>
  </div>
  
</template>



<<script>
import { QuaggaScanner } from 'vue-quaggajs'
export default {
  name: 'VueBarcodeTest',
  data () {
    return {
      height: 0,
      weight: 0,
      maxCal: 0,
      calories: 0,
      bmi: 0,
      age: 0,
      pa: 0,
      counter: 0,
      sumCal: 0,
      msg:'',
      warnMsg: '',
      ediblefood: [],
      readerSize: {
        width: 640,
        height: 480
      },
      detecteds: [],
      food: [{barcode:'0829515300579', name: "veggie straws", type: "unhealthy", calorie:'130'},
      {barcode:'0024100940141', name: "cheez-it", type: "unhealthy", calorie: '140'},
      {barcode: '0850251004018', name: "skinny pop", type: "healthy", calorie: '100'},
      {barcode: '0041190061907', name: "seedless raisins", type: "healthy", calorie: '90'},
      {barcode: '0028400026734', name: "munchies peanut butter", type: "unhealthy", calorie: '200'},
      {barcode: '0044000020170', name: "oreos", type: "unhealthy", calorie: '130'},
      {barcode: '0028400040068', name: "rold gold pretzels", type: "healthy", calorie: '110'}, 
      {barcode: '0073141152334', name: "pocky", type: "unhealthy", calorie: '340'},
      {barcode: '0028400189224', name: "ruffles", type: "unhealthy", calorie: '160'},
      {barcode: '0028400090841', name: "funyun", type: "unhealthy", calorie: '110'},
      {barcode: '0890000001066', name: "gogo squeez", type: "healthy", calorie: '60'},]
    }
  },
  components: {
    QuaggaScanner
  },
  methods: {
    
    logIt (data) {
      console.log('detected', data.codeResult.code);
      //this.msg = 'Hey you can eat this food' 
    },

    checkHealth(data){
      this.bmi = this.weight/(this.height*this.height);
      this.maxCal = .25*(387-7.31*this.age+this.pa*(10.9*this.weight+660.7*this.height));
  
     for (var x in this.food){

        
        
        //console.log('in for loop',this.food[x].name);
        if(this.food[x].barcode == data.codeResult.code){   
             
              if(this.counter%10==0){
                this.sumCal = +this.sumCal + +this.food[x].calorie; 
                this.msg = this.food[x].name + ' detected';
              }
               this.counter=this.counter+1;
              console.log(this.food[x].name);   
              
        } 

        if(this.sumCal/this.maxCal >= 0.75 && this.sumCal/this.maxCal <=1){
          if(this.height == 0 || this.weight == 0 || this.age == 0){
            continue;
          }
          this.warnMsg = "Warning: You are approaching your daily recommended calorie intake limit";
          console.log("Warning: You are approaching your daily recommended calorie intake limit");
          
        } else if(this.sumCal>this.maxCal){
          if(this.height == 0 || this.weight == 0 || this.age == 0){
            continue;
          }
          this.warnMsg = "You have exceeded your recommended calorie intake limit"; 
          console.log("You have exceeded your recommended calorie intake limit");
        }
      }
      
      
      console.log('calories: ',this.sumCal);
      

    },

    sedentary(){
      this.pa = 1;
    },

    lowactive(){
      this.pa = 1.14;
    },

    active(){
      this.pa = 1.27;
    },

    veryactive(){
      this.pa = 1.45;
    },
  }
}
  

  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
