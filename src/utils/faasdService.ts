import axios from 'axios';
import {constants} from './constants'
export default class FaasdService{
    header:object;
    constructor(){
        this.header = {
            auth:{
                username:"admin",
                password:"N4iuzYIh2IZJ0ZPMoJQH1xOLlUIhOBvTvruXzjT4LIhD3Lfr4RbuFc7PPv8V8Uk"
            }
        }
    }

    async deployFunction(tag:string, name:string){
         axios.post(constants.SERVER_FAASD+"system/functions",{image:tag,"service": name},this.header).then(result =>{
             console.log('Done');
             
         }).catch(err =>{
             console.log(err);
             
         });
    }

}